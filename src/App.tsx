import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ControlPanel from './components/ControlPanel';
import CubeCanvas from './components/CubeCanvas';
import type { CubeSettings } from './types';

const DEFAULT_SETTINGS: CubeSettings = {
  dimension: 3,
  lineWidth: 3,
  maxWidth: 800,
  maxHeight: 600,
  bwMode: false,
  visualSpacing: false,
};

export default function App() {
  const [settings, setSettings] = useState<CubeSettings>(DEFAULT_SETTINGS);

  return (
    <Box sx={{ minHeight: '100vh', py: 2 }}>
      <Container maxWidth={false} sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          立方體維度探索器
        </Typography>
        <ControlPanel settings={settings} onChange={setSettings} />
        <CubeCanvas settings={settings} />
      </Container>
    </Box>
  );
}
