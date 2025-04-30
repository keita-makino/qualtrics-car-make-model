import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useGlobalStateUpdateContext } from '../store';
import { Example } from './Example';
import { InputForm } from './InputForm';

type Props = {
  directionContainer: HTMLElement;
  isMobile: boolean;
  language: 'EN' | 'ES' | 'JA';
};

export const Container: React.FC<Props> = (props) => {
  const [makeOptions, setMakeOptions] = React.useState<string[]>([]);
  const update = useGlobalStateUpdateContext();

  // Fetching car makes from the API only one time
  useEffect(() => {
    axios
      .get(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setMakeOptions(
          response.data.Results.map((item: any) => item.MakeName).sort(
            (a: string, b: string) => a.localeCompare(b)
          )
        );
      });

    // update({
    //   type: 'ADD_MAKEOPTIONS',
    //   makeOptions: makeOptions.data.Results.map((item: any) => item.Make_Name),
    // });
  }, []);

  const inputHTMLElements = [
    ...props.directionContainer.getElementsByTagName('tr'),
  ].map((item) => ({
    htmlElement: item.getElementsByTagName('input')[0] as HTMLInputElement,
    label: item.innerText,
    makeOptions: makeOptions,
    modelOptions: [],
  }));

  useEffect(() => {
    if ([...inputHTMLElements].length > 0 && makeOptions.length > 0) {
      console.log([...inputHTMLElements]);
      update({
        type: 'ADD_INPUTS',
        inputs: inputHTMLElements,
      });
    }
  }, [inputHTMLElements, makeOptions]);

  useEffect(() => {
    if (props.language) {
      update({
        type: 'SET_LANGUAGE',
        value: props.language,
      });
    }
  }, []);

  return (
    <Grid container spacing={1} sx={{ width: '100%' }}>
      <Example />
      {inputHTMLElements.length > 0
        ? [...inputHTMLElements].map((item, index) => (
            <InputForm index={index} />
          ))
        : null}
      {/* {process.env.NODE_ENV === 'development' ? <DebugPanel /> : null} */}
    </Grid>
  );
};
