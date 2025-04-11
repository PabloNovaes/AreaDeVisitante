import { QrcodeButton } from "@/components/features/qrcode-button"

import { DataTable } from "@/components/historic-table"
import { InfoButton } from "@/components/info-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { Adress } from "@/types/data"
import { isToday } from "@/utils/formatters"
import c from "js-cookie"
import { ChevronsUpDown, Clock, LogOutIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export function VisitorArea() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    // const [isExpanded, setIsExpanded] = useState(false)

    const { adresses, filteredHistorical, currentAdress, setCurrentAdress } = useUser()
    const { data, setData } = useAuth()

    const nav = useNavigate()

    const logout = async () => {
        await new Promise((res) => setTimeout(() => res(''), 1200))
        setData(null)
        c.remove("token")
        nav("/")
    }

    return (
        <main className="relative min-h-svh overflow-hidden grid justify-items-center">
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
            <div className="max-w-5xl w-full h-full flex flex-col p-8 z-10 gap-8">
                <header className="grid gap-5 items-center w-full ">
                    <div className="flex gap-3 items-center">
                        <DropdownMenu >
                            <DropdownMenuTrigger className="flex gap-4 items-center rounded-full size-10 text-xl font-bold cursor-pointer  ring-[3px] ring-zinc-200/20">
                                <img src={data?.IMAGEM} className="size-10 object-cover rounded-full" alt="" />
                            </DropdownMenuTrigger>
                            <div className="grid leading-3.5">
                                <h1 className="text-xl bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text font-semibold text-transparent"> {data.NOME} </h1>
                                <h3 className="font-medium opacity-70 text-xs">{data.EMAIL ? data.EMAIL : "Bem-Vindo a area de visitantes "}</h3>
                            </div>
                            <DropdownMenuContent align="start" className="w-[100px] p-2 px-3 bg-red-800/30 text-red-400 backdrop-blur-3xl">
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
                    </div>
                    {/* <Alert03 /> */}
                </header>
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-2xl sm:text-4xl tracking-tight font-bold ">Confira abaixo suas autorizações de convites recorrentes e histórico de acesso.</h1>
                    <InfoButton />
                    <div className="flex gap-3 w-full">
                        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                            <DropdownMenuTrigger className="flex gap-4 items-center sm:max-w-[280px] w-full" asChild>
                                <div className="flex items-center justify-between gap-2 py-2 px-4 rounded-2xl h-fit w-fit text-white bg-[#181818] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer focus-visible:brightness-75 hover:brightness-75 transition-all border border-t-0">
                                    <div>
                                        <p className="text-xs line-clamp-1">{currentAdress?.CONDOMINIO}</p>
                                        <p className="text-xs text-white/50 line-clamp-1">{currentAdress?.ENDERECO}</p>
                                    </div>
                                    <ChevronsUpDown size={14} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full rounded-xl">
                                <ul className="grid gap-1 py-1">
                                    {adresses && adresses?.map((adress, indx) => (
                                        <>
                                            <li key={adress.ENDERECO} onClick={() => {
                                                setDropdownOpen(false)
                                                setCurrentAdress(adress)
                                            }
                                            } className="pl-2 py-1 rounded-md text-sm  bg-popover hover:brightness-125 transition-all duration-200">
                                                <p className="text-xs truncate">{adress.CONDOMINIO}
                                                    {/* {!adress.ACTIVE &&
                                                        <span className="flex items-center gap-2 right-2">
                                                            <X className="text-red-400" size={13} />
                                                            Inativo
                                                        </span>
                                                    } */}
                                                </p>
                                                {/* <p className="text-xs text-white/50">{ENDERECO}</p> */}
                                            </li>
                                            {indx + 1 !== adresses?.length && <span className="w-full bg-border h-px" />}
                                        </>
                                    ))}
                                </ul>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AnimatePresence mode="wait">
                            {currentAdress?.BOTAO && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                >
                                    <QrcodeButton />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-4">
                        {filteredHistorical && <DataTable currentAdress={currentAdress as Adress} data={filteredHistorical.filter((record) => record.NOME_CONDOMINIO === currentAdress?.CONDOMINIO)} />}
                        {currentAdress?.RESULT &&
                            <Card className="shadow-lg rounded-2xl w-full h-fit">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Horarios de acesso
                                    </CardTitle>
                                    <CardDescription>Abaixo estão os dias e horários em que você pode acessar o condomínio.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-xl border bg-[#121212] overflow-hidden">
                                        {currentAdress?.RESULT && currentAdress.VISITA && currentAdress.VISITA
                                            .filter(({ FAIXA }) => FAIXA !== '')
                                            .map(({ DIA, FAIXA }, index) => (
                                                <div
                                                    key={DIA}
                                                    className={cn(
                                                        "flex items-center justify-between p-3",
                                                        index !== (currentAdress?.VISITA as typeof currentAdress.VISITA).filter(({ FAIXA }) => FAIXA !== '').length - 1 && "border-b",
                                                        isToday(DIA) && "bg-[#282828]",
                                                    )}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {isToday(DIA) && (
                                                            <Badge variant="outline" className="bg-primary/10 transition-all">
                                                                Hoje
                                                            </Badge>
                                                        )}
                                                        <span className={cn("font-medium", isToday(DIA) && "text-primary")}>{DIA}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-muted-foreground">
                                                            {FAIXA}
                                                            {/* {formatTimeRange(startTime, endTime)} */}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        }

                    </div>
                </div>
            </div>
        </main >
    )
}

