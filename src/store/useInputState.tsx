import { useGlobalContext } from '.';

export const useInputState = (index: number) => {
  const state = useGlobalContext();

  return state.inputs[index];
};
