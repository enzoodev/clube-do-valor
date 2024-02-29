export const monthsInPortuguese = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const translateMonthToPortuguese = (stringDate: string) => {
  const parts = stringDate.split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;
  const day = parseInt(parts[2]);

  const date = new Date(year, month, day);
  const monthNumber = date.getMonth();
  const translatedMonth = monthsInPortuguese[monthNumber];

  return translatedMonth;
};
