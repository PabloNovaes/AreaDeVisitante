import c from "js-cookie";
import { createContext, ReactNode, useEffect, useState } from "react";

type UserProps = {
    RESULT: boolean;
    NOME: string;
    EMAIL: string | null;
    TELEFONE: string;
    IMAGEM: string;
    TOKEN: string
}

interface UserContextProps {
    data: UserProps
    setData: (data: UserProps | null) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext<UserContextProps | undefined>(undefined)

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<null | UserProps>(null)

    useEffect(() => {
        const token = c.get("token")
        if (token?.trim() !== '' && token) {
            setData((prev) => ({ ...prev as UserProps, TOKEN: token }))
        }
    }, [])

    return (
        <userContext.Provider value={{ data: data as UserProps, setData }}>
            {children}
        </userContext.Provider>
    )
}