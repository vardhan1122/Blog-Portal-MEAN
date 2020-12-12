import {IUser} from './IUser';

export interface UserResult {
  result : string,
  token? : string,
  user? : IUser
}
