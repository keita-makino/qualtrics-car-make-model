import { useGlobalContext } from '.';

export const useInputState = (index: number) => {
  const state = useGlobalContext();

  return { state: state.inputs[index], language: state.language };
};
