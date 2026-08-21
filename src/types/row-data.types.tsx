// Shape of the data for the cells of the weather table
interface Cell {
  hour: number;
  label: string;
  temp: number | null;
  humidity: number | null;
  wind: number | null;
  precip: number | null;
}

// Shape of the data for the rows of the weather table
interface Row {
  date: string;
  cells: Cell[];
}

export type { Cell, Row };
