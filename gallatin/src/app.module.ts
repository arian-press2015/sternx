import { Module } from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [GatewayModule, LogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
