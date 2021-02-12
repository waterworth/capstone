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
  hosting?: Maybe<Array<Maybe<Meeting>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  profile?: Maybe<Array<Maybe<Profile>>>;
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

export type Team = {
  __typename?: 'Team';
  id?: Maybe<Scalars['Int']>;
  adminUserId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  admin?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type UsersInTeam = {
  __typename?: 'UsersInTeam';
  userId?: Maybe<Scalars['Int']>;
  teamId?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  team?: Maybe<Team>;
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
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  usersInMeeting?: Maybe<Array<Maybe<UsersInMeeting>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  usersInTeam?: Maybe<Array<Maybe<UsersInTeam>>>;
  me?: Maybe<User>;
  userById?: Maybe<User>;
  meetingById?: Maybe<Meeting>;
  meetingsByUser?: Maybe<User>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMeetingByIdArgs = {
  id: Scalars['Int'];
};


export type QueryMeetingsByUserArgs = {
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
  removeUserFromMeeting?: Maybe<User>;
  createTeam?: Maybe<Team>;
  addUserToTeam?: Maybe<UsersInTeam>;
};


export type MutationCreateUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
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
  title: Scalars['String'];
  timeslot: Scalars['DateTime'];
  description: Scalars['String'];
  length: Scalars['Int'];
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


export type MutationRemoveUserFromMeetingArgs = {
  userId: Scalars['Int'];
  meetingId: Scalars['Int'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationAddUserToTeamArgs = {
  userId: Scalars['Int'];
  teamId: Scalars['Int'];
};

export type RegularMeetingFragment = (
  { __typename?: 'Meeting' }
  & Pick<Meeting, 'id' | 'title' | 'description' | 'timeslot' | 'length'>
  & { host?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>, users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
  & { meetings?: Maybe<Array<Maybe<(
    { __typename?: 'Meeting' }
    & Pick<Meeting, 'id' | 'title' | 'description' | 'timeslot' | 'length'>
  )>>>, profile?: Maybe<Array<Maybe<(
    { __typename?: 'Profile' }
    & Pick<Profile, 'picture' | 'availability'>
  )>>> }
);

export type AddUsersToMeetingMutationVariables = Exact<{
  userId: Scalars['Int'];
  meetingId: Scalars['Int'];
}>;


export type AddUsersToMeetingMutation = (
  { __typename?: 'Mutation' }
  & { addUsersToMeeting?: Maybe<(
    { __typename?: 'UsersInMeeting' }
    & { meeting?: Maybe<(
      { __typename?: 'Meeting' }
      & Pick<Meeting, 'id'>
      & { users?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & RegularUserFragment
      )>>> }
    )> }
  )> }
);

export type AddUserToTeamMutationVariables = Exact<{
  userId: Scalars['Int'];
  teamId: Scalars['Int'];
}>;


export type AddUserToTeamMutation = (
  { __typename?: 'Mutation' }
  & { addUserToTeam?: Maybe<(
    { __typename?: 'UsersInTeam' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'name'>
      & { admin?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )> }
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type CreateMeetingMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  timeslot: Scalars['DateTime'];
  length: Scalars['Int'];
}>;


export type CreateMeetingMutation = (
  { __typename?: 'Mutation' }
  & { createMeeting?: Maybe<(
    { __typename?: 'Meeting' }
    & RegularMeetingFragment
  )> }
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  )> }
);

export type DeleteMeetingMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteMeetingMutation = (
  { __typename?: 'Mutation' }
  & { deleteMeeting?: Maybe<(
    { __typename?: 'Meeting' }
    & RegularMeetingFragment
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
  )> }
);

export type RemoveUserFromMeetingMutationVariables = Exact<{
  userId: Scalars['Int'];
  meetingId: Scalars['Int'];
}>;


export type RemoveUserFromMeetingMutation = (
  { __typename?: 'Mutation' }
  & { removeUserFromMeeting?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export type UpdateMeetingMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  timeslot: Scalars['DateTime'];
  length: Scalars['Int'];
  description: Scalars['String'];
}>;


export type UpdateMeetingMutation = (
  { __typename?: 'Mutation' }
  & { updateMeeting?: Maybe<(
    { __typename?: 'Meeting' }
    & RegularMeetingFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MeetingByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MeetingByIdQuery = (
  { __typename?: 'Query' }
  & { meetingById?: Maybe<(
    { __typename?: 'Meeting' }
    & RegularMeetingFragment
  )> }
);

export type MeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MeetingsQuery = (
  { __typename?: 'Query' }
  & { meetings?: Maybe<Array<Maybe<(
    { __typename?: 'Meeting' }
    & RegularMeetingFragment
  )>>> }
);

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = (
  { __typename?: 'Query' }
  & { teams?: Maybe<Array<Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
    & { users?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )>>>, admin?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  )>>> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>> }
);

export type UsersInMeetingQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersInMeetingQuery = (
  { __typename?: 'Query' }
  & { usersInMeeting?: Maybe<Array<Maybe<(
    { __typename?: 'UsersInMeeting' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )>, meeting?: Maybe<(
      { __typename?: 'Meeting' }
      & RegularMeetingFragment
    )> }
  )>>> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  meetings {
    id
    title
    description
    timeslot
    length
  }
  profile {
    picture
    availability
  }
}
    `;
export const RegularMeetingFragmentDoc = gql`
    fragment RegularMeeting on Meeting {
  id
  title
  description
  timeslot
  length
  host {
    ...RegularUser
  }
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export const AddUsersToMeetingDocument = gql`
    mutation AddUsersToMeeting($userId: Int!, $meetingId: Int!) {
  addUsersToMeeting(userId: $userId, meetingId: $meetingId) {
    meeting {
      id
      users {
        ...RegularUser
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type AddUsersToMeetingMutationFn = Apollo.MutationFunction<AddUsersToMeetingMutation, AddUsersToMeetingMutationVariables>;

/**
 * __useAddUsersToMeetingMutation__
 *
 * To run a mutation, you first call `useAddUsersToMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUsersToMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUsersToMeetingMutation, { data, loading, error }] = useAddUsersToMeetingMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useAddUsersToMeetingMutation(baseOptions?: Apollo.MutationHookOptions<AddUsersToMeetingMutation, AddUsersToMeetingMutationVariables>) {
        return Apollo.useMutation<AddUsersToMeetingMutation, AddUsersToMeetingMutationVariables>(AddUsersToMeetingDocument, baseOptions);
      }
export type AddUsersToMeetingMutationHookResult = ReturnType<typeof useAddUsersToMeetingMutation>;
export type AddUsersToMeetingMutationResult = Apollo.MutationResult<AddUsersToMeetingMutation>;
export type AddUsersToMeetingMutationOptions = Apollo.BaseMutationOptions<AddUsersToMeetingMutation, AddUsersToMeetingMutationVariables>;
export const AddUserToTeamDocument = gql`
    mutation AddUserToTeam($userId: Int!, $teamId: Int!) {
  addUserToTeam(userId: $userId, teamId: $teamId) {
    user {
      ...RegularUser
    }
    team {
      name
      admin {
        username
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;
export type AddUserToTeamMutationFn = Apollo.MutationFunction<AddUserToTeamMutation, AddUserToTeamMutationVariables>;

/**
 * __useAddUserToTeamMutation__
 *
 * To run a mutation, you first call `useAddUserToTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToTeamMutation, { data, loading, error }] = useAddUserToTeamMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useAddUserToTeamMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToTeamMutation, AddUserToTeamMutationVariables>) {
        return Apollo.useMutation<AddUserToTeamMutation, AddUserToTeamMutationVariables>(AddUserToTeamDocument, baseOptions);
      }
export type AddUserToTeamMutationHookResult = ReturnType<typeof useAddUserToTeamMutation>;
export type AddUserToTeamMutationResult = Apollo.MutationResult<AddUserToTeamMutation>;
export type AddUserToTeamMutationOptions = Apollo.BaseMutationOptions<AddUserToTeamMutation, AddUserToTeamMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateMeetingDocument = gql`
    mutation CreateMeeting($title: String!, $description: String!, $timeslot: DateTime!, $length: Int!) {
  createMeeting(
    title: $title
    description: $description
    timeslot: $timeslot
    length: $length
  ) {
    ...RegularMeeting
  }
}
    ${RegularMeetingFragmentDoc}`;
export type CreateMeetingMutationFn = Apollo.MutationFunction<CreateMeetingMutation, CreateMeetingMutationVariables>;

/**
 * __useCreateMeetingMutation__
 *
 * To run a mutation, you first call `useCreateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingMutation, { data, loading, error }] = useCreateMeetingMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      timeslot: // value for 'timeslot'
 *      length: // value for 'length'
 *   },
 * });
 */
export function useCreateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeetingMutation, CreateMeetingMutationVariables>) {
        return Apollo.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument, baseOptions);
      }
export type CreateMeetingMutationHookResult = ReturnType<typeof useCreateMeetingMutation>;
export type CreateMeetingMutationResult = Apollo.MutationResult<CreateMeetingMutation>;
export type CreateMeetingMutationOptions = Apollo.BaseMutationOptions<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(name: $name) {
    id
    name
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteMeetingDocument = gql`
    mutation DeleteMeeting($id: Int!) {
  deleteMeeting(id: $id) {
    ...RegularMeeting
  }
}
    ${RegularMeetingFragmentDoc}`;
export type DeleteMeetingMutationFn = Apollo.MutationFunction<DeleteMeetingMutation, DeleteMeetingMutationVariables>;

/**
 * __useDeleteMeetingMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingMutation, { data, loading, error }] = useDeleteMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>) {
        return Apollo.useMutation<DeleteMeetingMutation, DeleteMeetingMutationVariables>(DeleteMeetingDocument, baseOptions);
      }
export type DeleteMeetingMutationHookResult = ReturnType<typeof useDeleteMeetingMutation>;
export type DeleteMeetingMutationResult = Apollo.MutationResult<DeleteMeetingMutation>;
export type DeleteMeetingMutationOptions = Apollo.BaseMutationOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    id
    username
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    id
    username
    email
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
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveUserFromMeetingDocument = gql`
    mutation RemoveUserFromMeeting($userId: Int!, $meetingId: Int!) {
  removeUserFromMeeting(userId: $userId, meetingId: $meetingId) {
    username
  }
}
    `;
export type RemoveUserFromMeetingMutationFn = Apollo.MutationFunction<RemoveUserFromMeetingMutation, RemoveUserFromMeetingMutationVariables>;

/**
 * __useRemoveUserFromMeetingMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromMeetingMutation, { data, loading, error }] = useRemoveUserFromMeetingMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      meetingId: // value for 'meetingId'
 *   },
 * });
 */
export function useRemoveUserFromMeetingMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromMeetingMutation, RemoveUserFromMeetingMutationVariables>) {
        return Apollo.useMutation<RemoveUserFromMeetingMutation, RemoveUserFromMeetingMutationVariables>(RemoveUserFromMeetingDocument, baseOptions);
      }
export type RemoveUserFromMeetingMutationHookResult = ReturnType<typeof useRemoveUserFromMeetingMutation>;
export type RemoveUserFromMeetingMutationResult = Apollo.MutationResult<RemoveUserFromMeetingMutation>;
export type RemoveUserFromMeetingMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromMeetingMutation, RemoveUserFromMeetingMutationVariables>;
export const UpdateMeetingDocument = gql`
    mutation UpdateMeeting($id: Int!, $title: String!, $timeslot: DateTime!, $length: Int!, $description: String!) {
  updateMeeting(
    id: $id
    title: $title
    timeslot: $timeslot
    length: $length
    description: $description
  ) {
    ...RegularMeeting
  }
}
    ${RegularMeetingFragmentDoc}`;
export type UpdateMeetingMutationFn = Apollo.MutationFunction<UpdateMeetingMutation, UpdateMeetingMutationVariables>;

/**
 * __useUpdateMeetingMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingMutation, { data, loading, error }] = useUpdateMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      timeslot: // value for 'timeslot'
 *      length: // value for 'length'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateMeetingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>) {
        return Apollo.useMutation<UpdateMeetingMutation, UpdateMeetingMutationVariables>(UpdateMeetingDocument, baseOptions);
      }
export type UpdateMeetingMutationHookResult = ReturnType<typeof useUpdateMeetingMutation>;
export type UpdateMeetingMutationResult = Apollo.MutationResult<UpdateMeetingMutation>;
export type UpdateMeetingMutationOptions = Apollo.BaseMutationOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeetingByIdDocument = gql`
    query MeetingById($id: Int!) {
  meetingById(id: $id) {
    ...RegularMeeting
  }
}
    ${RegularMeetingFragmentDoc}`;

/**
 * __useMeetingByIdQuery__
 *
 * To run a query within a React component, call `useMeetingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMeetingByIdQuery(baseOptions: Apollo.QueryHookOptions<MeetingByIdQuery, MeetingByIdQueryVariables>) {
        return Apollo.useQuery<MeetingByIdQuery, MeetingByIdQueryVariables>(MeetingByIdDocument, baseOptions);
      }
export function useMeetingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeetingByIdQuery, MeetingByIdQueryVariables>) {
          return Apollo.useLazyQuery<MeetingByIdQuery, MeetingByIdQueryVariables>(MeetingByIdDocument, baseOptions);
        }
export type MeetingByIdQueryHookResult = ReturnType<typeof useMeetingByIdQuery>;
export type MeetingByIdLazyQueryHookResult = ReturnType<typeof useMeetingByIdLazyQuery>;
export type MeetingByIdQueryResult = Apollo.QueryResult<MeetingByIdQuery, MeetingByIdQueryVariables>;
export const MeetingsDocument = gql`
    query Meetings {
  meetings {
    ...RegularMeeting
  }
}
    ${RegularMeetingFragmentDoc}`;

/**
 * __useMeetingsQuery__
 *
 * To run a query within a React component, call `useMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeetingsQuery(baseOptions?: Apollo.QueryHookOptions<MeetingsQuery, MeetingsQueryVariables>) {
        return Apollo.useQuery<MeetingsQuery, MeetingsQueryVariables>(MeetingsDocument, baseOptions);
      }
export function useMeetingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeetingsQuery, MeetingsQueryVariables>) {
          return Apollo.useLazyQuery<MeetingsQuery, MeetingsQueryVariables>(MeetingsDocument, baseOptions);
        }
export type MeetingsQueryHookResult = ReturnType<typeof useMeetingsQuery>;
export type MeetingsLazyQueryHookResult = ReturnType<typeof useMeetingsLazyQuery>;
export type MeetingsQueryResult = Apollo.QueryResult<MeetingsQuery, MeetingsQueryVariables>;
export const TeamsDocument = gql`
    query Teams {
  teams {
    id
    name
    users {
      username
    }
    admin {
      username
    }
  }
}
    `;

/**
 * __useTeamsQuery__
 *
 * To run a query within a React component, call `useTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamsQuery(baseOptions?: Apollo.QueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
        return Apollo.useQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
      }
export function useTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamsQuery, TeamsQueryVariables>) {
          return Apollo.useLazyQuery<TeamsQuery, TeamsQueryVariables>(TeamsDocument, baseOptions);
        }
export type TeamsQueryHookResult = ReturnType<typeof useTeamsQuery>;
export type TeamsLazyQueryHookResult = ReturnType<typeof useTeamsLazyQuery>;
export type TeamsQueryResult = Apollo.QueryResult<TeamsQuery, TeamsQueryVariables>;
export const UserByIdDocument = gql`
    query UserById($id: Int!) {
  userById(id: $id) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, baseOptions);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersInMeetingDocument = gql`
    query UsersInMeeting {
  usersInMeeting {
    user {
      ...RegularUser
    }
    meeting {
      ...RegularMeeting
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularMeetingFragmentDoc}`;

/**
 * __useUsersInMeetingQuery__
 *
 * To run a query within a React component, call `useUsersInMeetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersInMeetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersInMeetingQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersInMeetingQuery(baseOptions?: Apollo.QueryHookOptions<UsersInMeetingQuery, UsersInMeetingQueryVariables>) {
        return Apollo.useQuery<UsersInMeetingQuery, UsersInMeetingQueryVariables>(UsersInMeetingDocument, baseOptions);
      }
export function useUsersInMeetingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersInMeetingQuery, UsersInMeetingQueryVariables>) {
          return Apollo.useLazyQuery<UsersInMeetingQuery, UsersInMeetingQueryVariables>(UsersInMeetingDocument, baseOptions);
        }
export type UsersInMeetingQueryHookResult = ReturnType<typeof useUsersInMeetingQuery>;
export type UsersInMeetingLazyQueryHookResult = ReturnType<typeof useUsersInMeetingLazyQuery>;
export type UsersInMeetingQueryResult = Apollo.QueryResult<UsersInMeetingQuery, UsersInMeetingQueryVariables>;