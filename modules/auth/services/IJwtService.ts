export default interface IJwtService {
    sign(payload: any): string;
    verify(token: string): string | object;
}