import { Badge, CustomVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Adress, Historical } from "@/types/data"
import { AlertCircle, ChevronLeft, ChevronRight, Search, SlidersHorizontal, ShieldCheck, ShieldAlert } from "lucide-react"
import { useState } from "react"
import { Input } from "./ui/input"


interface DataTableProps {
  data: Historical[]
  currentAdress: Adress
}

export function DataTable({ data, currentAdress }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof Historical | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")


  const itemsPerPage = 5

  // const filteredData = data.filter(({ DESC_STATUS }) => statusFilter === 'all' ? DESC_STATUS : DESC_STATUS === statusFilter)


  const filteredData = data.filter((item) => {
    const matchesSearch =
      String(item.ANFITRIAO).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || String(item.DESC_STATUS).toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: keyof Historical) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

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

  console.log(currentAdress);


  return (
    <Card className="w-full rounded-2xl shadow-lg sm:flex lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Registros de Acesso
        </CardTitle>
        <CardDescription>Visualize e gerencie os registros de acesso ao condomínio.</CardDescription>
      </CardHeader>
       <div className="border-b border-zinc-800">
        <div className={`px-6 py-4 flex items-center gap-3 ${currentAdress?.RESULT ? "bg-emerald-950/20" : "bg-red-950/20"}`}>
          {currentAdress?.RESULT ? (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-emerald-400">Acesso Permitido</h3>
                <p className="text-xs text-zinc-400">Você tem permissão para acessar este condomínio</p>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <ShieldAlert className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-red-400">Acesso Negado</h3>
                <p className="text-xs text-zinc-400">Você não tem permissão para acessar este condomínio</p>
              </div>
            </>
          )}
        </div>
      </div> 
      <CardContent className="flex flex-col">
        <div className="flex flex-row gap-2 mb-6">
          <div className="relative flex-1 bg-[#202020]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground placeholder:truncate" />
            <Input
              placeholder="Buscar por anfitrião"
              className="pl-8 text-[13px] font-medium"
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
            <SelectTrigger className="text-[13px] font-medium w-fit bg-[#202020]">
              <SelectValue placeholder="Filtrar por status" />
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
                  <TableHead>Condomínio</TableHead>
                  <TableHead className="cursor-pointer hidden sm:table-cell" onClick={() => handleSort("ANFITRIAO")}>
                    <div className="flex items-center">
                      Anfitrião
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer text-left" onClick={() => handleSort("RESULT")}>
                    Quando
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("RESULT")}>
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
                      <TableRow key={indx}>
                        <TableCell className="max-[450px]:text-xs max-[450px]:max-w-[0px] truncate text-muted-foreground">
                          {item.NOME_CONDOMINIO}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-medium">
                          {highlightMatch(item.ANFITRIAO as string, searchTerm)}
                        </TableCell>
                        <TableCell>
                          {item.HORA_CONVITE
                            ? new Date(`${item.DATA_CONVITE}T${item.HORA_CONVITE}`).toLocaleString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                            : <span className="text-xs">Não registrado</span>}
                        </TableCell>
                        <TableCell>
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
            <p className="text-sm text-muted-foreground">
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
  )
}
