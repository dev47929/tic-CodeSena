import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star, Menu, X, Heart, Brain, Users, Briefcase, Landmark,
  Activity, Zap, CheckCircle, ArrowRight, ChevronRight
} from 'lucide-react';

/* ─── QR Code SVG placeholder ───────────────────── */
const QRCode = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Top-left finder */}
    <rect x="4" y="4" width="24" height="24" rx="3" fill="#1a1025"/>
    <rect x="8" y="8" width="16" height="16" rx="2" fill="white"/>
    <rect x="11" y="11" width="10" height="10" rx="1" fill="#1a1025"/>
    {/* Top-right finder */}
    <rect x="52" y="4" width="24" height="24" rx="3" fill="#1a1025"/>
    <rect x="56" y="8" width="16" height="16" rx="2" fill="white"/>
    <rect x="59" y="11" width="10" height="10" rx="1" fill="#1a1025"/>
    {/* Bottom-left finder */}
    <rect x="4" y="52" width="24" height="24" rx="3" fill="#1a1025"/>
    <rect x="8" y="56" width="16" height="16" rx="2" fill="white"/>
    <rect x="11" y="59" width="10" height="10" rx="1" fill="#1a1025"/>
    {/* Data modules */}
    <rect x="32" y="4" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="38" y="4" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="4" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="10" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="10" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="38" y="16" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="22" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="22" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="4" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="10" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="16" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="22" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="38" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="50" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="56" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="68" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="74" y="32" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="4" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="16" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="56" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="62" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="74" y="38" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="4" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="10" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="22" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="50" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="62" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="68" y="44" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="50" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="38" y="50" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="56" y="50" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="62" y="50" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="74" y="50" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="56" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="56" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="50" y="56" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="68" y="56" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="62" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="38" y="62" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="56" y="62" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="62" y="62" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="74" y="62" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="68" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="44" y="68" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="50" y="68" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="56" y="68" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="68" y="68" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="32" y="74" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="38" y="74" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="50" y="74" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="62" y="74" width="4" height="4" rx="0.5" fill="#1a1025"/>
    <rect x="74" y="74" width="4" height="4" rx="0.5" fill="#1a1025"/>
  </svg>
);

/* ─── Feature pill card (below hero) ────────────── */
const FeatureCard = ({ icon: Icon, title, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`${color} rounded-[1.75rem] p-5 flex flex-col items-center justify-center text-center aspect-square cursor-pointer group hover:scale-105 transition-transform duration-300`}
  >
    <div className="bg-white/50 p-2.5 rounded-xl mb-2.5 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-[#2d1f3d]" />
    </div>
    <p className="text-[#2d1f3d] font-semibold text-sm leading-tight">{title}</p>
  </motion.div>
);

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const features = [
    { icon: Brain,    title: 'AI Therapist', color: 'bg-[#F5C2D4]' },
    { icon: Users,    title: 'Community',    color: 'bg-[#D8C7F5]' },
    { icon: Briefcase,title: 'Freelancing',  color: 'bg-[#F5DFC2]' },
    { icon: Landmark, title: 'Gov Schemes',  color: 'bg-[#C2F0DF]' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <nav
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 32px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800,
                fontSize: 26,
                color: '#1a1025',
                letterSpacing: '-0.5px',
                fontStyle: 'italic',
              }}
            >
              aadyaCircle
            </span>
          </a>

          {/* Divider */}
          <div style={{ width: 1, height: 22, background: '#d0ccd8', flexShrink: 0 }} className="hidden md:block" />

          {/* Nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1 }} className="hidden md:flex">
            {['About', 'Blog', 'How It Works'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#6b6278',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#1a1025'}
                onMouseLeave={e => e.target.style.color = '#6b6278'}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Get Started */}
          <button
            style={{
              marginLeft: 'auto',
              background: '#2d1f3d',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '10px 24px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.target.style.background = '#1a1025'; e.target.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.target.style.background = '#2d1f3d'; e.target.style.transform = 'none'; }}
            className="hidden md:block"
          >
            Get Started
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
            className="md:hidden"
          >
            {mobileOpen ? <X size={22} color="#1a1025" /> : <Menu size={22} color="#1a1025" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div style={{
            background: 'white', padding: '16px 24px 24px',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {['About', 'Blog', 'How It Works'].map(link => (
              <a key={link} href="#" style={{ color: '#4a3f5c', fontWeight: 500, fontSize: 15, textDecoration: 'none' }}>{link}</a>
            ))}
            <button style={{
              marginTop: 8, background: '#2d1f3d', color: '#fff',
              border: 'none', borderRadius: 999, padding: '12px 0',
              fontWeight: 600, fontSize: 15, cursor: 'pointer',
            }}>
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════
          HERO — soft pink, serif headline
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: 'linear-gradient(160deg, #fce8f0 0%, #f9dde8 40%, #f5d6e4 100%)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '82vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Organic blob decorations */}
        <div style={{
          position: 'absolute', bottom: -80, left: -60,
          width: 420, height: 420,
          background: 'rgba(255,255,255,0.35)',
          borderRadius: '62% 38% 70% 30% / 45% 55% 45% 55%',
          filter: 'blur(2px)',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, right: -40,
          width: 500, height: 380,
          background: 'rgba(255,255,255,0.25)',
          borderRadius: '38% 62% 30% 70% / 55% 45% 55% 45%',
          filter: 'blur(4px)',
        }} />
        <div style={{
          position: 'absolute', top: -100, right: 200,
          width: 300, height: 300,
          background: 'rgba(248,218,232,0.5)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '72px 32px 96px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 64,
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── Left: headline, subtitle, CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 800,
                fontSize: 'clamp(48px, 6vw, 88px)',
                color: '#1a1025',
                lineHeight: 1.08,
                letterSpacing: '-1.5px',
                marginBottom: 24,
              }}
            >
              Small daily rituals.<br />
              Real, lasting change.
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: '#7a6b89',
                lineHeight: 1.65,
                maxWidth: 440,
                marginBottom: 40,
              }}
            >
              A wellness platform for women navigating life transitions — with AI support, community, career tools, and government guidance.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                style={{
                  background: '#2d1f3d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '15px 36px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1a1025'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,31,61,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2d1f3d'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Get Started
              </button>
              <button
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  color: '#2d1f3d',
                  border: '1.5px solid rgba(45,31,61,0.12)',
                  borderRadius: 999,
                  padding: '14px 34px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.9)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.transform = 'none'; }}
              >
                Pricing Plans
              </button>
            </div>
          </motion.div>

          {/* ── Right: white stat card ── */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: 'white',
              borderRadius: 28,
              padding: '32px 28px',
              boxShadow: '0 12px 48px rgba(100,60,120,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              width: 260,
              flexShrink: 0,
            }}
          >
            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 44,
                color: '#1a1025',
                lineHeight: 1,
              }}>4.5</span>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#E8A838" color="#E8A838" style={{ marginTop: 2 }} />
                ))}
              </div>
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13.5,
              color: '#8a7898',
              lineHeight: 1.55,
              marginBottom: 20,
            }}>
              Join 2,000+ women all<br />around the world
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 20 }} />

            {/* QR row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                background: '#f9f6fb',
                borderRadius: 10,
                padding: 6,
                flexShrink: 0,
              }}>
                <QRCode />
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: '#8a7898',
                lineHeight: 1.5,
              }}>
                Scan to download<br />
                <span style={{ fontWeight: 600, color: '#4a3f5c' }}>aadyaCircle app</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom wave fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))',
          pointerEvents: 'none',
        }} />
      </section>

      {/* ══════════════════════════════════════════
          FEATURES STRIP (4 cards below hero)
      ══════════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#c47ea8',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            Everything you need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: '#1a1025',
              textAlign: 'center',
              letterSpacing: '-0.5px',
              marginBottom: 48,
            }}
          >
            Built for every woman's journey
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            maxWidth: 900,
            margin: '0 auto',
          }}>
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DAILY GOAL SECTION
      ══════════════════════════════════════════ */}
      <section style={{
        background: '#faf6fb',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}>
            {/* Left — stacked images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'flex-start' }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                  alt="Woman working"
                  style={{ width: 190, height: 280, borderRadius: 40, objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', transform: 'rotate(-6deg)' }}
                  referrerPolicy="no-referrer"
                />
                <div style={{
                  position: 'absolute', bottom: -12, right: -12,
                  background: 'white', padding: 12, borderRadius: 16,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}>
                  <Brain size={22} color="#c47ea8" />
                </div>
              </div>
              <div style={{ position: 'relative', marginTop: 72 }}>
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400"
                  alt="Women community"
                  style={{ width: 190, height: 280, borderRadius: 40, objectFit: 'cover', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', transform: 'rotate(6deg)' }}
                  referrerPolicy="no-referrer"
                />
                <div style={{
                  position: 'absolute', top: -12, left: -12,
                  background: 'white', padding: 12, borderRadius: 16,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}>
                  <Heart size={22} color="#9b7ec8" />
                </div>
              </div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 52px)',
                color: '#1a1025',
                letterSpacing: '-0.5px',
                marginBottom: 36,
              }}>
                Daily wellness goal
              </h2>

              {/* Animated ring card */}
              <div style={{
                background: 'linear-gradient(135deg, #F5C2D4 0%, #D8C7F5 100%)',
                borderRadius: 40,
                padding: 48,
                marginBottom: 24,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: 160, height: 160, marginBottom: 20 }}>
                    <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="9" />
                      <motion.circle
                        initial={{ strokeDasharray: '0 264' }}
                        whileInView={{ strokeDasharray: '198 264' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: 'easeOut' }}
                        cx="50" cy="50" r="42"
                        fill="none"
                        stroke="white"
                        strokeWidth="9"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>Score</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: 'white', lineHeight: 1 }}>75</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white', fontWeight: 700, fontSize: 15 }}>
                    View details <ChevronRight size={16} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 20, right: 20, width: 8, height: 8, background: 'white', borderRadius: '50%' }} className="animate-pulse" />
                <div style={{ position: 'absolute', bottom: 20, left: 20, width: 12, height: 12, background: 'rgba(255,255,255,0.45)', borderRadius: '50%' }} className="animate-pulse" />
              </div>

              {/* Tip card */}
              <div style={{
                background: 'rgba(245,194,212,0.15)',
                borderRadius: 28,
                padding: 28,
                border: '1px solid rgba(245,194,212,0.5)',
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
              }}>
                <div style={{ background: 'white', padding: 10, borderRadius: 14, flexShrink: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                  <Zap size={18} color="#c47ea8" />
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#c47ea8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Daily Inspiration</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#4a3f5c', lineHeight: 1.55, fontStyle: 'italic' }}>
                    "Every woman carries within her the power to reshape the world."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer style={{ background: '#1a1025', padding: '48px 32px' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 22,
            color: 'white',
            fontStyle: 'italic',
          }}>aadyaCircle</span>
          <div style={{ display: 'flex', gap: 32 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
              >{l}</a>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>© 2026 aadyaCircle. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
