import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger
} from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Loader, QrCode } from "lucide-react"
import { useEffect, useState } from "react"
import { SaveState } from "../ui/save-button"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"


export function QrcodeButton() {
    const [currentState, setCurrentState] = useState<SaveState>('initial')
    const [countdown, setCountdown] = useState(0)
    const [qrcodeViwerOpen, setQrcodeViwerOpen] = useState(false)

    const isDesktop = useMediaQuery("(min-width: 1024px)")

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [countdown])

    useEffect(() => {
        if (currentState === 'success') {
            setTimeout(() => {
                setQrcodeViwerOpen(false)
                setCurrentState('initial')
            }, 30 * 1000)
            setTimeout(() => setCurrentState('initial'), 800)
        }
    }, [currentState])

    const generateQrcode = async () => {
        setCurrentState('loading')
        await new Promise((res) => setTimeout(() => res(''), 1000))
        setCountdown(31)
        setCurrentState('success')
        setTimeout(() => setQrcodeViwerOpen(true), 800)
    }

    if (isDesktop) return (
        <Dialog open={qrcodeViwerOpen}>
            <DialogTrigger>
                <motion.div onClick={generateQrcode}
                    className={cn(
                        "p-4 size-[49px] rounded-2xl  grid place-content-center  bg-[#181818] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer focus-visible:brightness-75 hover:brightness-75 transition-all border border-t-0",
                    )}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentState}
                            className="flex items-center gap-2"
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentState === "loading" && (
                                <>
                                    <Loader className="w-[15px] h-[15px] animate-spin text-white" />
                                </>
                            )}
                            {currentState === "initial" && (
                                <>
                                    <QrCode size={25} />
                                </>
                            )}
                            {currentState === "success" && (
                                <div className="p-0.5 bg-white/25 rounded-[99px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.16)] border border-white/25 justify-center items-center gap-1.5 flex overflow-hidden">
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Utilize o Qrcode a baixo para entrar <br /> no condominio</DialogTitle>
                </DialogHeader>
                <img className="mx-auto bg-white p-2 rounded-xl" src="https://codigosdebarrasbrasil.com.br/wp-content/uploads/2019/09/codigo_qr-300x300.png" alt="" />
                <DialogFooter className="sm:justify-center">
                    <DialogDescription>
                        <Badge variant={countdown >= 20 && 'AUTORIZADO' || countdown >= 10 && countdown < 20 && 'INFO' || 'SAIU'} className="text-sm mx-auto">Ira fechar em {countdown}</Badge>
                    </DialogDescription>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return (
        <Drawer open={qrcodeViwerOpen}>
            <DrawerTrigger>
                <motion.div onClick={generateQrcode}
                    className={cn(
                        "p-4 size-[49px] rounded-2xl  grid place-content-center  bg-[#181818] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer focus-visible:brightness-75 hover:brightness-75 transition-all border border-t-0",
                    )}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentState}
                            className="flex items-center gap-2"
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentState === "loading" && (
                                <>
                                    <Loader className="w-[15px] h-[15px] animate-spin text-white" />
                                </>
                            )}
                            {currentState === "initial" && (
                                <>
                                    <QrCode size={25} />
                                </>
                            )}
                            {currentState === "success" && (
                                <div className="p-0.5 bg-white/25 rounded-[99px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.16)] border border-white/25 justify-center items-center gap-1.5 flex overflow-hidden">
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-center">
                    <DrawerTitle>
                        <Badge variant={countdown >= 20 && 'AUTORIZADO' || countdown >= 10 && countdown < 20 && 'INFO' || 'SAIU'} className="text-sm">Ira fechar em {countdown}</Badge>
                    </DrawerTitle>
                    <DrawerDescription>Utilize o Qrcode a baixo para entrar no condominio</DrawerDescription>
                </DrawerHeader>
                <div className="">
                    <img className="mx-auto bg-white p-2 rounded-xl" src="https://codigosdebarrasbrasil.com.br/wp-content/uploads/2019/09/codigo_qr-300x300.png" alt="" />
                </div>
                <DrawerFooter className="text-center">
                    <DrawerClose asChild>
                        {/* <SaveButton content="Fechar" /> */}
                        <Button variant={"secondary"}>Fechar QR code</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
