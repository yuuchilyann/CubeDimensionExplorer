import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { drawCube } from '../lib/draw';
import type { CubeSettings } from '../types';

interface Props {
  settings: CubeSettings;
}

export default function CubeCanvas({ settings }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCube(canvas, settings);
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [settings]);

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{
          width: '98vw',
          height: '75vh',
          display: 'block',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 1,
        }}
      />
    </Box>
  );
}
