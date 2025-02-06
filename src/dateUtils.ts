
import { Chunk } from './shared';

export function splitDateRangeIntoMonthChunks(startDate: Date, endDate: Date): Chunk[] {
  const chunks: Chunk[] = [];
  let currentStart = new Date(startDate);
  let id = 1;
  
  while (currentStart < endDate) {
    const year = currentStart.getFullYear();
    const month = currentStart.getMonth();
    let currentEnd = new Date(year, month + 1, 0);
    
    if (currentEnd > endDate) {
      currentEnd = new Date(endDate);
    }
    
    chunks.push({
      id: id++,
      chunkStartDate: new Date(currentStart),
      chunkEndDate: new Date(currentEnd),
    });
    
    currentStart = new Date(currentEnd);
    currentStart.setDate(currentStart.getDate() + 1);
  }
  
  return chunks;
}