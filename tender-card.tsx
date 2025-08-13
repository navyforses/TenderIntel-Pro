import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Building, DollarSign, Clock, TrendingUp, AlertTriangle } from "@/lib/icons"
import Link from "next/link"

interface TenderCardProps {
  tender: {
    id: string
    tender_number: string
    title_ka: string
    description_ka?: string
    estimated_value?: number
    currency: string
    publication_date: string
    submission_deadline: string
    status: string
    procuring_entity?: {
      name_ka: string
    }
    category?: {
      name_ka: string
    }
    opportunity_score?: number
    risk_score?: number
  }
}

export function TenderCard({ tender }: TenderCardProps) {
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
      month: "short",
      day: "numeric",
    })
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysLeft = getDaysUntilDeadline(tender.submission_deadline)
  const isUrgent = daysLeft <= 7 && daysLeft > 0
  const isExpired = daysLeft < 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "awarded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "აქტიური"
      case "closed":
        return "დახურული"
      case "cancelled":
        return "გაუქმებული"
      case "awarded":
        return "გაცემული"
      default:
        return status
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">{tender.title_ka}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">#{tender.tender_number}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(tender.status)}>{getStatusText(tender.status)}</Badge>
            {(isUrgent || isExpired) && (
              <Badge variant="destructive" className="text-xs">
                {isExpired ? "ვადა გავიდა" : `${daysLeft} დღე`}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {tender.description_ka && <p className="text-sm text-gray-600 line-clamp-2">{tender.description_ka}</p>}

        <div className="grid grid-cols-2 gap-4 text-sm">
          {tender.procuring_entity && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600 truncate">{tender.procuring_entity.name_ka}</span>
            </div>
          )}

          {tender.category && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 truncate">{tender.category.name_ka}</span>
            </div>
          )}

          {tender.estimated_value && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900">
                {formatCurrency(tender.estimated_value, tender.currency)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{formatDate(tender.publication_date)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              ვადა: {formatDate(tender.submission_deadline)}
              {!isExpired && <span className="ml-1">({daysLeft} დღე)</span>}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {tender.opportunity_score && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">{tender.opportunity_score}%</span>
              </div>
            )}
            {tender.risk_score && tender.risk_score > 70 && (
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">{tender.risk_score}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button asChild className="w-full">
            <Link href={`/tenders/${tender.id}`}>დეტალების ნახვა</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
