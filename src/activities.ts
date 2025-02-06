/* eslint-disable @typescript-eslint/no-unused-vars */


import { addMonths } from "date-fns";
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
  console.log('chunks', chunks);
  return chunks;
};

export const fetchData = async (id: number, startDate: Date, endDate: Date): Promise<Record<string,any>[]> => {
  console.log(`Fetching raw data for chunk: ${id}, startDate: ${startDate}, endDate: ${endDate}`);
  // Fetch raw data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, amount: 100, someRawThings: { bam: 'blippityBlop' } },
    { id: 2, amount: 200, someRawThings: { wam: 'bopbopbop' } },
    { id: 3, amount: 300, someRawThings: { pam: 'achooooo' } },
  ]
}

export const saveRawData = async (id: number, rawData: Record<string,any>[]): Promise<Record<string,any>[]> => {
  console.log('Saving raw data for chunk:', id);
  // Save raw data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rawData;
}

export const transformData = async (id: number, rawData: Record<string,any>[]): Promise<TransformedData[]> => {
  console.log('Transforming data for chunk:', id);
  // Transform raw data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return rawData.map(({ id, amount }) => ({ id, amount }));
}

export const saveTransformedData = async (id: number, transformedData: TransformedData[]): Promise<void> => {
  console.log('Saving transformed data for chunk:', id);
  // Save transformed data
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
