import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { LogModule } from '../log/log.module';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService],
  imports: [LogModule],
})
export class GatewayModule {}
