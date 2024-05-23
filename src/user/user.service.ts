import {
    BadRequestException,
    ConflictException,
    Injectable,
} from '@nestjs/common';
import { User } from '../model/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async addUser(email: string): Promise<void> {
        const user = await this.usersRepository.findOne({
            where: { email: email },
        });

        if (user !== null) {
            throw new ConflictException('User with email already exists');
        }
        const newUser = this.usersRepository.create({ email });
        await this.usersRepository.save(newUser);
        return Promise.resolve();
    }
    async getUserById(id: string) {
        return await this.usersRepository.findOne({ where: { id } });
    }


    async resetData() {
        await this.usersRepository.clear();
    }

    async getUser(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (user === null) {
            throw new BadRequestException('User not found');
        }
        return user;
    }


}
