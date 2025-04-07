import { cn } from "@/lib/utils";
import { CheckCircle, Eye, EyeSlash, XCircle } from "@phosphor-icons/react";
import { memo, useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Progress } from "./progress";

const calculatePasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 10) strength += 25
    if (pwd.match(/[a-z]+/) && pwd.length >= 6) strength += 25
    if (pwd.match(/[A-Z]+/)) strength += 25
    if (pwd.match(/[0-9]+/)) strength += 25
    return strength
}

export function PasswordInput({ onInputChange }: { data: Record<string, string>, onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordStrength, setPasswordStrength] = useState(calculatePasswordStrength(password))
    const [showPass, setShowPass] = useState({
        password: false,
        confirmPassword: false
    })

    const ShowPassButton = memo(({ name }: { name: string }) => (
        <button className="text-white absolute right-2 top-[22px] bg-black border rounded-md p-1" tabIndex={-1} onClick={() => {
            setShowPass((prev) => {
                const value = prev[name as "password" | "confirmPassword"]
                return { ...prev, [name]: !value }
            })
        }}>
            {name === "password" && (
                <span>
                    {!showPass.password ? <EyeSlash size={20} /> : <Eye size={20} />}
                </span>
            )}
            {name === "confirmPassword" && (
                <span>
                    {!showPass.confirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </span>
            )}
        </button>
    ))

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value
        onInputChange(e)
        setPassword(newPassword)
        setPasswordStrength(calculatePasswordStrength(newPassword))
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e)
        setConfirmPassword(e.target.value)
    }


    return (
        <div className="w-full space-y-4">
            <div className="space-y-2 relative">
                <Label className="text-primary/80 grid gap-2" htmlFor="senha">Senha</Label>
                <Input className={cn("text-white bg-[#181818]", password.length >= 1 && "invalid:focus-visible:ring-red-500")}
                    name="senha"
                    id="senha"
                    type={showPass.password ? "text" : "password"}
                    minLength={6}
                    autoComplete="new-password webauthn"
                    defaultValue={password}
                    onChange={handlePasswordChange}
                    placeholder="Digite sua senha"
                    required
                />
                <ShowPassButton key={"password"} name="password" />
                <p className="text-xs text-muted-foreground">
                    A senha deve ter ao menos 6 digitos
                </p>
                <Progress value={passwordStrength} className={cn("w-full max-h-2 [&_div]:bg-input",
                    passwordStrength === 100 && "[&_div]:bg-emerald-500",
                    passwordStrength === 75 && "[&_div]:bg-sky-400",
                    passwordStrength === 50 && "[&_div]:bg-amber-400",
                    passwordStrength === 25 && "[&_div]:bg-red-500/50",
                )} />
                <p className="text-xs text-muted-foreground">
                    Força da senha: {passwordStrength === 100 ? 'Forte' : passwordStrength >= 75 ? 'Boa' : passwordStrength >= 50 ? 'Média' : 'Fraca'}
                </p>
            </div>
            <div className="space-y-2 relative">
                <Label className="text-primary/80 grid gap-2" htmlFor="conf_senha">Confirme a Senha</Label>
                <Input className={cn("text-white bg-[#181818]", password.length >= 1 && "invalid:focus-visible:ring-red-500/50")}
                    name="conf_senha"
                    id="conf_senha"
                    type={showPass.confirmPassword ? "text" : "password"}
                    minLength={6}
                    value={confirmPassword}
                    required
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirme sua senha"
                />
                <ShowPassButton key={"confirmPassword"} name="confirmPassword" />

                {password === confirmPassword && password.length > 0 && (
                    <div className="flex items-center space-x-2 text-emerald-500/50">
                        <CheckCircle size={20} />
                        <p className="text-sm text-white">As senhas são iguais</p>
                    </div>
                )}
                {password !== confirmPassword && password.length > 0 && (
                    <div className="flex items-center space-x-2 text-red-500/50">
                        <XCircle size={20} />
                        <p className="text-sm text-white">As senhas não são iguais</p>
                    </div>
                )}
            </div>
        </div>
    )
}