import { Injectable } from '@nestjs/common';
import { CreateTaskDto, FindAllDto, Task } from './dto';

@Injectable()
export class GatewayService {
  async createTask(data: CreateTaskDto) {
    const task: Task = {
      id: 0,
      parentId: data.parentId ? data.parentId : null,
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return task;
  }

  async findOneTask(id: number) {
    const task: Task = {
      id: 0,
      parentId: null,
      title: 'my task',
      description: 'nothing!',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return task;
  }

  async findAllTasks(data: FindAllDto) {
    const tasks: Task[] = [
      {
        id: 0,
        parentId: null,
        title: 'my task',
        description: 'nothing!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return tasks;
  }

  async deleteTask(id: number) {
    return true;
  }
}
