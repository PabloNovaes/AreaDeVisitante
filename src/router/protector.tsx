import { callApi } from "@/api.config";
import { useAuth } from "@/hooks/use-auth";
import { errorToastDispatcher } from "@/utils/error-toast-dispatcher";
import c from "js-cookie";
import { ReactNode, useEffect, useTransition } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


export function ProtectedRoute({ children }: { children: ReactNode }) {
    const [loading, init] = useTransition()

    const { data, setData } = useAuth()
    const { pathname } = useLocation()

    const nav = useNavigate()

    useEffect(() => {
        init(async () => {
            try {
                const token = c.get("token")
                if (!token) return

                const body = { request: "get_perfil_visitante", tipo: "2" }
                const res = await callApi("POST", { body: body, headers: { Authorization: `Bearer ${token}` } })

                if (!res["RESULT"]) throw new Error(res["INFO"] || res["MSG"])

                setData({ ...res, TOKEN: token })
                nav('/home')
            } catch (err) {
                if (pathname !== '/') {
                    errorToastDispatcher(err)
                }
            }
        })

    }, [])

    if (loading) return <main className="h-svh bg-black" />

    if (!data && pathname !== "/") return <Navigate to={"/"} />

    return children;
}
