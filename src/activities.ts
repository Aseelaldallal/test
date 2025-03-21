/* eslint-disable @typescript-eslint/no-unused-vars */


import { Chunk, TransformedData } from "./shared";


export const fetchData = async (id: string, startDate: Date, endDate: Date): Promise<Record<string,any>[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, amount: 100, someRawThings: { bam: 'blippityBlop' } },
    { id: 2, amount: 200, someRawThings: { wam: 'bopbopbop' } },
    { id: 3, amount: 300, someRawThings: { pam: 'achooooo' } },
  ]
}

export const saveRawData = async (id: string, rawData: Record<string,any>[], chunkToFailId: string): Promise<Record<string,any>[]> => {
  // Save raw data
  // if(id === chunkToFailId) {
  //   throw new Error('Failed to save');
  // }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rawData;
}

export const transformData = async (id: string, rawData: Record<string,any>[]): Promise<TransformedData[]> => {
  // Transform raw data
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return rawData.map(({ id, amount }) => ({ id, amount }));
}

export const saveTransformedData = async (id: string, transformedData: TransformedData[]): Promise<void> => {
 
  // Save transformed data
  await new Promise((resolve) => setTimeout(resolve, 15000));
}
