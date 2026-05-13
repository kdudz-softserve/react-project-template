import type { CreateUserInput, UpdateUserInput, User } from "@template/types";

const initialUsers: User[] = [
  {
    id: "usr_1",
    name: "Ava Johnson",
    email: "ava@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-05-13T00:00:00.000Z",
  },
  {
    id: "usr_2",
    name: "Noah Smith",
    email: "noah@example.com",
    role: "member",
    status: "invited",
    createdAt: "2026-05-13T00:00:00.000Z",
  },
];

export function createUsersStore(seed: User[] = initialUsers) {
  const users = new Map(seed.map((user) => [user.id, user]));

  return {
    list: () => Array.from(users.values()),
    get: (id: string) => users.get(id),
    create: (input: CreateUserInput) => {
      const user: User = {
        id: `usr_${users.size + 1}`,
        ...input,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      users.set(user.id, user);
      return user;
    },
    update: (id: string, input: UpdateUserInput) => {
      const current = users.get(id);
      if (!current) return undefined;
      const next = { ...current, ...input };
      users.set(id, next);
      return next;
    },
    delete: (id: string) => users.delete(id),
  };
}
