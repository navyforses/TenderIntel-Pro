"use client"

import { useState } from "react"
import { TenderCard } from "@/components/tender-card"
import { TenderFilters } from "@/components/tender-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Download } from "@/lib/icons"

// Mock data for demonstration
const mockTenders = [
  {
    id: "1",
    tender_number: "SPA-2024-001",
    title_ka: "IT სერვისების შესყიდვა თბილისის მერიისთვის",
    description_ka: "ვებ-გვერდის განვითარება და მხარდაჭერა, სერვერების მოვლა-პატრონობა",
    estimated_value: 45000,
    currency: "GEL",
    publication_date: "2024-01-15T10:00:00Z",
    submission_deadline: "2024-02-15T17:00:00Z",
    status: "active",
    procuring_entity: { name_ka: "თბილისის მერია" },
    category: { name_ka: "IT სერვისები" },
    opportunity_score: 85,
    risk_score: 25,
  },
  {
    id: "2",
    tender_number: "SPA-2024-002",
    title_ka: "სამშენებლო მასალების შესყიდვა",
    description_ka: "სკოლის შენობის რეკონსტრუქციისთვის საჭირო მასალები",
    estimated_value: 120000,
    currency: "GEL",
    publication_date: "2024-01-10T09:00:00Z",
    submission_deadline: "2024-01-25T17:00:00Z",
    status: "active",
    procuring_entity: { name_ka: "განათლების სამინისტრო" },
    category: { name_ka: "მშენებლობა" },
    opportunity_score: 65,
    risk_score: 45,
  },
  {
    id: "3",
    tender_number: "SPA-2024-003",
    title_ka: "სამედიცინო აღჭურვილობის შესყიდვა",
    description_ka: "ჰოსპიტალისთვის დიაგნოსტიკური აღჭურვილობა",
    estimated_value: 85000,
    currency: "GEL",
    publication_date: "2024-01-12T11:00:00Z",
    submission_deadline: "2024-02-20T17:00:00Z",
    status: "active",
    procuring_entity: { name_ka: "ჯანდაცვის სამინისტრო" },
    category: { name_ka: "მედიცინა" },
    opportunity_score: 75,
    risk_score: 30,
  },
]

const mockCategories = [
  { id: "1", name_ka: "IT სერვისები" },
  { id: "2", name_ka: "მშენებლობა" },
  { id: "3", name_ka: "მედიცინა" },
  { id: "4", name_ka: "კონსულტაციები" },
  { id: "5", name_ka: "განათლება" },
]

export default function TendersPage() {
  const [tenders, setTenders] = useState(mockTenders)
  const [filteredTenders, setFilteredTenders] = useState(mockTenders)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(6)

  const handleFiltersChange = (filters: any) => {
    let filtered = [...tenders]

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(
        (tender) =>
          tender.title_ka.toLowerCase().includes(filters.search.toLowerCase()) ||
          tender.tender_number.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((tender) => tender.category?.name_ka === filters.category)
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter((tender) => tender.status === filters.status)
    }

    // Apply value range filter
    if (filters.minValue) {
      filtered = filtered.filter((tender) => (tender.estimated_value || 0) >= Number.parseInt(filters.minValue))
    }
    if (filters.maxValue) {
      filtered = filtered.filter((tender) => (tender.estimated_value || 0) <= Number.parseInt(filters.maxValue))
    }

    setFilteredTenders(filtered)
    setCurrentPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTenders = filteredTenders.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ტენდერები</h1>
          <p className="text-gray-600 mt-2">მონიტორინგი და ანალიზი სახელმწიფო შესყიდვების</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            ექსპორტი
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            ახალი ტენდერი
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <TenderFilters onFiltersChange={handleFiltersChange} categories={mockCategories} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="სწრაფი ძიება ტენდერებში..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              ნაპოვნია {filteredTenders.length} ტენდერი {tenders.length}-დან
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">გვერდი:</span>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Tenders Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {currentTenders.map((tender) => (
              <TenderCard key={tender.id} tender={tender} />
            ))}
          </div>

          {filteredTenders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">ტენდერები ვერ მოიძებნა</p>
              <p className="text-gray-400 mt-2">შეცვალეთ ძიების პარამეტრები და სცადეთ ხელახლა</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
