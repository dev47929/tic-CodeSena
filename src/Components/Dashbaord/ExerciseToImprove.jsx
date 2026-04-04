import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Activity, AlertTriangle, Camera, CheckCircle2, Play, RotateCcw, Video } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { useAuth } from '../../context/AuthContext';

const EXERCISES = [
    {
        id: 'arms-up-hold',
        title: 'Arms Up Hold',
        description: 'Raise both hands up and hold a stable posture for a few seconds.',
        demoSrc: '/ArmsUp.mp4',
        demoTimestamp: 1,
        durationMs: 7000,
        passAccuracy: 65,
        angleTriplets: [
            ['left_shoulder', 'left_elbow', 'left_wrist'],
            ['right_shoulder', 'right_elbow', 'right_wrist'],
            ['left_elbow', 'left_shoulder', 'left_hip'],
            ['right_elbow', 'right_shoulder', 'right_hip']
        ]
    },
    {
        id: 'side-balance',
        title: 'Side Balance',
        description: 'Open your arms and keep your torso aligned while balancing your stance.',
        demoSrc: '/Side_Balance.mp4',
        demoTimestamp: 1,
        durationMs: 7000,
        passAccuracy: 65,
        angleTriplets: [
            ['left_shoulder', 'left_elbow', 'left_wrist'],
            ['right_shoulder', 'right_elbow', 'right_wrist'],
            ['left_shoulder', 'left_hip', 'left_knee'],
            ['right_shoulder', 'right_hip', 'right_knee']
        ]
    },
    {
        id: 'power-stance',
        title: 'Power Stance',
        description: 'Keep your chest open, knees soft, and maintain a confident lower-body stance.',
        demoSrc: '/PowerStance.mp4',
        demoTimestamp: 1,
        durationMs: 7000,
        passAccuracy: 70,
        angleTriplets: [
            ['left_hip', 'left_knee', 'left_ankle'],
            ['right_hip', 'right_knee', 'right_ankle'],
            ['left_shoulder', 'left_hip', 'left_knee'],
            ['right_shoulder', 'right_hip', 'right_knee']
        ]
    }
];

const KP_MIN_SCORE = 0.3;

const waitForEvent = (element, eventName) =>
    new Promise(resolve => {
        const handler = () => {
            element.removeEventListener(eventName, handler);
            resolve();
        };
        element.addEventListener(eventName, handler, { once: true });
    });

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function getAngle(a, b, c) {
    if (!a || !b || !c) return null;

    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };

    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

    if (!magAB || !magCB) return null;

    const cosine = clamp(dot / (magAB * magCB), -1, 1);
    return (Math.acos(cosine) * 180) / Math.PI;
}

function getPointByName(keypoints, name) {
    return keypoints.find(kp => kp.name === name && (kp.score ?? 0) >= KP_MIN_SCORE);
}

function extractAngles(keypoints, triplets) {
    const angles = {};

    triplets.forEach(([a, b, c]) => {
        const first = getPointByName(keypoints, a);
        const middle = getPointByName(keypoints, b);
        const third = getPointByName(keypoints, c);
        const angle = getAngle(first, middle, third);
        if (angle !== null) {
            angles[`${a}-${b}-${c}`] = angle;
        }
    });

    return angles;
}

function calculateAccuracy(currentAngles, baselineAngles) {
    const keys = Object.keys(baselineAngles).filter(key => typeof currentAngles[key] === 'number');
    if (!keys.length) return 0;

    const totalError = keys.reduce((sum, key) => {
        const diff = Math.abs(currentAngles[key] - baselineAngles[key]);
        const normalized = clamp(diff / 90, 0, 1);
        return sum + normalized;
    }, 0);

    const avgError = totalError / keys.length;
    return Math.round((1 - avgError) * 100);
}

function drawPose(canvas, video, keypoints) {
    const ctx = canvas.getContext('2d');
    if (!ctx || !video.videoWidth || !video.videoHeight) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    keypoints.forEach(point => {
        if ((point.score ?? 0) < KP_MIN_SCORE) return;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#c47ea8';
        ctx.fill();
    });
}

export default function ExerciseToImprove({ isDarkMode = true }) {
    const { progress, recordExerciseResult } = useAuth();

    const detectorRef = useRef(null);
    const webcamRef = useRef(null);
    const demoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const frameLoopRef = useRef(null);

    const [modelState, setModelState] = useState('idle');
    const [activeExerciseId, setActiveExerciseId] = useState(null);
    const [runtimeError, setRuntimeError] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [currentAccuracy, setCurrentAccuracy] = useState(0);
    const [lastResult, setLastResult] = useState(null);

    const baselineCacheRef = useRef({});
    const samplesRef = useRef([]);
    const startTimeRef = useRef(0);
    const isRunningRef = useRef(false);

    const activeExercise = useMemo(
        () => EXERCISES.find(item => item.id === activeExerciseId) || null,
        [activeExerciseId]
    );

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (webcamRef.current) {
            webcamRef.current.srcObject = null;
        }

        setIsCameraReady(false);
    }, []);

    const stopSession = useCallback(() => {
        if (frameLoopRef.current) {
            cancelAnimationFrame(frameLoopRef.current);
            frameLoopRef.current = null;
        }
        isRunningRef.current = false;
        setIsRunning(false);
    }, []);

    const bootModel = useCallback(async () => {
        if (detectorRef.current) return detectorRef.current;

        setModelState('loading');
        await tf.ready();
        try {
            await tf.setBackend('webgl');
        } catch {
            await tf.setBackend('cpu');
        }

        detectorRef.current = await poseDetection.createDetector(
            poseDetection.SupportedModels.MoveNet,
            {
                modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING
            }
        );
        setModelState('ready');
        return detectorRef.current;
    }, []);

    const startCamera = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                width: { ideal: 960 },
                height: { ideal: 540 }
            },
            audio: false
        });

        streamRef.current = stream;
        if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
            await waitForEvent(webcamRef.current, 'loadedmetadata');
            await webcamRef.current.play();
            setIsCameraReady(true);
        }
    }, []);

    const getDemoBaselineAngles = useCallback(async exercise => {
        if (baselineCacheRef.current[exercise.id]) {
            return baselineCacheRef.current[exercise.id];
        }

        const detector = await bootModel();
        const demoVideo = demoRef.current;
        if (!demoVideo) throw new Error('Demo video not available.');

        demoVideo.src = exercise.demoSrc;
        demoVideo.currentTime = 0;
        await waitForEvent(demoVideo, 'loadedmetadata');

        const seekTime = Math.min(exercise.demoTimestamp, Math.max(0, demoVideo.duration - 0.2));
        demoVideo.currentTime = seekTime;
        await waitForEvent(demoVideo, 'seeked');

        const demoPoses = await detector.estimatePoses(demoVideo, { flipHorizontal: false });
        if (!demoPoses?.length) {
            throw new Error('No demonstrator pose detected in video frame.');
        }

        const baselineAngles = extractAngles(demoPoses[0].keypoints, exercise.angleTriplets);
        if (!Object.keys(baselineAngles).length) {
            throw new Error('Unable to compute baseline angles from demo frame.');
        }

        baselineCacheRef.current[exercise.id] = baselineAngles;
        return baselineAngles;
    }, [bootModel]);

    const finalizeSession = useCallback((exercise, passAccuracy) => {
        const samples = samplesRef.current;
        if (!samples.length) {
            setRuntimeError('No valid pose samples captured. Try again in better lighting.');
            stopSession();
            return;
        }

        const avg = Math.round(samples.reduce((sum, score) => sum + score, 0) / samples.length);
        setLastResult({
            exerciseId: exercise.id,
            accuracy: avg,
            passed: avg >= passAccuracy
        });
        recordExerciseResult(exercise.id, avg);
        stopSession();
    }, [recordExerciseResult, stopSession]);

    const runTrackingLoop = useCallback(async (exercise, baselineAngles) => {
        const detector = detectorRef.current;
        const webcam = webcamRef.current;
        if (!detector || !webcam) return;

        const tick = async () => {
            try {
                if (!isRunningRef.current) return;

                const poses = await detector.estimatePoses(webcam, { flipHorizontal: true });
                const pose = poses?.[0];

                if (pose?.keypoints?.length) {
                    drawPose(canvasRef.current, webcam, pose.keypoints);

                    const currentAngles = extractAngles(pose.keypoints, exercise.angleTriplets);
                    const accuracy = calculateAccuracy(currentAngles, baselineAngles);

                    if (accuracy > 0) {
                        setCurrentAccuracy(accuracy);
                        samplesRef.current.push(accuracy);
                    }
                }

                const elapsed = Date.now() - startTimeRef.current;
                if (elapsed >= exercise.durationMs) {
                    finalizeSession(exercise, exercise.passAccuracy);
                    return;
                }

                frameLoopRef.current = requestAnimationFrame(tick);
            } catch {
                setRuntimeError('Pose tracking failed. Please retry.');
                stopSession();
            }
        };

        frameLoopRef.current = requestAnimationFrame(tick);
    }, [finalizeSession, stopSession]);

    const handleStartExercise = useCallback(async exercise => {
        setRuntimeError('');
        setLastResult(null);
        setCurrentAccuracy(0);
        setActiveExerciseId(exercise.id);

        try {
            await bootModel();
            await startCamera();
            const baselineAngles = await getDemoBaselineAngles(exercise);

            samplesRef.current = [];
            startTimeRef.current = Date.now();
            isRunningRef.current = true;
            setIsRunning(true);

            await runTrackingLoop(exercise, baselineAngles);
        } catch (error) {
            setRuntimeError(error?.message || 'Unable to start exercise.');
            stopSession();
            stopCamera();
        }
    }, [bootModel, getDemoBaselineAngles, runTrackingLoop, startCamera, stopCamera, stopSession]);

    const handleStopExercise = useCallback(() => {
        stopSession();
        stopCamera();
    }, [stopCamera, stopSession]);

    useEffect(() => {
        return () => {
            stopSession();
            stopCamera();
        };
    }, [stopCamera, stopSession]);

    return (
        <div className="w-full min-h-full flex flex-col gap-6 py-6 px-4 lg:px-8">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-[#c47ea8]/20' : 'bg-[#fff0f5]'}`}>
                    <Activity size={24} className="text-[#c47ea8]" />
                </div>
                <div>
                    <h3 className={`text-2xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Exercise to Improve</h3>
                    <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
                        Mirror the demonstrator pose and get an accuracy score from full-body keypoint matching.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className={`xl:col-span-1 rounded-2xl border p-5 ${isDarkMode ? 'bg-[#0a0a0a]/50 border-[#333]/50' : 'bg-white/70 border-gray-200'} backdrop-blur-md`}>
                    <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Exercises</h4>

                    <div className="space-y-4">
                        {EXERCISES.map(exercise => {
                            const saved = progress?.exerciseProgress?.[exercise.id];
                            const isSelected = activeExerciseId === exercise.id;

                            return (
                                <div
                                    key={exercise.id}
                                    className={`rounded-xl border p-4 transition-colors ${
                                        isSelected
                                            ? isDarkMode
                                                ? 'bg-[#c47ea8]/10 border-[#c47ea8]/40'
                                                : 'bg-[#fff0f5] border-[#c47ea8]/40'
                                            : isDarkMode
                                                ? 'bg-[#141414]/70 border-[#333]'
                                                : 'bg-white border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{exercise.title}</h5>
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exercise.description}</p>
                                        </div>
                                        {saved?.completed && <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />}
                                    </div>

                                    <div className="mt-3 flex items-center gap-3 text-xs">
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Pass target: {exercise.passAccuracy}%</span>
                                        <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>Best: {saved?.bestAccuracy ?? 0}%</span>
                                    </div>

                                    <button
                                        onClick={() => handleStartExercise(exercise)}
                                        disabled={isRunning && isSelected}
                                        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                            isDarkMode
                                                ? 'bg-[#1e1e1e] border-[#333] text-gray-200 hover:bg-[#262626]'
                                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                                    >
                                        <Play size={16} />
                                        {isRunning && isSelected ? 'Running...' : 'Start Exercise'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`xl:col-span-2 rounded-2xl border p-5 ${isDarkMode ? 'bg-[#0a0a0a]/50 border-[#333]/50' : 'bg-white/70 border-gray-200'} backdrop-blur-md`}>
                    {!activeExercise ? (
                        <div className="h-full min-h-[360px] flex items-center justify-center text-center">
                            <div>
                                <Video size={42} className="mx-auto text-[#c47ea8]/70 mb-3" />
                                <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Select an exercise to begin</h4>
                                <p className={`text-sm mt-2 max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    We compare your live keypoints with a demonstration frame and compute accuracy in real time.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{activeExercise.title}</h4>
                                    <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>{activeExercise.description}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`px-3 py-1 rounded-full text-sm border ${isDarkMode ? 'border-[#333] text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                                        Accuracy: <span className="text-[#c47ea8] font-semibold">{currentAccuracy}%</span>
                                    </div>
                                    <button
                                        onClick={handleStopExercise}
                                        className={`px-3 py-1 rounded-full text-sm border flex items-center gap-1 ${isDarkMode ? 'border-[#333] text-gray-300 hover:bg-[#1b1b1b]' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <RotateCcw size={14} />
                                        Stop
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className={`text-xs mb-2 uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Demonstration Video</p>
                                    <video
                                        key={`${activeExercise.id}-${activeExercise.demoSrc}`}
                                        src={activeExercise.demoSrc}
                                        autoPlay
                                        controls
                                        loop
                                        muted
                                        playsInline
                                        className="w-full rounded-xl border border-[#c47ea8]/20 bg-black"
                                    />
                                </div>

                                <div>
                                    <p className={`text-xs mb-2 uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Live Webcam + Keypoints</p>
                                    <div className="w-full rounded-xl overflow-hidden border border-[#c47ea8]/20 bg-black min-h-[220px] flex items-center justify-center">
                                        {isCameraReady ? (
                                            <canvas ref={canvasRef} className="w-full h-full" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <Camera size={26} className="text-[#c47ea8]/70 mx-auto mb-2" />
                                                <p className="text-sm text-gray-300">Camera starts when you launch an exercise</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {modelState === 'loading' && (
                                <p className="text-sm text-[#c47ea8]">Loading pose model...</p>
                            )}

                            {runtimeError && (
                                <div className={`rounded-lg border p-3 text-sm flex items-start gap-2 ${isDarkMode ? 'border-red-500/30 bg-red-500/10 text-red-300' : 'border-red-200 bg-red-50 text-red-700'}`}>
                                    <AlertTriangle size={16} className="mt-0.5" />
                                    <span>{runtimeError}</span>
                                </div>
                            )}

                            {lastResult?.exerciseId === activeExercise.id && (
                                <div className={`rounded-lg border p-3 text-sm ${lastResult.passed ? (isDarkMode ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-700') : (isDarkMode ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' : 'border-amber-200 bg-amber-50 text-amber-700')}`}>
                                    Session completed with <strong>{lastResult.accuracy}%</strong> accuracy.
                                    {lastResult.passed ? ' Great job, this exercise is marked complete.' : ' Retry once more to improve your score.'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <video ref={demoRef} className="hidden" playsInline muted preload="auto" />
            <video ref={webcamRef} className="hidden" playsInline muted />
        </div>
    );
}
