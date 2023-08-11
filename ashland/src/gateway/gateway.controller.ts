import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @EventPattern('create-task')
  async createTaskEvent(data: Record<string, unknown>) {
    return this.gatewayService.createTaskEvent(data);
  }

  @EventPattern('findOne-task')
  async findOneTaskEvent(data: Record<string, unknown>) {
    return this.gatewayService.findOneTaskEvent(data);
  }

  @EventPattern('findAll-tasks')
  async findAllTasksEvent(data: Record<string, unknown>) {
    return this.gatewayService.findAllTasksEvent(data);
  }

  @EventPattern('delete-task')
  async deleteTaskEvent(data: Record<string, unknown>) {
    return this.gatewayService.deleteTaskEvent(data);
  }
}
