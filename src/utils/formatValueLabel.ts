export const formatValueLabel = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  }

  if (value < 1000000) {
    return `${(value / 1000).toFixed(1)} mil`;
  }

  if (value < 1000000000) {
    return `${(value / 1000000).toFixed(1)} mi`;
  }

  if (value < 1000000000000) {
    return `${(value / 1000000000).toFixed(1)} bi`;
  }

  if (value < 1000000000000000) {
    return `${(value / 1000000000000).toFixed(1)} tri`;
  }

  return value.toString();
};
