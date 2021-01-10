import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  hosting?: Maybe<Array<Maybe<Meeting>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
};

export type Profile = {
  __typename?: 'Profile';
  id?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['Int']>;
  picture?: Maybe<Scalars['String']>;
  availability?: Maybe<Array<Maybe<Scalars['String']>>>;
  user?: Maybe<User>;
};

export type Meeting = {
  __typename?: 'Meeting';
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  hostId?: Maybe<Scalars['Int']>;
  timeslot?: Maybe<Scalars['DateTime']>;
  length?: Maybe<Scalars['Int']>;
  host?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UsersInMeeting = {
  __typename?: 'UsersInMeeting';
  userId?: Maybe<Scalars['Int']>;
  meetingId?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  meeting?: Maybe<Meeting>;
};

export type MeetingInput = {
  title: Scalars['String'];
  timeslot: Scalars['DateTime'];
  length?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  usersInMeeting?: Maybe<Array<Maybe<UsersInMeeting>>>;
  me?: Maybe<User>;
  userById?: Maybe<User>;
  meetingById?: Maybe<Meeting>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMeetingByIdArgs = {
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<User>;
  changePassword?: Maybe<User>;
  forgotPassword?: Maybe<User>;
  createMeeting?: Maybe<Meeting>;
  updateMeeting?: Maybe<Meeting>;
  deleteMeeting?: Maybe<Meeting>;
  addUsersToMeeting?: Maybe<UsersInMeeting>;
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationCreateMeetingArgs = {
  input?: Maybe<MeetingInput>;
};


export type MutationUpdateMeetingArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
  timeslot: Scalars['DateTime'];
  length: Scalars['Int'];
  description: Scalars['String'];
};


export type MutationDeleteMeetingArgs = {
  id: Scalars['Int'];
};


export type MutationAddUsersToMeetingArgs = {
  userId: Scalars['Int'];
  meetingId: Scalars['Int'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  admin: Scalars['Boolean'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'isAdmin'>
  )> }
);


export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $admin: Boolean!) {
  createUser(
    username: $username
    email: $email
    password: $password
    isAdmin: $admin
  ) {
    id
    username
    email
    isAdmin
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      admin: // value for 'admin'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;