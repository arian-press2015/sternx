import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, FindAllDto, Task } from './dto';

@Injectable()
export class GatewayService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(data: CreateTaskDto) {
    const task = await this.prisma.tasks.create({
      select: {
        id: true,
        parentId: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      data: data,
    });

    const { createdAt, updatedAt, ...info } = task;

    return {
      ...info,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  }

  async findOneTask(id: number) {
    const task = await this.prisma.tasks.findFirst({
      select: {
        id: true,
        parentId: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: id,
      },
    });

    const { createdAt, updatedAt, ...info } = task;

    return {
      ...info,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  }

  async findAllTasks(data: FindAllDto) {
    const task = await this.prisma.tasks.findMany({
      select: {
        id: true,
        parentId: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: data.offset,
      take: data.limit,
    });

    return task.map((task) => {
      const { createdAt, updatedAt, ...info } = task;

      return {
        ...info,
        createdAt: createdAt.getTime(),
        updatedAt: updatedAt.getTime(),
      };
    });
  }

  async deleteTask(id: number) {
    const task = await this.prisma.tasks.delete({
      select: {
        id: true,
        parentId: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: id,
      },
    });

    const { createdAt, updatedAt, ...info } = task;

    return {
      ...info,
      createdAt: createdAt.getTime(),
      updatedAt: updatedAt.getTime(),
    };
  }
}
