import { createConnection } from 'typeorm';

export default class TypeOrm {
  public async execute() {
    try {
      await createConnection();
    } catch (err) {
      console.log(err);
    }
  }
}
