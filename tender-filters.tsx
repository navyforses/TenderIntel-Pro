"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "@/lib/icons"

interface TenderFiltersProps {
  onFiltersChange: (filters: any) => void
  categories: Array<{ id: string; name_ka: string }>
}

export function TenderFilters({ onFiltersChange, categories }: TenderFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all", // Updated default value
    status: "all", // Updated default value
    minValue: "",
    maxValue: "",
    dateFrom: "",
    dateTo: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      search: "",
      category: "all", // Updated default value
      status: "all", // Updated default value
      minValue: "",
      maxValue: "",
      dateFrom: "",
      dateTo: "",
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5" />
            ფილტრები
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              გასუფთავება
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">ძიება</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="ტენდერის სახელი ან ნომერი..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>კატეგორია</Label>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="აირჩიეთ კატეგორია" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ყველა კატეგორია</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name_ka}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>სტატუსი</Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="აირჩიეთ სტატუსი" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ყველა სტატუსი</SelectItem>
              <SelectItem value="active">აქტიური</SelectItem>
              <SelectItem value="closed">დახურული</SelectItem>
              <SelectItem value="cancelled">გაუქმებული</SelectItem>
              <SelectItem value="awarded">გაცემული</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Value Range */}
        <div className="space-y-2">
          <Label>ღირებულების დიაპაზონი (₾)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="მინ."
              type="number"
              value={filters.minValue}
              onChange={(e) => handleFilterChange("minValue", e.target.value)}
            />
            <Input
              placeholder="მაქს."
              type="number"
              value={filters.maxValue}
              onChange={(e) => handleFilterChange("maxValue", e.target.value)}
            />
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>თარიღის დიაპაზონი</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            />
            <Input type="date" value={filters.dateTo} onChange={(e) => handleFilterChange("dateTo", e.target.value)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
