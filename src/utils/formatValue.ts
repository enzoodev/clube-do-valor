export const formatValue = (value: string | number | undefined): string => {
  if (!value) {
    return 'R$ 0,00';
  }

  const valueParsed = typeof value === 'string' ? Number(value) : value;
  const formattedValue = `R$ ${valueParsed.toFixed(2).replace('.', ',')}`;

  return formattedValue;
};
