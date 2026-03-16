import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Chip, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const skills = [
  'Machine Learning', 'Python', 'React.js', 'Data Science', 'JavaScript', 'Express.js', 'Node.js',
];

const highlights = [
  {
    icon: <SchoolIcon sx={{ fontSize: 18 }} />,
    label: 'B.Tech CSE (AI)',
    sub: 'Indira Gandhi Delhi Technical University for Women',
    color: '#6366f1',
  },
  {
    icon: <CodeIcon sx={{ fontSize: 18 }} />,
    label: '2nd Year Student',
    sub: 'Currently exploring full-stack & AI development',
    color: '#06b6d4',
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 18 }} />,
    label: 'AI Enthusiast',
    sub: 'Building real-world ML-powered applications',
    color: '#10b981',
  },
];

export default function AboutSection() {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const cardRefs = useRef([]);

  const { ref: sectionInView, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const { ref: imgInView, inView: imgVisible } = useInView({ threshold: 0.2, triggerOnce: true });

  const setSectionRef = (el) => { sectionInView(el); };
  const setImgRef = (el) => { imgRef.current = el; imgInView(el); };

  useEffect(() => {
    if (inView && textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(cardRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
      );
    }
  }, [inView]);

  useEffect(() => {
    if (imgVisible && imgRef.current) {
      gsap.fromTo(imgRef.current,
        { opacity: 0, x: -60, scale: 0.92 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      );
    }
  }, [imgVisible]);

  // Floating animation on the photo
  useEffect(() => {
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        y: -10, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
    }
  }, []);

  return (
    <Box
      id="about"
      ref={setSectionRef}
      sx={{
        py: { xs: 8, md: 14 },
        background: 'linear-gradient(180deg, #05050f 0%, #08081a 50%, #05050f 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background glows */}
      <Box sx={{
        position: 'absolute', top: '20%', left: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        {/* Section label */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography sx={{
            display: 'inline-block', px: 2, py: 0.5, mb: 2,
            borderRadius: '100px', border: '1px solid rgba(99,102,241,0.3)',
            background: 'rgba(99,102,241,0.08)',
            fontSize: '0.8rem', color: '#6366f1', fontWeight: 600, letterSpacing: '0.08em',
          }}>
            ABOUT THE DEVELOPER
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' }, color: '#e8e8f0',
          }}>
            Behind the code
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          {/* ── Left: Photo ── */}
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              ref={setImgRef}
              sx={{ opacity: 0, position: 'relative', display: 'inline-block' }}
            >
              {/* Outer glow ring */}
              <Box sx={{
                position: 'absolute', inset: -3,
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4, #10b981)',
                zIndex: 0,
                filter: 'blur(1px)',
              }} />

              {/* Photo */}
              <Box
                component="img"
                src="/khushiii.jpeg"
                alt="Khushi"
                sx={{
                  position: 'relative', zIndex: 1,
                  width: { xs: 240, sm: 280, md: 320 },
                  height: { xs: 240, sm: 280, md: 320 },
                  objectFit: 'cover',
                  borderRadius: '26px',
                  display: 'block',
                  border: '3px solid #05050f',
                }}
                onError={(e) => {
                  // Fallback avatar if image not found
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />

              {/* Fallback avatar (shown if image missing) */}
              <Box sx={{
                display: 'none',
                position: 'relative', zIndex: 1,
                width: { xs: 240, sm: 280, md: 320 },
                height: { xs: 240, sm: 280, md: 320 },
                borderRadius: '26px',
                border: '3px solid #05050f',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
                alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 1,
              }}>
                <Typography sx={{ fontSize: '5rem' }}>👩‍💻</Typography>
                <Typography sx={{ color: '#6366f1', fontWeight: 600, fontSize: '0.9rem' }}>
                  Add profile.jpg to /public
                </Typography>
              </Box>

              {/* Floating badge — University */}
              <Box sx={{
                position: 'absolute', bottom: -18, left: -18, zIndex: 2,
                px: 2, py: 1, borderRadius: '14px',
                background: 'rgba(10,10,30,0.95)',
                border: '1px solid rgba(99,102,241,0.35)',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', gap: 1,
                boxShadow: '0 8px 32px rgba(99,102,241,0.2)',
              }}>
                <Typography sx={{ fontSize: '1.1rem' }}>🎓</Typography>
                <Box>
                  <Typography sx={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 700, lineHeight: 1.2 }}>
                    IGDTUW
                  </Typography>
                  <Typography sx={{ fontSize: '0.65rem', color: '#7070a0', lineHeight: 1.2 }}>
                    New Delhi
                  </Typography>
                </Box>
              </Box>

              {/* Floating badge — AI */}
              <Box sx={{
                position: 'absolute', top: -16, right: -16, zIndex: 2,
                px: 2, py: 1, borderRadius: '14px',
                background: 'rgba(10,10,30,0.95)',
                border: '1px solid rgba(6,182,212,0.35)',
                backdropFilter: 'blur(12px)',
                display: 'flex', alignItems: 'center', gap: 1,
                boxShadow: '0 8px 32px rgba(6,182,212,0.2)',
              }}>
                <Typography sx={{ fontSize: '1rem' }}>🤖</Typography>
                <Typography sx={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 700 }}>
                  CSEAI'28
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ── Right: Info ── */}
          <Grid item xs={12} md={7}>
            <Box ref={textRef} sx={{ opacity: 0 }}>
              {/* Name & title */}
              <Typography sx={{
                fontFamily: "'Syne', sans-serif", fontWeight: 900,
                fontSize: { xs: '2.4rem', md: '3rem' },
                lineHeight: 1.1, mb: 0.5,
                background: 'linear-gradient(135deg, #e8e8f0 40%, #9090b0 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Khushi
              </Typography>

              <Typography sx={{
                fontFamily: "'Syne', sans-serif",
                fontSize: { xs: '1rem', md: '1.15rem' },
                fontWeight: 600, mb: 3,
                background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                B.Tech CSE (AI) · 2nd Year · IGDTUW
              </Typography>

              <Typography sx={{
                color: '#7070a0', fontSize: '0.95rem',
                lineHeight: 1.8, mb: 4, maxWidth: 500,
              }}>
                A passionate developer and AI enthusiast building intelligent, 
                real-world applications. Currently exploring the intersection of 
                machine learning and modern web development — this platform is one 
                such project.
              </Typography>

              {/* Highlight cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                {highlights.map((h, i) => (
                  <Box
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    sx={{
                      opacity: 0,
                      display: 'flex', alignItems: 'center', gap: 2,
                      p: 1.5, borderRadius: '14px',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'border-color 0.3s, background 0.3s',
                      '&:hover': {
                        borderColor: `${h.color}35`,
                        background: `${h.color}08`,
                      },
                    }}
                  >
                    <Box sx={{
                      width: 38, height: 38, borderRadius: '10px', flexShrink: 0,
                      background: `${h.color}18`, border: `1px solid ${h.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: h.color,
                    }}>
                      {h.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: '#e8e8f0', lineHeight: 1.3 }}>
                        {h.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#6060a0', lineHeight: 1.4 }}>
                        {h.sub}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Skills */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      background: 'rgba(99,102,241,0.1)',
                      color: '#9090c0',
                      border: '1px solid rgba(99,102,241,0.2)',
                      fontWeight: 500, fontSize: '0.75rem',
                      borderRadius: '8px',
                      '&:hover': {
                        background: 'rgba(99,102,241,0.2)',
                        color: '#a5b4fc',
                        borderColor: 'rgba(99,102,241,0.5)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Box>

              {/* Social links */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography sx={{ fontSize: '0.8rem', color: '#4040607', color: '#404060', mr: 1 }}>
                  Connect with me
                </Typography>
                <SocialButton
                  href="https://github.com/Khushisgh01"
                  icon={<GitHubIcon />}
                  label="GitHub"
                  color="#e8e8f0"
                  hoverColor="#6366f1"
                />
                <SocialButton
                  href="https://www.linkedin.com/in/khushi-260785323/"
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                  color="#e8e8f0"
                  hoverColor="#06b6d4"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function SocialButton({ href, icon, label, color, hoverColor }) {
  const ref = useRef(null);

  const handleEnter = () => {
    gsap.to(ref.current, { y: -4, scale: 1.05, duration: 0.2, ease: 'power2.out' });
  };
  const handleLeave = () => {
    gsap.to(ref.current, { y: 0, scale: 1, duration: 0.25, ease: 'power2.out' });
  };

  return (
    <Box
      ref={ref}
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      sx={{
        display: 'flex', alignItems: 'center', gap: 1,
        px: 2.5, py: 1, borderRadius: '12px', textDecoration: 'none',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.03)',
        color: color,
        fontSize: '0.85rem', fontWeight: 600,
        '&:hover': {
          borderColor: `${hoverColor}50`,
          background: `${hoverColor}10`,
          color: hoverColor,
        },
        transition: 'all 0.2s ease',
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 18 } })}
      {label}
    </Box>
  );
}