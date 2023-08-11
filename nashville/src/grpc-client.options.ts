import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'task',
    protoPath: join(__dirname, 'task/task.proto'),
    url: 'localhost:3030',
  },
};
