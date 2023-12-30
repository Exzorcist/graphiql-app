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

// [Help]: Add space if need bettween '{' and line
export const addExtraShapedBraketSpace = (str: string): string => str.replace(/\s*{/g, ' {');

// [Help]: Add space if need bettween '}' and line
export const addExtraShapedBraket2Space = (str: string): string => str.replace(/\s*}/g, ' }');

// [Help]: Add space if need bettween '}' and line
export const addExtraShapedBraket3Space = (str: string): string => str.replace(/{\s*/g, '{ ');

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
    if (
      !str.includes('query') &&
      !str.includes('subscription') &&
      !str.includes('mutation') &&
      !str.includes('fragment')
    ) {
      if (str.includes('}') && !str.includes('(')) {
        newArray = [...newArray, ...str.split(' ')];
      }

      if (str.includes('{') && !str.includes('(')) {
        const splitArray = str.split(' ').slice(0, -1);
        splitArray[splitArray.length - 1] = `${splitArray[splitArray.length - 1]} {`;
        newArray = [...newArray, ...splitArray];
      }

      if (str.includes('{') && str.includes('(')) {
        newArray.push(str);
      }
    } else {
      newArray.push(str);
    }
  });

  // console.log(newArray);

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

export const getRowsGivenObject = (array: string[]): string[] => {
  const str = array.join('');
  const strWithLeftPart = str.replace(/\(([^)]*)\)/g, (match, group) => {
    const replacedGroup = group.replace(/\{/g, '<');
    return `(${replacedGroup})`;
  });
  const strWithRightPart = strWithLeftPart.replace(/\(([^)]*)\)/g, (match, group) => {
    const replacedGroup = group.replace(/\}/g, '>');
    return `(${replacedGroup})`;
  });

  const newArray = getRows(strWithRightPart);

  const newArray2 = (newArray as string[]).map((str2) => {
    const strWithLeftPart2 = str2.replace(/\(([^)]*)\)/g, (match, group) => {
      const replacedGroup = group.replace(/</g, '{');
      return `(${replacedGroup})`;
    });
    const strWithRightPart2 = strWithLeftPart2.replace(/\(([^)]*)\)/g, (match, group) => {
      const replacedGroup = group.replace(/>/g, '}');
      return `(${replacedGroup})`;
    });

    return strWithRightPart2;
  });

  return newArray2;
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

    if (str.includes('}') && !str.includes('(')) {
      multiplier -= 1;
      newArray.push(`${'  '.repeat(multiplier)}${str}`);
    }
  });

  return newArray;
};

// final step: combine rows
export const combineRows = (rows: string[] | string): string => {
  console.log(rows);
  if (Array.isArray(rows)) {
    return rows.join('');
  }

  return rows;
};
