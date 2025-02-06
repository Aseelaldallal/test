// worker.ts
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

import { namespace, taskQueueName } from './shared';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows/index'),
    activities,
    namespace,
    taskQueue: taskQueueName,
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});