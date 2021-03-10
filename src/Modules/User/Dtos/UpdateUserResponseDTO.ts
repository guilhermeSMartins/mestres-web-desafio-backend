import User from '../Infra/Typeorm/Entities/User';

export default interface UpdateUserResponseDTO {
    user: User;
    token: string;
};
