import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Meeting } from './Meeting';

@ObjectType()
@Entity()
export class User extends BaseEntity{
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Boolean)
  @Column()
  isAdmin!: boolean; 

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Meeting, meeting => meeting.hostId)
  meetings: Meeting[];


  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
