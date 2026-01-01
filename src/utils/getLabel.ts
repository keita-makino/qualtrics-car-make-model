type Language = 'EN' | 'ES' | 'JA';
type LabelKey =
  | 'example'
  | 'make'
  | 'model'
  | 'modelYear'
  | 'purchaseYear'
  | 'fuelType'
  | 'annualMileage'
  | 'selectMake'
  | 'selectModel'
  | 'selectModelYear'
  | 'selectPurchaseYear'
  | 'selectFuelType';

export const getLabels = (language: Language): Record<LabelKey, string> => {
  const labels: Record<Language, Record<LabelKey, string>> = {
    EN: {
      example: 'Example',
      make: 'Make',
      model: 'Model',
      modelYear: 'Model Year',
      purchaseYear: 'Purchase Year',
      fuelType: 'Fuel Type',
      annualMileage: 'Annual Mileage',
      selectMake: 'Select Make',
      selectModel: 'Select Model',
      selectModelYear: 'Select Model Year',
      selectPurchaseYear: 'Select Purchase Year',
      selectFuelType: 'Select Fuel Type',
    },
    ES: {
      example: 'Ejemplo',
      make: 'Marca',
      model: 'Modelo',
      modelYear: 'Año del Modelo',
      purchaseYear: 'Año de Compra',
      fuelType: 'Tipo de Combustible',
      annualMileage: 'Millaje Anual',
      selectMake: 'Seleccionar Marca',
      selectModel: 'Seleccionar Modelo',
      selectModelYear: 'Seleccionar Año del Modelo',
      selectPurchaseYear: 'Seleccionar Año de Compra',
      selectFuelType: 'Seleccionar Tipo de Combustible',
    },
    JA: {
      example: '例',
      make: 'メーカー',
      model: 'モデル',
      modelYear: 'モデル年',
      purchaseYear: '購入年',
      fuelType: '燃料タイプ',
      annualMileage: '年間走行距離',
      selectMake: 'メーカーを選択',
      selectModel: 'モデルを選択',
      selectModelYear: 'モデル年を選択',
      selectPurchaseYear: '購入年を選択',
      selectFuelType: '燃料タイプを選択',
    },
  };

  return labels[language];
};
