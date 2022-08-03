import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class UserResponse {
    @Field({ nullable: true })
    @IsString()
    id: string;

    @Field({ nullable: true })
    @IsString()
    username: string;

    @Field({ nullable: true })
    isEmailVerified: boolean;

    @Field({ nullable: true })
    @IsString()
    email: string;

    @Field({ nullable: true })
    @IsString()
    sub: string;

    @Field({ nullable: true })
    @IsString()
    createdDate: string;

    @Field({ nullable: true })
    @IsString()
    updatedDate: string;
}
