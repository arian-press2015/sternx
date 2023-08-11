import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  async createTaskEvent(data: Record<string, unknown>) {
    console.log(data);
    return true;
  }

  async findOneTaskEvent(data: Record<string, unknown>) {
    console.log(data);
    return true;
  }

  async findAllTasksEvent(data: Record<string, unknown>) {
    console.log(data);
    return true;
  }

  async deleteTaskEvent(data: Record<string, unknown>) {
    console.log(data);
    return true;
  }
}
