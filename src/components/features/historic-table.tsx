import { Badge, CustomVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Address, Historical } from "@/types/data"
import { AlertCircle, ChevronLeft, ChevronRight, Search, ShieldAlert, ShieldCheck, SlidersHorizontal } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Input } from "../ui/input"
import { AccessDetails } from "./access-details"
import { QrcodeButton } from "./qrcode-button"


interface DataTableProps {
  data: Historical[]
  currentAdress: Address
}

export function DataTable({ data, currentAdress }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedHistorical, setSelectedHistorical] = useState<Historical>(data[0])
  const [openAccessDetails, setOpenAccessDetails] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const itemsPerPage = 5

  const filteredData = data.filter((item) => {
    const matchesSearch =
      String(item.ANFITRIAO).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || String(item.DESC_STATUS).toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-violet-300/80 font-medium">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      ),
    )
  }

  const handleOpenChange = () => setOpenAccessDetails((prev) => !prev)

  return (
    <>
      <Card className={cn("w-full rounded-2xl shadow-lg sm:flex col-span-2")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            {currentAdress ? 'Registros de Acesso' : 'Não há registros para mostrar'}
          </CardTitle>
          <CardDescription>Visualize e gerencie os registros de acesso ao condomínio.</CardDescription>
        </CardHeader>
        {currentAdress !== null && (
          <div className="border-b border-zinc-800">
            <div className={`px-6 py-4 flex items-center justify-between ${currentAdress?.RESULT ? "bg-emerald-950/20" : "bg-red-950/20"}`}>
              <div className="flex items-center gap-3">
                {currentAdress?.RESULT ? (
                  <>
                    <div className="p-3 rounded-full bg-emerald-800">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-emerald-400">Acesso Permitido</h3>
                      <p className="text-xs text-zinc-400">Você tem permissão para acessar este condomínio</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-full bg-red-900/60">
                      <ShieldAlert className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-red-400">Acesso Negado</h3>
                      <p className="text-xs text-zinc-400">Você não tem permissão para acessar este condomínio</p>
                    </div>
                  </>
                )}
              </div>
              <AnimatePresence mode="wait">
                {currentAdress?.BOTAO && (
                  <motion.div
                    initial={{ y: 30, opacity: 0, scale: .8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 30, opacity: 0, scale: .8 }}
                  >
                    <QrcodeButton />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
        <CardContent className="flex flex-col">
          <div className="flex flex-row gap-2 mb-3 items-center">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground placeholder:truncate" />
              <Input
                placeholder="Buscar por anfitrião"
                className="h-10.5 rounded-xl bg-[#202020]/60 font-light text-sm indent-[20px]"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value)
                setCurrentPage(1) // Reset to first page on filter change
              }}
            >
              <SelectTrigger className="text-[13px] w-fit data-[size=default]:h-10.5 rounded-xl bg-[#202020]/60 border-input">
                <SelectValue placeholder="Filtrar por status" className="font-light" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818]">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="SAIU">Saiu</SelectItem>
                <SelectItem value="AUTORIZADO">Autorizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="bg-[#141414] rounded-xl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden min-[550px]:table-cell">Condomínio</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Anfitrião
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer text-left" >
                      Quando
                    </TableHead>
                    <TableHead className="cursor-pointer hidden min-[470px]:table-cell" >
                      <div className="flex items-center">
                        Status
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData
                      .map((item, indx) => (
                        <TableRow onClick={() => {
                          setSelectedHistorical(item)
                          setOpenAccessDetails(true)
                        }} key={indx}>
                          <TableCell className="max-[450px]:text-xs max-w-0 truncate text-muted-foreground text-xs hidden min-[550px]:table-cell">
                            {item.NOME_CONDOMINIO}
                          </TableCell>
                          <TableCell className="font-medium text-xs">
                            {highlightMatch(item.ANFITRIAO as string, searchTerm)}
                          </TableCell>
                          <TableCell className="text-xs">
                            {item.HORA_CONVITE
                              ? new Date(`${item.DATA_CONVITE}T${item.HORA_CONVITE}`).toLocaleString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                              : "Não registrado"}
                          </TableCell>
                          <TableCell className="hidden min-[470px]:table-cell">
                            <Badge className="text-xs" variant={item.DESC_STATUS as CustomVariants}>{item.DESC_STATUS}</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <AlertCircle className="h-8 w-8 mb-2" />
                          <p>Nenhum registro encontrado</p>
                          <p className="text-sm">Tente ajustar os filtros de busca</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredData.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de{" "}
                {filteredData.length} registros
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AccessDetails open={openAccessDetails} handleOpenChange={handleOpenChange} data={selectedHistorical} />
    </>
  )
}
