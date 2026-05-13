export type SessionUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export type SessionState =
  | { status: "anonymous" }
  | { status: "loading" }
  | { status: "authenticated"; user: SessionUser };

export function hasRole(session: SessionState, role: string): boolean {
  return (
    session.status === "authenticated" && session.user.roles.includes(role)
  );
}
