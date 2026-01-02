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
import axios from 'axios';
import React, { useEffect } from 'react';
import { useGlobalStateUpdateContext } from '../store';
import { useInputState } from '../store/useInputState';
import { getLabels } from '../utils/getLabel';

type Props = {
  index: number;
};

export const InputForm: React.FC<Props> = (props) => {
  const { state } = useInputState(props.index);

  useEffect(() => {
    if (state?.htmlElement) {
      state.htmlElement.value = JSON.stringify({
        makeSelected: state.makeSelected,
        modelSelected: state.modelSelected,
        modelYear: state.modelYear,
        purchaseYear: state.purchaseYear,
        fuelSelected: state.fuelSelected,
        mileage: state.mileage,
      });
    }
  }, [state]);

  return state ? (
    <>
      <Divider flexItem sx={{ width: '100%', maxWidth: '100%' }} />
      <Grid
        container
        spacing={1}
        sx={{ width: '100%', maxWidth: '100%' }}
        alignItems="center"
      >
        <Grid size="auto" sx={{ width: '6rem' }}>
          <Typography variant="h6">{state.label}</Typography>
        </Grid>
        <Divider
          orientation="vertical"
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        />
        <Grid container size={{ xs: 12, md: 'grow' }}>
          <MakeSelector index={props.index} />
          <ModelSelector index={props.index} />
          <YearSelector index={props.index} />
          <FuelSelector index={props.index} />
          <MileageInput index={props.index} />
        </Grid>
      </Grid>
    </>
  ) : null;
};

const MakeSelector = (props: { index: number }) => {
  const { state, language } = useInputState(props.index);
  const update = useGlobalStateUpdateContext();
  const labels = getLabels(language);

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Autocomplete
        sx={{ width: '100%' }}
        freeSolo
        value={state.makeSelected || ''}
        options={state.makeOptions}
        renderInput={(params) => (
          <TextField {...params} label={labels.make} variant="outlined" />
        )}
        onInputChange={(_, value) => {
          update({
            type: 'SET_INPUT_VALUE',
            index: props.index,
            property: 'makeSelected',
            value: value,
          });
        }}
        fullWidth
      />
    </Grid>
  );
};

const ModelSelector = (props: { index: number }) => {
  const { state, language } = useInputState(props.index);
  const update = useGlobalStateUpdateContext();
  const labels = getLabels(language);

  useEffect(() => {
    if (state.makeSelected) {
      axios
        .get(
          `https://vpic.nhtsa.dot.gov/api//vehicles/GetModelsForMake/${state.makeSelected}?format=json`,
        )
        .then((response) => {
          const modelOptions = response.data.Results.map(
            (item: any) => item.Model_Name,
          ).sort((a: string, b: string) => a.localeCompare(b));
          update({
            type: 'SET_MODEL_OPTIONS',
            index: props.index,
            value: modelOptions,
          });
        });
    }
  }, [state.makeSelected]);

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Autocomplete
        sx={{ width: '100%' }}
        freeSolo
        value={state.modelSelected || ''}
        options={state.makeSelected ? state.modelOptions : []}
        disabled={!state.makeSelected}
        renderInput={(params) => (
          <TextField
            {...params}
            label={state.makeSelected ? labels.model : labels.selectMake}
            variant="outlined"
          />
        )}
        onInputChange={(_, value) => {
          update({
            type: 'SET_INPUT_VALUE',
            index: props.index,
            property: 'modelSelected',
            value: value,
          });
        }}
        fullWidth
      />
    </Grid>
  );
};

const YearSelector = (props: { index: number }) => {
  const { state, language } = useInputState(props.index);
  const update = useGlobalStateUpdateContext();
  const labels = getLabels(language);

  const options = [
    undefined,
    ...Array(100)
      .fill(0)
      .map((_, i) => (2026 - i).toString()),
  ];

  useEffect(() => {
    if (state.modelYear && state.purchaseYear) {
      if (Number(state.modelYear) > Number(state.purchaseYear) + 1) {
        update({
          type: 'SET_INPUT_VALUE',
          index: props.index,
          property: 'purchaseYear',
          value: undefined,
        });
      }
    }
  }, [state.modelYear]);

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControl fullWidth disabled={!state.modelSelected}>
          <InputLabel
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              padding: state.modelYear ? '0 0.25rem' : undefined,
            }}
          >
            {state.modelSelected ? labels.modelYear : labels.selectModel}
          </InputLabel>
          <Select
            value={state.modelYear?.toString() || ''}
            onChange={(e) => {
              update({
                type: 'SET_INPUT_VALUE',
                index: props.index,
                property: 'modelYear',
                value: Number(e.target.value),
              });
            }}
          >
            {options.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControl fullWidth disabled={!state.modelYear}>
          <InputLabel
            sx={{
              backgroundColor: (theme) => theme.palette.background.paper,
              padding: state.purchaseYear ? '0 0.25rem' : undefined,
            }}
          >
            {state.modelYear ? labels.purchaseYear : labels.selectModelYear}
          </InputLabel>
          <Select
            value={state.purchaseYear?.toString() || ''}
            onChange={(e) => {
              update({
                type: 'SET_INPUT_VALUE',
                index: props.index,
                property: 'purchaseYear',
                value: Number(e.target.value),
              });
            }}
          >
            {options
              .filter(
                (year) =>
                  year === undefined || Number(year) >= state.modelYear! - 1,
              )
              .map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
};

const FuelSelector = (props: { index: number }) => {
  const { state, language } = useInputState(props.index);
  const update = useGlobalStateUpdateContext();
  const labels = getLabels(language);

  const options = [
    'Gasoline/Diesel',
    'Gasoline hybrid',
    'Plug-in hybrid',
    'Battery electric',
    'Hydrogen fuel cell',
  ];

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <Autocomplete
          sx={{ width: '100%' }}
          disabled={!state.purchaseYear}
          freeSolo
          value={state.fuelSelected || ''}
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                state.purchaseYear ? labels.fuelType : labels.selectPurchaseYear
              }
              variant="outlined"
            />
          )}
          onInputChange={(_, value) => {
            update({
              type: 'SET_INPUT_VALUE',
              index: props.index,
              property: 'fuelSelected',
              value: value,
            });
          }}
          fullWidth
        />
      </Grid>
    </>
  );
};

const MileageInput = (props: { index: number }) => {
  const { state, language } = useInputState(props.index);
  const update = useGlobalStateUpdateContext();
  const labels = getLabels(language);

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <TextField
        sx={{ width: '100%' }}
        label={
          state.fuelSelected ? labels.annualMileage : labels.selectFuelType
        }
        type="number"
        value={state.mileage || ''}
        disabled={!state.fuelSelected}
        onChange={(e) => {
          update({
            type: 'SET_INPUT_VALUE',
            index: props.index,
            property: 'mileage',
            value: Number(e.target.value),
          });
        }}
        fullWidth
      />
    </Grid>
  );
};
