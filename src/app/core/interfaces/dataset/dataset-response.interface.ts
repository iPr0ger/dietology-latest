export interface DatasetResponseInterface<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
