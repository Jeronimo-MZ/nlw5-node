import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
    private usersRepository: Repository<User>;
    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }
    async create(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });

        if (user) {
            return user;
        }

        const newUser = this.usersRepository.create({ email });

        await this.usersRepository.save(newUser);

        return newUser;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
        return user;
    }
}

export { UsersService };
