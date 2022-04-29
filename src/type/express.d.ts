import { Cat } from '../cats/cats.schema';

declare global {
  namespace Express {
    interface Request {
      user: Cat;
    }
  }
}
