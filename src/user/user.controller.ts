import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../model/user';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Get()
    async getUser(@Body() payload: { email: string }): Promise<User> {
        // payload validation
        if (!payload.email) {
            throw new BadRequestException('Email is required');
        }

        // Check email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(payload.email)) {
            throw new BadRequestException('Invalid email');
        }
        return this.userService.getUser(payload.email);
    }
    @Post()
    async addUser(@Body() payload: { email: string }): Promise<void> {
        // payload validation
        if (!payload.email) {
            throw new BadRequestException('Email and password are required');
        }

        // Check email regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(payload.email)) {
            throw new BadRequestException('Invalid email');
        }
        await this.userService.addUser(payload.email);

        return;
    }


}
