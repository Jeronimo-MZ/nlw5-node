import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
    async create(email: string): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ email });

        if (user) {
            return user;
        }

        const newUser = usersRepository.create({ email });

        await usersRepository.save(newUser);

        return newUser;
    }
}

export { UserService };
