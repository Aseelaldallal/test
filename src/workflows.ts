
import { proxyActivities } from '@temporalio/workflow';

import type * as activities from './activities';
import { ImportDateSpan } from './shared';
import { splitDateRange } from './activities';

const { fetchData, saveRawData, transformData, saveTransformedData } = proxyActivities<typeof activities>({
  retry: {
    initialInterval: '1 second',
    maximumInterval: '1 minute',
    backoffCoefficient: 2,
    maximumAttempts: 5,
  },
  // Each Activity must complete within 2 minutes or else it times out
  startToCloseTimeout: '2 minutes',
});


export async function importData(importDateSpan: ImportDateSpan): Promise<void> {

  const { startDate, endDate } = importDateSpan;
  const dateChunks = splitDateRange(startDate, endDate);
  
  const tasks = dateChunks.map(({ id, chunkStartDate, chunkEndDate }) =>
    (async () => {
      await executeChunkWorkflow(id, chunkStartDate, chunkEndDate);
    })()
  );

  await Promise.all(tasks);
}

async function executeChunkWorkflow(id: number, startDate: Date, endDate: Date): Promise<void> {
  const fetchedRawData = await fetchData(id, startDate, endDate);
  const savedRawData = await saveRawData(id, fetchedRawData);
  const transformedData = await transformData(id, savedRawData);
  await saveTransformedData(id, transformedData);
}
