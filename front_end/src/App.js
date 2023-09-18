import { publicRoute } from "./routes/route";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import MainLayout from "./layouts/MainLayout/mainlayout";
function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index)=>{
            let Layout = route.layout === null ? Fragment : MainLayout;
            const Page = route.component;
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page/>
              </Layout>
            }/>
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
