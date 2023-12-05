type padMode = 'start' | 'end' | 'center';
export const pad = (str: string | number | undefined, l: number, padMode: padMode = 'start', fs = ' ' /* "\u2800" */) => {
  if (str === undefined) str = '---';
  str = '' + str;
  str = ('' + str).slice(0, l);

  switch (padMode) {
    case 'start':
      return str.padStart(l, fs);
    case 'end':
      return str.padEnd(l, fs);
    case 'center':
      return str.padStart(Math.floor((l - str.length) / 2) + str.length, fs).padEnd(l, fs);
  }
};
