import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/hooks/use-auth"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import c from "js-cookie"
import { Loader, LogOut } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export function UserProfile() {
    const { data, setData } = useAuth()
    const [loading, setLoading] = useState('false')

    const logout = async () => {
        setLoading('true')
        await new Promise((res) => setTimeout(() => res(''), 1200))
        c.remove("token")
        setData(null)
        setLoading('false')
    }

    const isDesktop = useMediaQuery("(min-width: 600px)")

    const Trigger = () => (
        <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <Avatar className="size-12 border-2 border-white/20 hover:border-primary/30 transition-all duration-200">
                <AvatarImage
                    src={data?.IMAGEM || "/placeholder.svg"}
                    alt={data?.NOME || "Avatar do usuário"}
                    className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary">{data?.NOME?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
        </Button>
    )

    if (isDesktop) return (
        <Popover>
            <PopoverTrigger>
                <Trigger />
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 rounded-lg shadow-lg border border-border/40 overflow-hidden">
                <div className={cn("rounded-xl p-3", !isDesktop && 'pt-0')}>
                    <div className="flex items-center gap-3">
                        <Avatar className="size-12 border-2 border-white/20 shadow-sm">
                            <AvatarImage
                                src={data?.IMAGEM || "/placeholder.svg"}
                                alt={data?.NOME || "Avatar do usuário"}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">{data?.NOME?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="grid leading-tight">
                            <h1 className="text-sm font-semibold text-foreground">{data?.NOME}</h1>
                            <h3 className="text-xs text-muted-foreground">{data?.EMAIL || "Bem-vindo à área de visitantes"}</h3>
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <Button
                        onClick={logout}
                        variant="ghost"
                        className="w-full justify-start text-xs font-normal cursor-pointer px-2 py-4 h-auto rounded-md bg-destructive/6 text-destructive/80 hover:bg-destructive/10 hover:text-destructive group"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={loading}
                                className="flex items-center gap-2"
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {loading === 'true' && (
                                    <>
                                        <Loader size={14} className="mr-2 animate-spin" />
                                        Saindo...
                                    </>
                                )}
                                {loading === "false" && (
                                    <>
                                        <LogOut size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                                        Sair da conta
                                    </>
                                )}

                            </motion.div>
                        </AnimatePresence>


                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )

    return (
        <Drawer>
            <DrawerTrigger >
                <Trigger />
            </DrawerTrigger>
            <DrawerContent >
                <DrawerHeader>
                    <div className={cn("rounded-xl p-3", !isDesktop && 'pt-0')}>
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 border-2 border-white/20 shadow-sm">
                                <AvatarImage
                                    src={data?.IMAGEM || "/placeholder.svg"}
                                    alt={data?.NOME || "Avatar do usuário"}
                                    className="object-cover"
                                />
                                <AvatarFallback className="bg-primary/10 text-primary">{data?.NOME?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="grid leading-tight">
                                <h1 className="text-sm font-semibold text-foreground">{data?.NOME}</h1>
                                <h3 className="text-xs text-muted-foreground">{data?.EMAIL || "Bem-vindo à área de visitantes"}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="p-1">
                        <Button
                            onClick={logout}
                            variant="ghost"
                            className="w-full justify-start text-xs font-normal cursor-pointer px-2 py-4 h-auto rounded-md bg-destructive/6 text-destructive/80 hover:bg-destructive/10 hover:text-destructive group"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={loading}
                                    className="flex items-center gap-2"
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {loading === 'true' && (
                                        <>
                                            <Loader className="w-[15px] h-[15px] animate-spin text-white" />
                                        </>
                                    )}
                                    {loading === "false" && (
                                        <>
                                            <LogOut size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                                            Sair da conta
                                        </>
                                    )}

                                </motion.div>
                            </AnimatePresence>


                        </Button>
                    </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}
