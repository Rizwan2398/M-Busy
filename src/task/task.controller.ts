import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService,
    ) {}


    @Get('/user/:userId')
    async getTasks(@Param('userId') userId: string): Promise<any> {
        // Check param
        if (!userId) {
            throw new BadRequestException('Missing param (userId)');
        }

        const numberRegex = /^\d+$/;
        if (!numberRegex.test(userId)) {
            throw new BadRequestException('Invalid userId (NaN)');
        }

        return this.taskService.getUserTasks(userId);
    }
    @Post()


    async addTask(
        @Body() payload: { name: string; userId: string; priority: number },
    ): Promise<void> {
        if (!payload.name || !payload.userId || !payload.priority) {
            throw new BadRequestException(
                'Missing required fields (name, userId or priority)',
            );
        }

        // Check userId validity
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(payload.userId)) {
            throw new BadRequestException('Invalid userId (NaN)');
        }

        // Check user existence
        if (!(await this.userService.getUserById(payload.userId))) {
            throw new BadRequestException('User not found');
        }

        // Check priority validity
        if (!numberRegex.test(String(payload.priority))) {
            throw new BadRequestException('Invalid priority (NaN)');
        }

        await this.taskService.addTask(
            payload.name,
            payload.userId,
            payload.priority,
        );
    }


}
