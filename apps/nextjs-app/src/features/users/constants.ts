export const userKeys = {
  all: ['users'] as const,
  detail: (userId: string) => [...userKeys.all, userId] as const,
};
