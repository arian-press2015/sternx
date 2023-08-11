export class Task {
  readonly id: number;
  readonly parentId?: number;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
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
