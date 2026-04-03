import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import BorderGlow from '../Generic/BorderGlow';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock signup
        console.log("Signup submitted", credentials);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #fce8f0 0%, #f9dde8 40%, #f5d6e4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
        }}>
            {/* Background Texture similar to Landing */}
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
                                        onChange={e => setCredentials({...credentials, name: e.target.value})}
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
                                        onChange={e => setCredentials({...credentials, email: e.target.value})}
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
                                        onChange={e => setCredentials({...credentials, password: e.target.value})}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    marginTop: '12px', width: '100%', background: '#2d1f3d', color: '#ffffff',
                                    borderRadius: '99px', padding: '16px', fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
                                    border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#1a1025'}
                                onMouseLeave={e => e.currentTarget.style.background = '#2d1f3d'}
                            >
                                Create Account <ArrowRight size={18} />
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
    );
}
