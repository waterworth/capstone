import { UsernamePasswordInput } from './UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes('@')) {
    return [
      {
        field: 'email',
        message: 'Email is invalid',
      },
    ];
  }

  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'Invalid username: Cannot include @',
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'Username must be longer than 2 characters.',
      },
    ];
  }
  if (options.password.length <= 5) {
    return [
      {
        field: 'password',
        message: 'Password must be longer than 8 characters.',
      },
    ];
  }

  return null;
};
