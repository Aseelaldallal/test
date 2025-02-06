// workflow.ts

import { startChild } from '@temporalio/workflow';
import { Chunk } from '../shared';
import { processChunk } from './childChunkWorkflow';
export async function importData(monthChunks: Chunk[]): Promise<void> {

  const childWorkflowPromises = monthChunks.map(({ id, chunkStartDate, chunkEndDate }) =>
    startChild(processChunk, {
      workflowId: `chunk-${id}`,
      args: [id, chunkStartDate, chunkEndDate],
    })
  );

  await Promise.all(childWorkflowPromises);
}