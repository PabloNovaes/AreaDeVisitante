import { UserContextProvider } from "@/context/user-context";
import { BaseLayout } from "@/layout/base";
import { FormLayout } from "@/layout/form-layout";
import { Login } from "@/pages/login";
import { RecoverPassword } from "@/pages/recover-password";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VisitorArea } from "../pages/visitor-area";
import { ProtectedRoute } from "./protector";

export function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <UserContextProvider>
                        <BaseLayout />
                    </UserContextProvider>
                }>
                    <Route path="/" element={<FormLayout />}>
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        } />
                        <Route path="/recuperar-senha" element={<RecoverPassword />} />
                    </Route>

                    <Route path="/home" element={
                        <ProtectedRoute>
                            <VisitorArea />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
