import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.NEW,
    };

    this.tasks?.push(task);

    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks?.find((task) => task.id === id);
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks?.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto;
    let task = this.getTaskById(id);
    if (task) {
      task.title = title;
      task.description = description;
      task.status = status;
    }

    return task;
  }
}
