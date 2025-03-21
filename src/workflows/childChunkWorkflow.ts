// childChunkWorkflow.ts

import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const { fetchData, saveRawData, transformData, saveTransformedData } = proxyActivities<typeof activities>({
  retry: {
    initialInterval: '1 second',
    maximumInterval: '1 minute',
    backoffCoefficient: 2,
    maximumAttempts: 5,
  },
  startToCloseTimeout: '5 minutes',
});

export async function processChunk(
  id: string,
  startDate: Date,
  endDate: Date,
  chunkToFailId: string
): Promise<void> {
  const rawData = await fetchData(id, startDate, endDate);
  const savedData = await saveRawData(id, rawData, chunkToFailId);
  const transformedData = await transformData(id, savedData);
  await saveTransformedData(id, transformedData);
}