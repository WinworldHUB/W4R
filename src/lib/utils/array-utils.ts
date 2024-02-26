export const getArrayFromTo = (from, to): number[] => {
  const output = [];

  for (let index = from; index <= to; index++) {
    output.push(index);
  }

  return output;
};
