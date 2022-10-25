import { CreateMessageDto } from "../dtos/message.dto";
import Message from "../db/models/Message";

class AuthService {
  public static async saveMesage(messageData: CreateMessageDto): Promise<any> {
    try {
      const newMessge = new Message({
        message: messageData.message,
        user: messageData.user,
      });
      return await newMessge.save();
    } catch (err) {
      throw err;
    }
  }

  public async fetchMessages(limit: number, skip: number): Promise<any> {
    try {
      return await Message.find()
        .skip(skip)
        .limit(limit)
        .populate("user")
        .lean();
    } catch (err) {
      throw err;
    }
  }

  public static async deleteMessage(id: string): Promise<any> {
    try {
      return await Message.deleteOne({ id });
    } catch (err) {
      throw err;
    }
  }
}
export default AuthService;
