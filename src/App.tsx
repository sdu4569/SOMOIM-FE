import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PageNavigator from "./PageNavigator";
import Layout from "./components/layout";
import { SWRConfig } from "swr";

function App() {
  return (
    <BrowserRouter>
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
      >
        <Layout>
          <PageNavigator />
        </Layout>
      </SWRConfig>
    </BrowserRouter>
  );
}

export default App;
