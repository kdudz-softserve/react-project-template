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
