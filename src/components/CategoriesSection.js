import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Button, Chip } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { categories } from '../data/categories';

gsap.registerPlugin(ScrollTrigger);

/* ─── Single category card ─── */
function CategoryCard({ cat, onPredictNow, index }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const iconRef = useRef(null);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const setRefs = (el) => {
    cardRef.current = el;
    inViewRef(el);
  };

  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6,
          delay: (index % 4) * 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, [inView, index]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;

    gsap.to(cardRef.current, {
      rotateX, rotateY,
      transformPerspective: 800,
      duration: 0.3, ease: 'power2.out',
    });

    gsap.to(glowRef.current, {
      background: `radial-gradient(circle at ${x}px ${y}px, ${cat.color}22 0%, transparent 60%)`,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    gsap.to(glowRef.current, { background: 'transparent', duration: 0.3 });
  };

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, { scale: 1.2, rotation: 8, duration: 0.3, ease: 'back.out(2)' });
  };

  const handleIconLeave = () => {
    gsap.to(iconRef.current, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <Box
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { handleMouseLeave(); handleIconLeave(); }}
      onMouseEnter={handleMouseEnter}
      sx={{
        position: 'relative', cursor: 'default',
        borderRadius: '20px', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        p: 3,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        opacity: 0,
        '&:hover': {
          borderColor: `${cat.color}50`,
          boxShadow: `0 20px 60px ${cat.color}18`,
        },
      }}
    >
      {/* Glow layer */}
      <Box ref={glowRef} sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, borderRadius: '20px' }} />

      {/* Top strip */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: cat.gradient, borderRadius: '20px 20px 0 0',
      }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <Box
          ref={iconRef}
          sx={{
            width: 56, height: 56, borderRadius: '16px',
            background: `${cat.color}18`,
            border: `1px solid ${cat.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', mb: 2,
          }}
        >
          {cat.emoji}
        </Box>

        <Typography sx={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: '1.05rem', color: '#e8e8f0', mb: 1,
        }}>
          {cat.label}
        </Typography>

        <Typography sx={{ fontSize: '0.82rem', color: '#7070a0', lineHeight: 1.6, mb: 2.5 }}>
          {cat.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip
            label={`from ${cat.unit}${(cat.basePrice / (cat.unit.includes('/') ? 1 : 100000)).toFixed(cat.basePrice < 1000000 ? 0 : 1)}${cat.basePrice >= 100000 ? 'L' : 'k'}`}
            size="small"
            sx={{
              background: `${cat.color}18`,
              color: cat.color,
              border: `1px solid ${cat.color}30`,
              fontWeight: 600, fontSize: '0.72rem',
            }}
          />
          <Button
            size="small"
            onClick={() => onPredictNow(cat)}
            sx={{
              background: cat.gradient,
              color: '#fff', px: 2, py: 0.7,
              borderRadius: '10px', fontWeight: 600, fontSize: '0.78rem',
              '&:hover': { opacity: 0.85, transform: 'translateX(3px)' },
              transition: 'all 0.2s ease',
            }}
          >
            Predict Now →
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ─── Categories Section ─── */
export default function CategoriesSection({ onPredictNow }) {
  const headingRef = useRef(null);
  const { ref: headInView, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const setRef = (el) => { headingRef.current = el; headInView(el); };

  useEffect(() => {
    if (inView && headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [inView]);

  return (
    <Box id="categories" sx={{ py: { xs: 8, md: 14 }, background: '#05050f', position: 'relative' }}>
      {/* Section glow */}
      <Box sx={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 600, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <Box ref={setRef} sx={{ textAlign: 'center', mb: 8, opacity: 0 }}>
          <Typography sx={{
            display: 'inline-block', px: 2, py: 0.5, mb: 2,
            borderRadius: '100px', border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.08)',
            fontSize: '0.8rem', color: '#6366f1', fontWeight: 600, letterSpacing: '0.08em',
          }}>
            PREDICTION CATEGORIES
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' }, color: '#e8e8f0', mb: 2,
          }}>
            What do you want to predict?
          </Typography>
          <Typography sx={{ color: '#7070a0', fontSize: '1rem', maxWidth: 500, mx: 'auto' }}>
            Choose from 8 asset classes powered by real-time market data and trained ML models.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
              <CategoryCard cat={cat} onPredictNow={onPredictNow} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}