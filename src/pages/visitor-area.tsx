// import logo from "@/../public/letter-logo.svg"
import Alert03 from "@/components/kokonutui/alert-03"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUser } from "@/hooks/use-user"
import c from "js-cookie"
import { LogOutIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export function VisitorArea() {
    const { data, setData } = useUser()
    const nav = useNavigate()
    // const features = [
    //     {
    //         Icon: CalendarCheck,
    //         name: "Ver minhas permissões",
    //         description: "Verifique os períodos em que seu acesso ao condomínio está permitido.",
    //         href: "/",
    //         cta: "Learn more",
    //         background: (
    //             <Calendar
    //                 mode="single"
    //                 selected={new Date(2022, 4, 11, 0, 0, 0)}
    //                 className="absolute bg-neutral-800 -right-14 -top-2 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
    //             />
    //         ),

    //     },
    //     {
    //         Icon: CalendarClock,
    //         name: "Ver meus acessos",
    //         description: "Acesse o registro detalhado das suas entradas e saídas no condomínio.",
    //         href: "/",
    //         cta: "Learn more",
    //         background: (
    //             <Calendar
    //                 mode="single"
    //                 selected={new Date(2022, 4, 11, 0, 0, 0)}
    //                 className="absolute -right-14 -top-8 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
    //             />
    //         ),

    //     }
    // ]

    const logout = async () => {
        await new Promise((res) => setTimeout(() => res(''), 1200))
        setData(null)
        c.remove("token")
        nav("/")
    }
    return (
        <main className="relative  min-h-svh overflow-hidden grid justify-items-center">
            {/* <motion.div
                initial={{ opacity: 0, filter: "brightness(.7) blur(10px)" }}
                animate={{ opacity: [0, 6, !isDesktop ? 0.4 : 0.5], filter: 'blur(100px)' }}
                transition={{ duration: 0.5 }}
                className="bg-cover absolute -top-[60%] right-1/2 mx-auto w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, filter: "brightness(.7) blur(10px)" }}
                animate={{ opacity: [0, 6, !isDesktop ? 0.4 : 0.5], filter: 'blur(100px)' }}
                transition={{ duration: 0.5 }}
                className="bg-cover absolute top-[10%] -right-1/2 mx-auto w-full h-1/2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, filter: "brightness(.7) blur(10px)" }}
                animate={{ opacity: [0, 6, 0.4], filter: 'blur(100px)' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-cover absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-violet-500/10 rounded-full blur-3xl"
            /> */}

            <motion.div
                initial={{ opacity: 0, filter: "brightness(.7)" }}
                animate={{
                    opacity: [0, 6, 0.8],
                    filter: "blur(100px)",
                }}
                transition={{ duration: 0.5 }}
                className="bg-cover absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, filter: "brightness(.7)" }}
                animate={{
                    opacity: [0, 6, 0.8],
                    filter: "blur(100px)",
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-cover absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/20 to-violet-500/10 rounded-full blur-3xl"
            />
            <div className="max-w-3xl w-full h-full flex flex-col p-9 z-10 gap-8">
                <header className="flex gap-3 justify-between items-center w-full ">

                    {/* <img src={logo || "/placeholder.svg"} alt="letter-logo" className="h-3 w-fit opacity-55" /> */}
                    <div className="grid leading-3.5">
                        <h1 className="font-medium text-xl">Olá  <span className="bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text font-semibold text-transparent"> {data.NOME} 👋</span></h1>
                        <h3 className="font-medium opacity-70 text-sm">{data.EMAIL ? data.EMAIL : "Bem-Vindo a area de visitantes "}</h3>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <button className="rounded-full size-10 text-xl font-bold cursor-pointer  ring-[6px] ring-[#bfbac236]">
                                <img src={data?.IMAGEM} className="size-10 rounded-full" alt="" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[100px] p-2 px-3 bg-red-800/30 text-red-400 backdrop-blur-3xl">
                            <button className="text-sm flex items-center gap-2 cursor-pointer" onClick={() => toast.promise(logout, {
                                loading: 'Saindo...',
                                position: 'bottom-center'
                            })}>
                                <AnimatePresence>
                                    <span className="flex items-center gap-2 ">
                                        <LogOutIcon size={15} /> Sair
                                    </span>
                                </AnimatePresence>
                            </button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <div className="w-full flex flex-col gap-8">
                    <h1 className="text-4xl tracking-tight font-bold">Confira abaixo suas autorizações de convites recorrentes</h1>
                    <Alert03 />
                    {/* Os convites somente poderão ser gerados dentro dos horários permitidos para acesso, basta clicar no botão qrcode para gerar sua chave de acesso. */}
                    {/* <div className="grid grid-cols-2 gap-3">
                        {features.map((feature) => <BentoCard className="bg-violet-400 border h-[200px] sm:col-span-1" {...feature} />)}
                    </div> */}
                </div>
            </div>
        </main>
    )
}

