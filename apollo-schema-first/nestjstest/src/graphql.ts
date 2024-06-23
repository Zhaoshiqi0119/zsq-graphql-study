
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract login(username: string, password: string, code: string): ResponseMessage | Promise<ResponseMessage>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract register(username: string, password: string, confirmPassword: string): ResponseMessage | Promise<ResponseMessage>;
}

export class User {
    __typename?: 'User';
    id: number;
    username: string;
    password?: Nullable<string>;
    userInfo?: Nullable<Nullable<UserInfo>[]>;
}

export class UserInfo {
    __typename?: 'UserInfo';
    id: number;
    userId: number;
    phone?: Nullable<string>;
    home?: Nullable<string>;
    gender?: Nullable<string>;
    user: User;
}

export class ResponseMessage {
    __typename?: 'ResponseMessage';
    res?: Nullable<string>;
    message?: Nullable<string>;
    user?: Nullable<User>;
}

type Nullable<T> = T | null;
