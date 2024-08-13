const formatNumberWithSpaces = (num: number | undefined | null): string => {
  if (num === undefined || num === null) {
    return "";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default formatNumberWithSpaces;
