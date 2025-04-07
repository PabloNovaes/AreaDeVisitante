import { callApi } from "@/api.config";
import c from 'js-cookie';
import { ReactNode, useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const [loading, startTransition] = useTransition()
    const nav = useNavigate()

    const token = c.get("token");

    useEffect(() => {
        const verifyToken = async () => {
            startTransition(async () => {
                try {
                    if (!token) throw new Error("No token");

                    const data = await callApi("POST", {
                        body: JSON.stringify({ request: "meus_recorrentes" }),
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    })

                    console.log(data);

                } catch (err) {
                    console.log(err);
                    nav("/")
                }
            })
        }
        verifyToken()
    }, [])

    if (loading) return null;

    return children;
}
