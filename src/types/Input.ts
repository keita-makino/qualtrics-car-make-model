export type Input = {
  htmlElement: HTMLInputElement;
  label: string;
  makeOptions: string[];
  makeSelected?: string;
  modelOptions: string[];
  modelSelected?: string;
  modelYear?: number;
  purchaseYear?: number;
  mileage?: number;
};

export type Row = {
  label: string;
};
