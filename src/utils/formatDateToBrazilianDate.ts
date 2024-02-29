export const formatDateToBrazilian = (stringDate: string) => {
  const day = stringDate.substring(8, 10);
  const month = stringDate.substring(5, 7);
  const year = stringDate.substring(0, 4);

  return `${day}/${month}/${year}`;
};
