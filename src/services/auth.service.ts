import jwt from "jsonwebtoken";
import { CreateUserDto } from "../dtos/user.dto";
import { TokenData } from "../interfaces/auth.interface";
import User from "../db/models/User";
import bcrypt from "bcrypt";

class AuthService {
  public async signUp(userData: CreateUserDto): Promise<any> {
    try {
      const user = await User.findOne({ username: userData.username });
      if (user) {
        throw { message: "User already exist" };
      }
      const hashedPass = await bcrypt.hash(userData.password, 10);
      const newUser = new User({
        username: userData.username,
        password: hashedPass,
      });
      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }

  public async login(userData: CreateUserDto): Promise<any> {
    try {
      const user = await User.findOne({ username: userData.username });
      if (!user) {
        throw { message: "User not exist" };
      }
      const isMatch = await bcrypt.compare(userData.password, user.password);
      if (!isMatch) {
        throw { message: "Password not match" };
      }

      return user;
    } catch (err) {
      throw err;
    }
  }

  public async createToken(user) {
    let dataStoredInToken: TokenData = {
      id: user.id,
      username: user.email,
    };
    const secret: string = "process.env.JWT_SECRET" as string;
    const expiresIn: number = 60 * 60 * 24; //24 hrs

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, {
        expiresIn,
      }),
    };
  }
}
export default AuthService;
