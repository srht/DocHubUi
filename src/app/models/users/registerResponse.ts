import { ErrorModel } from "./errormodel";

export class RegisterResponseModel {
    email!: string;
    role!: string;
    resultmessage!: string;
    errors!: ErrorModel[];
    succeeded!: boolean;
}
