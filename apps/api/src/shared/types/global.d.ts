import { User as UserAttributes } from "@template/database";

declare global {
  namespace Express {
    interface User extends UserAttributes {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt?: Date;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
