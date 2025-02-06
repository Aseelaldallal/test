
import { Chunk } from './shared';

export function splitDateRangeIntoMonthChunks(startDate: Date, endDate: Date): Chunk[] {
  const chunks: Chunk[] = [];
  let currentStart = new Date(startDate);

  while (currentStart < endDate) {
    const year = currentStart.getFullYear();
    const month = currentStart.getMonth();
    let currentEnd = new Date(year, month + 1, 0);
    
    if (currentEnd > endDate) {
      currentEnd = new Date(endDate);
    }
    
    const chunkStartDate = new Date(currentStart);
    const chunkEndDate = new Date(currentEnd);
    chunks.push({
      id: `${chunkStartDate.toISOString().split('T')[0]}-${chunkEndDate.toISOString().split('T')[0]}`,
      chunkStartDate,
      chunkEndDate,
    });
    
    currentStart = new Date(currentEnd);
    currentStart.setDate(currentStart.getDate() + 1);
  }
  
  return chunks;
}