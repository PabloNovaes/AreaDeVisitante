import { motion } from "motion/react"

export function VisitorArea() {
    return (
        <main className="relative bg-black h-svh overflow-hidden">
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
        </main>
    )
}