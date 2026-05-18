import {
  Box,
  FormControlLabel,
  Paper,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import type { CubeSettings } from '../types';

interface Props {
  settings: CubeSettings;
  onChange: (next: CubeSettings) => void;
}

export default function ControlPanel({ settings, onChange }: Props) {
  const update = <K extends keyof CubeSettings>(
    key: K,
    value: CubeSettings[K],
  ) => onChange({ ...settings, [key]: value });

  const clampInt = (raw: string, min: number, max: number, fallback: number) => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  };

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, my: 2, display: 'inline-block', textAlign: 'left' }}
    >
      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <TextField
            label="維度 (0~50)"
            type="number"
            size="small"
            value={settings.dimension}
            onChange={(e) =>
              update('dimension', clampInt(e.target.value, 0, 50, settings.dimension))
            }
            inputProps={{ min: 0, max: 50 }}
            sx={{ width: 150 }}
          />
          <TextField
            label="線段寬度 (1~10)"
            type="number"
            size="small"
            value={settings.lineWidth}
            onChange={(e) =>
              update('lineWidth', clampInt(e.target.value, 1, 10, settings.lineWidth))
            }
            inputProps={{ min: 1, max: 10 }}
            sx={{ width: 170 }}
          />
        </Stack>

        <Box sx={{ width: { xs: '100%', sm: 360 } }}>
          <Typography variant="body2" gutterBottom>
            最大寬度：{settings.maxWidth}px
          </Typography>
          <Slider
            value={settings.maxWidth}
            min={300}
            max={2000}
            onChange={(_, v) => update('maxWidth', v as number)}
          />
        </Box>

        <Box sx={{ width: { xs: '100%', sm: 360 } }}>
          <Typography variant="body2" gutterBottom>
            最大高度：{settings.maxHeight}px
          </Typography>
          <Slider
            value={settings.maxHeight}
            min={200}
            max={1500}
            onChange={(_, v) => update('maxHeight', v as number)}
          />
        </Box>

        <Stack direction="row" spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.bwMode}
                onChange={(e) => update('bwMode', e.target.checked)}
              />
            }
            label="黑白模式"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.visualSpacing}
                onChange={(e) => update('visualSpacing', e.target.checked)}
              />
            }
            label="視覺排列"
          />
        </Stack>
      </Stack>
    </Paper>
  );
}
