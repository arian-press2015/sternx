export class Task {
  readonly id: number;
  readonly parentId?: number;
  readonly title: string;
  readonly description: string;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export class CreateTaskDto {
  readonly parentId?: number;
  readonly title: string;
  readonly description: string;
}

export class FindAllDto {
  readonly offset?: number;
  readonly limit?: number;
}

export class TaskById {
  readonly id: number;
}
