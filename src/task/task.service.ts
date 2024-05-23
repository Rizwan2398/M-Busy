import { Injectable } from '@nestjs/common';
import { Task } from '../model/task';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        const task = this.tasksRepository.create({ userId, name, priority });
        return await this.tasksRepository.save(task);
    }

    async getTaskByName(name: string): Promise<Task> {
        return await this.tasksRepository.findOne({ where: { name } });
    }

    getUserTasks(userId: string): Promise<Task[]> {
        return this.tasksRepository.find({ where: { userId } });
    }

    async resetData() {
        await this.tasksRepository.clear();
    }
}
