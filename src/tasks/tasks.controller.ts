import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksStatusEnums } from 'src/enums/tasksEnums';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  public async create(
    @Body() createTaskDto: CreateTaskDto,
    @Headers('Authorization') authToken: string,
  ) {
    return this.tasksService.createTask(createTaskDto, authToken);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async delete(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('alreadytasks')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async checkAlreadyTask(@Headers('Authorization') authToken: string) {
    console.log('%c⧭', 'color: #f200e2', 'bati aqui');
    return this.tasksService.checkAlreadyTask(authToken);
  }

  @Get('pending')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async getPendingTasks(@Headers('Authorization') authToken: string) {
    const status = TasksStatusEnums.PENDING;

    return this.tasksService.getTaskByStatus(status, authToken);
  }

  @Get('progress')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async getProgressTasks(@Headers('Authorization') authToken: string) {
    const status = TasksStatusEnums.IN_PROGRESS;

    return this.tasksService.getTaskByStatus(status, authToken);
  }

  @Get('finalized')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async getFinalizedTasks(@Headers('Authorization') authToken: string) {
    const status = TasksStatusEnums.FINALIZED;

    return this.tasksService.getTaskByStatus(status, authToken);
  }

  // tem sempre que ficar no final
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
}
