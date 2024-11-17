import { IResponseAuthorizer } from "../../../common/interfaces/authorizer";
import { IAuthUserData } from "./register";

interface IAuthenticationService {
  auth(data: IAuthUserData): Promise<IResponseAuthorizer>;
}

export default IAuthenticationService;
