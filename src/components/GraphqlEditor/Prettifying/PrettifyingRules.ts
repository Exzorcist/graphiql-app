// step 1: Removing spaces at the beginning and end of a line
export const trimSpaces = (str: string): string => str.trim();

// step 2: Get all rows
export const getRows = (str: string): string[] | string => {
  // Search for strings that end in '{' or '}' characters
  const regexStep1 = /[^{}]*[{}]\s*/g;
  const step1 = str.match(regexStep1);

  if (step1 && step1.length) {
    return step1;
  }

  return str;
};

// step 3: Set rows
export const setLines = (str: string): string => `${str}\n`;

// Step 4: Set tabs
// export const setTabsMap = (rows: string[]): string[] => {
//     let count
// };

export const setTabs = (str: string, multiplier: number): string => {
  return `${'  '.repeat(multiplier)}${str}`;
};

// final step: combine rows
export const combineRows = (rows: string[] | string): string => {
  console.log(rows);
  if (Array.isArray(rows)) {
    return rows.join('');
  }

  return rows;
};
