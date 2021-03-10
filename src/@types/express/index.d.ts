import TokenPayloadDTO from '@Modules/Auth/Dtos/TokenPayloadDTO';

// tornando as informações dadas pelo DTO globais quando autenticado
declare global {
    declare namespace Express {
        interface Request {
            auth: TokenPayloadDTO;
        }
    }
}
