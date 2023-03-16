import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/users.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { getJWt } from 'src/utils/helpers/jwtHelper';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks')
    private readonly taskModel: Model<User>,
  ) {}

  public async createTask(
    createTaskDto: CreateTaskDto,
    authToken: string,
  ): Promise<User> {
    const { userId } = await this.getUserId(authToken);

    const task = {
      ...createTaskDto,
      userId,
    };

    const newTask = new this.taskModel(task);
    await newTask.save();

    return newTask;
  }

  public async updateTask(
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    const { _id } = updateTaskDto;
    const task = await this.taskModel.findById(_id);

    if (!task) {
      throw new NotFoundException(`The task not found.`);
    }

    await this.taskModel.findByIdAndUpdate(_id, updateTaskDto);

    return updateTaskDto;
  }

  public async deleteTask(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(`The task not found.`);
    }

    await this.taskModel.findByIdAndDelete(id);

    throw new HttpException('Delete task with success', HttpStatus.OK);
  }

  public async getTaskById(id: string) {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(`The task not found.`);
    }

    return task;
  }

  public async getTaskByStatus(status: number, authToken: string) {
    const { userId } = await this.getUserId(authToken);

    const tasks = await this.taskModel.find({
      status,
      userId,
    });

    return tasks;
  }

  private getUserId(authToken: string) {
    return getJWt(authToken);
  }
}
