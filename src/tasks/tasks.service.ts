import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const found = await this.tasksRepository.find();
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" does not exist.`);
    }

    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Task with ID "${id}" does not exist.`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    const task = await this.getTaskById(id);
    task.title = title;
    task.description = description;
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }
}
