import "./App.css";
import { BrowserRouter } from "react-router-dom";
import PageNavigator from "./PageNavigator";
import Layout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <PageNavigator />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
