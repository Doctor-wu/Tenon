import { BaseService, Service, tenonAppType } from "../framework";
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
    let err, result;
    try {
      result = await this.addItem(userInfo);
    } catch (e) {
      err = e;
    }
    return [err, result];
  }
}

export { UserService };
