import React, { ReactNode, createContext, useContext, useReducer } from 'react';
import { Input } from '../types';
import { Row } from '../types/Input';

export type GlobalState = {
  inputs: Input[];
  Rows: Row[];
  headerHeights: number[];
  rowHeights: number[];
  isMobile: boolean;
  targetHours: number[];
  language: 'EN' | 'ES' | 'JA';
};

export const initialState: GlobalState = {
  inputs: [],
  Rows: [],
  headerHeights: [],
  rowHeights: [],
  isMobile: false,
  targetHours: [0, 0, 0],
  language: 'EN',
};

export type Action =
  | {
      type: 'ADD_INPUTS';
      inputs: Input[];
    }
  | {
      type: 'SET_INPUT_VALUE';
      index: number;
      property:
        | 'makeSelected'
        | 'modelSelected'
        | 'fuelSelected'
        | 'modelYear'
        | 'purchaseYear'
        | 'mileage';
      value: string | number | undefined;
    }
  | {
      type: 'SET_MODEL_OPTIONS';
      index: number;
      value: string[];
    }
  | {
      type: 'SET_LANGUAGE';
      value: 'EN' | 'ES' | 'JA';
    };

export const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'ADD_INPUTS':
      return {
        ...state,
        inputs: [...state.inputs, ...action.inputs],
      };
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputs: state.inputs.map((item, index) =>
          index === action.index
            ? {
                ...item,
                [action.property]: action.value,
              }
            : item,
        ),
      };
    case 'SET_MODEL_OPTIONS':
      return {
        ...state,
        inputs: state.inputs.map((item, index) =>
          index === action.index
            ? {
                ...item,
                modelOptions: action.value,
              }
            : item,
        ),
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.value,
      };
    default:
      return state;
  }
};

export const GlobalStateContext = createContext({} as GlobalState);
export const GlobalStateUpdateContext = createContext(
  {} as React.Dispatch<Action>,
);

export const useGlobalContext = () => useContext(GlobalStateContext);
export const useGlobalStateUpdateContext = () =>
  useContext(GlobalStateUpdateContext);

export const GlobalStateProvider = (props: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateUpdateContext.Provider value={dispatch}>
        {props.children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
};
