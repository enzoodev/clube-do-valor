import { translateMonthToPortuguese } from './translateMonthToPortuguese';

export const formatDateToBrazilianLabel = (stringDate: string) => {
  const day = stringDate.substring(8, 10);
  const month = translateMonthToPortuguese(stringDate);
  const year = stringDate.substring(0, 4);

  return `${day} de ${month} de ${year}`;
};
