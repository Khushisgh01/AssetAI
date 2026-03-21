// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Typography, Container, Grid, TextField,
//   Select, MenuItem, FormControl, InputLabel,
//   Button, Chip, CircularProgress, LinearProgress,
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import { gsap } from 'gsap';

// /* ─── Simulated AI prediction ─── */
// function simulatePrediction(category, formData) {
//   const base = category.basePrice;
//   // Add some variance based on form data
//   let multiplier = 1;
//   if (formData.condition === 'Excellent') multiplier *= 1.12;
//   if (formData.condition === 'Poor') multiplier *= 0.75;
//   if (formData.furnishing === 'Fully Furnished') multiplier *= 1.15;
//   if (formData.year) {
//     const age = new Date().getFullYear() - parseInt(formData.year || new Date().getFullYear());
//     multiplier *= Math.max(0.5, 1 - age * 0.05);
//   }
//   if (formData.area) multiplier *= Math.min(2, parseInt(formData.area) / 1000);

//   const price = Math.round(base * multiplier * (0.9 + Math.random() * 0.2));
//   const low = Math.round(price * 0.88);
//   const high = Math.round(price * 1.12);
//   const confidence = Math.floor(91 + Math.random() * 7);

//   return { price, low, high, confidence };
// }

// function formatPrice(num, unit) {
//   if (unit === '₹' || unit === '₹/month') {
//     if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
//     if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
//     return `₹${num.toLocaleString('en-IN')}`;
//   }
//   return `${unit} ${num.toLocaleString('en-IN')}`;
// }

// /* ─── Animated result card ─── */
// function ResultCard({ result, category }) {
//   const cardRef = useRef(null);
//   const priceRef = useRef(null);
//   const barRef = useRef(null);

//   useEffect(() => {
//     if (!result) return;
//     const tl = gsap.timeline();
//     tl.fromTo(cardRef.current,
//       { opacity: 0, scale: 0.9, y: 30 },
//       { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
//     );
//     // Animate price counter
//     const obj = { val: 0 };
//     tl.to(obj, {
//       val: result.price,
//       duration: 1.5,
//       ease: 'power2.out',
//       onUpdate: () => {
//         if (priceRef.current) {
//           priceRef.current.textContent = formatPrice(Math.round(obj.val), category.unit);
//         }
//       },
//     }, '-=0.3');
//     // Animate confidence bar
//     tl.fromTo(barRef.current,
//       { scaleX: 0 },
//       { scaleX: result.confidence / 100, duration: 1, ease: 'power3.out', transformOrigin: 'left' },
//       '-=1'
//     );
//   }, [result, category.unit]);

//   if (!result) return null;

//   return (
//     <Box
//       ref={cardRef}
//       sx={{
//         opacity: 0,
//         mt: 4, p: 4, borderRadius: '24px',
//         background: `linear-gradient(135deg, ${category.color}12 0%, rgba(0,0,0,0) 100%)`,
//         border: `1px solid ${category.color}40`,
//         position: 'relative', overflow: 'hidden',
//       }}
//     >
//       {/* Decorative glow */}
//       <Box sx={{
//         position: 'absolute', top: -40, right: -40,
//         width: 200, height: 200, borderRadius: '50%',
//         background: `radial-gradient(circle, ${category.color}20 0%, transparent 70%)`,
//         pointerEvents: 'none',
//       }} />

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//         <Box sx={{
//           width: 40, height: 40, borderRadius: '12px',
//           background: `${category.color}20`,
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           <TrendingUpIcon sx={{ color: category.color, fontSize: 20 }} />
//         </Box>
//         <Typography sx={{
//           fontFamily: "'Syne', sans-serif", fontWeight: 700,
//           fontSize: '1rem', color: '#e8e8f0',
//         }}>
//           AI Prediction Result
//         </Typography>
//         <Chip
//           label={`${result.confidence}% Confidence`}
//           size="small"
//           sx={{
//             ml: 'auto',
//             background: 'rgba(16,185,129,0.12)',
//             color: '#10b981', border: '1px solid rgba(16,185,129,0.25)',
//             fontWeight: 600, fontSize: '0.72rem',
//           }}
//         />
//       </Box>

//       {/* Main price */}
//       <Typography
//         ref={priceRef}
//         sx={{
//           fontFamily: "'Syne', sans-serif", fontWeight: 900,
//           fontSize: { xs: '2.5rem', md: '3.5rem' },
//           background: `linear-gradient(135deg, ${category.color}, #06b6d4)`,
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
//           lineHeight: 1, mb: 1,
//         }}
//       >
//         {formatPrice(0, category.unit)}
//       </Typography>

//       <Typography sx={{ fontSize: '0.8rem', color: '#7070a0', mb: 3 }}>
//         Estimated Market Price
//       </Typography>

//       {/* Range */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         {[
//           { label: 'Low Estimate', val: result.low, color: '#f59e0b' },
//           { label: 'High Estimate', val: result.high, color: '#10b981' },
//         ].map((r) => (
//           <Grid item xs={6} key={r.label}>
//             <Box sx={{
//               p: 2, borderRadius: '14px',
//               background: 'rgba(255,255,255,0.03)',
//               border: '1px solid rgba(255,255,255,0.06)',
//             }}>
//               <Typography sx={{ fontSize: '0.72rem', color: '#6060a0', mb: 0.5 }}>{r.label}</Typography>
//               <Typography sx={{ fontWeight: 700, color: r.color, fontFamily: "'Syne', sans-serif" }}>
//                 {formatPrice(r.val, category.unit)}
//               </Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Confidence bar */}
//       <Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//           <Typography sx={{ fontSize: '0.72rem', color: '#7070a0' }}>Model Confidence</Typography>
//           <Typography sx={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>{result.confidence}%</Typography>
//         </Box>
//         <Box sx={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
//           <Box
//             ref={barRef}
//             sx={{
//               height: '100%', borderRadius: 3,
//               background: 'linear-gradient(90deg, #6366f1, #10b981)',
//               transformOrigin: 'left',
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Disclaimer */}
//       <Typography sx={{ fontSize: '0.7rem', color: '#4040607', mt: 2.5, color: '#404060' }}>
//         * This is an AI-generated estimate based on market data. Consult a certified appraiser for official valuation.
//       </Typography>
//     </Box>
//   );
// }

// /* ─── Main Prediction Page ─── */
// export default function PredictionPage({ category, onBack }) {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [loadingProgress, setLoadingProgress] = useState(0);
//   const pageRef = useRef(null);
//   const formRef = useRef(null);

//   useEffect(() => {
//     gsap.fromTo(pageRef.current,
//       { opacity: 0, y: 30 },
//       { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
//     );
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePredict = async () => {
//     setLoading(true);
//     setResult(null);
//     setLoadingProgress(0);

//     // Simulate staged loading
//     const stages = [
//       { pct: 20, delay: 300, msg: 'Analyzing asset details...' },
//       { pct: 50, delay: 700, msg: 'Querying market database...' },
//       { pct: 80, delay: 1100, msg: 'Running ML model...' },
//       { pct: 100, delay: 1500, msg: 'Generating prediction...' },
//     ];

//     for (const stage of stages) {
//       await new Promise((r) => setTimeout(r, stage.delay));
//       setLoadingProgress(stage.pct);
//     }

//     await new Promise((r) => setTimeout(r, 400));
//     setResult(simulatePrediction(category, formData));
//     setLoading(false);
//   };

//   const isFormFilled = category.fields.slice(0, 2).every((f) => formData[f.name]);

//   return (
//     <Box
//       ref={pageRef}
//       sx={{
//         minHeight: '100vh',
//         background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), #05050f',
//         pt: 12, pb: 10,
//         opacity: 0,
//       }}
//     >
//       <Container maxWidth="md">
//         {/* Back button */}
//         <Button
//           startIcon={<ArrowBackIcon />}
//           onClick={onBack}
//           sx={{
//             color: '#9090b0', mb: 4, px: 2, py: 1, borderRadius: '10px',
//             '&:hover': { background: 'rgba(99,102,241,0.1)', color: '#6366f1' },
//           }}
//         >
//           Back to Home
//         </Button>

//         {/* Page header */}
//         <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
//           <Box sx={{
//             width: 64, height: 64, borderRadius: '20px',
//             background: `${category.color}18`, border: `1px solid ${category.color}30`,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: '2rem',
//           }}>
//             {category.emoji}
//           </Box>
//           <Box>
//             <Typography variant="h4" sx={{ fontWeight: 800, color: '#e8e8f0', mb: 0.5 }}>
//               {category.label}
//             </Typography>
//             <Typography sx={{ color: '#7070a0', fontSize: '0.9rem' }}>
//               Fill in the details below for an instant AI price estimate.
//             </Typography>
//           </Box>
//         </Box>

//         {/* Form card */}
//         <Box
//           ref={formRef}
//           sx={{
//             p: { xs: 3, md: 4 }, borderRadius: '24px',
//             background: 'rgba(255,255,255,0.025)',
//             border: '1px solid rgba(255,255,255,0.06)',
//             backdropFilter: 'blur(12px)',
//           }}
//         >
//           <Typography sx={{
//             fontFamily: "'Syne', sans-serif", fontWeight: 700, mb: 3,
//             fontSize: '1rem', color: '#e8e8f0',
//           }}>
//             Asset Details
//           </Typography>

//           <Grid container spacing={2.5}>
//             {category.fields.map((field) => (
//               <Grid item xs={12} sm={6} key={field.name}>
//                 {field.type === 'select' ? (
//                   <FormControl fullWidth>
//                     <InputLabel sx={{ color: '#7070a0' }}>{field.label}</InputLabel>
//                     <Select
//                       name={field.name}
//                       value={formData[field.name] || ''}
//                       onChange={handleChange}
//                       label={field.label}
//                       sx={{
//                         borderRadius: '12px',
//                         '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.25)' },
//                         '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.5)' },
//                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
//                         color: '#e8e8f0',
//                         '& .MuiSvgIcon-root': { color: '#7070a0' },
//                       }}
//                       MenuProps={{
//                         PaperProps: {
//                           sx: {
//                             background: '#0d0d24', border: '1px solid rgba(99,102,241,0.2)',
//                             borderRadius: '12px', mt: 0.5,
//                             '& .MuiMenuItem-root': {
//                               color: '#e8e8f0', fontSize: '0.9rem',
//                               '&:hover': { background: 'rgba(99,102,241,0.12)' },
//                               '&.Mui-selected': { background: 'rgba(99,102,241,0.2)' },
//                             },
//                           },
//                         },
//                       }}
//                     >
//                       {field.options.map((opt) => (
//                         <MenuItem key={opt} value={opt}>{opt}</MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 ) : (
//                   <TextField
//                     fullWidth
//                     name={field.name}
//                     label={field.label}
//                     type={field.type}
//                     placeholder={field.placeholder}
//                     value={formData[field.name] || ''}
//                     onChange={handleChange}
//                     InputLabelProps={{ sx: { color: '#7070a0' } }}
//                     InputProps={{ sx: { color: '#e8e8f0' } }}
//                   />
//                 )}
//               </Grid>
//             ))}
//           </Grid>

//           {/* Loading state */}
//           {loading && (
//             <Box sx={{ mt: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
//                 <CircularProgress size={16} sx={{ color: '#6366f1' }} />
//                 <Typography sx={{ fontSize: '0.82rem', color: '#7070a0' }}>
//                   {loadingProgress < 30 ? 'Analyzing asset details...'
//                     : loadingProgress < 60 ? 'Querying market database...'
//                     : loadingProgress < 90 ? 'Running ML model...'
//                     : 'Generating prediction...'}
//                 </Typography>
//                 <Typography sx={{ ml: 'auto', fontSize: '0.82rem', color: '#6366f1', fontWeight: 600 }}>
//                   {loadingProgress}%
//                 </Typography>
//               </Box>
//               <LinearProgress
//                 variant="determinate"
//                 value={loadingProgress}
//                 sx={{
//                   borderRadius: 4, height: 6,
//                   background: 'rgba(99,102,241,0.12)',
//                   '& .MuiLinearProgress-bar': {
//                     background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
//                     borderRadius: 4,
//                   },
//                 }}
//               />
//             </Box>
//           )}

//           {/* Submit button */}
//           <Box sx={{ mt: 4 }}>
//             <PredictButton
//               onClick={handlePredict}
//               loading={loading}
//               disabled={!isFormFilled || loading}
//               color={category.color}
//               gradient={category.gradient}
//             />
//           </Box>
//         </Box>

//         {/* Result */}
//         {result && <ResultCard result={result} category={category} />}
//       </Container>
//     </Box>
//   );
// }

// function PredictButton({ onClick, loading, disabled, color, gradient }) {
//   const ref = useRef(null);

//   const handleEnter = () => {
//     if (disabled) return;
//     gsap.to(ref.current, { scale: 1.03, y: -3, duration: 0.2, ease: 'power2.out' });
//   };
//   const handleLeave = () => {
//     gsap.to(ref.current, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' });
//   };

//   return (
//     <Button
//       ref={ref}
//       fullWidth
//       onClick={onClick}
//       disabled={disabled}
//       onMouseEnter={handleEnter}
//       onMouseLeave={handleLeave}
//       sx={{
//         background: disabled ? 'rgba(255,255,255,0.06)' : gradient,
//         color: disabled ? '#4040607' : '#fff',
//         py: 1.8, fontSize: '1rem', fontWeight: 700,
//         borderRadius: '14px',
//         boxShadow: disabled ? 'none' : `0 0 30px ${color}35`,
//         '&:hover': { opacity: 0.9 },
//         '&.Mui-disabled': { color: '#404060' },
//         transition: 'all 0.2s ease',
//       }}
//     >
//       {loading ? (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//           <CircularProgress size={18} sx={{ color: '#fff' }} />
//           Analyzing with AI...
//         </Box>
//       ) : (
//         '⚡ Predict Price Now'
//       )}
//     </Button>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Container, Grid, TextField,
  Select, MenuItem, FormControl, InputLabel,
  Button, Chip, CircularProgress, LinearProgress, Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { gsap } from 'gsap';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/* ─── Price formatter ─── */
function formatPrice(num, unit) {
  if (unit === '₹' || unit === '₹/month') {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000)   return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return `${unit} ${num.toLocaleString('en-IN')}`;
}

/* ─── Animated result card ─── */
function ResultCard({ result, category }) {
  const cardRef  = useRef(null);
  const priceRef = useRef(null);
  const barRef   = useRef(null);

  useEffect(() => {
    if (!result) return;
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
    );
    const obj = { val: 0 };
    tl.to(obj, {
      val: result.price,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (priceRef.current)
          priceRef.current.textContent = formatPrice(Math.round(obj.val), category.unit);
      },
    }, '-=0.3');
    tl.fromTo(barRef.current,
      { scaleX: 0 },
      { scaleX: result.confidence / 100, duration: 1, ease: 'power3.out', transformOrigin: 'left' },
      '-=1'
    );
  }, [result, category.unit]);

  if (!result) return null;

  return (
    <Box
      ref={cardRef}
      sx={{
        opacity: 0, mt: 4, p: 4, borderRadius: '24px',
        background: `linear-gradient(135deg, ${category.color}12 0%, rgba(0,0,0,0) 100%)`,
        border: `1px solid ${category.color}40`,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <Box sx={{
        position: 'absolute', top: -40, right: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${category.color}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: '12px',
          background: `${category.color}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <TrendingUpIcon sx={{ color: category.color, fontSize: 20 }} />
        </Box>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#e8e8f0' }}>
          AI Prediction Result
        </Typography>
        <Chip
          label={`${result.confidence}% Confidence`}
          size="small"
          sx={{
            ml: 'auto',
            background: 'rgba(16,185,129,0.12)',
            color: '#10b981', border: '1px solid rgba(16,185,129,0.25)',
            fontWeight: 600, fontSize: '0.72rem',
          }}
        />
      </Box>

      <Typography
        ref={priceRef}
        sx={{
          fontFamily: "'Syne', sans-serif", fontWeight: 900,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          background: `linear-gradient(135deg, ${category.color}, #06b6d4)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          lineHeight: 1, mb: 1,
        }}
      >
        {formatPrice(0, category.unit)}
      </Typography>
      <Typography sx={{ fontSize: '0.8rem', color: '#7070a0', mb: 3 }}>Estimated Market Price</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'Low Estimate',  val: result.low,  color: '#f59e0b' },
          { label: 'High Estimate', val: result.high, color: '#10b981' },
        ].map((r) => (
          <Grid item xs={6} key={r.label}>
            <Box sx={{
              p: 2, borderRadius: '14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Typography sx={{ fontSize: '0.72rem', color: '#6060a0', mb: 0.5 }}>{r.label}</Typography>
              <Typography sx={{ fontWeight: 700, color: r.color, fontFamily: "'Syne', sans-serif" }}>
                {formatPrice(r.val, category.unit)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: '0.72rem', color: '#7070a0' }}>Model Confidence</Typography>
          <Typography sx={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>{result.confidence}%</Typography>
        </Box>
        <Box sx={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
          <Box
            ref={barRef}
            sx={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #6366f1, #10b981)', transformOrigin: 'left' }}
          />
        </Box>
      </Box>

      {result.model && (
        <Typography sx={{ fontSize: '0.68rem', color: '#404070', mt: 2 }}>
          🤖 {result.model}
        </Typography>
      )}

      <Typography sx={{ fontSize: '0.7rem', color: '#404060', mt: 1 }}>
        * AI-generated estimate based on real market data. Consult a certified appraiser for official valuation.
      </Typography>
    </Box>
  );
}

/* ─── Main Prediction Page ─── */
export default function PredictionPage({ category, onBack }) {
  const [formData, setFormData]         = useState({});
  const [loading, setLoading]           = useState(false);
  const [result, setResult]             = useState(null);
  const [error, setError]               = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const pageRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    setLoadingProgress(0);

    // Animate the progress bar while waiting for API
    const stages = [
      { pct: 20, delay: 300 },
      { pct: 50, delay: 700 },
      { pct: 80, delay: 1100 },
    ];
    for (const s of stages) {
      await new Promise((r) => setTimeout(r, s.delay));
      setLoadingProgress(s.pct);
    }

    try {
      const response = await fetch(`${API_BASE}/predict/${category.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Server error');

      setLoadingProgress(100);
      await new Promise((r) => setTimeout(r, 300));
      setResult(json);
    } catch (err) {
      setError(
        err.message.includes('Failed to fetch')
          ? 'Cannot reach the backend server. Make sure Flask is running on port 5000.'
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormFilled = category.fields.slice(0, 2).every((f) => formData[f.name]);

  return (
    <Box
      ref={pageRef}
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), #05050f',
        pt: 12, pb: 10, opacity: 0,
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: '#9090b0', mb: 4, px: 2, py: 1, borderRadius: '10px',
            '&:hover': { background: 'rgba(99,102,241,0.1)', color: '#6366f1' },
          }}
        >
          Back to Home
        </Button>

        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Box sx={{
            width: 64, height: 64, borderRadius: '20px',
            background: `${category.color}18`, border: `1px solid ${category.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
          }}>
            {category.emoji}
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#e8e8f0', mb: 0.5 }}>
              {category.label}
            </Typography>
            <Typography sx={{ color: '#7070a0', fontSize: '0.9rem' }}>
              Fill in the details below for an instant AI price estimate.
            </Typography>
          </Box>
        </Box>

        <Box
          ref={formRef}
          sx={{
            p: { xs: 3, md: 4 }, borderRadius: '24px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, mb: 3, fontSize: '1rem', color: '#e8e8f0' }}>
            Asset Details
          </Typography>

          <Grid container spacing={2.5}>
            {category.fields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {field.type === 'select' ? (
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#7070a0' }}>{field.label}</InputLabel>
                    <Select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      label={field.label}
                      sx={{
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.25)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(99,102,241,0.5)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
                        color: '#e8e8f0',
                        '& .MuiSvgIcon-root': { color: '#7070a0' },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            background: '#0d0d24', border: '1px solid rgba(99,102,241,0.2)',
                            borderRadius: '12px', mt: 0.5,
                            '& .MuiMenuItem-root': {
                              color: '#e8e8f0', fontSize: '0.9rem',
                              '&:hover': { background: 'rgba(99,102,241,0.12)' },
                              '&.Mui-selected': { background: 'rgba(99,102,241,0.2)' },
                            },
                          },
                        },
                      }}
                    >
                      {field.options.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    InputLabelProps={{ sx: { color: '#7070a0' } }}
                    InputProps={{ sx: { color: '#e8e8f0' } }}
                  />
                )}
              </Grid>
            ))}
          </Grid>

          {loading && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <CircularProgress size={16} sx={{ color: '#6366f1' }} />
                <Typography sx={{ fontSize: '0.82rem', color: '#7070a0' }}>
                  {loadingProgress < 30 ? 'Analyzing asset details...'
                    : loadingProgress < 60 ? 'Querying market database...'
                    : loadingProgress < 90 ? 'Running ML model...'
                    : 'Generating prediction...'}
                </Typography>
                <Typography sx={{ ml: 'auto', fontSize: '0.82rem', color: '#6366f1', fontWeight: 600 }}>
                  {loadingProgress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={loadingProgress}
                sx={{
                  borderRadius: 4, height: 6,
                  background: 'rgba(99,102,241,0.12)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 3, borderRadius: '12px',
                background: 'rgba(239,68,68,0.1)',
                color: '#fca5a5',
                border: '1px solid rgba(239,68,68,0.3)',
                '& .MuiAlert-icon': { color: '#ef4444' },
              }}
            >
              {error}
            </Alert>
          )}

          <Box sx={{ mt: 4 }}>
            <PredictButton
              onClick={handlePredict}
              loading={loading}
              disabled={!isFormFilled || loading}
              color={category.color}
              gradient={category.gradient}
            />
          </Box>
        </Box>

        {result && <ResultCard result={result} category={category} />}
      </Container>
    </Box>
  );
}

function PredictButton({ onClick, loading, disabled, color, gradient }) {
  const ref = useRef(null);
  const handleEnter = () => { if (!disabled) gsap.to(ref.current, { scale: 1.03, y: -3, duration: 0.2, ease: 'power2.out' }); };
  const handleLeave = () => { gsap.to(ref.current, { scale: 1, y: 0, duration: 0.25, ease: 'power2.out' }); };

  return (
    <Button
      ref={ref} fullWidth onClick={onClick} disabled={disabled}
      onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      sx={{
        background: disabled ? 'rgba(255,255,255,0.06)' : gradient,
        color: disabled ? '#404060' : '#fff',
        py: 1.8, fontSize: '1rem', fontWeight: 700,
        borderRadius: '14px',
        boxShadow: disabled ? 'none' : `0 0 30px ${color}35`,
        '&:hover': { opacity: 0.9 },
        '&.Mui-disabled': { color: '#404060' },
        transition: 'all 0.2s ease',
      }}
    >
      {loading
        ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CircularProgress size={18} sx={{ color: '#fff' }} />
            Analyzing with AI...
          </Box>
        : '⚡ Predict Price Now'
      }
    </Button>
  );
}