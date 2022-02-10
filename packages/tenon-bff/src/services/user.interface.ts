export interface IUserOptions {
  username: string;
  password: string;
  phone?: string;
  gender?: genderType;
  email?: string;
  freeze?: boolean;
}

/**
 * 0 for male
 * 1 for female
 * 2 for others
 */
export type genderType = 0 | 1 | 2;