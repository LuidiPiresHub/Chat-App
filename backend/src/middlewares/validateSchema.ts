import { Request, Response, NextFunction } from 'express';
import { Schema } from 'zod';

export const validateSchema = (zodSchema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = zodSchema.safeParse(req.body);

    if (error) {
      const message = error.errors.map((err) => ({
        field: err.path.join('.'),
        error: err.message,
      }));

      res.status(422).json({ message });

      return;
    }
    
    next();
  }
};