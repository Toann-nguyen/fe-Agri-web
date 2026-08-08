export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  STUDENT: 'student',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
