import { AppProviders } from "./providers/AppProviders";
import { HomeRoute } from "./routes";

export function App() {
  return (
    <AppProviders>
      <HomeRoute />
    </AppProviders>
  );
}
