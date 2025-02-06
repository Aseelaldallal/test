
export const namespace = 'default';
export const taskQueueName = 'ecom-import';

export interface ImportDateSpan {
  startDate: Date;
  endDate: Date;
}


export interface TransformedData {
  transactions: {
    id: string;
    amount: number;
  }[];
}
