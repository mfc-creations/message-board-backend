import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import AuthService from "../services/auth.service";

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    try {
      const user = await this.authService.signUp(userData);

      const tokenData = await this.authService.createToken(user);

      res.status(201).json({
        data: user,
        message: "Signup",
        accessToken: `Bearer ${tokenData.token}`,
      });
    } catch (error) {
      res.status(error.status ?? 500).json({
        message: error.message ?? "Something went wrong",
      });
    }
  };

  public login = async (req: any, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;
    try {
      const user = await this.authService.login(userData);

      const tokenData = await this.authService.createToken(user);
      res.status(201).json({
        data: user,
        message: "Login",
        accessToken: `Bearer ${tokenData.token}`,
      });
    } catch (error) {
      res.status(error.status ?? 500).json({
        message: error.message ?? "Something went wrong",
      });
    }
  };
}

export default AuthController;
