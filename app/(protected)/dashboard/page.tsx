import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, TrendingUp, AlertCircle, Clock } from "@/lib/icons"

export default async function DashboardPage() {
  const supabase = createServerClient()

  // Get basic stats (placeholder for now)
  const stats = [
    {
      title: "აქტიური ტენდერები",
      value: "24",
      description: "ბოლო 7 დღეში",
      icon: FileText,
      trend: "+12%",
    },
    {
      title: "საშუალო ღირებულება",
      value: "₾45,230",
      description: "ამ თვეში",
      icon: TrendingUp,
      trend: "+8%",
    },
    {
      title: "მაღალი რისკი",
      value: "3",
      description: "ყურადღება საჭიროა",
      icon: AlertCircle,
      trend: "-2",
    },
    {
      title: "ვადის ამოწურვა",
      value: "5",
      description: "მომდევნო 3 დღეში",
      icon: Clock,
      trend: "0",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">მთავარი გვერდი</h1>
        <p className="text-gray-600 mt-2">მიმოხილვა თქვენი ტენდერების აქტივობისა და ანალიტიკის</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              <div className="flex items-center mt-2">
                <span
                  className={`text-xs font-medium ${
                    stat.trend.startsWith("+")
                      ? "text-green-600"
                      : stat.trend.startsWith("-")
                        ? "text-red-600"
                        : "text-gray-600"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>ბოლო ტენდერები</CardTitle>
            <CardDescription>ახლახან გამოქვეყნებული ტენდერები</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">IT სერვისების შესყიდვა #{i}</p>
                    <p className="text-sm text-gray-500">₾{(Math.random() * 100000).toFixed(0)}</p>
                  </div>
                  <div className="text-sm text-gray-400">{i} საათის წინ</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI რეკომენდაციები</CardTitle>
            <CardDescription>ავტომატური ანალიზი და შეფასება</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { text: "მაღალი შესაძლებლობის ტენდერი IT კატეგორიაში", priority: "high" },
                { text: "ახალი კონკურენტი მშენებლობის სექტორში", priority: "medium" },
                { text: "ფასების ტენდენცია იზრდება ენერგეტიკაში", priority: "low" },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      item.priority === "high"
                        ? "bg-red-500"
                        : item.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
