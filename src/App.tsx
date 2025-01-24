import {Route, Routes} from "react-router-dom";

import {SearchProducts} from "./pages/search-products";

import {Layout} from "@/components/layout/layout";
import {Home} from "@/pages/home";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<Home />} path="/" />
                <Route element={<SearchProducts />} path="/searchProducts" />
            </Route>
        </Routes>
    );
}

export default App;
