# Monorepo Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the first runnable foundation for the approved React monorepo template: pnpm workspaces, Turborepo, shared TypeScript/config packages, minimal Vite web/admin apps, and a Fastify API gateway.

**Architecture:** This plan implements the smallest useful vertical slice of the approved template. It creates the workspace skeleton and enough real app/service code to prove local development, workspace imports, typechecking, linting, tests, and builds. Follow-up plans will add Material UI design-system depth, users feature behavior, Cypress flows, Docker, docs, generators, and security hardening.

**Tech Stack:** pnpm workspaces, Turborepo, TypeScript, Vite, React, React Router, TanStack Query, Zustand, React Hook Form, Zod, Material UI, Fastify, Vitest, React Testing Library, ESLint, Prettier.

---

## Source Spec

Use this approved spec as the authority:

- `docs/superpowers/specs/2026-05-13-react-monorepo-template-design.md`

## Branch and Commit Rule

Each task in this plan must be executed on its own branch from latest `origin/main`.

Pattern:

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

Then open a PR for that task. Do not stack unrelated tasks on the same branch unless the user explicitly approves it.

## File Structure Map

This plan creates or modifies:

```text
package.json
pnpm-workspace.yaml
turbo.json
.gitignore
.npmrc
.prettierrc.json
eslint.config.mjs
tsconfig.base.json

packages/
  tsconfig/
  eslint-config/
  config/
  types/
  utils/
  testing/
  state/
  auth/
  api-client/
  design-system/
  ui/

apps/
  web/
  admin/

services/
  api-gateway/
```

The root owns orchestration. `packages/*` own reusable building blocks. `apps/*` own product routes. `services/*` own backend runtime behavior.

---

## Task 1: Root Workspace and Tooling

**Branch:** `setup/root-workspace-tooling`

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `.npmrc`
- Create: `.gitignore`
- Create: `.prettierrc.json`
- Create: `tsconfig.base.json`
- Create: `eslint.config.mjs`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c setup/root-workspace-tooling
```

Expected: branch `setup/root-workspace-tooling` checked out.

- [ ] **Step 2: Add root `package.json`**

Create `package.json`:

```json
{
  "name": "react-project-template",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@9.15.4",
  "type": "module",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.1",
    "@types/node": "^22.15.17",
    "eslint": "^9.25.1",
    "eslint-config-prettier": "^10.1.2",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.0.0",
    "prettier": "^3.5.3",
    "turbo": "^2.5.3",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.32.0"
  }
}
```

- [ ] **Step 3: Add workspace config**

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "services/*"
  - "packages/*"
```

Create `.npmrc`:

```ini
engine-strict=true
auto-install-peers=true
strict-peer-dependencies=false
```

- [ ] **Step 4: Add Turborepo pipeline**

Create `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "test:e2e": {
      "dependsOn": ["build"],
      "cache": false
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

- [ ] **Step 5: Add formatting, ignore, and TypeScript base config**

Create `.prettierrc.json`:

```json
{
  "singleQuote": false,
  "semi": true,
  "trailingComma": "all"
}
```

Create `.gitignore`:

```gitignore
node_modules/
dist/
build/
coverage/
.turbo/
.DS_Store
.env
.env.local
.env.*.local
cypress/videos/
cypress/screenshots/
```

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@template/api-client": ["packages/api-client/src/index.ts"],
      "@template/auth": ["packages/auth/src/index.ts"],
      "@template/config": ["packages/config/src/index.ts"],
      "@template/design-system": ["packages/design-system/src/index.ts"],
      "@template/state": ["packages/state/src/index.ts"],
      "@template/testing": ["packages/testing/src/index.ts"],
      "@template/types": ["packages/types/src/index.ts"],
      "@template/ui": ["packages/ui/src/index.ts"],
      "@template/utils": ["packages/utils/src/index.ts"]
    }
  }
}
```

- [ ] **Step 6: Add root ESLint config**

Create `eslint.config.mjs`:

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist", "build", "coverage", ".turbo", "node_modules"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }]
    },
  },
  prettier,
);
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
pnpm install
```

Expected: `pnpm-lock.yaml` created and install exits with code 0.

- [ ] **Step 8: Verify root scripts**

Run:

```bash
pnpm format
pnpm lint
pnpm typecheck
```

Expected: commands exit with code 0 or report that no package tasks exist yet. If Turbo reports missing package tasks, record that in the PR notes and continue; later tasks add package scripts.

- [ ] **Step 9: Commit and push**

```bash
git add package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc .gitignore .prettierrc.json tsconfig.base.json eslint.config.mjs
git commit -m "chore: set up monorepo workspace tooling"
git push -u origin setup/root-workspace-tooling
```

---

## Task 2: Shared Configuration Packages

**Branch:** `setup/shared-config-packages`

**Files:**
- Create: `packages/tsconfig/package.json`
- Create: `packages/tsconfig/base.json`
- Create: `packages/tsconfig/react.json`
- Create: `packages/tsconfig/node.json`
- Create: `packages/eslint-config/package.json`
- Create: `packages/eslint-config/index.mjs`
- Create: `packages/config/package.json`
- Create: `packages/config/tsconfig.json`
- Create: `packages/config/src/env.ts`
- Create: `packages/config/src/index.ts`
- Create: `packages/types/package.json`
- Create: `packages/types/tsconfig.json`
- Create: `packages/types/src/api.ts`
- Create: `packages/types/src/user.ts`
- Create: `packages/types/src/index.ts`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c setup/shared-config-packages
```

Expected: branch `setup/shared-config-packages` checked out.

- [ ] **Step 2: Add TypeScript config package**

Create `packages/tsconfig/package.json`:

```json
{
  "name": "@template/tsconfig",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "files": ["base.json", "react.json", "node.json"]
}
```

Create `packages/tsconfig/base.json`:

```json
{
  "extends": "../../tsconfig.base.json"
}
```

Create `packages/tsconfig/react.json`:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "types": ["vite/client", "vitest/globals"]
  }
}
```

Create `packages/tsconfig/node.json`:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "lib": ["ES2022"],
    "types": ["node"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

- [ ] **Step 3: Add shared ESLint package**

Create `packages/eslint-config/package.json`:

```json
{
  "name": "@template/eslint-config",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./index.mjs"
  },
  "peerDependencies": {
    "eslint": "^9.25.1",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.32.0"
  }
}
```

Create `packages/eslint-config/index.mjs`:

```js
export { default } from "../../eslint.config.mjs";
```

- [ ] **Step 4: Add environment config package**

Create `packages/config/package.json`:

```json
{
  "name": "@template/config",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "zod": "^3.24.4"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/config/tsconfig.json`:

```json
{
  "extends": "../tsconfig/node.json",
  "include": ["src"]
}
```

Create `packages/config/src/env.ts`:

```ts
import { z } from "zod";

export const appEnvSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default("http://localhost:4000"),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function parseAppEnv(env: Record<string, string | undefined>): AppEnv {
  return appEnvSchema.parse(env);
}

export const serviceEnvSchema = z.object({
  API_PORT: z.coerce.number().int().positive().default(4000),
  API_HOST: z.string().default("0.0.0.0"),
});

export type ServiceEnv = z.infer<typeof serviceEnvSchema>;

export function parseServiceEnv(env: Record<string, string | undefined>): ServiceEnv {
  return serviceEnvSchema.parse(env);
}
```

Create `packages/config/src/index.ts`:

```ts
export * from "./env";
```

- [ ] **Step 5: Add shared type contracts**

Create `packages/types/package.json`:

```json
{
  "name": "@template/types",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "zod": "^3.24.4"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/types/tsconfig.json`:

```json
{
  "extends": "../tsconfig/node.json",
  "include": ["src"]
}
```

Create `packages/types/src/api.ts`:

```ts
import { z } from "zod";

export const apiErrorCodeSchema = z.enum([
  "validation_failed",
  "not_found",
  "server_error",
]);

export const apiErrorEnvelopeSchema = z.object({
  error: z.object({
    code: apiErrorCodeSchema,
    message: z.string(),
    fields: z.record(z.string()).optional(),
    requestId: z.string(),
  }),
});

export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>;
export type ApiErrorEnvelope = z.infer<typeof apiErrorEnvelopeSchema>;
```

Create `packages/types/src/user.ts`:

```ts
import { z } from "zod";

export const userStatusSchema = z.enum(["active", "invited", "disabled"]);

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "manager", "member"]),
  status: userStatusSchema,
  createdAt: z.string().datetime(),
});

export const createUserInputSchema = userSchema.pick({
  name: true,
  email: true,
  role: true,
});

export const updateUserInputSchema = createUserInputSchema.partial().extend({
  status: userStatusSchema.optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserStatus = z.infer<typeof userStatusSchema>;
export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
```

Create `packages/types/src/index.ts`:

```ts
export * from "./api";
export * from "./user";
```

- [ ] **Step 6: Install and verify**

Run:

```bash
pnpm install
pnpm --filter @template/config typecheck
pnpm --filter @template/types typecheck
```

Expected: install and typechecks exit with code 0.

- [ ] **Step 7: Commit and push**

```bash
git add packages/tsconfig packages/eslint-config packages/config packages/types package.json pnpm-lock.yaml
git commit -m "chore: add shared config and type packages"
git push -u origin setup/shared-config-packages
```

---

## Task 3: Shared Runtime Utility Packages

**Branch:** `setup/shared-runtime-packages`

**Files:**
- Create: `packages/utils/package.json`
- Create: `packages/utils/tsconfig.json`
- Create: `packages/utils/src/assertNever.ts`
- Create: `packages/utils/src/formatDate.ts`
- Create: `packages/utils/src/index.ts`
- Create: `packages/state/package.json`
- Create: `packages/state/tsconfig.json`
- Create: `packages/state/src/themeModeStore.ts`
- Create: `packages/state/src/index.ts`
- Create: `packages/auth/package.json`
- Create: `packages/auth/tsconfig.json`
- Create: `packages/auth/src/session.ts`
- Create: `packages/auth/src/index.ts`
- Create: `packages/testing/package.json`
- Create: `packages/testing/tsconfig.json`
- Create: `packages/testing/src/renderWithProviders.tsx`
- Create: `packages/testing/src/index.ts`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c setup/shared-runtime-packages
```

Expected: branch `setup/shared-runtime-packages` checked out.

- [ ] **Step 2: Add utilities package**

Create `packages/utils/package.json`:

```json
{
  "name": "@template/utils",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/utils/tsconfig.json`:

```json
{
  "extends": "../tsconfig/node.json",
  "include": ["src"]
}
```

Create `packages/utils/src/assertNever.ts`:

```ts
export function assertNever(value: never, message = "Unexpected value"): never {
  throw new Error(`${message}: ${String(value)}`);
}
```

Create `packages/utils/src/formatDate.ts`:

```ts
export function formatDate(value: string | Date, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}
```

Create `packages/utils/src/index.ts`:

```ts
export * from "./assertNever";
export * from "./formatDate";
```

- [ ] **Step 3: Add state package**

Create `packages/state/package.json`:

```json
{
  "name": "@template/state",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "zustand": "^5.0.4"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/state/tsconfig.json`:

```json
{
  "extends": "../tsconfig/react.json",
  "include": ["src"]
}
```

Create `packages/state/src/themeModeStore.ts`:

```ts
import { create } from "zustand";

export type ThemeMode = "light" | "dark";

type ThemeModeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

export const useThemeModeStore = create<ThemeModeState>((set) => ({
  mode: "light",
  setMode: (mode) => set({ mode }),
  toggleMode: () =>
    set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
}));
```

Create `packages/state/src/index.ts`:

```ts
export * from "./themeModeStore";
```

- [ ] **Step 4: Add auth placeholder package with real types**

Create `packages/auth/package.json`:

```json
{
  "name": "@template/auth",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/auth/tsconfig.json`:

```json
{
  "extends": "../tsconfig/node.json",
  "include": ["src"]
}
```

Create `packages/auth/src/session.ts`:

```ts
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
  return session.status === "authenticated" && session.user.roles.includes(role);
}
```

Create `packages/auth/src/index.ts`:

```ts
export * from "./session";
```

- [ ] **Step 5: Add testing package**

Create `packages/testing/package.json`:

```json
{
  "name": "@template/testing",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.76.1",
    "@testing-library/react": "^16.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/testing/tsconfig.json`:

```json
{
  "extends": "../tsconfig/react.json",
  "include": ["src"]
}
```

Create `packages/testing/src/renderWithProviders.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

type ProviderOptions = {
  queryClient?: QueryClient;
};

export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions & ProviderOptions = {},
) {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options;

  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
```

Create `packages/testing/src/index.ts`:

```ts
export * from "./renderWithProviders";
```

- [ ] **Step 6: Install and verify**

Run:

```bash
pnpm install
pnpm --filter @template/utils typecheck
pnpm --filter @template/state typecheck
pnpm --filter @template/auth typecheck
pnpm --filter @template/testing typecheck
```

Expected: all commands exit with code 0.

- [ ] **Step 7: Commit and push**

```bash
git add packages/utils packages/state packages/auth packages/testing package.json pnpm-lock.yaml
git commit -m "chore: add shared runtime packages"
git push -u origin setup/shared-runtime-packages
```

---

## Task 4: API Client and Fastify Service Skeleton

**Branch:** `setup/api-gateway-foundation`

**Files:**
- Create: `packages/api-client/package.json`
- Create: `packages/api-client/tsconfig.json`
- Create: `packages/api-client/src/httpClient.ts`
- Create: `packages/api-client/src/usersClient.ts`
- Create: `packages/api-client/src/index.ts`
- Create: `services/api-gateway/package.json`
- Create: `services/api-gateway/tsconfig.json`
- Create: `services/api-gateway/src/server.ts`
- Create: `services/api-gateway/src/usersStore.ts`
- Create: `services/api-gateway/src/index.ts`
- Create: `services/api-gateway/src/server.test.ts`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c setup/api-gateway-foundation
```

Expected: branch `setup/api-gateway-foundation` checked out.

- [ ] **Step 2: Add API client package**

Create `packages/api-client/package.json`:

```json
{
  "name": "@template/api-client",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@template/types": "workspace:*"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/api-client/tsconfig.json`:

```json
{
  "extends": "../tsconfig/node.json",
  "include": ["src"]
}
```

Create `packages/api-client/src/httpClient.ts`:

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

    const body = await response.json();

    if (!response.ok) {
      const errorBody = apiErrorEnvelopeSchema.parse(body);
      throw new ApiClientError(response.status, errorBody);
    }

    return body as T;
  }
}
```

Create `packages/api-client/src/usersClient.ts`:

```ts
import type { CreateUserInput, UpdateUserInput, User } from "@template/types";
import { HttpClient } from "./httpClient";

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
      await http.request<{ ok: true }>(`/api/users/${id}`, { method: "DELETE" });
    },
  };
}
```

Create `packages/api-client/src/index.ts`:

```ts
export * from "./httpClient";
export * from "./usersClient";
```

- [ ] **Step 3: Add Fastify service package**

Create `services/api-gateway/package.json`:

```json
{
  "name": "@template/api-gateway",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit",
    "dev": "tsx watch src/index.ts",
    "lint": "eslint .",
    "test": "vitest run",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "dependencies": {
    "@fastify/cors": "^10.0.1",
    "@template/config": "workspace:*",
    "@template/types": "workspace:*",
    "fastify": "^5.3.2",
    "zod": "^3.24.4"
  },
  "devDependencies": {
    "@types/node": "^22.15.17",
    "tsx": "^4.19.4",
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `services/api-gateway/tsconfig.json`:

```json
{
  "extends": "../../packages/tsconfig/node.json",
  "include": ["src"]
}
```

- [ ] **Step 4: Add service user store**

Create `services/api-gateway/src/usersStore.ts`:

```ts
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
```

- [ ] **Step 5: Add Fastify server**

Create `services/api-gateway/src/server.ts`:

```ts
import cors from "@fastify/cors";
import {
  createUserInputSchema,
  updateUserInputSchema,
  type ApiErrorEnvelope,
} from "@template/types";
import Fastify from "fastify";
import { ZodError } from "zod";
import { createUsersStore } from "./usersStore";

function errorEnvelope(
  code: ApiErrorEnvelope["error"]["code"],
  message: string,
  requestId: string,
  fields?: Record<string, string>,
): ApiErrorEnvelope {
  return { error: { code, message, requestId, fields } };
}

function zodFields(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path.join("."), issue.message]),
  );
}

export function createServer() {
  const app = Fastify({ logger: true });
  const users = createUsersStore();

  app.register(cors, { origin: true });

  app.get("/health", async () => ({ ok: true }));

  app.get("/api/users", async () => users.list());

  app.get("/api/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = users.get(id);
    if (!user) {
      return reply
        .code(404)
        .send(errorEnvelope("not_found", "User not found.", request.id));
    }
    return user;
  });

  app.post("/api/users", async (request, reply) => {
    const parsed = createUserInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send(
          errorEnvelope(
            "validation_failed",
            "Some fields need attention.",
            request.id,
            zodFields(parsed.error),
          ),
        );
    }
    return reply.code(201).send(users.create(parsed.data));
  });

  app.patch("/api/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = updateUserInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send(
          errorEnvelope(
            "validation_failed",
            "Some fields need attention.",
            request.id,
            zodFields(parsed.error),
          ),
        );
    }
    const user = users.update(id, parsed.data);
    if (!user) {
      return reply
        .code(404)
        .send(errorEnvelope("not_found", "User not found.", request.id));
    }
    return user;
  });

  app.delete("/api/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    if (!users.delete(id)) {
      return reply
        .code(404)
        .send(errorEnvelope("not_found", "User not found.", request.id));
    }
    return { ok: true };
  });

  return app;
}
```

Create `services/api-gateway/src/index.ts`:

```ts
import { parseServiceEnv } from "@template/config";
import { createServer } from "./server";

const env = parseServiceEnv(process.env);
const server = createServer();

await server.listen({ host: env.API_HOST, port: env.API_PORT });
```

- [ ] **Step 6: Add service tests**

Create `services/api-gateway/src/server.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createServer } from "./server";

describe("api gateway", () => {
  it("responds to health checks", async () => {
    const app = createServer();
    const response = await app.inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });
  });

  it("lists users", async () => {
    const app = createServer();
    const response = await app.inject({ method: "GET", url: "/api/users" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveLength(2);
  });

  it("returns validation errors for invalid user creation", async () => {
    const app = createServer();
    const response = await app.inject({
      method: "POST",
      url: "/api/users",
      payload: { name: "", email: "bad", role: "member" },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("validation_failed");
  });
});
```

- [ ] **Step 7: Install and verify**

Run:

```bash
pnpm install
pnpm --filter @template/api-client typecheck
pnpm --filter @template/api-gateway test
pnpm --filter @template/api-gateway typecheck
```

Expected: all commands exit with code 0.

- [ ] **Step 8: Commit and push**

```bash
git add packages/api-client services/api-gateway package.json pnpm-lock.yaml
git commit -m "feat: add API gateway foundation"
git push -u origin setup/api-gateway-foundation
```

---

## Task 5: Material UI Foundation Packages

**Branch:** `setup/material-ui-foundation`

**Files:**
- Create: `packages/design-system/package.json`
- Create: `packages/design-system/tsconfig.json`
- Create: `packages/design-system/src/themes/createAppTheme.ts`
- Create: `packages/design-system/src/themes/index.ts`
- Create: `packages/design-system/src/index.ts`
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/src/AppButton.tsx`
- Create: `packages/ui/src/AppShell.tsx`
- Create: `packages/ui/src/PageHeader.tsx`
- Create: `packages/ui/src/index.ts`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c setup/material-ui-foundation
```

Expected: branch `setup/material-ui-foundation` checked out.

- [ ] **Step 2: Add design-system package**

Create `packages/design-system/package.json`:

```json
{
  "name": "@template/design-system",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.1.0"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/design-system/tsconfig.json`:

```json
{
  "extends": "../tsconfig/react.json",
  "include": ["src"]
}
```

Create `packages/design-system/src/themes/createAppTheme.ts`:

```ts
import { createTheme, type PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1457d9",
      },
      secondary: {
        main: "#2e7d6f",
      },
      background: {
        default: mode === "light" ? "#f7f8fb" : "#101418",
        paper: mode === "light" ? "#ffffff" : "#161b22",
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    },
  });
}
```

Create `packages/design-system/src/themes/index.ts`:

```ts
export * from "./createAppTheme";
```

Create `packages/design-system/src/index.ts`:

```ts
export * from "./themes";
```

- [ ] **Step 3: Add UI package**

Create `packages/ui/package.json`:

```json
{
  "name": "@template/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@mui/icons-material": "^7.1.0",
    "@mui/material": "^7.1.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "scripts": {
    "build": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "devDependencies": {
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "typescript": "^5.8.3",
    "vitest": "^3.1.3"
  }
}
```

Create `packages/ui/tsconfig.json`:

```json
{
  "extends": "../tsconfig/react.json",
  "include": ["src"]
}
```

Create `packages/ui/src/AppButton.tsx`:

```tsx
import Button, { type ButtonProps } from "@mui/material/Button";

export function AppButton(props: ButtonProps) {
  return <Button variant="contained" disableElevation {...props} />;
}
```

Create `packages/ui/src/AppShell.tsx`:

```tsx
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { ReactNode } from "react";

type AppShellProps = {
  title: string;
  children: ReactNode;
};

export function AppShell({ title, children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Box component="header" sx={{ borderBottom: 1, borderColor: "divider", py: 2 }}>
        <Container maxWidth="lg">{title}</Container>
      </Box>
      <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
```

Create `packages/ui/src/PageHeader.tsx`:

```tsx
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <Stack direction="row" justifyContent="space-between" gap={2} sx={{ mb: 3 }}>
      <Stack gap={0.5}>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
        {description ? (
          <Typography color="text.secondary">{description}</Typography>
        ) : null}
      </Stack>
      {action}
    </Stack>
  );
}
```

Create `packages/ui/src/index.ts`:

```ts
export * from "./AppButton";
export * from "./AppShell";
export * from "./PageHeader";
```

- [ ] **Step 4: Install and verify**

Run:

```bash
pnpm install
pnpm --filter @template/design-system typecheck
pnpm --filter @template/ui typecheck
```

Expected: all commands exit with code 0.

- [ ] **Step 5: Commit and push**

```bash
git add packages/design-system packages/ui package.json pnpm-lock.yaml
git commit -m "feat: add Material UI foundation packages"
git push -u origin setup/material-ui-foundation
```

---

## Task 6: Web and Admin App Shells

**Branch:** `setup/vite-app-shells`

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/index.html`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/vite.config.ts`
- Create: `apps/web/src/main.tsx`
- Create: `apps/web/src/app/App.tsx`
- Create: `apps/web/src/app/providers/AppProviders.tsx`
- Create: `apps/web/src/app/routes.tsx`
- Create: `apps/admin/package.json`
- Create: `apps/admin/index.html`
- Create: `apps/admin/tsconfig.json`
- Create: `apps/admin/vite.config.ts`
- Create: `apps/admin/src/main.tsx`
- Create: `apps/admin/src/app/App.tsx`
- Create: `apps/admin/src/app/providers/AppProviders.tsx`
- Create: `apps/admin/src/app/routes.tsx`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c setup/vite-app-shells
```

Expected: branch `setup/vite-app-shells` checked out.

- [ ] **Step 2: Add web app package and Vite config**

Create `apps/web/package.json`:

```json
{
  "name": "@template/web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build",
    "dev": "vite --host 0.0.0.0 --port 5173",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "test:e2e": "cypress run",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.1.0",
    "@tanstack/react-query": "^5.76.1",
    "@template/design-system": "workspace:*",
    "@template/ui": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router": "^7.6.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "@vitejs/plugin-react": "^4.4.1",
    "cypress": "^14.3.3",
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "vitest": "^3.1.3"
  }
}
```

Create `apps/web/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Template Web</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `apps/web/tsconfig.json`:

```json
{
  "extends": "../../packages/tsconfig/react.json",
  "include": ["src", "vite.config.ts"]
}
```

Create `apps/web/vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 3: Add web app shell**

Create `apps/web/src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `apps/web/src/app/providers/AppProviders.tsx`:

```tsx
import { createAppTheme } from "@template/design-system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const queryClient = new QueryClient();
const theme = createAppTheme("light");

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

Create `apps/web/src/app/routes.tsx`:

```tsx
import { AppButton, AppShell, PageHeader } from "@template/ui";

export function HomeRoute() {
  return (
    <AppShell title="Web App">
      <PageHeader
        title="Dashboard"
        description="React monorepo template foundation."
        action={<AppButton>New user</AppButton>}
      />
    </AppShell>
  );
}
```

Create `apps/web/src/app/App.tsx`:

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

- [ ] **Step 4: Add admin app package and Vite config**

Create `apps/admin/package.json`:

```json
{
  "name": "@template/admin",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build",
    "dev": "vite --host 0.0.0.0 --port 5174",
    "lint": "eslint .",
    "test": "vitest run --passWithNoTests",
    "test:e2e": "cypress run",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist coverage"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/material": "^7.1.0",
    "@tanstack/react-query": "^5.76.1",
    "@template/design-system": "workspace:*",
    "@template/ui": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router": "^7.6.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.3",
    "@types/react-dom": "^19.1.3",
    "@vitejs/plugin-react": "^4.4.1",
    "cypress": "^14.3.3",
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "vitest": "^3.1.3"
  }
}
```

Create `apps/admin/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Template Admin</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `apps/admin/tsconfig.json`:

```json
{
  "extends": "../../packages/tsconfig/react.json",
  "include": ["src", "vite.config.ts"]
}
```

Create `apps/admin/vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
```

Create `apps/admin/src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `apps/admin/src/app/providers/AppProviders.tsx`:

```tsx
import { createAppTheme } from "@template/design-system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const queryClient = new QueryClient();
const theme = createAppTheme("light");

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

Create `apps/admin/src/app/routes.tsx`:

```tsx
import { AppShell, PageHeader } from "@template/ui";

export function HomeRoute() {
  return (
    <AppShell title="Admin App">
      <PageHeader
        title="Admin Dashboard"
        description="Operations shell for internal teams."
      />
    </AppShell>
  );
}
```

Create `apps/admin/src/app/App.tsx`:

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

- [ ] **Step 5: Install and verify**

Run:

```bash
pnpm install
pnpm --filter @template/web typecheck
pnpm --filter @template/admin typecheck
pnpm --filter @template/web build
pnpm --filter @template/admin build
```

Expected: all commands exit with code 0.

- [ ] **Step 6: Commit and push**

```bash
git add apps/web apps/admin package.json pnpm-lock.yaml
git commit -m "feat: add Vite app shells"
git push -u origin setup/vite-app-shells
```

---

## Task 7: Foundation Verification and Pause Notes

**Branch:** `docs/foundation-verification-notes`

**Files:**
- Create: `docs/superpowers/notes/2026-05-13-monorepo-foundation-progress.md`
- Modify: `README.md`

- [ ] **Step 1: Create task branch**

```bash
git switch main
git pull --ff-only
git switch -c docs/foundation-verification-notes
```

Expected: branch `docs/foundation-verification-notes` checked out.

- [ ] **Step 2: Update README with current milestone**

Modify `README.md` so it includes:

```markdown
## Current Template Milestone

The current implementation milestone is the monorepo foundation:

- pnpm workspaces
- Turborepo task orchestration
- shared TypeScript and ESLint packages
- shared config, types, utility, auth, state, testing, API client, design-system, and UI package foundations
- Vite React web and admin app shells
- Fastify API gateway foundation

See `docs/superpowers/plans/2026-05-13-monorepo-foundation-implementation.md` for the approved implementation plan.
```

- [ ] **Step 3: Add pause/resume notes**

Create `docs/superpowers/notes/2026-05-13-monorepo-foundation-progress.md`:

```markdown
# Monorepo Foundation Progress Notes

Date: 2026-05-13

## Approved Spec

`docs/superpowers/specs/2026-05-13-react-monorepo-template-design.md`

## Plan

`docs/superpowers/plans/2026-05-13-monorepo-foundation-implementation.md`

## Branch Rule

Each implementation task uses a separate branch and PR.

## Current Milestone Scope

- Root workspace tooling.
- Shared config/type/runtime packages.
- API client and Fastify API gateway foundation.
- Material UI design-system and UI foundations.
- Vite web and admin app shells.

## Next Plans After This Milestone

1. Users feature vertical slice.
2. Cypress browser flow and CI.
3. Docker and environment docs.
4. Feature/service generators.
5. Security and auth-ready routing guidance.
```

- [ ] **Step 4: Run final foundation checks**

Run from repo root after relevant task branches are merged:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands exit with code 0.

- [ ] **Step 5: Commit and push**

```bash
git add README.md docs/superpowers/notes/2026-05-13-monorepo-foundation-progress.md
git commit -m "docs: record monorepo foundation progress"
git push -u origin docs/foundation-verification-notes
```

---

## Plan Self-Review

- Spec coverage: This plan covers the first approved foundation slice: workspace tooling, shared package boundaries, Vite app shells, Fastify service skeleton, Material UI foundation, and pause notes.
- Deferred by design: users feature implementation, Cypress flow, GitHub Actions, Docker, generators, full documentation set, Storybook, and security hardening need follow-up plans.
- Placeholder scan: no unresolved placeholder markers are used.
- Type consistency: package names follow `@template/*`; shared aliases match `tsconfig.base.json`; API/user types are defined before client/service usage.

## Execution Handoff

Plan complete. Recommended execution: one task branch and PR at a time, starting with Task 1.
