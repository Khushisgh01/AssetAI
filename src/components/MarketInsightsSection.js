import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Tabs, Tab, Chip } from '@mui/material';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

/* ─── Chart data ─── */
const carDepreciationData = [
  { year: 'Year 0', value: 100 }, { year: 'Year 1', value: 82 },
  { year: 'Year 2', value: 70 }, { year: 'Year 3', value: 61 },
  { year: 'Year 4', value: 54 }, { year: 'Year 5', value: 48 },
  { year: 'Year 6', value: 43 }, { year: 'Year 7', value: 39 },
  { year: 'Year 8', value: 35 }, { year: 'Year 10', value: 28 },
];

const housePriceTrends = [
  { month: 'Jan', Mumbai: 185, Delhi: 122, Bengaluru: 98, Hyderabad: 75 },
  { month: 'Mar', Mumbai: 190, Delhi: 125, Bengaluru: 102, Hyderabad: 78 },
  { month: 'May', Mumbai: 188, Delhi: 130, Bengaluru: 107, Hyderabad: 82 },
  { month: 'Jul', Mumbai: 196, Delhi: 128, Bengaluru: 110, Hyderabad: 85 },
  { month: 'Sep', Mumbai: 202, Delhi: 135, Bengaluru: 115, Hyderabad: 88 },
  { month: 'Nov', Mumbai: 210, Delhi: 140, Bengaluru: 120, Hyderabad: 92 },
  { month: 'Dec', Mumbai: 215, Delhi: 142, Bengaluru: 123, Hyderabad: 94 },
];

const goldPriceTrends = [
  { month: 'Jan 24', gold: 62500, silver: 720 },
  { month: 'Mar 24', gold: 65000, silver: 740 },
  { month: 'May 24', gold: 72000, silver: 820 },
  { month: 'Jul 24', gold: 68000, silver: 780 },
  { month: 'Sep 24', gold: 74000, silver: 850 },
  { month: 'Nov 24', gold: 78000, silver: 890 },
  { month: 'Jan 25', gold: 81000, silver: 920 },
  { month: 'Mar 25', gold: 84000, silver: 960 },
];

const charts = [
  {
    id: 'car',
    label: '🚗 Car Depreciation',
    description: 'How car values drop over time as % of original price',
    color: '#6366f1',
    type: 'area',
    data: carDepreciationData,
    dataKey: 'value',
    yLabel: '% of Original Value',
    tooltip: (v) => `${v}% of original value`,
  },
  {
    id: 'house',
    label: '🏠 House Price Trends',
    description: 'Property prices (₹ Lakh/sq ft) across major Indian cities in 2024',
    color: '#10b981',
    type: 'line-multi',
    data: housePriceTrends,
    lines: [
      { key: 'Mumbai', color: '#6366f1' },
      { key: 'Delhi', color: '#10b981' },
      { key: 'Bengaluru', color: '#06b6d4' },
      { key: 'Hyderabad', color: '#f59e0b' },
    ],
    yLabel: '₹ Lakh/sq ft',
  },
  {
    id: 'gold',
    label: '🥇 Gold & Silver Trends',
    description: 'Gold (₹/10g) and Silver (₹/100g) prices over 14 months',
    color: '#eab308',
    type: 'area-dual',
    data: goldPriceTrends,
    yLabel: 'Price (₹)',
  },
];

/* ─── Custom tooltip ─── */
const CustomTooltip = ({ active, payload, label, color }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{
      background: 'rgba(10,10,30,0.95)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', p: 1.5,
    }}>
      <Typography sx={{ fontSize: '0.75rem', color: '#6060a0', mb: 0.5 }}>{label}</Typography>
      {payload.map((p, i) => (
        <Typography key={i} sx={{ fontSize: '0.85rem', fontWeight: 600, color: p.color || color }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString('en-IN') : p.value}
        </Typography>
      ))}
    </Box>
  );
};

/* ─── Chart renderer ─── */
function ChartRenderer({ chart }) {
  if (chart.type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chart.data}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chart.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chart.color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="year" tick={{ fill: '#606080', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#606080', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip color={chart.color} />} />
          <Area type="monotone" dataKey="value" stroke={chart.color} strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: chart.color, r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === 'line-multi') {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chart.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#606080', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#606080', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#9090b0' }} />
          {chart.lines.map((l) => (
            <Line key={l.key} type="monotone" dataKey={l.key}
              stroke={l.color} strokeWidth={2.5}
              dot={{ fill: l.color, r: 3.5 }} activeDot={{ r: 6 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === 'area-dual') {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chart.data}>
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eab308" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#eab308" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="month" tick={{ fill: '#606080', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#606080', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', color: '#9090b0' }} />
          <Area type="monotone" dataKey="gold" name="Gold (₹/10g)" stroke="#eab308" strokeWidth={2.5} fill="url(#goldGrad)" dot={{ fill: '#eab308', r: 3.5 }} />
          <Area type="monotone" dataKey="silver" name="Silver (₹/100g)" stroke="#94a3b8" strokeWidth={2} fill="url(#silverGrad)" dot={{ fill: '#94a3b8', r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  return null;
}

export default function MarketInsightsSection() {
  const [activeChart, setActiveChart] = useState(0);
  const sectionRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const setRef = (el) => { sectionRef.current = el; inViewRef(el); };

  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );
    }
  }, [inView]);

  const chart = charts[activeChart];

  return (
    <Box id="insights" sx={{ py: { xs: 8, md: 14 }, background: '#05050f', position: 'relative' }}>
      <Box sx={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{
            display: 'inline-block', px: 2, py: 0.5, mb: 2,
            borderRadius: '100px', border: '1px solid rgba(16,185,129,0.3)',
            background: 'rgba(16,185,129,0.08)',
            fontSize: '0.8rem', color: '#10b981', fontWeight: 600, letterSpacing: '0.08em',
          }}>
            MARKET INSIGHTS
          </Typography>
          <Typography variant="h2" sx={{
            fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' }, color: '#e8e8f0', mb: 2,
          }}>
            Real data, real trends
          </Typography>
          <Typography sx={{ color: '#7070a0', maxWidth: 450, mx: 'auto' }}>
            Explore live market trends powering our prediction models.
          </Typography>
        </Box>

        {/* Chart tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, flexWrap: 'wrap', gap: 1.5 }}>
          {charts.map((c, i) => (
            <Box
              key={c.id}
              onClick={() => setActiveChart(i)}
              sx={{
                px: 2.5, py: 1, borderRadius: '12px', cursor: 'pointer',
                border: `1px solid ${i === activeChart ? c.color + '60' : 'rgba(255,255,255,0.06)'}`,
                background: i === activeChart ? `${c.color}15` : 'transparent',
                color: i === activeChart ? c.color : '#7070a0',
                fontWeight: 600, fontSize: '0.85rem',
                transition: 'all 0.25s ease',
                '&:hover': { borderColor: `${c.color}40`, color: c.color },
              }}
            >
              {c.label}
            </Box>
          ))}
        </Box>

        {/* Chart card */}
        <Box
          ref={setRef}
          sx={{
            opacity: 0,
            p: { xs: 2.5, md: 4 }, borderRadius: '24px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography sx={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700,
                fontSize: '1.1rem', color: '#e8e8f0', mb: 0.5,
              }}>
                {chart.label}
              </Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#7070a0' }}>{chart.description}</Typography>
            </Box>
            <Chip
              label="Live Data"
              size="small"
              sx={{
                background: 'rgba(16,185,129,0.12)',
                color: '#10b981', border: '1px solid rgba(16,185,129,0.25)',
                fontWeight: 600, fontSize: '0.72rem',
                '&::before': { content: '"● "' },
              }}
            />
          </Box>

          <ChartRenderer chart={chart} />
        </Box>
      </Container>
    </Box>
  );
}