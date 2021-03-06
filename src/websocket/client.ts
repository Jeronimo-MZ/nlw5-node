import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesServices } from "../services/MessagesServices";
import { UsersService } from "../services/UsersService";

interface Iparams {
    email: string;
    text: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesService = new MessagesServices();

    socket.on("client_first_access", async (params: Iparams) => {
        let user_id = null;
        const { text, email } = params;

        const userExists = await usersService.findByEmail(email);

        if (!userExists) {
            const user = await usersService.create(email);
            await connectionsService.create({
                socket_id: socket.id,
                user_id: user.id,
            });

            user_id = user.id;
        } else {
            user_id = userExists.id;

            const connection = await connectionsService.findByUserId(
                userExists.id
            );

            if (!connection) {
                await connectionsService.create({
                    socket_id: socket.id,
                    user_id: userExists.id,
                });
            } else {
                connection.socket_id = socket.id;

                await connectionsService.create(connection);
            }
        }

        await messagesService.create({
            text,
            user_id,
        });
    });
});
