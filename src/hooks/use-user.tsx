import { userContext } from "@/context/user-context";
import { useContext } from "react";

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("useUser deve ser usado dentro de um InviteProvider");
    }
    return context;
} 