export default interface CreateUserDTO {
  username: string;

  password: string;

  // eslint-disable-next-line camelcase
  is_admin?: boolean;
};
