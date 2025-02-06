/* eslint-disable @typescript-eslint/no-unused-vars */


import { Chunk, TransformedData } from "./shared";


export const splitDateRange = (startDate: Date, endDate: Date): Chunk[] =>  {
  let chunkId = 0;
  const dateChunks = [];
  let currentDate = new Date(startDate);

  while (currentDate < endDate) {
    const chunkStartDate = new Date(currentDate);

    let chunkEndDate = new Date(currentDate);
    chunkEndDate.setMonth(chunkEndDate.getMonth() + 1);


    if (chunkEndDate > endDate) {
      chunkEndDate = new Date(endDate);
    }


    dateChunks.push({
      id: chunkId++,
      chunkStartDate,
      chunkEndDate,
    });

    currentDate = new Date(chunkEndDate);
  }

  return dateChunks;
}

export const fetchData = async (id: number, startDate: Date, endDate: Date): Promise<Record<string,any>[]> => {
  console.log(`Fetching raw data for chunk: ${id}, startDate: ${startDate}, endDate: ${endDate}`);
  // Fetch raw data
  await new Promise((resolve) => setTimeout(resolve, 20000));
  return [
    { id: 1, amount: 100, someRawThings: { bam: 'blippityBlop' } },
    { id: 2, amount: 200, someRawThings: { wam: 'bopbopbop' } },
    { id: 3, amount: 300, someRawThings: { pam: 'achooooo' } },
  ]
}

export const saveRawData = async (id: number, rawData: Record<string,any>[]): Promise<Record<string,any>[]> => {
  console.log('Saving raw data for chunk:', id);
  // Save raw data
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return rawData;
}

export const transformData = async (id: number, rawData: Record<string,any>[]): Promise<TransformedData[]> => {
  console.log('Transforming data for chunk:', id);
  // Transform raw data
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return rawData.map(({ id, amount }) => ({ id, amount }));
}

export const saveTransformedData = async (id: number, transformedData: TransformedData[]): Promise<void> => {
  console.log('Saving transformed data for chunk:', id);
  // Save transformed data
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
