/* eslint-disable @typescript-eslint/no-unused-vars */
// @@@SNIPSTART money-transfer-project-template-ts-workflow
import { proxyActivities } from '@temporalio/workflow';

import type * as activities from './activities';
import { ImportDateSpan } from './shared';

const { fetchData, saveRawData, transformData, saveTransformedData, splitDateRange } = proxyActivities<typeof activities>({
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
  const dateChunks = await splitDateRange(startDate, endDate);
  
  const tasks = dateChunks.map(({ chunkId, chunkStartDate, chunkEndDate }) =>
    (async () => {
      await executeChunkWorkflow(chunkId, chunkStartDate, chunkEndDate);
    })()
  );

  await Promise.all(tasks);
}

async function executeChunkWorkflow(chunkId: string, startDate: Date, endDate: Date): Promise<void> {
  const fetchedRawData = await fetchData(chunkId, startDate, endDate);
  const savedRawData = await saveRawData(chunkId, fetchedRawData);
  const transformedData = await transformData(chunkId, savedRawData);
  await saveTransformedData(chunkId, transformedData);
}
