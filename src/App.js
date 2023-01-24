import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./App.css";
import InfinitePeople from "./people/InfinitePeople";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>infinite scroll</div>
      <InfinitePeople />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
