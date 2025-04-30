import { Grid } from '@mui/material';
import React from 'react';
import { useGlobalContext } from '../store';

export const DebugPanel = () => {
  const state = useGlobalContext();

  return (
    <Grid container spacing={1} sx={{ width: '100%', maxWidth: '100%' }}>
      {JSON.stringify({
        inputs: state.inputs.map((item) => ({
          htmlElement: item.htmlElement,
          label: item.label,
          makeSelected: item.makeSelected,
          modelSelected: item.modelSelected,
          modelYear: item.modelYear,
          purchaseYear: item.purchaseYear,
          mileage: item.mileage,
        })),
        isMobile: state.isMobile,
      })}
    </Grid>
  );
};
