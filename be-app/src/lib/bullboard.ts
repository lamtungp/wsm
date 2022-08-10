import Bull from 'bull';
import { emailProcess } from './nodemailer';
import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';

const emailQueue = new Bull('email', {
  redis: { port: 6379, host: process.env.REDIS_URL },
  limiter: {
    max: 1000,
    duration: 5000,
  },
});

export const { router, setQueues, replaceQueues, addQueue, removeQueue } = createBullBoard([
  new BullAdapter(emailQueue),
]);

emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
  emailQueue.add(data, {
    attempts: 3,
  });
};

export { sendNewEmail };
