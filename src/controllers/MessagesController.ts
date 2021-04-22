import { Response, Request } from "express";
import { MessagesServices } from "../services/MessagesServices";

class MessagesController {
    async create(request: Request, response: Response) {
        const { admin_id, text, user_id } = request.body;
        const messagesServices = new MessagesServices();

        const message = await messagesServices.create({
            admin_id,
            text,
            user_id,
        });

        return response.json(message);
    }

    async showByUser(request: Request, response: Response) {
        const { user_id } = request.params;
        const messagesServices = new MessagesServices();

        const messages = await messagesServices.listByUser(user_id);

        return response.json({ messages });
    }
}

export { MessagesController };
