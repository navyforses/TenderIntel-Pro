import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsChart } from "@/components/analytics-chart"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, FileText, Building, Calendar } from "@/lib/icons"

// Mock data for analytics
const monthlyTendersData = [
  { name: "იან", value: 45 },
  { name: "თებ", value: 52 },
  { name: "მარ", value: 48 },
  { name: "აპრ", value: 61 },
  { name: "მაი", value: 55 },
  { name: "ივნ", value: 67 },
]

const categoryDistributionData = [
  { name: "IT სერვისები", value: 35 },
  { name: "მშენებლობა", value: 28 },
  { name: "კონსულტაციები", value: 15 },
  { name: "მედიცინა", value: 12 },
  { name: "განათლება", value: 10 },
]

const valueDistributionData = [
  { name: "< 10,000₾", value: 25 },
  { name: "10,000₾ - 50,000₾", value: 35 },
  { name: "50,000₾ - 100,000₾", value: 20 },
  { name: "100,000₾ - 500,000₾", value: 15 },
  { name: "> 500,000₾", value: 5 },
]

const opportunityTrendsData = [
  { name: "იან", value: 72 },
  { name: "თებ", value: 75 },
  { name: "მარ", value: 68 },
  { name: "აპრ", value: 82 },
  { name: "მაი", value: 79 },
  { name: "ივნ", value: 85 },
]

export default function AnalyticsPage() {
  const keyMetrics = [
    {
      title: "სულ ტენდერები",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      description: "ბოლო 30 დღეში",
      icon: FileText,
    },
    {
      title: "საშუალო ღირებულება",
      value: "₾67,430",
      change: "+8.2%",
      trend: "up",
      description: "ამ თვეში",
      icon: DollarSign,
    },
    {
      title: "აქტიური ორგანიზაციები",
      value: "156",
      change: "-2.1%",
      trend: "down",
      description: "შემსყიდველი ორგანიზაციები",
      icon: Building,
    },
    {
      title: "საშუალო ვადა",
      value: "23 დღე",
      change: "+5.3%",
      trend: "up",
      description: "გამოქვეყნებიდან ვადამდე",
      icon: Calendar,
    },
  ]

  const topCategories = [
    { name: "IT სერვისები", count: 89, percentage: 28.5, trend: "up" },
    { name: "მშენებლობა", count: 76, percentage: 24.3, trend: "down" },
    { name: "კონსულტაციები", count: 45, percentage: 14.4, trend: "up" },
    { name: "მედიცინა", count: 38, percentage: 12.2, trend: "up" },
    { name: "განათლება", count: 32, percentage: 10.2, trend: "down" },
  ]

  const topOrganizations = [
    { name: "თბილისის მერია", count: 23, value: "₾2,450,000" },
    { name: "განათლების სამინისტრო", count: 18, value: "₾1,890,000" },
    { name: "ჯანდაცვის სამინისტრო", count: 15, value: "₾1,650,000" },
    { name: "ეკონომიკის სამინისტრო", count: 12, value: "₾980,000" },
    { name: "ინფრასტრუქტურის სამინისტრო", count: 11, value: "₾1,200,000" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ანალიტიკა</h1>
        <p className="text-gray-600 mt-2">ტენდერების სტატისტიკა და ტენდენციები</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-2">
                <span
                  className={`text-xs font-medium flex items-center gap-1 ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {metric.change}
                </span>
                <span className="text-xs text-gray-600 ml-2">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsChart
          title="ტენდერები თვეების მიხედვით"
          description="ბოლო 6 თვის სტატისტიკა"
          data={monthlyTendersData}
          type="bar"
          dataKey="value"
        />

        <AnalyticsChart
          title="კატეგორიების განაწილება"
          description="ტენდერების რაოდენობა კატეგორიების მიხედვით"
          data={categoryDistributionData}
          type="pie"
          dataKey="value"
        />

        <AnalyticsChart
          title="ღირებულების განაწილება"
          description="ტენდერების ღირებულება დიაპაზონების მიხედვით"
          data={valueDistributionData}
          type="bar"
          dataKey="value"
        />

        <AnalyticsChart
          title="შესაძლებლობების ტენდენცია"
          description="საშუალო შესაძლებლობის ქულა თვეების მიხედვით"
          data={opportunityTrendsData}
          type="line"
          dataKey="value"
        />
      </div>

      {/* Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>ტოპ კატეგორიები</CardTitle>
            <CardDescription>ყველაზე აქტიური კატეგორიები ამ თვეში</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.count} ტენდერი</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{category.percentage}%</span>
                    <Badge variant={category.trend === "up" ? "default" : "secondary"}>
                      {category.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Organizations */}
        <Card>
          <CardHeader>
            <CardTitle>ტოპ ორგანიზაციები</CardTitle>
            <CardDescription>ყველაზე აქტიური შემსყიდველი ორგანიზაციები</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topOrganizations.map((org, index) => (
                <div key={org.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{org.name}</p>
                      <p className="text-sm text-gray-500">{org.count} ტენდერი</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{org.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
