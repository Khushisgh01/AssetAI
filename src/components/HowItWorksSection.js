import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    number: '01',
    icon: '📋',
    title: 'Enter Asset Details',
    description: 'Fill in the key characteristics of the asset — brand, year, location, size, condition, or type — using our intuitive form.',
    color: '#6366f1',
    detail: 'Smart auto-suggestions help you fill fields faster.',
  },
  {
    number: '02',
    icon: '🧠',
    title: 'AI Analyzes Market Data',
    description: 'Our ML models process thousands of real market data points, comparing similar assets, recent trends, and regional factors.',
    color: '#06b6d4',
    detail: 'Trained on 2M+ real transactions.',
  },
  {
    number: '03',
    icon: '💰',
    title: 'Get Instant Prediction',
    description: 'Receive an estimated price in under a second — with a confidence range, price trend, and comparable market listings.',
    color: '#10b981',
    detail: '98% accuracy vs. actual sale prices.',
  },
];

function StepCard({ step, index }) {
  const cardRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const setRef = (el) => { cardRef.current = el; inViewRef(el); };

  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
        { opacity: 1, x: 0, duration: 0.8, delay: index * 0.15, ease: 'power3.out' }
      );
    }
  }, [inView, index]);

  return (
    <Box
      ref={setRef}
      sx={{
        opacity: 0,
        position: 'relative',
        p: 4, borderRadius: '24px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        '&:hover': {
          borderColor: `${step.color}40`,
          transform: 'translateY(-6px)',
        },
      }}
    >
      {/* Background number watermark */}
      <Typography sx={{
        position: 'absolute', right: 16, top: 8,
        fontFamily: "'Syne', sans-serif", fontWeight: 900,
        fontSize: '5rem', color: `${step.color}08`,
        lineHeight: 1, userSelect: 'none',
      }}>
        {step.number}
      </Typography>

      {/* Top accent line */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${step.color}, transparent)`,
        borderRadius: '24px 24px 0 0',
      }} />

      {/* Step badge */}
      <Box sx={{
        display: 'inline-flex', alignItems: 'center', gap: 1,
        px: 1.5, py: 0.4, mb: 2, borderRadius: '100px',
        background: `${step.color}18`, border: `1px solid ${step.color}30`,
      }}>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: step.color, letterSpacing: '0.05em' }}>
          STEP {step.number}
        </Typography>
      </Box>

      {/* Icon */}
      <Box sx={{
        width: 60, height: 60, borderRadius: '18px',
        background: `${step.color}15`, border: `1px solid ${step.color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.8rem', mb: 2.5,
      }}>
        {step.icon}
      </Box>

      <Typography sx={{
        fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: '1.2rem', color: '#e8e8f0', mb: 1.5,
      }}>
        {step.title}
      </Typography>

      <Typography sx={{ fontSize: '0.9rem', color: '#7070a0', lineHeight: 1.7, mb: 2.5 }}>
        {step.description}
      </Typography>

      {/* Detail badge */}
      <Box sx={{
        display: 'inline-flex', alignItems: 'center', gap: 0.75,
        px: 1.5, py: 0.5,
        borderRadius: '8px', background: `${step.color}10`,
      }}>
        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: step.color }} />
        <Typography sx={{ fontSize: '0.75rem', color: step.color, fontWeight: 500 }}>
          {step.detail}
        </Typography>
      </Box>
    </Box>
  );
}

export default function HowItWorksSection() {
  const headRef = useRef(null);
  const { ref: headInView, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const connectorRef = useRef(null);

  const setRef = (el) => { headRef.current = el; headInView(el); };

  useEffect(() => {
    if (inView && headRef.current) {
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [inView]);

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 14 },
        background: 'linear-gradient(180deg, #05050f 0%, #080816 50%, #05050f 100%)',
        position: 'relative',
      }}
    >
      {/* Decorative element */}
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 800, height: 500, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <Box ref={setRef} sx={{ textAlign: 'center', mb: 8, opacity: 0 }}>
          <Typography sx={{
            display: 'inline-block', px: 2, py: 0.5, mb: 2,
            borderRadius: '100px', border: '1px solid rgba(6,182,212,0.3)',
            background: 'rgba(6,182,212,0.08)',
            fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600, letterSpacing: '0.08em',
          }}>
            HOW IT WORKS
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' }, color: '#e8e8f0', mb: 2,
          }}>
            Three steps to your prediction
          </Typography>
          <Typography sx={{ color: '#7070a0', maxWidth: 450, mx: 'auto' }}>
            Our platform makes price prediction simple, fast, and accurate.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={step.number}>
              <StepCard step={step} index={i} />
            </Grid>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 2,
            px: 4, py: 2, borderRadius: '20px',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}>
            <Typography sx={{ fontSize: '0.9rem', color: '#9090b0' }}>
              The entire process takes less than
            </Typography>
            <Typography sx={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem',
              color: '#6366f1',
            }}>
              10 seconds
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', color: '#9090b0' }}>⚡</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}