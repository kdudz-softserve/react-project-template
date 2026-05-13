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
