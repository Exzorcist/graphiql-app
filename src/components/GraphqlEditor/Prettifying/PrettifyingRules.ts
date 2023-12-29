// [Help]: Removing spaces at the beginning and end of a line
export const trimSpaces = (str: string): string => str.trim();

// [Help]: Set line break
export const setLineBreak = (str: string): string => `${str}\n`;

// [Help]: Clear line removing duplicated spaces
export const removeDuplicatedSpaces = (str: string): string => str.replace(/\s+/g, ' ');

// [Help]: Clear line removing duplicated spaces
export const removeBraketSpace = (str: string): string => str.replace(' (', '(');

// [Help]: Add space if need bettween ')' and '{'
export const addExtraBraketSpace = (str: string): string => str.replace('){', ') {');

// [Help]: Add space if need bettween ':' and argument type
export const addExtraArgumentSpace = (str: string): string => str.replace(/:\s*/g, ': ');

// [Help]: Add space if need bettween ',' and argument type alse remove where needed
export const correctComma = (str: string): string => {
  if (str.includes('(')) {
    return str.replace(/,\s*/g, ', ');
  }

  return str.replace(/,/g, '');
};

// [Help]: Get new array string with callback
export const arrayStringMutation = (
  array: string[],
  callback: (arg: string) => string
): string[] => {
  return array.map((str) => callback(str));
};

// [Help]: Find and set field line
export const setFieldLine = (array: string[]): string[] => {
  let newArray: string[] = [];

  array.forEach((str) => {
    if (str.includes('}')) {
      newArray = [...newArray, ...str.split(' ')];
    } else {
      newArray.push(str);
    }
  });

  return newArray;
};

// [Help]: Get all rows
export const getRows = (str: string): string[] | string => {
  // Search for strings that end in '{' or '}' characters
  const step1 = str.match(/[^{}]*[{}]\s*/g);

  if (step1 && step1.length) {
    return step1;
  }

  return str;
};

export const setPadding = (array: string[]): string[] => {
  const newArray: string[] = [];
  let multiplier = 0;

  array.forEach((str) => {
    if (str.includes('{')) {
      newArray.push(`${'  '.repeat(multiplier)}${str}`);
      multiplier += 1;
    }

    if (!str.includes('{') && !str.includes('}')) {
      newArray.push(`${'  '.repeat(multiplier)}${str}`);
    }

    if (str.includes('}')) {
      multiplier -= 1;
      newArray.push(`${'  '.repeat(multiplier)}${str}`);
    }
  });

  return newArray;
};

// final step: combine rows
export const combineRows = (rows: string[] | string): string => {
  // console.log(rows);
  if (Array.isArray(rows)) {
    return rows.join('');
  }

  return rows;
};
