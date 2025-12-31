import {
  Autocomplete,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useGlobalContext } from '../store';
import { getLabels } from '../utils/getLabel';

export const Example = () => {
  const { language } = useGlobalContext();

  const labels = getLabels(language);

  return (
    <Grid container spacing={1} sx={{ width: '100%' }} alignItems="center">
      <Grid size="auto" sx={{ width: '6rem' }}>
        <Typography variant="h6">Example</Typography>
      </Grid>
      <Divider
        orientation="vertical"
        sx={{
          display: { xs: 'none', md: 'flex' },
        }}
      />
      <Grid container size={{ xs: 12, md: 'grow' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            disabled
            value={'HONDA'}
            renderInput={(params) => (
              <TextField {...params} label={labels.make} variant="outlined" />
            )}
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            disabled
            value={'CIVIC'}
            renderInput={(params) => (
              <TextField {...params} label={labels.model} variant="outlined" />
            )}
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth disabled>
            <InputLabel>{labels.modelYear}</InputLabel>
            <Select label={labels.modelYear} value="2015">
              <MenuItem value={2015}>2015</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth disabled>
            <InputLabel>{labels.purchaseYear}</InputLabel>
            <Select label={labels.purchaseYear} value="2020">
              <MenuItem value={2020}>2020</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Autocomplete
            disabled
            value={'Gasoline'}
            renderInput={(params) => (
              <TextField
                {...params}
                label={labels.fuelType}
                variant="outlined"
              />
            )}
            options={[]}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%' }}>
          <TextField
            label={labels.annualMileage}
            disabled
            value="12000"
            fullWidth
            sx={{
              height: '100%',
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
