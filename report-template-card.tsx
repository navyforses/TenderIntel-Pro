"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, BarChart3 } from "lucide-react"

interface ReportTemplateCardProps {
  template: {
    id: string
    title_ka: string
    description_ka: string
    type: string
    frequency: string
    lastGenerated?: string
    status: "active" | "draft" | "archived"
  }
  onGenerate: (templateId: string) => void
  onEdit: (templateId: string) => void
}

export function ReportTemplateCard({ template, onGenerate, onEdit }: ReportTemplateCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "აქტიური"
      case "draft":
        return "მუშავდება"
      case "archived":
        return "არქივში"
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "analytics":
        return BarChart3
      case "summary":
        return FileText
      default:
        return FileText
    }
  }

  const TypeIcon = getTypeIcon(template.type)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TypeIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{template.title_ka}</CardTitle>
              <CardDescription className="mt-1">{template.description_ka}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(template.status)}>{getStatusText(template.status)}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>სიხშირე: {template.frequency}</span>
          </div>
          {template.lastGenerated && (
            <div className="flex items-center gap-2">
              <span>ბოლო: {new Date(template.lastGenerated).toLocaleDateString("ka-GE")}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onGenerate(template.id)} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            გენერაცია
          </Button>
          <Button variant="outline" onClick={() => onEdit(template.id)}>
            რედაქტირება
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
