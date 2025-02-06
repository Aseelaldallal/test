// workflow.ts

import { startChild } from '@temporalio/workflow';
import { ImportDateSpan } from '../shared';
import { processChunk } from './childChunkWorkflow';
import { splitDateRange } from '../activities';

export async function importData(importDateSpan: ImportDateSpan): Promise<void> {
  const { startDate, endDate } = importDateSpan;
  const dateChunks = splitDateRange(startDate, endDate);

  const childWorkflowPromises = dateChunks.map(({ id, chunkStartDate, chunkEndDate }) =>
    startChild(processChunk, {
      workflowId: `chunk-${id}`,
      args: [id, chunkStartDate, chunkEndDate],
    })
  );

  await Promise.all(childWorkflowPromises);
}