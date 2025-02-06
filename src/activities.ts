/* eslint-disable @typescript-eslint/no-unused-vars */


import { Chunk, TransformedData } from "./shared";


export const splitDateRange = (startDate: Date, endDate: Date): Chunk[] => {
  
  const chunks = [];
  for (let i = 0; i < 100; i++) {
    chunks.push({
      id: i + 1,
      chunkStartDate: new Date('2015-01-01'),
      chunkEndDate: new Date('2015-01-01'),
    });
  }

  return chunks;
};

export const fetchData = async (id: number, startDate: Date, endDate: Date): Promise<Record<string,any>[]> => {
  console.log(`Fetching raw data for chunk: ${id}, startDate: ${startDate}, endDate: ${endDate}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, amount: 100, someRawThings: { bam: 'blippityBlop' } },
    { id: 2, amount: 200, someRawThings: { wam: 'bopbopbop' } },
    { id: 3, amount: 300, someRawThings: { pam: 'achooooo' } },
  ]
}

export const saveRawData = async (id: number, rawData: Record<string,any>[]): Promise<Record<string,any>[]> => {
  // Save raw data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rawData;
}

export const transformData = async (id: number, rawData: Record<string,any>[]): Promise<TransformedData[]> => {
  // Transform raw data
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return rawData.map(({ id, amount }) => ({ id, amount }));
}

export const saveTransformedData = async (id: number, transformedData: TransformedData[]): Promise<void> => {
 
  // Save transformed data
  await new Promise((resolve) => setTimeout(resolve, 15000));
}
