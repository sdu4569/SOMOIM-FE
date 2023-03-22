import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PageNavigator from "./PageNavigator";
import Layout from "./page/layout";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";

export const API_ENDPOINT = "http://43.200.191.33:8080";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <SWRConfig
          value={{
            fetcher: (url: string) =>
              fetch(`${API_ENDPOINT}/${url}`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjc5Mzg0MzI3LCJleHAiOjE3MTA5MjAzMjd9.qltmshE27_Qsyc-EnkcpLgl3nfPJ9X5E12e7nrKMYeM",
                },
              }).then((res) => res.json()),
          }}
        >
          <Layout>
            <PageNavigator />
          </Layout>
        </SWRConfig>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
