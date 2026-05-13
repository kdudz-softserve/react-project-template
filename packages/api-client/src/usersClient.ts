import type { CreateUserInput, UpdateUserInput, User } from "@template/types";
import { HttpClient } from "./httpClient.js";

export type UsersClient = {
  listUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  createUser: (input: CreateUserInput) => Promise<User>;
  updateUser: (id: string, input: UpdateUserInput) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
};

export function createUsersClient(http: HttpClient): UsersClient {
  return {
    listUsers: () => http.request<User[]>("/api/users"),
    getUser: (id) => http.request<User>(`/api/users/${id}`),
    createUser: (input) =>
      http.request<User>("/api/users", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    updateUser: (id, input) =>
      http.request<User>(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      }),
    deleteUser: async (id) => {
      await http.request<{ ok: true }>(`/api/users/${id}`, {
        method: "DELETE",
      });
    },
  };
}
