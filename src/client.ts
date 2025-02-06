// client.ts
import { Connection, WorkflowClient } from '@temporalio/client';


import { namespace, taskQueueName } from './shared';
import { importData } from './workflows/parentImportWorkflow';

async function run() {
  const connection = await Connection.connect();
  const client = new WorkflowClient({ connection, namespace });

  console.log('Starting Data import');

  const handle = await client.start(importData, {
    args: [{ startDate: new Date('2015-01-01'), endDate: new Date('2024-03-01') }],
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

