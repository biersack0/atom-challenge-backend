export interface IAuthService {
    sign(payload: object, expiresIn?: string | number): string;
    verify(token: string): any;
}
