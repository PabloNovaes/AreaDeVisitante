import { Info } from "@phosphor-icons/react";

export default function Alert03() {
    return (
        <div className="w-full lg:max-w-[83%]">
            <div className="relative overflow-hidden rounded-xl border bg-violet-950/20 border-violet-800/30 p-4 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-violet-900/50 p-1">
                        <Info className="h-4 w-4 text-violet-400" />
                    </div>
                    <p className="text-sm font-medium text-violet-200">
                        Os convites somente poderão ser gerados dentro dos horários permitidos para acesso, basta clicar no botão qrcode para gerar sua chave de acesso.
                    </p>
                </div>
            </div>
        </div>
    );
}
