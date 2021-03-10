import UpsertAuthDTO from '../Dtos/UpsertAuthDTO';
import Auth from '../Infra/Typeorm/Entities/Auth';

export default interface AuthRepositoryInterface {
  upsert(data: UpsertAuthDTO): Promise<Auth>;
  delete(userId: string): Promise<void>;
  findByUserId(userId: string): Promise<Auth | undefined>;
//   findByToken(token: string): Promise<Token | undefined>;
}
