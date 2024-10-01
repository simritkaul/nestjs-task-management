import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  //   tasksService: TasksService;
  //   constructor(tasksService: TasksService) {
  //     this.tasksService = tasksService;
  //   }

  // Better way
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }
}
