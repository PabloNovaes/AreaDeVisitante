
import { AddressSelector } from "@/components/features/address-selector"
import { DataTable } from "@/components/features/historic-table"
import { InfoButton } from "@/components/features/info-button"
import { UserProfile } from "@/components/features/user-profile"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { Address } from "@/types/data"
import { formatPeriod, isToday } from "@/utils/formatters"
import { AlertCircle } from "lucide-react"
import { motion } from "motion/react"


export function VisitorArea() {
    const { addresses, filteredHistorical, currentAddress, setCurrentAddress } = useUser()
    const { data } = useAuth()

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
            <div className="max-w-[1100px] w-full h-full flex flex-col p-8 z-10 gap-8">
                <header className="gap-5 flex items-center justify-between w-full">
                    <div className="flex gap-3 items-center">
                        <UserProfile />
                        <div className="grid leading-3.5">
                            <h1 className="text-xl bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text font-semibold text-transparent">Olá {data.NOME} </h1>
                            <h3 className="font-medium opacity-70 text-xs">Bem-Vindo a area de visitantes</h3>
                        </div>
                    </div>
                    {/* <Alert03 /> */}
                </header>
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-2xl sm:text-4xl tracking-tight font-bold ">Confira abaixo suas autorizações de convites recorrentes e histórico de acesso.</h1>
                    <InfoButton />
                    <AddressSelector currentAddress={currentAddress as Address} addresses={addresses} onSelect={setCurrentAddress} />
                    <div className="flex flex-col-reverse min-[1100px]:grid min-[1100px]:grid-cols-3 gap-4">
                        {filteredHistorical && <DataTable currentAdress={currentAddress as Address} data={filteredHistorical.filter((record) => record.NOME_CONDOMINIO === currentAddress?.CONDOMINIO)} />}
                        <Card className="shadow-lg rounded-2xl w-full h-fit">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    {
                                        currentAddress
                                            ? (currentAddress.RECORRENTE ? 'Horários de acesso' : 'Período de acesso')
                                            : 'Nenhum horário de acesso disponível'
                                    }
                                </CardTitle>
                                <CardDescription>
                                    {
                                        currentAddress?.RECORRENTE
                                            ? 'Confira abaixo os dias e horários em que o acesso ao condomínio está permitido.'
                                            : 'Confira abaixo o período durante o qual você poderá acessar o condomínio.'
                                    }
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-xl border bg-[#121212] overflow-hidden">
                                    {currentAddress?.RECORRENTE && currentAddress?.VISITA && currentAddress.VISITA
                                        .filter(({ FAIXA }) => FAIXA !== '')
                                        .map(({ DIA, FAIXA }, index) => (
                                            <div
                                                key={DIA}
                                                className={cn(
                                                    "flex items-center justify-between p-3",
                                                    index !== (currentAddress?.VISITA as typeof currentAddress.VISITA).filter(({ FAIXA }) => FAIXA !== '').length - 1 && "border-b",
                                                    isToday(DIA) && "bg-[#282828]",
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {isToday(DIA) && (
                                                        <Badge variant="outline" className="bg-primary/10 transition-all">
                                                            Hoje
                                                        </Badge>
                                                    )}
                                                    <span className={cn("font-medium max-[350px]:hidden", isToday(DIA) && "text-primary")}>{DIA}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="max-[450px]:text-xs text-muted-foreground">
                                                        {FAIXA}
                                                        {/* {formatTimeRange(startTime, endTime)} */}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    }

                                    {currentAddress && !currentAddress?.RECORRENTE && (
                                        <p className="py-3 text-center text-sm text-muted-foreground">
                                            {formatPeriod(currentAddress.DATA_INI ?? '', currentAddress.DATA_FIM ?? '')}
                                        </p>
                                    )}

                                    {!currentAddress && (
                                        <div className="flex flex-col items-center justify-center text-muted-foreground py-4">
                                            <AlertCircle className="h-8 w-8 mb-2" />
                                            <p>Nenhum registro encontrado</p>
                                            <p className="text-sm">Tente ajustar os filtros de busca</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </main >
    )
}

