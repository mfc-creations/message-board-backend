import { Router } from "express";
import { CreateMessageDto } from "../dtos/message.dto";
import MessgeController from "../controllers/message.controller";
// import { CreateUserDto } from '~/dtos/users.dto';
import Route from "../interfaces/router.interface";
// import authMiddleware from '~/middlewares/auth.middleware';
import validationMiddleware from "../middlewares/validation.middleware";
class AuthRoute implements Route {
  public path = "/message";
  public router = Router();
  public messageController = new MessgeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `/v1${this.path}/messages`,
      this.messageController.fetchMessages
    );
  }
}

export default AuthRoute;
