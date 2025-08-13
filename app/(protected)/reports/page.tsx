"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReportTemplateCard } from "@/components/report-template-card"
import { Plus, Search, Download, FileText, Calendar, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data
const mockReportTemplates = [
  {
    id: "1",
    title_ka: "ყოველთვიური ანალიტიკური რეპორტი",
    description_ka: "ტენდერების სტატისტიკა და ტენდენციები თვის განმავლობაში",
    type: "analytics",
    frequency: "ყოველთვიურად",
    lastGenerated: "2024-01-15",
    status: "active" as const,
  },
  {
    id: "2",
    title_ka: "კატეგორიების მიმოხილვა",
    description_ka: "ყველაზე აქტიური კატეგორიების დეტალური ანალიზი",
    type: "summary",
    frequency: "კვარტალურად",
    lastGenerated: "2024-01-01",
    status: "active" as const,
  },
  {
    id: "3",
    title_ka: "რისკების შეფასება",
    description_ka: "მაღალი რისკის ტენდერების იდენტიფიკაცია და ანალიზი",
    type: "analytics",
    frequency: "კვირეულად",
    status: "draft" as const,
  },
]

const mockGeneratedReports = [
  {
    id: "1",
    title_ka: "ყოველთვიური რეპორტი - იანვარი 2024",
    generatedAt: "2024-01-15T10:30:00Z",
    generatedBy: "AI სისტემა",
    size: "2.4 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: "2",
    title_ka: "კატეგორიების ანალიზი - Q4 2023",
    generatedAt: "2024-01-01T09:15:00Z",
    generatedBy: "AI სისტემა",
    size: "1.8 MB",
    format: "PDF",
    status: "completed",
  },
  {
    id: "3",
    title_ka: "რისკების შეფასება - კვირა 2",
    generatedAt: "2024-01-08T14:20:00Z",
    generatedBy: "AI სისტემა",
    size: "950 KB",
    format: "PDF",
    status: "completed",
  },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"templates" | "generated">("templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleGenerateReport = (templateId: string) => {
    // In a real app, this would trigger report generation
    console.log("Generating report for template:", templateId)
  }

  const handleEditTemplate = (templateId: string) => {
    // In a real app, this would open the template editor
    console.log("Editing template:", templateId)
  }

  const handleDownloadReport = (reportId: string) => {
    // In a real app, this would download the report
    console.log("Downloading report:", reportId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">რეპორტები</h1>
          <p className="text-gray-600 mt-2">ავტომატური რეპორტების გენერაცია და მართვა</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            ყველას ექსპორტი
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                ახალი შაბლონი
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>ახალი რეპორტის შაბლონი</DialogTitle>
                <DialogDescription>შექმენით ახალი რეპორტის შაბლონი ავტომატური გენერაციისთვის</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">სახელი</Label>
                  <Input id="title" placeholder="რეპორტის სახელი..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">აღწერა</Label>
                  <Textarea id="description" placeholder="რეპორტის აღწერა..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">ტიპი</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="აირჩიეთ ტიპი" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analytics">ანალიტიკური</SelectItem>
                      <SelectItem value="summary">შემაჯამებელი</SelectItem>
                      <SelectItem value="detailed">დეტალური</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">სიხშირე</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="აირჩიეთ სიხშირე" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">ყოველდღიურად</SelectItem>
                      <SelectItem value="weekly">კვირეულად</SelectItem>
                      <SelectItem value="monthly">ყოველთვიურად</SelectItem>
                      <SelectItem value="quarterly">კვარტალურად</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  გაუქმება
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>შექმნა</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "templates" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          შაბლონები
        </button>
        <button
          onClick={() => setActiveTab("generated")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "generated" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          გენერირებული რეპორტები
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="ძიება რეპორტებში..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}
      {activeTab === "templates" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockReportTemplates.map((template) => (
            <ReportTemplateCard
              key={template.id}
              template={template}
              onGenerate={handleGenerateReport}
              onEdit={handleEditTemplate}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {mockGeneratedReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{report.title_ka}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(report.generatedAt).toLocaleDateString("ka-GE")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{report.generatedBy}</span>
                        </div>
                        <span>{report.size}</span>
                        <Badge variant="secondary">{report.format}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">დასრულებული</Badge>
                    <Button size="sm" onClick={() => handleDownloadReport(report.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      ჩამოტვირთვა
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
