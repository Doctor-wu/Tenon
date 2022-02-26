import { createServer } from "@tenon/node-framework";
import { FlowController } from './controller';

export const bootstrap = async () => {
  const server = await createServer({
    server: {
      port: 4396,
      name: 'flow-server'
    },
    controllers: [
      FlowController,
    ]
  });

  await server.start();
}