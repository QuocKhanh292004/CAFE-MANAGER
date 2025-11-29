import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Fragment} from "react";
import "./App.css";
import DefaultLayout from "./layouts/defaultLayout/index.jsx";
import publicRoutes from "./routes/routes.js";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page/>
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
