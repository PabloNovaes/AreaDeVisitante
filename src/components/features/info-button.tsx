import { useMediaQuery } from "@/hooks/use-media-query"
import { Info } from "lucide-react"
import { motion } from "motion/react"
import { memo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { springConfig } from "../ui/save-button"

const info = {
    title: 'Sobre o uso dos convites de acesso',
    content: 'Os convites somente poderão ser gerados dentro dos horários permitidos para acesso, basta clicar no botão QRcode para gerar sua chave de acesso.'
}

export function InfoButton() {
    const isDesktop = useMediaQuery("(min-width: 1024px)")

    const Trigger = memo(() =>
        <motion.div
            whileHover={{
                scale: 1.03,
                filter: 'brightness(80%)',
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.98,
                filter: 'brightness(80%)',
                transition: { duration: 0.1, delay: 2 },
            }}
            initial={false}
            animate={{ width: 'auto' }}
            transition={springConfig}
            className="rounded-xl z-10 flex items-center text-start cursor-pointer p-3 bg-violet-500/60 border-violet-400/80 border backdrop-blur-3xl text-white fixed max-lg:right-3 max-lg:bottom-3 bottom-12 right-[10vw]">
            <Info size={20} />
        </motion.div>
    )

    if (isDesktop) return (
        <Dialog>
            <DialogTrigger>
                <Trigger />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{info.title}</DialogTitle>
                    <DialogDescription>{info.content}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

    return (
        <Drawer>
            <DrawerTrigger>
                <Trigger />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-center">
                    <DrawerTitle>{info.title}</DrawerTitle>
                    <DrawerDescription>{info.content}</DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

