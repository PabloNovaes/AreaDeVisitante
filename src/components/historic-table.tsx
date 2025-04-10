import { Badge, CustomVariants } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MOCK_ACCESS_HISTORICAL } from "@/mocks"
import { AlertCircle, ArrowUpDown, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

type Historical = typeof MOCK_ACCESS_HISTORICAL[0]

interface DataTableProps {
  data: typeof MOCK_ACCESS_HISTORICAL
}

export function DataTable({ data }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof Historical | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const itemsPerPage = 5

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage)

  // Handle sorting
  const handleSort = (field: keyof Historical) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <Card className="w-full shadow-lg sm:flex lg:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Registros de Acesso
        </CardTitle>
        <CardDescription>Visualize e gerencie os registros de acesso ao condomínio.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por anfitrião, condomínio ou status..."
              className="pl-8 font-light text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1) // Reset to first page on search
              }}
            />
          </div> */}
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value)
              setCurrentPage(1) // Reset to first page on filter change
            }}
          >
            <SelectTrigger className="w-full md:w-[180px] bg-[#202020]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent className="bg-[#181818]">
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="entrou">Entrou</SelectItem>
              <SelectItem value="saiu">Saiu</SelectItem>
              <SelectItem value="autorizado">Autorizado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="bg-[#141414] rounded-xl">
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden lg:table-cell">Condomínio</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("ANFITRIAO")}>
                    <div className="flex items-center">
                      Anfitrião
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("RESULT")}>
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, indx) => (
                    <TableRow key={indx}>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {item.NOME_CONDOMINIO}
                      </TableCell>
                      <TableCell className="font-medium">{item.ANFITRIAO}</TableCell>
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

        {/* Pagination */}
        {data.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, data.length)} de{" "}
              {data.length} registros
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
