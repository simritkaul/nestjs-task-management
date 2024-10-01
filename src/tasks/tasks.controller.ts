import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  //   tasksService: TasksService;
  //   constructor(tasksService: TasksService) {
  //     this.tasksService = tasksService;
  //   }

  // Better way
  constructor(private tasksService: TasksService) {}
}
