import User from '../Infra/Typeorm/Entities/User';

export default interface UpdateUserDTO {
    username?: string;

    password?: string;

    // eslint-disable-next-line camelcase
    is_admin?: boolean;

    id: string;
};
