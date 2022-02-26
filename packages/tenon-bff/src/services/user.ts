import { BaseService, Service, tenonAppType, io } from "@tenon/node-framework";
import { SERVICE_NAME } from "./constant";
import { IUserOptions } from "./user.interface";

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 15,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 13,
  },
  gender: {
    type: Number,
  },
  email: {
    type: String,
  },
  freeze: {
    type: Boolean,
    default: false,
  }
}

@Service({
  schema: userSchema,
  name: SERVICE_NAME.user,
})
class UserService extends BaseService {

  constructor(app: tenonAppType) {
    super(app);
  }

  async addUser(userInfo: IUserOptions) {
    return this.errorProtectedHandler(async () => {
      return await this.addItem(userInfo);
    });
  }

  async validateNameAndPassword(info: {
    username: string; password: string;
  }) {
    return this.errorProtectedHandler(async () => {
      const [err, users] = await this.getUsers({ username: info.username });
      if (err) throw err;
      if (!users?.[0]) {
        throw new Error(`用户${info.username}不存在`);
      }
      if (info.password === users[0].password) return users[0];
      else throw new Error("用户名或密码不正确");
    });
  }

  async getUsers(condition: any = {}) {
    return this.errorProtectedHandler(async () => {
      return await this.Model.find(condition);
    });
  }

  async updateUser(userInfo: IUserOptions) {
    return await this.errorProtectedHandler(async () => {
      const result = await this.Model.updateOne({ username: userInfo.username }, userInfo);
      if (result.modifiedCount && result.modifiedCount > 0) return "修改成功";
      else if (!result.matchedCount) {
        io.error(result);
        throw new Error(`用户不存在：${userInfo.username}`);
      } else {
        throw new Error(`修改失败`);
      }
    });
  }
}

export { UserService };
