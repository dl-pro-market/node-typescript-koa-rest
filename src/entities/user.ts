import {
  swaggerClass,
  swaggerProperty,
} from '@pro-market/koa-swagger-decorator';
import { IsEmail, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@swaggerClass()
export class User {
  @PrimaryGeneratedColumn('increment')
  @swaggerProperty({ type: 'number' })
  id: number;

  @Column({
    length: 80,
  })
  @Length(10, 80)
  @swaggerProperty({ type: 'string' })
  name: string;

  @Column({
    length: 100,
  })
  @Length(10, 100)
  @IsEmail()
  @swaggerProperty({ type: 'string' })
  email: string;
}

export const userSchema = {
  id: { type: 'number', example: 1 },
  name: { type: 'string', required: true, example: 'Javier' },
  email: {
    type: 'string',
    example: 'avileslopez.javier@gmail.com',
  },
};
