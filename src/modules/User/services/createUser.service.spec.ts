import FakeUserRepository from '../infra/database/fake.user.repository';
import CreateUserService from './createUser.service';

describe('CreateUser', () => {
  it('should be able to create new user', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepo);

    const user = await createUser.execute({
      username: 'Immanuel Kant',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
