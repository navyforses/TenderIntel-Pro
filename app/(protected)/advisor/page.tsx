import { ChatInterface } from "@/components/chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertTriangle, Target } from "@/lib/icons"

export default function AdvisorPage() {
  const quickInsights = [
    {
      title: "მაღალი შესაძლებლობა",
      description: "IT სექტორში 3 ახალი ტენდერი მაღალი შესაძლებლობის ქულით",
      icon: TrendingUp,
      type: "opportunity",
      count: 3,
    },
    {
      title: "ყურადღება საჭიროა",
      description: "2 ტენდერი მაღალი რისკის ქულით - დეტალური ანალიზი საჭიროა",
      icon: AlertTriangle,
      type: "warning",
      count: 2,
    },
    {
      title: "ვადის ამოწურვა",
      description: "5 ტენდერის ვადა იწურება მომდევნო 3 დღეში",
      icon: Target,
      type: "urgent",
      count: 5,
    },
    {
      title: "ახალი ტენდენცია",
      description: "კიბერუსაფრთხოების ტენდერები იზრდება 40%-ით",
      icon: Lightbulb,
      type: "insight",
      count: null,
    },
  ]

  const recentRecommendations = [
    {
      tender: "IT სერვისების შესყიდვა - SPA-2024-001",
      recommendation: "მონაწილეობა რეკომენდებული",
      score: 85,
      reason: "კონკურენცია საშუალო, ბიუჯეტი რეალისტური",
    },
    {
      tender: "ვებ-განვითარება - SPA-2024-015",
      recommendation: "მონაწილეობა რეკომენდებული",
      score: 78,
      reason: "თქვენი ექსპერტიზა შეესაბამება მოთხოვნებს",
    },
    {
      tender: "სერვერების მოვლა - SPA-2024-008",
      recommendation: "ფრთხილად განიხილეთ",
      score: 45,
      reason: "მაღალი კონკურენცია, მკაცრი ვადები",
    },
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      case "insight":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI კონსულტანტი</h1>
        <p className="text-gray-600 mt-2">ინტელექტუალური რეკომენდაციები და ანალიზი</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <ChatInterface />
        </div>

        {/* Sidebar with insights */}
        <div className="space-y-6">
          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">სწრაფი მიმოხილვა</CardTitle>
              <CardDescription>ბოლო განახლება: ახლა</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                    <insight.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      {insight.count && (
                        <Badge variant="secondary" className="text-xs">
                          {insight.count}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ბოლო რეკომენდაციები</CardTitle>
              <CardDescription>AI-ს მიერ გენერირებული</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRecommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{rec.tender}</h4>
                    <span className={`text-sm font-bold ${getScoreColor(rec.score)}`}>{rec.score}%</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">{rec.recommendation}</p>
                  <p className="text-xs text-gray-600">{rec.reason}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
