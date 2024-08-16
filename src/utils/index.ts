const formatNumberWithSpaces = (num: number | undefined | null): string => {
  if (num === undefined || num === null) {
    return "";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const formatSum = (sum: string | number): string => {
  const sumStr = typeof sum === "number" ? sum.toString() : sum;
  const num = parseFloat(sumStr.replace(/,/g, ""));
  return isNaN(num) ? sumStr : formatNumberWithSpaces(num);
};

export { formatNumberWithSpaces, formatSum };
