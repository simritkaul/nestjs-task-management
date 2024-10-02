import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

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
    const found = this.tasks?.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return found;
  }

  deleteTask(id: string): void {
    const task = this.getTaskById(id);
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

  private filterTaskBySearch(task: Task, search: string): boolean {
    return (
      task.title?.toLowerCase()?.includes(search.toLowerCase()) ||
      task.description?.toLowerCase()?.includes(search?.toLowerCase())
    );
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let filteredTasks = this.getAllTasks();

    if (status) {
      filteredTasks = filteredTasks?.filter((task) => task.status === status);
    }

    if (search) {
      filteredTasks = filteredTasks?.filter((task) =>
        this.filterTaskBySearch(task, search),
      );
    }

    return filteredTasks;
  }
}
