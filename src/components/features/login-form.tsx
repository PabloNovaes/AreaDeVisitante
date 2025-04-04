import logo from "@/../public/letter-logo.svg"
import { callApi } from "@/api.config"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formatCPF, formatInput } from "@/utils/formatters"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeSlash, LockKey, UserCircle } from "@phosphor-icons/react"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { ChangeEvent, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { SaveButton } from "../ui/confirm-button"

const radioStyles =
    "text-sm border rounded-full p-2 bg-[#181818]/60 px-5 cursor-pointer transition-all data-[state=checked]:border-[#5c307e] data-[state=checked]:ring-[#5c307e]/40 data-[state=checked]:ring-[3px]"

export function LoginForm() {
    const [loading, startTransition] = useTransition()
    const [showPass, setShowPass] = useState(false)
    const [isForeign, setIsForeign] = useState(false)

    const formSchema = z.object({
        isForeign: z.enum(["true", "false"], { message: "Deve selecionar uma das opções" }),
        document: z
            .string({ message: "O documento é obrigatório" })
            .superRefine((val, ctx) => {
                if (isForeign) {
                    const passportRegex = /^[A-Z]{1,2}[0-9]{6,9}$/i
                    if (!passportRegex.test(val)) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: "Formato de passaporte inválido",
                        })
                    }
                } else {
                    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
                    if (!cpfRegex.test(val)) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: "CPF deve estar no formato 123.456.789-10",
                        })
                    }
                }
            }),
        password: z.string({ message: "Senha é obrigatoria" }).nonempty(),
    })

    type UserFormValue = z.infer<typeof formSchema>

    const form = useForm<UserFormValue>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isForeign: "false",
        },
    })

    const onSubmit = async () => {
        startTransition(async () => {
            const { document, password, isForeign } = form.getValues()

            const body = JSON.stringify({
                request: "login_visita",
                senha: password,
                tipo: 1,
                ...(isForeign === "true" ? { passaporte: document } : { cpf: document }),
            })
            const data = await callApi("POST", body)

            console.log(data)
        })
    }

    return (
        <>
            <div className="flex h-full items-center px-4 lg:p-8 relative z-10 max-w-[450px]">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
                    <div className="flex flex-col gap-5">
                        <img src={logo || "/placeholder.svg"} alt="letter-logo" className="h-4 w-fit opacity-55 lg:hidden" />
                        <h1 className="text-4xl font-bold tracking-tight">
                            Preencha o formulario a baixo para acessar area de visitante
                        </h1>
                        {/* <p className="text-muted-foreground text-sm">Entre com seu documento e senha para acessar sua conta</p> */}
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 font-medium">
                            <FormField
                                control={form.control}
                                name="isForeign"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Você é estrangeiro?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                required
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    setIsForeign(value === "true")
                                                    // This will trigger a re-render and update the form
                                                    form.setValue("document", "")
                                                }}
                                                defaultValue={field.value}
                                                className="flex gap-2"
                                            >
                                                <RadioGroupItem className={radioStyles} value="true">
                                                    Sim
                                                </RadioGroupItem>
                                                <RadioGroupItem className={radioStyles} value="false">
                                                    Não
                                                </RadioGroupItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage className="text-xs font-light" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="document"
                                render={() => (
                                    <FormItem>
                                        <div className="flex items-center relative">
                                            <FormControl>
                                                <Input
                                                    className="h-12 rounded-xl bg-[#181818]/60 font-light text-sm indent-[26px]"
                                                    type="text"
                                                    placeholder={`Digite seu ${form.watch("isForeign") === "true" ? "passaporte (ex: AB123456)" : "CPF (ex: 123.456.789-10)"}`}
                                                    disabled={loading}
                                                    maxLength={!isForeign ? 14 : 12}
                                                    onChange={((e: ChangeEvent<HTMLInputElement>) => {
                                                        formatInput(e, !isForeign ? formatCPF : (value) => value.toUpperCase());
                                                        form.setValue("document", e.target.value)
                                                    })}

                                                />
                                            </FormControl>
                                            <UserCircle weight="fill" size={22} className="absolute left-3 text-[#6a6a6a]" />
                                        </div>
                                        <FormMessage className="text-xs font-light" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center relative">
                                            <FormControl>
                                                <Input
                                                    className="h-12 rounded-xl bg-[#181818]/60 font-light text-sm indent-[26px]"
                                                    type={!showPass ? "password" : "text"}
                                                    placeholder="Digite sua senha"
                                                    autoComplete="new-password"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <LockKey weight="fill" size={20} className="absolute left-3 text-[#6a6a6a]" />
                                            <button
                                                role="button"
                                                type="button"
                                                className="absolute right-3"
                                                onClick={() => setShowPass((prev) => !prev)}
                                            >
                                                {showPass ? (
                                                    <Eye size={20} className="text-[#6a6a6a]" />
                                                ) : (
                                                    <EyeSlash size={20} className="text-[#6a6a6a]" />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage className="text-xs font-light" />
                                    </FormItem>
                                )}
                            />
                            <SaveButton state={loading ? "loading" : "initial"} />
                        </form>
                    </Form>
                    <p className="text-muted-foreground px-2.5 text-center text-sm font-light [&_a]:font-light">
                        Ao clicar em continuar, você concorda com nossos{" "}
                        <a className="hover:text-primary underline underline-offset-1" href="/terms">
                            Termos de uso
                        </a>{" "}
                        e{" "}
                        <a className="hover:text-primary underline underline-offset-1" href="/privacy">
                            Politica de privacidade
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}

