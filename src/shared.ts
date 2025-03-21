
export const namespace = 'default';
export const taskQueueName = 'ecom-import';

export interface ImportDateSpan {
  startDate: Date;
  endDate: Date;
}


export interface TransformedData {
  id: number;
  amount: number;
}

export interface Chunk {
  id: string;
  chunkStartDate: Date;
  chunkEndDate: Date;
}