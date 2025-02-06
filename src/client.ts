// client.ts
import { Connection, WorkflowClient } from '@temporalio/client';


import { namespace, taskQueueName } from './shared';
import { importData } from './workflows/parentImportWorkflow';
import { splitDateRangeIntoMonthChunks } from './dateUtils';

async function run() {
  const connection = await Connection.connect();
  const client = new WorkflowClient({ connection, namespace });

  console.log('Starting Data import');

  const startDate = new Date('2015-01-01');
  const endDate = new Date('2024-03-01');
  const monthChunks = splitDateRangeIntoMonthChunks(startDate, endDate);
  console.log('Month Chunks:', monthChunks);

  const handle = await client.start(importData, {
    args: monthChunks,
    taskQueue: taskQueueName,
    workflowId: 'data-import-bussiness-14141',
  });

  console.log(
    `Started Workflow ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`
  );
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

