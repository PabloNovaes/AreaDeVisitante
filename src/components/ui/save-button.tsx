import { cn } from "@/lib/utils"
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion"
import { Check, Loader } from "lucide-react"
import { useEffect, useState } from "react"

export type SaveState = "initial" | "loading" | "success"

interface SaveButtonProps extends HTMLMotionProps<"button"> {
    onReset?: () => void
    onSave?: (newState: SaveState) => void
    state?: SaveState
    content: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const springConfig = {
    type: "spring",
    stiffness: 500,
    damping: 50,
    mass: 2,
}

export function SaveButton({ state = "initial", onSave, className, content, ...props }: SaveButtonProps) {
    const [currentState, setCurrentState] = useState(state)

    useEffect(() => {
        setCurrentState(state)

        if (state === "success") {
            const timer = setTimeout(() => {
                setCurrentState("initial")
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [state])

    const handleClick = () => {
        if (currentState === "initial") {
            onSave?.(currentState)
        }
    }

    return (
        <motion.button
            type="submit"
            onClick={handleClick}
            className={cn(
                "disabled:cursor-not-allowed disabled:brightness-75 h-11 flex w-full cursor-pointer rounded-xl p-2 py-3 gap-2 items-center justify-center bg-gradient-to-b from-[#672F92] to-[#672f92b6] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)]",
                className,
            )}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
            }}
            whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
            }}
            aria-live="polite"
            aria-atomic="true"
            disabled={state === "loading"}
            {...props}
        >
            <motion.div
                className="flex items-center h-full px-3"
                initial={false}
                animate={{ width: "auto" }}
                transition={springConfig}
            >
                <div className="flex items-center justify-between h-full">
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
                            {currentState === "success" && (
                                <>
                                    <div className="p-0.5 bg-white/25 rounded-[99px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.16)] border border-white/25 justify-center items-center gap-1.5 flex overflow-hidden">
                                        <Check className="w-3.5 h-3.5 text-white" />
                                    </div>
                                </>
                            )}
                            {currentState === "initial" && (
                                <>
                                    <div className="text-white text-[14px] font-normal font-['Geist'] leading-tight whitespace-nowrap">
                                        {content}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.button>
    )
}

