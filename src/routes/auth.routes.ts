import { Router } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import AuthController from "../controllers/auth.controller";
// import { CreateUserDto } from '~/dtos/users.dto';
import Route from "../interfaces/router.interface";
// import authMiddleware from '~/middlewares/auth.middleware';
import validationMiddleware from "../middlewares/validation.middleware";
class AuthRoute implements Route {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `/v1${this.path}/signup`,
      validationMiddleware(CreateUserDto),
      this.authController.signUp
    );
    this.router.post(
      `/v1${this.path}/login`,
      validationMiddleware(CreateUserDto),
      this.authController.login
    );
  }
}

export default AuthRoute;
