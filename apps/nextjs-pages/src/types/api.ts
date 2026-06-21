export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Meta = {
  page: number;
  total: number;
  totalPages: number;
};

export type User = Entity<{
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar?: string;
}>;

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  data: {
    id: string;
    email: string;
    profile: {
      full_name: string | null;
      phone_number: string | null;
      avatar: string | null;
      bio?: string;
    };
    roles: string[];
  };
};

export type Team = Entity<{
  name: string;
  description: string;
}>;

export type Discussion = Entity<{
  title: string;
  body: string;
  teamId: string;
  author: User;
  public: boolean;
}>;

export type Comment = Entity<{
  body: string;
  discussionId: string;
  author: User;
}>;
