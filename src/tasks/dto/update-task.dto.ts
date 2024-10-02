import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: TaskStatus;
}
