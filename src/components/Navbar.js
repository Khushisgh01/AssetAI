import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { gsap } from 'gsap';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Predictors', id: 'categories' },
  { label: 'Market Insights', id: 'insights' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'About', id: 'about' },
];

export default function Navbar({ onGoHome, activePage }) {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Animate nav in on mount
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (activePage !== 'home') { onGoHome(); setTimeout(() => scrollToId(id), 400); }
    else scrollToId(id);
    setDrawerOpen(false);
  };

  const scrollToId = (id) => {
    if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AppBar
        ref={navRef}
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(5,5,15,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(99,102,241,0.15)' : 'none',
          transition: 'all 0.4s ease',
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            onClick={onGoHome}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', flex: 1 }}
          >
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>⚡</Box>
            <Typography variant="h6" sx={{
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem',
              background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              AssetAI
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navItems.map((item) => (
              <NavButton key={item.id} label={item.label} onClick={() => scrollTo(item.id)} />
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}>
            <Button
              variant="contained"
              onClick={() => scrollTo('categories')}
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                px: 3, py: 1, borderRadius: '12px', fontWeight: 600,
                fontSize: '0.85rem',
                '&:hover': { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', transform: 'translateY(-2px)' },
                transition: 'all 0.2s ease',
              }}
            >
              Start Predicting
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#e8e8f0' }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(10,10,30,0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(99,102,241,0.2)',
            p: 3,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: '#6366f1' }}>
            AssetAI
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#9090b0' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <Button
                fullWidth
                onClick={() => scrollTo(item.id)}
                sx={{
                  justifyContent: 'flex-start', color: '#e8e8f0', px: 2, py: 1.5,
                  borderRadius: '10px', fontWeight: 500,
                  '&:hover': { background: 'rgba(99,102,241,0.15)', color: '#6366f1' },
                }}
              >
                {item.label}
              </Button>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 3 }}>
            <Button
              fullWidth variant="contained"
              onClick={() => scrollTo('categories')}
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', py: 1.5,
                fontWeight: 600,
              }}
            >
              Start Predicting
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

// Animated nav button with underline effect
function NavButton({ label, onClick }) {
  const ref = useRef(null);
  const lineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.25, ease: 'power2.out' });
    gsap.to(ref.current, { color: '#6366f1', duration: 0.2 });
  };
  const handleMouseLeave = () => {
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(ref.current, { color: '#9090b0', duration: 0.2 });
  };

  return (
    <Button
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        color: '#9090b0', fontWeight: 500, fontSize: '0.9rem',
        px: 2, position: 'relative', overflow: 'visible',
      }}
    >
      {label}
      <Box
        ref={lineRef}
        sx={{
          position: 'absolute', bottom: 4, left: '50%',
          transform: 'translateX(-50%) scaleX(0)',
          width: '70%', height: '2px',
          background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
          borderRadius: 1, transformOrigin: 'center',
        }}
      />
    </Button>
  );
}