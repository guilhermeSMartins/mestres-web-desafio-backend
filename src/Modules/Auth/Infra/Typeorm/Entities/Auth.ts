import {
  Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('authorizations')
export default class Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column()
    userId: string;
}
