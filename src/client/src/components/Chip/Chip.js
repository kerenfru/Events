import * as React from 'react';
import { Chip as MChip } from '@mui/material';

const SEVERITY = {
  high: '#F06161',
  medium: '#FFB547',
  low: '#3A90E5',
};

export default function Chip({ severity }) {
  const style = {
    background: SEVERITY[severity],
    borderRadius: '8px',
    height: '23px',
    fontSize: 'x-small',
  };
  return <MChip label={severity.toUpperCase()} sx={style} />;
}
