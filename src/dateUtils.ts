// src/dateUtils.ts
import { Chunk } from './shared';

/**
 * Splits a date range into one-month chunks.
 * Each chunk is represented by an object with an id, chunkStartDate, and chunkEndDate.
 *
 * @param startDate - The start date of the overall range.
 * @param endDate - The end date of the overall range.
 * @returns An array of one-month chunks.
 */
export function splitDateRangeIntoMonthChunks(startDate: Date, endDate: Date): Chunk[] {
  const chunks: Chunk[] = [];
  let currentStart = new Date(startDate);
  let id = 1;
  
  while (currentStart < endDate) {
    // Calculate the last day of the current month
    const year = currentStart.getFullYear();
    const month = currentStart.getMonth();
    // new Date(year, month + 1, 0) gives the last day of the current month
    let currentEnd = new Date(year, month + 1, 0);
    
    // Ensure we don't exceed the overall endDate
    if (currentEnd > endDate) {
      currentEnd = new Date(endDate);
    }
    
    chunks.push({
      id: id++,
      chunkStartDate: new Date(currentStart),
      chunkEndDate: new Date(currentEnd),
    });
    
    // Advance currentStart to the next day after currentEnd
    currentStart = new Date(currentEnd);
    currentStart.setDate(currentStart.getDate() + 1);
  }
  
  return chunks;
}