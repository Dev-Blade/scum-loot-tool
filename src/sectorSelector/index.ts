import {unixTimestamp} from '../utils/timeUtils';

const rowSubstitutes = ['D', 'C', 'B', 'A', 'Z'];
const columnSubstitutes = ['4', '3', '2', '1', '0'];

// this function will select random sectors from the grid
// - makes sure that each row has at least one sector selected
// - makes sure that each column has at least one sector selected
// - makes sure that each sector is selected only once
// - makes sure that the number of selected sectors is equal to the count
// - sectors beyond 5 are selected completely randomly
export const selectRandomSectors = (count: number) => {
  const grid: number[][] = Array.from({length: 5}, () => Array(5).fill(0));
  const selected: string[] = [];

  // Function to check if the row is already filled
  const isRowFilled = (row: number): boolean => {
    return grid[row].includes(1);
  };

  // Function to check if the column is already filled
  const isColFilled = (col: number): boolean => {
    for (let i = 0; i < 5; i++) {
      if (grid[i][col] === 1) {
        return true;
      }
    }
    return false;
  };

  for (let row = 0; row < 5; row++) {
    let col = Math.floor(Math.random() * 5);
    while (isColFilled(col)) {
      col = Math.floor(Math.random() * 5);
    }

    grid[row][col] = 1;
    selected.push(rowSubstitutes[row] + columnSubstitutes[col]);
  }
  const diff = count - 5;

  for (let i = 0; i < diff; i++) {
    let col = Math.floor(Math.random() * 3) + 1;
    let row = Math.floor(Math.random() * 3) + 1;
    let maxTries = 200;

    while (
      grid[row][col] === 1 ||
      (--maxTries > 0 && (grid[row - 1][col] === 1 || grid[row + 1][col] === 1 || grid[row][col - 1] === 1 || grid[row][col + 1] === 1))
    ) {
      col = Math.floor(Math.random() * 3) + 1;
      row = Math.floor(Math.random() * 3) + 1;
    }
    console.log(200 - maxTries + " tries to find a sector that doesn't touch any other sector");
    grid[row][col] = 1;
    selected.push(rowSubstitutes[row] + columnSubstitutes[col]);
  }
  console.log('```');
  console.log(grid);
  console.log('```');
  return selected;
};

export const processSectors = () => {
  const sectors = selectRandomSectors(6);
  const strSectors = sectors.join(', ');

  console.log("## Today's New Blue Sectors ##");
  console.log('generated on <t:' + unixTimestamp() + ':F>');
  console.log('# :blue_square: [', strSectors, '] :blue_square: # ');
};
