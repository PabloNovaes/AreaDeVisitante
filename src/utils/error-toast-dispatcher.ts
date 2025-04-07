import { toast } from "sonner"

export const errorToastDispatcher = (err: unknown) => {
    if (err instanceof Error) {
        toast.error("Ocorre um erro inesperado!", {
            description: err.message || "Erro desconhecido, entre em contato com o morador ou a administração para reportar esse erro.",
            dismissible: true,
            duration: 6000,
            position: "bottom-center"
        })
        console.error(err)
    }
} 