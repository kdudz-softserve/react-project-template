# Users Feature Vertical Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the first real dashboard feature: a users list and create-user flow in `apps/web`, backed by the existing Fastify API gateway and typed shared packages.

**Architecture:** Keep feature code owned by `apps/web/src/features/users`, expose only route-level entry points through the feature index, and use `packages/api-client` for transport. TanStack Query owns server state; React Hook Form owns form state; Zod schemas from `@template/types` validate inputs before mutation.

**Tech Stack:** Vite, React, TypeScript, Material UI, TanStack Query, React Hook Form, Zod, Vitest, React Testing Library, Fastify, pnpm, Turborepo.

---

## Source Spec

Use this approved spec as authority:

- `docs/superpowers/specs/2026-05-13-react-monorepo-template-design.md`

## Branch and Commit Rule

Each task in this plan must be executed on its own branch from latest `origin/main`.

```bash
git switch main
git pull --ff-only
git switch -c <task-branch-name>
```

At the end of each task:

```bash
git status --short
git push -u origin <task-branch-name>
```

Do not stack unrelated tasks on one branch unless the user explicitly approves it.

## File Structure Map

This plan creates or modifies:

```text
packages/api-client/
  src/httpClient.ts
  src/usersClient.ts

packages/testing/
  src/renderWithProviders.tsx

apps/web/
  package.json
  src/app/App.tsx
  src/app/providers/AppProviders.tsx
  src/app/routes.tsx
  src/features/users/
    api/usersQueries.ts
    components/CreateUserDialog.tsx
    components/UsersPage.tsx
    components/UsersTable.tsx
    hooks/useCreateUserForm.ts
    routes/UsersRoute.tsx
    tests/UsersPage.test.tsx
    index.ts

docs/superpowers/notes/
  2026-05-13-users-feature-progress.md
```

---

## Task 1: API Client and Test Provider Support

**Branch:** `feature/users-api-client-support`

**Files:**
- Modify: `packages/api-client/src/httpClient.ts`
- Modify: `packages/api-client/src/usersClient.ts`
- Modify: `packages/testing/src/renderWithProviders.tsx`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c feature/users-api-client-support
```

Expected: branch `feature/users-api-client-support` checked out.

- [ ] **Step 2: Extend `HttpClient` for empty responses and request signals**

Replace `packages/api-client/src/httpClient.ts` with:

```ts
import { apiErrorEnvelopeSchema, type ApiErrorEnvelope } from "@template/types";

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorEnvelope,
  ) {
    super(body.error.message);
  }
}

export type HttpClientOptions = {
  baseUrl: string;
  fetcher?: typeof fetch;
};

export class HttpClient {
  private readonly fetcher: typeof fetch;

  constructor(private readonly options: HttpClientOptions) {
    this.fetcher = options.fetcher ?? fetch;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await this.fetcher(`${this.options.baseUrl}${path}`, {
      headers: {
        "content-type": "application/json",
        ...init.headers,
      },
      ...init,
    });

    if (response.status === 204) {
      return undefined as T;
    }

    const body: unknown = await response.json();

    if (!response.ok) {
      const errorBody = apiErrorEnvelopeSchema.parse(body);
      throw new ApiClientError(response.status, errorBody);
    }

    return body as T;
  }
}
```

- [ ] **Step 3: Add query signal support to users client**

Replace `packages/api-client/src/usersClient.ts` with:

```ts
import type { CreateUserInput, UpdateUserInput, User } from "@template/types";
import { HttpClient } from "./httpClient.js";

export type RequestOptions = {
  signal?: AbortSignal;
};

export type UsersClient = {
  listUsers: (options?: RequestOptions) => Promise<User[]>;
  getUser: (id: string, options?: RequestOptions) => Promise<User>;
  createUser: (input: CreateUserInput) => Promise<User>;
  updateUser: (id: string, input: UpdateUserInput) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
};

export function createUsersClient(http: HttpClient): UsersClient {
  return {
    listUsers: (options) =>
      http.request<User[]>("/api/users", { signal: options?.signal }),
    getUser: (id, options) =>
      http.request<User>(`/api/users/${id}`, { signal: options?.signal }),
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
```

- [ ] **Step 4: Add optional wrapper composition to test provider**

Replace `packages/testing/src/renderWithProviders.tsx` with:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ComponentType, ReactElement, ReactNode } from "react";

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

type ProviderOptions = {
  queryClient?: QueryClient;
  wrapper?: ComponentType<{ children: ReactNode }>;
};

export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions & ProviderOptions = {},
) {
  const {
    queryClient = createTestQueryClient(),
    wrapper: OuterWrapper,
    ...renderOptions
  } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    const content = (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return OuterWrapper ? <OuterWrapper>{content}</OuterWrapper> : content;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
```

- [ ] **Step 5: Verify API client and testing package**

Run:

```bash
corepack pnpm --filter @template/api-client typecheck
corepack pnpm --filter @template/testing typecheck
corepack pnpm lint
corepack pnpm typecheck
```

Expected: all commands exit with code 0.

- [ ] **Step 6: Commit and push**

```bash
git add packages/api-client/src/httpClient.ts packages/api-client/src/usersClient.ts packages/testing/src/renderWithProviders.tsx
git commit -m "feat: prepare users API client support"
git push -u origin feature/users-api-client-support
```

---

## Task 2: Users Feature Query Layer and Route

**Branch:** `feature/users-route-query`

**Files:**
- Modify: `apps/web/package.json`
- Modify: `apps/web/src/app/App.tsx`
- Modify: `apps/web/src/app/providers/AppProviders.tsx`
- Modify: `apps/web/src/app/routes.tsx`
- Create: `apps/web/src/features/users/api/usersQueries.ts`
- Create: `apps/web/src/features/users/components/UsersPage.tsx`
- Create: `apps/web/src/features/users/components/UsersTable.tsx`
- Create: `apps/web/src/features/users/routes/UsersRoute.tsx`
- Create: `apps/web/src/features/users/index.ts`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c feature/users-route-query
```

Expected: branch `feature/users-route-query` checked out.

- [ ] **Step 2: Add testing dependencies for later feature tests**

Modify `apps/web/package.json` and add these dev dependencies:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "jsdom": "^26.1.0"
  }
}
```

Keep existing dev dependencies.

- [ ] **Step 3: Update app providers with API client context**

Replace `apps/web/src/app/providers/AppProviders.tsx` with:

```tsx
import { createAppTheme } from "@template/design-system";
import { HttpClient, createUsersClient, type UsersClient } from "@template/api-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, useContext, type ReactNode } from "react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";
const httpClient = new HttpClient({ baseUrl: apiBaseUrl });
const usersClient = createUsersClient(httpClient);
const queryClient = new QueryClient();
const theme = createAppTheme("light");

type ApiClients = {
  users: UsersClient;
};

const ApiClientsContext = createContext<ApiClients | null>(null);

export function useApiClients(): ApiClients {
  const clients = useContext(ApiClientsContext);
  if (!clients) {
    throw new Error("useApiClients must be used inside AppProviders.");
  }
  return clients;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApiClientsContext.Provider value={{ users: usersClient }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </ApiClientsContext.Provider>
  );
}
```

- [ ] **Step 4: Add users query factory**

Create `apps/web/src/features/users/api/usersQueries.ts`:

```ts
import { useApiClients } from "../../../app/providers/AppProviders";

export const usersQueryKeys = {
  all: ["users"] as const,
  lists: () => [...usersQueryKeys.all, "list"] as const,
};

export function useUsersClient() {
  return useApiClients().users;
}
```

- [ ] **Step 5: Add users table**

Create `apps/web/src/features/users/components/UsersTable.tsx`:

```tsx
import type { User } from "@template/types";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

type UsersTableProps = {
  users: User[];
};

export function UsersTable({ users }: UsersTableProps) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="Users">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip label={user.status} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

- [ ] **Step 6: Add users page with loading, empty, and error states**

Create `apps/web/src/features/users/components/UsersPage.tsx`:

```tsx
import { AppButton, PageHeader } from "@template/ui";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usersQueryKeys, useUsersClient } from "../api/usersQueries";
import { UsersTable } from "./UsersTable";

export function UsersPage() {
  const usersClient = useUsersClient();
  const usersQuery = useQuery({
    queryKey: usersQueryKeys.lists(),
    queryFn: ({ signal }) => usersClient.listUsers({ signal }),
  });

  return (
    <Stack gap={3}>
      <PageHeader
        title="Users"
        description="Manage account access for the workspace."
        action={<AppButton disabled>Add user</AppButton>}
      />

      {usersQuery.isLoading ? (
        <Box role="status" sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label="Loading users" />
        </Box>
      ) : null}

      {usersQuery.isError ? (
        <Alert severity="error">Users could not be loaded.</Alert>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length === 0 ? (
        <Typography color="text.secondary">No users found.</Typography>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length > 0 ? (
        <UsersTable users={usersQuery.data} />
      ) : null}
    </Stack>
  );
}
```

- [ ] **Step 7: Add route entry point and app composition**

Create `apps/web/src/features/users/routes/UsersRoute.tsx`:

```tsx
import { AppShell } from "@template/ui";
import { UsersPage } from "../components/UsersPage";

export function UsersRoute() {
  return (
    <AppShell title="Web App">
      <UsersPage />
    </AppShell>
  );
}
```

Create `apps/web/src/features/users/index.ts`:

```ts
export * from "./routes/UsersRoute";
```

Replace `apps/web/src/app/routes.tsx` with:

```tsx
import { UsersRoute } from "../features/users";

export function HomeRoute() {
  return <UsersRoute />;
}
```

Keep `apps/web/src/app/App.tsx` as:

```tsx
import { AppProviders } from "./providers/AppProviders";
import { HomeRoute } from "./routes";

export function App() {
  return (
    <AppProviders>
      <HomeRoute />
    </AppProviders>
  );
}
```

- [ ] **Step 8: Install and verify**

Run:

```bash
corepack pnpm install
corepack pnpm --filter @template/web typecheck
corepack pnpm --filter @template/web build
corepack pnpm lint
corepack pnpm typecheck
```

Expected: all commands exit with code 0.

- [ ] **Step 9: Commit and push**

```bash
git add apps/web package.json pnpm-lock.yaml
git commit -m "feat: add users route query slice"
git push -u origin feature/users-route-query
```

---

## Task 3: Create User Form and Mutation

**Branch:** `feature/users-create-form`

**Files:**
- Modify: `apps/web/package.json`
- Create: `apps/web/src/features/users/hooks/useCreateUserForm.ts`
- Create: `apps/web/src/features/users/components/CreateUserDialog.tsx`
- Modify: `apps/web/src/features/users/components/UsersPage.tsx`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c feature/users-create-form
```

Expected: branch `feature/users-create-form` checked out.

- [ ] **Step 2: Add form dependencies**

Modify `apps/web/package.json` and add:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "react-hook-form": "^7.56.4"
  }
}
```

Keep existing dependencies.

- [ ] **Step 3: Add create user form hook**

Create `apps/web/src/features/users/hooks/useCreateUserForm.ts`:

```ts
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserInputSchema, type CreateUserInput } from "@template/types";
import { useForm } from "react-hook-form";

export function useCreateUserForm() {
  return useForm<CreateUserInput>({
    resolver: zodResolver(createUserInputSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "member",
    },
  });
}
```

- [ ] **Step 4: Add create user dialog**

Create `apps/web/src/features/users/components/CreateUserDialog.tsx`:

```tsx
import type { CreateUserInput } from "@template/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { useCreateUserForm } from "../hooks/useCreateUserForm";

type CreateUserDialogProps = {
  open: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (input: CreateUserInput) => void;
};

export function CreateUserDialog({
  open,
  isSubmitting,
  onClose,
  onSubmit,
}: CreateUserDialogProps) {
  const form = useCreateUserForm();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add user</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          id="create-user-form"
          gap={2}
          sx={{ pt: 1 }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextField
            label="Name"
            autoComplete="name"
            error={Boolean(form.formState.errors.name)}
            helperText={form.formState.errors.name?.message}
            {...form.register("name")}
          />
          <TextField
            label="Email"
            autoComplete="email"
            error={Boolean(form.formState.errors.email)}
            helperText={form.formState.errors.email?.message}
            {...form.register("email")}
          />
          <Controller
            control={form.control}
            name="role"
            render={({ field }) => (
              <TextField select label="Role" {...field}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="member">Member</MenuItem>
              </TextField>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          form="create-user-form"
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          Create user
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

- [ ] **Step 5: Wire mutation into users page**

Replace `apps/web/src/features/users/components/UsersPage.tsx` with:

```tsx
import type { CreateUserInput } from "@template/types";
import { AppButton, PageHeader } from "@template/ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { usersQueryKeys, useUsersClient } from "../api/usersQueries";
import { CreateUserDialog } from "./CreateUserDialog";
import { UsersTable } from "./UsersTable";

export function UsersPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);
  const queryClient = useQueryClient();
  const usersClient = useUsersClient();
  const usersQuery = useQuery({
    queryKey: usersQueryKeys.lists(),
    queryFn: ({ signal }) => usersClient.listUsers({ signal }),
  });
  const createUserMutation = useMutation({
    mutationFn: (input: CreateUserInput) => usersClient.createUser(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() });
      setIsCreateOpen(false);
      setShowCreatedMessage(true);
    },
  });

  return (
    <Stack gap={3}>
      <PageHeader
        title="Users"
        description="Manage account access for the workspace."
        action={<AppButton onClick={() => setIsCreateOpen(true)}>Add user</AppButton>}
      />

      {usersQuery.isLoading ? (
        <Box role="status" sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress aria-label="Loading users" />
        </Box>
      ) : null}

      {usersQuery.isError ? (
        <Alert severity="error">Users could not be loaded.</Alert>
      ) : null}

      {createUserMutation.isError ? (
        <Alert severity="error">User could not be created.</Alert>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length === 0 ? (
        <Typography color="text.secondary">No users found.</Typography>
      ) : null}

      {usersQuery.isSuccess && usersQuery.data.length > 0 ? (
        <UsersTable users={usersQuery.data} />
      ) : null}

      <CreateUserDialog
        open={isCreateOpen}
        isSubmitting={createUserMutation.isPending}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={(input) => createUserMutation.mutate(input)}
      />

      <Snackbar
        open={showCreatedMessage}
        autoHideDuration={3000}
        message="User created"
        onClose={() => setShowCreatedMessage(false)}
      />
    </Stack>
  );
}
```

- [ ] **Step 6: Install and verify**

Run:

```bash
corepack pnpm install
corepack pnpm --filter @template/web typecheck
corepack pnpm --filter @template/web build
corepack pnpm lint
corepack pnpm typecheck
```

Expected: all commands exit with code 0.

- [ ] **Step 7: Commit and push**

```bash
git add apps/web package.json pnpm-lock.yaml
git commit -m "feat: add users create form"
git push -u origin feature/users-create-form
```

---

## Task 4: Users Feature Component Tests

**Branch:** `test/users-feature`

**Files:**
- Create: `apps/web/src/features/users/tests/UsersPage.test.tsx`
- Create: `apps/web/src/test/setup.ts`
- Create: `apps/web/vitest.config.ts`
- Modify: `apps/web/package.json`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c test/users-feature
```

Expected: branch `test/users-feature` checked out.

- [ ] **Step 2: Add Vitest config**

Create `apps/web/vitest.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `apps/web/src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Modify `apps/web/package.json` test script:

```json
{
  "scripts": {
    "test": "vitest run --config vitest.config.ts"
  }
}
```

- [ ] **Step 3: Add users page tests**

Create `apps/web/src/features/users/tests/UsersPage.test.tsx`:

```tsx
import { createAppTheme } from "@template/design-system";
import type { CreateUserInput, User } from "@template/types";
import { renderWithProviders } from "@template/testing";
import { ThemeProvider } from "@mui/material/styles";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ApiClientsContext } from "../../../app/providers/AppProviders";
import { UsersPage } from "../components/UsersPage";

const users: User[] = [
  {
    id: "usr_1",
    name: "Ava Johnson",
    email: "ava@example.com",
    role: "admin",
    status: "active",
    createdAt: "2026-05-13T00:00:00.000Z",
  },
];

function renderUsersPage(overrides: Partial<{
  listUsers: () => Promise<User[]>;
  createUser: (input: CreateUserInput) => Promise<User>;
}> = {}) {
  const listUsers = overrides.listUsers ?? vi.fn(async () => users);
  const createUser =
    overrides.createUser ??
    vi.fn(async (input: CreateUserInput) => ({
      id: "usr_2",
      status: "active",
      createdAt: "2026-05-13T00:00:00.000Z",
      ...input,
    }));

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ApiClientsContext.Provider
        value={{
          users: {
            listUsers,
            getUser: vi.fn(),
            createUser,
            updateUser: vi.fn(),
            deleteUser: vi.fn(),
          },
        }}
      >
        <ThemeProvider theme={createAppTheme("light")}>{children}</ThemeProvider>
      </ApiClientsContext.Provider>
    );
  }

  return {
    user: userEvent.setup(),
    listUsers,
    createUser,
    ...renderWithProviders(<UsersPage />, { wrapper: Wrapper }),
  };
}

describe("UsersPage", () => {
  it("renders users returned by the API", async () => {
    renderUsersPage();

    expect(await screen.findByText("Ava Johnson")).toBeInTheDocument();
    expect(screen.getByText("ava@example.com")).toBeInTheDocument();
  });

  it("submits a new user and shows success feedback", async () => {
    const { user, createUser } = renderUsersPage();

    await user.click(await screen.findByRole("button", { name: "Add user" }));
    await user.type(screen.getByLabelText("Name"), "Mia Chen");
    await user.type(screen.getByLabelText("Email"), "mia@example.com");
    await user.click(screen.getByRole("button", { name: "Create user" }));

    await waitFor(() => {
      expect(createUser).toHaveBeenCalledWith({
        name: "Mia Chen",
        email: "mia@example.com",
        role: "member",
      });
    });
    expect(await screen.findByText("User created")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Export API context for tests**

Modify `apps/web/src/app/providers/AppProviders.tsx` so the context export is named:

```ts
export const ApiClientsContext = createContext<ApiClients | null>(null);
```

Keep `useApiClients` using the exported context.

- [ ] **Step 5: Verify tests**

Run:

```bash
corepack pnpm install
corepack pnpm --filter @template/web test
corepack pnpm --filter @template/web typecheck
corepack pnpm lint
corepack pnpm test
```

Expected: all commands exit with code 0, and `UsersPage.test.tsx` has 2 passing tests.

- [ ] **Step 6: Commit and push**

```bash
git add apps/web package.json pnpm-lock.yaml
git commit -m "test: cover users feature"
git push -u origin test/users-feature
```

---

## Task 5: Users Feature Progress Notes

**Branch:** `docs/users-feature-notes`

**Files:**
- Create: `docs/superpowers/notes/2026-05-13-users-feature-progress.md`
- Modify: `README.md`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c docs/users-feature-notes
```

Expected: branch `docs/users-feature-notes` checked out.

- [ ] **Step 2: Add progress notes**

Create `docs/superpowers/notes/2026-05-13-users-feature-progress.md`:

```markdown
# Users Feature Progress Notes

Date: 2026-05-13

## Approved Spec

`docs/superpowers/specs/2026-05-13-react-monorepo-template-design.md`

## Plan

`docs/superpowers/plans/2026-05-13-users-feature-vertical-slice-implementation.md`

## Milestone Scope

- Typed users API client support.
- Web app users route.
- TanStack Query users list.
- Material UI users table.
- React Hook Form create-user dialog.
- Zod form validation through shared schemas.
- Component tests for list and create flow.

## Next Plans After This Milestone

1. Cypress browser flow and CI.
2. Docker and environment docs.
3. Feature/service generators.
4. Security and auth-ready routing guidance.
```

- [ ] **Step 3: Update README milestone section**

Append this to `README.md` under `Current Template Milestone`:

```markdown

The next implementation milestone is the users feature vertical slice. See
`docs/superpowers/plans/2026-05-13-users-feature-vertical-slice-implementation.md`.
```

- [ ] **Step 4: Run final checks**

Run:

```bash
corepack pnpm install
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm format
```

Expected: all commands exit with code 0.

- [ ] **Step 5: Commit and push**

```bash
git add README.md docs/superpowers/notes/2026-05-13-users-feature-progress.md
git commit -m "docs: record users feature progress"
git push -u origin docs/users-feature-notes
```

---

## Plan Self-Review

- Spec coverage: This plan covers the approved first feature flow through typed API client use, users list, create form, Zod validation, TanStack Query cache invalidation, Material UI rendering, and React Testing Library coverage.
- Deferred by design: Cypress browser flow, CI wiring, Docker, docs expansion, generators, and security hardening remain separate follow-up plans listed in progress notes.
- Red-flag scan: no unresolved markers are used.
- Type consistency: `User`, `CreateUserInput`, `UsersClient`, and `usersQueryKeys` names match existing shared package names and planned app imports.

## Execution Handoff

Plan complete. Recommended execution: one task branch and PR at a time, starting with Task 1.
