import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, AtSign, ArrowRight, Loader2, Camera, Check } from 'lucide-react';
import BorderGlow from '../Generic/BorderGlow';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: '', username: '', email: '', password: '', role: 'user' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://app.totalchaos.online/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                    handle: credentials.username,
                    name: credentials.name,
                    role: credentials.role || 'user',
                })
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error("Signup failed: " + text);
            }

            const data = await response.json();
            console.log("Signup successful", data);
            navigate('/login'); // Redirect to login on success
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    // --- FACE API LOGIC ---
    const videoRef = useRef();
    const [verifying, setVerifying] = useState(false);
    const [faceStatus, setFaceStatus] = useState('Initializing camera...');

    const cameraStreamRef = useRef(null);

    useEffect(() => {
        startVideo();

        return () => {
            if (cameraStreamRef.current) {
                cameraStreamRef.current.getTracks().forEach(track => track.stop());
                cameraStreamRef.current = null;
            }
        };
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => { 
                cameraStreamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream; 
                    setFaceStatus('Ready. Look at the camera and click verify.');
                }
            })
            .catch((err) => {
                console.error(err);
                setFaceStatus('Camera access denied');
            });
    }

    const handleVerifyFace = async () => {
        if (!videoRef.current) return;
        setVerifying(true);
        setFaceStatus('Analyzing face...');

        try {
            // Capture frame for external API verification.
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
            
            const imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
            
            const formData = new FormData();
            formData.append('file', imageBlob, 'capture.jpg');

            // External classification API hit.
            try {
                const response = await fetch('https://ai.totalchaos.online/classify', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const data = await response.json();

                if (data) {
                    const strData = JSON.stringify(data).toLowerCase();
                    if (strData.includes('female')) {
                        setCredentials(prev => ({ ...prev, role: 'womanlancer' }));
                        setFaceStatus('Verified as female');
                    } else if (strData.includes('male')) {
                        setCredentials(prev => ({ ...prev, role: 'user' }));
                        setFaceStatus('Verified as male');
                    } else {
                        setFaceStatus('Face captured. Could not determine gender, default role kept.');
                    }
                }
                                
            } catch (e) {
                console.error("Classification Request Failed", e);
                setFaceStatus('Verification service unavailable. Try again.');
            }

        } catch (error) {
            console.error(error);
            setFaceStatus('Verification failed');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden' }}>
            
            {/* LEFT HALF - FACE VERIFICATION */}
            <div className="hidden lg:flex w-1/2 relative bg-[#1a1025] flex-col items-center justify-center p-12 text-white">
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.1, pointerEvents: 'none'
                }} />
                
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, marginBottom: 16 }}>
                    Identity Verification
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", color: '#9b8ba9', marginBottom: 40, textAlign: 'center', maxWidth: 400 }}>
                    We use facial recognition to ensure an authentic community environment. Please align your face and verify.
                </p>

                <div style={{
                    position: 'relative', width: 400, height: 400, borderRadius: '50%', overflow: 'hidden',
                    border: '4px solid #c47ea8', boxShadow: '0 0 40px rgba(196, 126, 168, 0.3)',
                    marginBottom: 32, background: '#000'
                }}>
                    <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 10 }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#f5d6e4' }}>
                        {faceStatus}
                    </p>

                    <button
                        type="button"
                        onClick={handleVerifyFace}
                        disabled={verifying}
                        style={{
                            background: '#c47ea8', color: '#1a1025', borderRadius: 99, padding: '14px 32px',
                            fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700,
                            display: 'flex', alignItems: 'center', gap: 8, border: 'none', cursor: verifying ? 'not-allowed' : 'pointer',
                            opacity: verifying ? 0.7 : 1, transition: 'transform 0.2s', boxShadow: '0 4px 20px rgba(196,126,168,0.4)'
                        }}
                    >
                        {verifying ? <Loader2 className="animate-spin" size={20} /> : <Camera size={20} />}
                        {verifying ? 'Scanning...' : 'Verify Gender'}
                    </button>
                    {credentials.role && (
                       <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#8ce99a', marginTop: 8, fontWeight: 600 }}>
                           <Check size={18} /> Assigned Role: {credentials.role}
                       </div>
                    )}
                </div>
            </div>

            {/* RIGHT HALF - SIGNUP FORM */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative"
                 style={{ background: 'linear-gradient(160deg, #fce8f0 0%, #f9dde8 40%, #f5d6e4 100%)' }}>
                
                {/* Background Texture */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.15, pointerEvents: 'none'
                }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 10 }}
            >
                {/* Logo top center hidden behind glow until hovered, or maybe separated? Let's separate it! */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: '#1a1025' }}>
                            aadya<span style={{ fontWeight: 400, fontStyle: 'italic' }}>Circle</span>
                        </span>
                    </Link>
                </div>

                <BorderGlow
                    backgroundColor="#ffffff"
                    glowColor="330 80 70"
                    animated={true}
                    className="w-full rounded-[2rem] shadow-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-500"
                >
                    <div style={{
                        padding: '48px 36px',
                        background: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(16px)',
                        height: '100%'
                    }}>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#2d1f3d', marginBottom: '8px', textAlign: 'center', letterSpacing: '-0.5px' }}>
                            Join the circle
                        </h1>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#7a6b89', textAlign: 'center', marginBottom: '36px' }}>
                            Create your account and start your journey.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c', marginBottom: 8 }}>Assigned Role</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        readOnly
                                        value={credentials.role || 'Pending face verification...'}
                                        style={{
                                            width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid rgba(45,31,61,0.1)',
                                            background: 'rgba(45,31,61,0.03)', fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#4a3f5c',
                                            outline: 'none', cursor: 'not-allowed'
                                        }}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c', marginBottom: 8 }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} color="#9b8ba9" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Maya Sharma"
                                        style={{
                                            width: '100%', padding: '14px 16px 14px 44px',
                                            borderRadius: '12px', border: '1px solid rgba(155,139,169,0.3)',
                                            background: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: 15,
                                            color: '#2d1f3d', outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        onChange={e => setCredentials({ ...credentials, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c', marginBottom: 8 }}>Username</label>
                                <div style={{ position: 'relative' }}>
                                    <AtSign size={18} color="#9b8ba9" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text"
                                        required
                                        placeholder="mayasharma23"
                                        style={{
                                            width: '100%', padding: '14px 16px 14px 44px',
                                            borderRadius: '12px', border: '1px solid rgba(155,139,169,0.3)',
                                            background: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: 15,
                                            color: '#2d1f3d', outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c', marginBottom: 8 }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} color="#9b8ba9" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        style={{
                                            width: '100%', padding: '14px 16px 14px 44px',
                                            borderRadius: '12px', border: '1px solid rgba(155,139,169,0.3)',
                                            background: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: 15,
                                            color: '#2d1f3d', outline: 'none', transition: 'border-color 0.2s'
                                        }}
                                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#4a3f5c', marginBottom: 8 }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} color="#9b8ba9" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        style={{
                                            width: '100%', padding: '14px 16px 14px 44px',
                                            borderRadius: '12px', border: '1px solid rgba(155,139,169,0.3)',
                                            background: '#ffffff', fontFamily: "'Inter', sans-serif", fontSize: 15,
                                            color: '#2d1f3d', outline: 'none'
                                        }}
                                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{ color: '#e03131', fontSize: 14, fontFamily: "'Inter', sans-serif", textAlign: 'center', background: '#ffe3e3', padding: '10px', borderRadius: '8px', border: '1px solid #ffa8a8' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    marginTop: '8px', width: '100%', background: '#2d1f3d', color: '#ffffff',
                                    borderRadius: '99px', padding: '16px', fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
                                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                                    transition: 'background 0.2s', opacity: loading ? 0.7 : 1
                                }}
                                onMouseEnter={e => !loading && (e.currentTarget.style.background = '#1a1025')}
                                onMouseLeave={e => !loading && (e.currentTarget.style.background = '#2d1f3d')}
                            >
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={18} /></>}
                            </button>
                        </form>

                        <p style={{ marginTop: '32px', fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#7a6b89', textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ fontWeight: 700, color: '#c47ea8', textDecoration: 'none' }}>Sign in here</Link>
                        </p>
                    </div>
                </BorderGlow>
            </motion.div>
            </div>
        </div>
    );
}
