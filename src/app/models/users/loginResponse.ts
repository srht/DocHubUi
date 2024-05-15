import { ErrorModel } from "./errormodel";

export class LoginResponseModel {
    username!: string;
    email!: string;
    token!: string;
    resultmessage!: string;
    errors!: ErrorModel[];
    succeeded!: boolean;
}