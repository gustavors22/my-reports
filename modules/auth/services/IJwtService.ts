export default interface IJwtService {
    sign(payload: any): string;
}