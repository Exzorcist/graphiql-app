interface IRules {
  data: string | string[];
  setData: (str: string) => IRules;
  getData: () => string;

  join: () => IRules;
  trim: () => IRules;
  getLines: () => IRules;
  getFieldLines: () => IRules;
  argumentObjectProcessing: () => IRules;
  setPadding: () => IRules;

  mutation: (callback: (str: string) => string) => IRules;
  mutationFunc: {
    trim: (str: string) => string;
    removeDuplicatedSpace: (str: string) => string;
    correctBracketSpace: (str: string) => string;
    correctShapedBracketSpace: (str: string) => string;
    correctArgumentSpace: (str: string) => string;
    correctCommaBehavior: (str: string) => string;
    setLineBreak: (str: string) => string;
  };
}

const rules: IRules = {
  data: '',

  setData: (str) => {
    rules.data = str;
    return rules;
  },

  getData: () => rules.data as string,

  // Conver string array to string
  join: () => {
    rules.data = (rules.data as string[]).join('');
    return rules;
  },

  // Removing spaces at the beginning and end of a line
  trim: () => {
    rules.data = (rules.data as string).trim();
    return rules;
  },

  // Search for strings that end in '{' or '}' characters
  getLines: () => {
    rules.data = (rules.data as string).match(/[^{}]*[{}]\s*/g) || [];
    return rules;
  },

  // Split field string into substrings
  getFieldLines: () => {
    let array: string[] = [];

    (rules.data as string[]).forEach((str) => {
      if (
        !str.includes('query') &&
        !str.includes('subscription') &&
        !str.includes('mutation') &&
        !str.includes('fragment')
      ) {
        if (str.includes('}') && !str.includes('(')) {
          array = [...array, ...str.split(' ')];
        }

        if (str.includes('{') && !str.includes('(') && str.length > 1) {
          const splitArray = str.split(' ').slice(0, -1);
          splitArray[splitArray.length - 1] = `${splitArray[splitArray.length - 1]} {`;
          array = [...array, ...splitArray];
        }

        if (str.includes('{') && str.length === 1) {
          array.push(str);
        }

        if (str.includes('{') && str.includes('(')) {
          array.push(str);
        }
      } else {
        array.push(str);
      }
    });

    rules.data = array;
    return rules;
  },

  argumentObjectProcessing: () => {
    rules.data = (rules.data as string[])
      .join('')
      .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/\{/g, '<')})`)
      .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/\}/g, '>')})`);

    rules.getLines();

    if (Array.isArray(rules.data)) {
      rules.data = (rules.data as string[]).map((str) => {
        return str
          .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/</g, '{')})`)
          .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/>/g, '}')})`);
      });
    }

    return rules;
  },

  // Setting indents for lines
  setPadding: () => {
    const array: string[] = [];
    let multiplier = 0;

    (rules.data as string[]).forEach((str) => {
      if (str.includes('{')) {
        array.push(`${'  '.repeat(multiplier)}${str}`);
        multiplier += 1;
      }

      if (!str.includes('{') && !str.includes('}')) {
        array.push(`${'  '.repeat(multiplier)}${str}`);
      }

      if (str.includes('}') && !str.includes('(')) {
        multiplier -= 1;
        array.push(`${'  '.repeat(multiplier)}${str}`);
      }
    });

    rules.data = array;
    return rules;
  },

  // Get new array string with callback
  mutation: (callback) => {
    if (Array.isArray(rules.data)) {
      rules.data = rules.data.map((str) => callback(str));
    }

    return rules;
  },

  // Functions for string mutations
  mutationFunc: {
    trim: (str) => str.trim(),
    removeDuplicatedSpace: (str) => str.replace(/\s+/g, ' '),

    // Correct space bettween '(' .. ')' .. '{' .. symbols
    correctBracketSpace: (str) => {
      return str.replace(' (', '(').replace('){', ') {');
    },

    // Correct space bettween '{' .. '}' .. symbols
    correctShapedBracketSpace: (str) => {
      return str.replace(/\s*{/g, ' {').replace(/\s*}/g, ' }').replace(/{\s*/g, '{ ');
    },

    // Correct space bettween ':' .. symbols in this part => ( ...arguments )
    correctArgumentSpace: (str) => {
      return str.replace(/:\s*/g, ': ');
    },

    // Correct ',' => deletes where necessary, adds spaces where necessary
    correctCommaBehavior: (str) => {
      if (str.includes('(')) return str.replace(/,\s*/g, ', ');
      return str.replace(/,/g, '');
    },

    // Set line break
    setLineBreak: (str) => `${str}\n`,
  },
};

export const prettifying = (query: string): string => {
  return rules
    .setData(query)
    .trim()
    .getLines()
    .mutation(rules.mutationFunc.trim)
    .mutation(rules.mutationFunc.removeDuplicatedSpace)
    .argumentObjectProcessing()
    .mutation(rules.mutationFunc.correctBracketSpace)
    .mutation(rules.mutationFunc.correctShapedBracketSpace)
    .mutation(rules.mutationFunc.correctArgumentSpace)
    .mutation(rules.mutationFunc.correctCommaBehavior)
    .mutation(rules.mutationFunc.trim)
    .getFieldLines()
    .setPadding()
    .mutation(rules.mutationFunc.setLineBreak)
    .join()
    .getData();
};
