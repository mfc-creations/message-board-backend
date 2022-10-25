import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../dtos/user.dto";
import MessageService from "../services/message.service";

class MessageController {
  public mesageService = new MessageService();

  public fetchMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const limit = req.query.limit as string;
      const skip = req.query.skip as string;

      const data = await this.mesageService.fetchMessages(
        parseInt(limit),
        parseInt(skip)
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(error.status ?? 500).json({
        message: error.message ?? "Something went wrong",
      });
    }
  };
}

export default MessageController;
