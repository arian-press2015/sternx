import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { LogModule } from '../log/log.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GatewayController],
  providers: [GatewayService, PrismaService],
  imports: [LogModule],
})
export class GatewayModule {}
