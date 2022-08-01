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
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    @Field()
    id: number;

    @Column({ name: 'full_name', length: 255, nullable: false })
    @Field()
    name: string;

    @Column({ name: 'email', length: 255, nullable: false })
    @Field()
    email: string;

    @Column({ name: 'password_hash', length: 255, nullable: false })
    @Field()
    password: string;

    @Column({ name: 'phone', length: 60, nullable: true })
    @Field()
    phone: string;

    @CreateDateColumn({ name: 'created_date', nullable: false })
    @Field()
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', nullable: false })
    @Field()
    updatedDate: Date;

    @Column({ name: 'is_email_verified', default: false, nullable: false })
    @Field()
    isEmailVerified: boolean;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
}
