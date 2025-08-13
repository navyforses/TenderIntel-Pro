"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SettingsSection } from "@/components/settings-section"
import { Badge } from "@/components/ui/badge"
import { Save, User, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile settings
    fullName: "ადმინისტრატორი",
    email: "admin@tenderintel.ge",
    phone: "+995 555 123 456",
    organization: "TenderIntel Pro",

    // Notification settings
    emailNotifications: true,
    tenderAlerts: true,
    weeklyDigest: true,
    pushNotifications: false,
    alertFrequency: "immediate",

    // Display settings
    language: "ka",
    timezone: "Asia/Tbilisi",
    itemsPerPage: "20",
    theme: "light",

    // Alert criteria
    minTenderValue: "10000",
    maxTenderValue: "1000000",
    alertCategories: ["IT სერვისები", "კონსულტაციები"],
    keywords: "ვებ-განვითარება, IT, პროგრამირება",

    // System settings
    dataRetention: "12",
    autoBackup: true,
    apiAccess: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // In a real app, this would save settings to the backend
    console.log("Saving settings:", settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">პარამეტრები</h1>
          <p className="text-gray-600 mt-2">სისტემის კონფიგურაცია და პერსონალიზაცია</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          შენახვა
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <SettingsSection title="პროფილის პარამეტრები" description="თქვენი პირადი ინფორმაციის მართვა">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">{settings.fullName}</h3>
              <p className="text-sm text-gray-600">{settings.email}</p>
              <Badge variant="secondary">ადმინისტრატორი</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">სრული სახელი</Label>
              <Input
                id="fullName"
                value={settings.fullName}
                onChange={(e) => handleSettingChange("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">ელ-ფოსტა</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">ტელეფონი</Label>
              <Input id="phone" value={settings.phone} onChange={(e) => handleSettingChange("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">ორგანიზაცია</Label>
              <Input
                id="organization"
                value={settings.organization}
                onChange={(e) => handleSettingChange("organization", e.target.value)}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection title="შეტყობინებების პარამეტრები" description="როგორ მიიღოთ შეტყობინებები და გაფრთხილებები">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ელ-ფოსტის შეტყობინებები</Label>
                <p className="text-sm text-gray-600">მიიღეთ შეტყობინებები ელ-ფოსტაზე</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ტენდერების გაფრთხილებები</Label>
                <p className="text-sm text-gray-600">ახალი ტენდერების შესახებ შეტყობინებები</p>
              </div>
              <Switch
                checked={settings.tenderAlerts}
                onCheckedChange={(checked) => handleSettingChange("tenderAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>კვირეული დაიჯესტი</Label>
                <p className="text-sm text-gray-600">კვირის შემაჯამებელი რეპორტი</p>
              </div>
              <Switch
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange("weeklyDigest", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>გაფრთხილების სიხშირე</Label>
              <Select
                value={settings.alertFrequency}
                onValueChange={(value) => handleSettingChange("alertFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">მყისიერად</SelectItem>
                  <SelectItem value="hourly">საათობრივად</SelectItem>
                  <SelectItem value="daily">ყოველდღიურად</SelectItem>
                  <SelectItem value="weekly">კვირეულად</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingsSection>

        {/* Display Settings */}
        <SettingsSection title="ინტერფეისის პარამეტრები" description="ენა, დროის ზონა და ვიზუალური პარამეტრები">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>ენა</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ka">ქართული</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>დროის ზონა</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Tbilisi">თბილისი (GMT+4)</SelectItem>
                  <SelectItem value="Europe/London">ლონდონი (GMT+0)</SelectItem>
                  <SelectItem value="America/New_York">ნიუ-იორკი (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ელემენტები გვერდზე</Label>
              <Select
                value={settings.itemsPerPage}
                onValueChange={(value) => handleSettingChange("itemsPerPage", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>თემა</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ღია</SelectItem>
                  <SelectItem value="dark">მუქი</SelectItem>
                  <SelectItem value="auto">ავტომატური</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingsSection>

        {/* Alert Criteria */}
        <SettingsSection title="გაფრთხილების კრიტერიუმები" description="რა ტენდერებზე მიიღოთ შეტყობინებები">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minValue">მინ. ღირებულება (₾)</Label>
                <Input
                  id="minValue"
                  type="number"
                  value={settings.minTenderValue}
                  onChange={(e) => handleSettingChange("minTenderValue", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxValue">მაქს. ღირებულება (₾)</Label>
                <Input
                  id="maxValue"
                  type="number"
                  value={settings.maxTenderValue}
                  onChange={(e) => handleSettingChange("maxTenderValue", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>მონიტორინგის კატეგორიები</Label>
              <div className="flex flex-wrap gap-2">
                {settings.alertCategories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm">
                კატეგორიების რედაქტირება
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">საკვანძო სიტყვები</Label>
              <Textarea
                id="keywords"
                value={settings.keywords}
                onChange={(e) => handleSettingChange("keywords", e.target.value)}
                placeholder="მიუთითეთ საკვანძო სიტყვები მძიმით გამოყოფილი..."
              />
            </div>
          </div>
        </SettingsSection>
      </div>

      {/* System Settings */}
      <SettingsSection title="სისტემის პარამეტრები" description="მონაცემების შენახვა და უსაფრთხოება">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>მონაცემების შენახვის ვადა (თვე)</Label>
              <Select
                value={settings.dataRetention}
                onValueChange={(value) => handleSettingChange("dataRetention", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 თვე</SelectItem>
                  <SelectItem value="12">12 თვე</SelectItem>
                  <SelectItem value="24">24 თვე</SelectItem>
                  <SelectItem value="unlimited">უსასრულო</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ავტომატური მარქაფი</Label>
                <p className="text-sm text-gray-600">ყოველდღიური მონაცემების მარქაფი</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>API წვდომა</Label>
                <p className="text-sm text-gray-600">გარე აპლიკაციებისთვის წვდომა</p>
              </div>
              <Switch
                checked={settings.apiAccess}
                onCheckedChange={(checked) => handleSettingChange("apiAccess", checked)}
              />
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Shield className="h-4 w-4 mr-2" />
                API გასაღების მართვა
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Database className="h-4 w-4 mr-2" />
                მონაცემების ექსპორტი
              </Button>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  )
}
