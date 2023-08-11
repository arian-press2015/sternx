import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto, FindAllDto } from './dto';

@Injectable()
export class LogService {
  constructor(@Inject('TASKS_SERVICE') private client: ClientProxy) {}

  async createTaskEvent(data: CreateTaskDto) {
    this.client.emit('create-task', data);
    return true;
  }

  async findOneTaskEvent(task_id: number) {
    this.client.emit('findOne-task', { task_id });
    return true;
  }

  async findAllTasksEvent(data: FindAllDto) {
    this.client.emit('findAll-tasks', data);
    return true;
  }

  async deleteTaskEvent(task_id: number) {
    this.client.emit('delete-task', { task_id });
    return true;
  }
}
