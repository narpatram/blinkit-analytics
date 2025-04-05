type AnyObject = Record<string, any>;

export const transformKeys = (input: AnyObject[]): AnyObject[] => {
  return input?.map(obj => {
    const transformed: AnyObject = {};
    for (const key in obj) {
      const newKey = key.split('.')[1];
      transformed[newKey] = obj[key];
    }
    return transformed;
  });
}

export function convertKeyToNumber(input: AnyObject[], keyName: string): AnyObject[] {
    return input?.map(obj => {
      const transformed = { ...obj };
      const value = transformed[keyName];
      const num = Number(value);
      if (typeof value === 'string' && !isNaN(num)) {
        transformed[keyName] = num;
      }
      return transformed;
    });
  }

 export function formatToIndianNumbering(value: number, toFixed: number = 0, space: boolean = false, ): string {
    if (value >= 1e7) {
      return `${(value / 1e7).toFixed(toFixed)}${space ? " Cr" : "Cr"}`;
    } else if (value >= 1e5) {
      return `${(value / 1e5).toFixed(toFixed)}${space ? " L" : "L"}`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(toFixed)}${space ? " K" : "K"}`;
    }
    return value.toString();
  }