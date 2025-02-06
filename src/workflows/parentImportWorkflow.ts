// workflow.ts

import { executeChild, ParentClosePolicy } from '@temporalio/workflow';
import { Chunk } from '../shared';
import { processChunk } from './childChunkWorkflow';

export async function importData(monthChunks: Chunk[], chunkToFailId: string): Promise<void> {

  const childWorkflowPromises = monthChunks.map(({ id, chunkStartDate, chunkEndDate }) =>
    executeChild(processChunk, {
      workflowId: `chunk-${id}`,
      args: [id, chunkStartDate, chunkEndDate, chunkToFailId],
      parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_ABANDON,
    })
  );

  await Promise.allSettled(childWorkflowPromises);
}