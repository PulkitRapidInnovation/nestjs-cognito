import { Field, ObjectType } from '@nestjs/graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    IsNull,
    BeforeInsert,
    OneToMany
} from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field()
    id: string;

    @Column({ name: 'username', length: 255, nullable: true })
    @Field()
    username: string;

    @Column({ name: 'email', length: 255, nullable: true })
    @Field()
    email: string;

    @Column({ name: 'password_hash', length: 255, nullable: true })
    @Field()
    password: string;

    @Column({ name: 'phone', length: 60, nullable: true })
    @Field()
    phone: string;

    @CreateDateColumn({ name: 'created_date', nullable: true })
    @Field()
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: true })
    @Field()
    updatedDate: Date;

    @Column({ name: 'is_email_verified', default: false })
    @Field()
    isEmailVerified: boolean;

    @Column({ name: 'provider', nullable: true })
    @Field()
    provider: string;

    @Column({ name: 'sub', nullable: true })
    @Field()
    sub: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}
