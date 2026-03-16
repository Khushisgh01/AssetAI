import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const footerLinks = {
  'Predictors': ['Car Price', 'Bike Price', 'House Price', 'Land / Plot', 'Gold Price', 'Silver Price', 'Platinum', 'Rental'],
  'Resources': ['How It Works', 'Market Insights', 'API Docs', 'Accuracy Report'],
  'Company': ['About Us', 'Blog', 'Careers', 'Contact'],
};

export default function Footer() {
  const footerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const setRef = (el) => { footerRef.current = el; inViewRef(el); };

  useEffect(() => {
    if (inView && footerRef.current) {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [inView]);

  return (
    <Box
      component="footer"
      ref={setRef}
      sx={{
        opacity: 0,
        background: 'linear-gradient(180deg, #05050f 0%, #080816 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        pt: 8, pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{
                width: 40, height: 40, borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>⚡</Box>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem',
                background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                AssetAI
              </Typography>
            </Box>

            <Typography sx={{ color: '#5050806', fontSize: '0.88rem', lineHeight: 1.7, mb: 3, color: '#505080', maxWidth: 280 }}>
              AI-powered price prediction for cars, houses, land, and precious metals. Make smarter financial decisions with real market data.
            </Typography>

            {/* Social icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <GitHubIcon fontSize="small" />, href: 'https://github.com' },
                { icon: <LinkedInIcon fontSize="small" />, href: '#' },
                { icon: <TwitterIcon fontSize="small" />, href: '#' },
                { icon: <EmailIcon fontSize="small" />, href: 'mailto:hello@assetai.com' },
              ].map((s, i) => (
                <IconButton
                  key={i}
                  href={s.href}
                  target="_blank"
                  sx={{
                    color: '#5050806', width: 38, height: 38, color: '#505080',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    '&:hover': {
                      background: 'rgba(99,102,241,0.12)',
                      color: '#6366f1',
                      borderColor: 'rgba(99,102,241,0.3)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <Grid item xs={6} sm={4} md={2.5} key={section}>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: '0.82rem', color: '#e8e8f0', mb: 2.5,
                letterSpacing: '0.05em',
              }}>
                {section.toUpperCase()}
              </Typography>
              {links.map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href="#"
                  sx={{
                    display: 'block', mb: 1.2,
                    fontSize: '0.85rem', color: '#505080',
                    textDecoration: 'none',
                    '&:hover': { color: '#6366f1' },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.04)' }} />

        {/* Bottom bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ fontSize: '0.78rem', color: '#383858' }}>
            © 2025 AssetAI. All rights reserved. Built with ⚡ React + MUI + GSAP.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((t) => (
              <Typography
                key={t}
                component="a"
                href="#"
                sx={{
                  fontSize: '0.78rem', color: '#383858', textDecoration: 'none',
                  '&:hover': { color: '#6366f1' },
                  transition: 'color 0.2s',
                }}
              >
                {t}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}