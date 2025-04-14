import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Address } from "@/types/data"
import { CheckCircle } from "@phosphor-icons/react"
import { ChevronsUpDown, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"

interface Props {
    currentAddress: Address | null
    addresses: Address[] | null
    onSelect: (address: Address) => void
}

const triggerStyle = `flex items-center justify-between gap-2 py-2 px-4 rounded-2xl h-fit w-fit text-white bg-[#181818] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer focus-visible:brightness-75 hover:brightness-75 transition-all border border-t-0`

export function AddressSelector({ addresses, currentAddress, onSelect }: Props) {
    const [open, setOpen] = useState(false)
    const [filteredAddresses, setFilteredAddresses] = useState<Address[]>(addresses ?? [])

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredAddresses(addresses ?? [])
            return
        }

        const lowercasedSearch = searchTerm.toLowerCase()
        const filtered = addresses?.filter(
            (address) =>
                address.CONDOMINIO.toLowerCase().includes(lowercasedSearch) ||
                address.ENDERECO.toLowerCase().includes(lowercasedSearch),
        )
        setFilteredAddresses(filtered ?? [])
    }, [searchTerm, addresses])

    const isDesktop = useMediaQuery("(min-width: 600px)")

    const handleSelect = (address: Address) => {
        if (onSelect) {
            onSelect(address)
        }
        setOpen(false)
    }

    const Trigger = () => (
        <>
            <div className="text-start">
                <p className="text-xs line-clamp-1">{currentAddress?.CONDOMINIO ?? 'Nenhum condominio encontrado'}</p>
                <p className="text-xs text-white/50 line-clamp-1">{currentAddress?.ENDERECO ?? 'Entre em contato com seu anfitrião'}</p>
            </div>
            <ChevronsUpDown size={14} />
        </>
    )

    if (isDesktop) return (
        <DropdownMenu open={open} onOpenChange={() => setOpen(prev => !prev)}>
            <DropdownMenuTrigger disabled={currentAddress === null} className={cn(triggerStyle)}>
                <Trigger />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full rounded-xl">
                <DropdownMenuLabel>Autorizados</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {addresses && addresses?.
                        filter(({ RESULT }) => RESULT)
                        .map((adress) => (

                            <DropdownMenuItem key={adress.ENDERECO} onClick={() => {
                                setOpen(false)
                                onSelect(adress)
                            }
                            } className="pl-2 py-1 rounded-md text-sm  transition-all duration-200">

                                {adress.CONDOMINIO}
                            </DropdownMenuItem>
                        ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Não autorizados</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {addresses && addresses?.
                        filter(({ RESULT }) => !RESULT)
                        .map((adress) => (

                            <DropdownMenuItem key={adress.ENDERECO} onClick={() => {
                                setOpen(false)
                                onSelect(adress)
                            }
                            } className="pl-2 py-1 rounded-md text-sm  transition-all duration-200">

                                {adress.CONDOMINIO}
                            </DropdownMenuItem>
                        ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    return (
        <Drawer open={open} onOpenChange={() => setOpen(!open)}>
            <DrawerTrigger disabled={currentAddress === null} className={triggerStyle}>
                <Trigger />
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] max-sm:">
                <DrawerHeader className="text-center">
                    <DrawerTitle>Selecionar Condomínio</DrawerTitle>
                    <DrawerDescription>Escolha um condomínio para visualizar permissões e histórico de acesso.</DrawerDescription>
                </DrawerHeader>

                <div className="px-4 pb-4">
                    {/* Search input */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Buscar condomínio..."
                            className="h-12 rounded-xl bg-[#181818]/60 font-light text-sm indent-[20px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* List of condominiums */}
                    <div className="overflow-y-auto max-h-[50vh] pr-1">
                        {filteredAddresses.length > 0 ? (
                            <ul className="space-y-2">
                                {filteredAddresses.map((address) => (
                                    <li
                                        key={address.ID}
                                        onClick={() => handleSelect(address)}
                                        className="relative flex items-center border rounded-lg bg-[#141414] p-3 cursor-pointer hover:bg-muted transition-colors"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium pr-4">{address.CONDOMINIO}</span>
                                            <span className="text-sm text-muted-foreground pr-4">{address.ENDERECO}</span>
                                            <div className="mt-1.5">
                                                <Badge variant={address.RESULT ? 'AUTORIZADO' : 'SAIU'}>
                                                    {address.RESULT ? 'Acesso ativo' : 'Acesso expirado'}
                                                </Badge>
                                            </div>
                                        </div>
                                        {address.ID === currentAddress?.ID &&
                                            <CheckCircle weight="fill" size={20} className="absolute right-2" />
                                        }
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>Nenhum condomínio encontrado</p>
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}