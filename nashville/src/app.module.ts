import { Module } from '@nestjs/common';
import { GrpcClientModule } from './grpc-client/grpc-client.module';
@Module({
  imports: [GrpcClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
