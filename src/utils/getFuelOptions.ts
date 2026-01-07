type Language = 'EN' | 'ES' | 'JA';

export const getFuelOptions = (language: Language): Record<string, string> => {
  const labels: Record<Language, Record<string, string>> = {
    EN: {
      gasoline: 'Gasoline/Diesel',
      gasoline_hybrid: 'Gasoline hybrid',
      plugin_hybrid: 'Plug-in hybrid',
      battery_electric: 'Battery electric',
      hydrogen_fuel_cell: 'Hydrogen fuel cell',
    },
    ES: {
      gasoline: 'Gasolina/Diésel',
      gasoline_hybrid: 'Híbrido a gasolina',
      plugin_hybrid: 'Híbrido enchufable',
      battery_electric: 'Eléctrico',
      hydrogen_fuel_cell: 'Hidrógeno',
    },
    JA: {
      gasoline: 'ガソリン/ディーゼル',
      gasoline_hybrid: 'ガソリンハイブリッド',
      plugin_hybrid: 'プラグインハイブリッド',
      battery_electric: 'バッテリー電気自動車',
      hydrogen_fuel_cell: '水素燃料電池',
    },
  };

  return labels[language];
};
