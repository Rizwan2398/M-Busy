import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from '../user/user.module';
import { Task } from '../model/task';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [TaskService],
    controllers: [TaskController],
    imports: [TypeOrmModule.forFeature([Task]), UserModule],
    exports: [],
})
export class TaskModule {}
