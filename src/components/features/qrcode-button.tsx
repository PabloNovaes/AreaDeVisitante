import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Loader, QrCode } from "lucide-react"
import { useEffect, useState } from "react"
import { SaveState } from "../ui/save-button"

export function QrcodeButton() {
    const [qrcode, setQrcode] = useState('')
    const [open, setOpen] = useState(false)
    const [currentState, setCurrentState] = useState<SaveState>('initial')
    const [countdown, setCountdown] = useState(0)

    const requestQrcode = async () => {
        setCurrentState('loading')
        await new Promise((res) => setTimeout(() => res(''), 1000))

        setOpen((prev) => !prev)
        setCurrentState('success')
        setTimeout(() => setQrcode('https://hexdocs.pm/qr_code/docs/qrcode.svg'), 500)
        setCountdown(20)
    }

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
                setOpen(false)
                setQrcode('')
                setCurrentState('initial')
            }, 20 * 1000)

        }
    }, [currentState])

    return (
        <div className={cn("fixed grid left-0 w-full bottom-0 pb-3 h-svh transition-all", open && 'bg-black/50 backdrop-blur-sm')}>
            <div className="h-full w-full flex justify-center relative">
                <motion.button
                    key="animated-button"
                    onClick={() => requestQrcode()}
                    initial={{
                        bottom: 0,
                    }}
                    animate={{
                        bottom: open ? '50%' : 0,
                        transform: open ? 'translateY(50%)' : '',
                        width: open ? 320 : 40,
                        height: open ? 'auto' : 40
                    }}
                    className={cn(
                        "size-12 p-4 grid place-content-center absolute mx-auto rounded-xl bg-gradient-to-b from-[#672F92] to-[#562f75] shadow-[0px_8px_16px_rgba(0, 0, 0, 0.2), inset_0px_1px_0px_0px_rgba(255, 255, 255, 0.2)]",
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
                                    <QrCode />
                                </>
                            )}
                            {currentState === "success" && (
                                <div className="grid gap-3 relative justify-items-center">
                                    <motion.img className="w-full h-full" src={qrcode} alt="" />
                                    <span className="mx-auto">fechara em {countdown}</span>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    )
}
