import { Login } from "@/pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="/" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
