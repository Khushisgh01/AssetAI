import React, { useEffect, useRef } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

/* ─── Floating 3D icons rendered in Three.js ─── */
function FloatingIcon({ position, emoji, color, speed = 1 }) {
  const meshRef = useRef();
  const t = useRef(Math.random() * 100);

  useFrame((_, delta) => {
    t.current += delta * speed;
    meshRef.current.position.y = position[1] + Math.sin(t.current * 0.8) * 0.3;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x = Math.sin(t.current * 0.5) * 0.15;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

function OrbitalRing({ radius, speed }) {
  const ringRef = useRef();
  useFrame((_, delta) => { ringRef.current.rotation.z += delta * speed; });
  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.02, 8, 80]} />
      <meshStandardMaterial color="#6366f1" opacity={0.3} transparent />
    </mesh>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#06b6d4" />

      <FloatingIcon position={[-3.5, 0.5, -2]} color="#6366f1" speed={0.9} />
      <FloatingIcon position={[3.8, -0.5, -1]} color="#eab308" speed={1.1} />
      <FloatingIcon position={[1.2, 1.8, -3]} color="#10b981" speed={0.7} />
      <FloatingIcon position={[-2.5, -1.5, -2]} color="#06b6d4" speed={1.3} />
      <FloatingIcon position={[0, -2, -4]} color="#ec4899" speed={0.8} />
      <FloatingIcon position={[-1, 2.5, -3.5]} color="#f59e0b" speed={1.0} />

      <OrbitalRing radius={4} speed={0.1} />
      <OrbitalRing radius={6} speed={-0.06} />
    </>
  );
}

/* ─── Animated particle background ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#6366f1' : '#06b6d4',
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      ctx.globalAlpha = 1;

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = '#6366f1';
            ctx.globalAlpha = (1 - dist / 100) * 0.12;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}

/* ─── Hero Section ─── */
export default function HeroSection({ onStartPredicting }) {
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');
  }, []);

  const stats = [
    { value: '8+', label: 'Asset Classes' },
    { value: '98%', label: 'Accuracy' },
    { value: '2M+', label: 'Predictions' },
    { value: '< 1s', label: 'Response Time' },
  ];

  return (
    <Box
      sx={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25) 0%, transparent 70%), #05050f',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* 3D canvas background */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Scene3D />
        </Canvas>
      </Box>

      {/* Gradient overlays */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse at center, transparent 30%, #05050f 75%)',
        pointerEvents: 'none',
      }} />

      {/* Hero content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 4, pt: 14, pb: 10 }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center' }}>

          {/* Badge */}
          <Box
            ref={badgeRef}
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1,
              px: 2, py: 0.75, mb: 4, borderRadius: '100px',
              border: '1px solid rgba(99,102,241,0.4)',
              background: 'rgba(99,102,241,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
            <Typography sx={{ fontSize: '0.8rem', color: '#9090b0', fontWeight: 500 }}>
              Powered by Machine Learning • Real-time Market Data
            </Typography>
          </Box>

          {/* Main heading */}
          <Typography
            ref={headingRef}
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-0.02em',
            }}
          >
            <Box component="span" sx={{ color: '#e8e8f0' }}>AI-Powered </Box>
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'shimmer 4s linear infinite',
              }}
            >
              Asset Price
            </Box>
            <br />
            <Box component="span" sx={{ color: '#e8e8f0' }}>Predictor</Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            ref={subtitleRef}
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: '#9090b0',
              lineHeight: 1.7,
              mb: 5,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Predict market prices of cars, houses, land, and precious metals instantly using machine learning. Make smarter financial decisions with data-driven insights.
          </Typography>

          {/* CTA Buttons */}
          <Box
            ref={buttonsRef}
            sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 8 }}
          >
            <HeroButton
              primary
              onClick={onStartPredicting}
              label="Start Predicting →"
            />
            <HeroButton
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              label="Explore Categories"
            />
          </Box>

          {/* Stats bar */}
          <Box
            ref={statsRef}
            sx={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
              gap: { xs: 3, md: 6 },
            }}
          >
            {stats.map((s) => (
              <Box key={s.label} sx={{ textAlign: 'center' }}>
                <Typography sx={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  background: 'linear-gradient(135deg, #e8e8f0, #9090b0)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>{s.value}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#6060a0', fontWeight: 500, letterSpacing: '0.05em' }}>
                  {s.label.toUpperCase()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box sx={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
        opacity: 0.5,
      }}>
        <Typography sx={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#6060a0' }}>SCROLL</Typography>
        <Box sx={{
          width: 1, height: 40,
          background: 'linear-gradient(to bottom, #6366f1, transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </Box>

      <style>{`
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes scrollPulse { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.4)} }
      `}</style>
    </Box>
  );
}

function HeroButton({ primary, onClick, label }) {
  const ref = useRef(null);

  const handleEnter = () => {
    gsap.to(ref.current, { scale: 1.06, y: -3, duration: 0.2, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(ref.current, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <Button
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      variant={primary ? 'contained' : 'outlined'}
      sx={{
        px: 4, py: 1.6, fontSize: '1rem', fontWeight: 600, borderRadius: '14px',
        ...(primary ? {
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          boxShadow: '0 0 30px rgba(99,102,241,0.35)',
          '&:hover': { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' },
        } : {
          borderColor: 'rgba(99,102,241,0.4)', color: '#e8e8f0',
          '&:hover': { borderColor: '#6366f1', background: 'rgba(99,102,241,0.08)' },
        }),
      }}
    >
      {label}
    </Button>
  );
}