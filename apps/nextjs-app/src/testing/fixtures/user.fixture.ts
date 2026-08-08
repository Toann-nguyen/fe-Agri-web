import {
  randEmail,
  randParagraph,
  randPassword,
  randUserName,
  randUuid,
} from '@ngneat/falso';

export const DEMO_EDU_USER = {
  name: 'Nguyễn Văn An',
  email: 'student_edu_ai',
  password: 'EduAI2026@Pass',
  teamId: '',
  role: 'student',
  bio: 'Học sinh xuất sắc lớp 7A2 - Trường THCS ABC',
};

type UserFixture = {
  id: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
  bio: string;
  createdAt: number;
  teamId?: string;
};

export const createUserFixture = (
  overrides?: Partial<UserFixture>,
): UserFixture => {
  return {
    id: randUuid() + Math.random(),
    name: randUserName({ withAccents: false }),
    email: randEmail(),
    password: randPassword(),
    password_confirmation: randPassword(),
    role: 'ADMIN',
    bio: randParagraph(),
    createdAt: Date.now(),
    ...overrides,
  };
};
