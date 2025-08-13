import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Building,
  DollarSign,
  Clock,
  FileText,
  Download,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"

// Mock data for demonstration
const mockTender = {
  id: "1",
  tender_number: "SPA-2024-001",
  title_ka: "IT სერვისების შესყიდვა თბილისის მერიისთვის",
  title_en: "IT Services Procurement for Tbilisi City Hall",
  description_ka:
    "ვებ-გვერდის განვითარება და მხარდაჭერა, სერვერების მოვლა-პატრონობა, ტექნიკური მხარდაჭერის სერვისი 24/7 რეჟიმში. პროექტი მოიცავს არსებული სისტემების მოდერნიზაციას და ახალი ფუნქციონალის დამატებას.",
  estimated_value: 45000,
  currency: "GEL",
  publication_date: "2024-01-15T10:00:00Z",
  submission_deadline: "2024-02-15T17:00:00Z",
  opening_date: "2024-02-16T10:00:00Z",
  contract_start_date: "2024-03-01T00:00:00Z",
  contract_end_date: "2024-12-31T23:59:59Z",
  status: "active",
  tender_type: "ღია ტენდერი",
  procurement_method: "ელექტრონული ტენდერი",
  source_url: "https://spa.ge/tender/123456",
  source_platform: "spa.ge",
  procuring_entity: {
    name_ka: "თბილისის მერია",
    name_en: "Tbilisi City Hall",
    contact_email: "procurement@tbilisi.gov.ge",
    contact_phone: "+995 32 2 15 15 15",
    address_ka: "თბილისი, რუსთაველის გამზირი 1",
  },
  category: { name_ka: "IT სერვისები", name_en: "IT Services" },
  opportunity_score: 85,
  risk_score: 25,
  ai_summary_ka:
    "მაღალი შესაძლებლობის ტენდერი IT კომპანიებისთვის. კონკურენცია საშუალო დონეზეა, ბიუჯეტი რეალისტურია. რეკომენდებულია მონაწილეობა.",
  documents: [
    {
      id: "1",
      document_name_ka: "ტექნიკური დავალება",
      document_type: "specification",
      file_size: 2048000,
    },
    {
      id: "2",
      document_name_ka: "ხელშეკრულების პროექტი",
      document_type: "contract",
      file_size: 1024000,
    },
    {
      id: "3",
      document_name_ka: "ტენდერის პირობები",
      document_type: "terms",
      file_size: 512000,
    },
  ],
}

interface TenderDetailPageProps {
  params: {
    id: string
  }
}

export default function TenderDetailPage({ params }: TenderDetailPageProps) {
  // In a real app, fetch tender data based on params.id
  const tender = mockTender

  if (!tender) {
    notFound()
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("ka-GE", {
      style: "currency",
      currency: currency === "GEL" ? "GEL" : "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ["ბაიტი", "KB", "MB", "GB"]
    if (bytes === 0) return "0 ბაიტი"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilDeadline(tender.submission_deadline)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{tender.title_ka}</h1>
            <Badge className={tender.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
              {tender.status === "active" ? "აქტიური" : "დახურული"}
            </Badge>
          </div>
          <p className="text-gray-600">#{tender.tender_number}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href={tender.source_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              წყაროზე ნახვა
            </a>
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            ყველა დოკუმენტი
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>აღწერა</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{tender.description_ka}</p>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          {tender.ai_summary_ka && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  AI ანალიზი
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{tender.ai_summary_ka}</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">შესაძლებლობა:</span>
                    <span className="text-sm font-bold text-green-600">{tender.opportunity_score}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">რისკი:</span>
                    <span className="text-sm font-bold text-red-600">{tender.risk_score}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                დოკუმენტები
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tender.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.document_name_ka}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(doc.file_size)}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      ჩამოტვირთვა
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Information */}
          <Card>
            <CardHeader>
              <CardTitle>ძირითადი ინფორმაცია</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ღირებულება</p>
                  <p className="font-semibold text-lg">{formatCurrency(tender.estimated_value, tender.currency)}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">გამოქვეყნების თარიღი</p>
                  <p className="font-medium">{formatDate(tender.publication_date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">ვადა</p>
                  <p className="font-medium">{formatDate(tender.submission_deadline)}</p>
                  <p className="text-sm text-blue-600">{daysLeft} დღე დარჩა</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-gray-600 mb-2">ტენდერის ტიპი</p>
                <p className="font-medium">{tender.tender_type}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">შესყიდვის მეთოდი</p>
                <p className="font-medium">{tender.procurement_method}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">კატეგორია</p>
                <Badge variant="secondary">{tender.category.name_ka}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Procuring Entity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                შემსყიდველი ორგანიზაცია
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold text-gray-900">{tender.procuring_entity.name_ka}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{tender.procuring_entity.address_ka}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{tender.procuring_entity.contact_email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{tender.procuring_entity.contact_phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>ვადები</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">გამოქვეყნება</span>
                  <span className="text-sm font-medium">{formatDate(tender.publication_date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ვადის ამოწურვა</span>
                  <span className="text-sm font-medium">{formatDate(tender.submission_deadline)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">გახსნა</span>
                  <span className="text-sm font-medium">{formatDate(tender.opening_date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ხელშეკრულების დაწყება</span>
                  <span className="text-sm font-medium">{formatDate(tender.contract_start_date)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ხელშეკრულების დასრულება</span>
                  <span className="text-sm font-medium">{formatDate(tender.contract_end_date)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
