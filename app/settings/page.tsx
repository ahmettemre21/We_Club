"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Shield, Wallet, Globe, Download, Trash2, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [showWalletAddress, setShowWalletAddress] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">AYARLAR / SETTINGS</h1>
          <p className="text-gray-600">Hesap ayarlarınızı yönetin</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Profil Bilgileri / Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad / Full Name</Label>
                <Input id="fullName" defaultValue="Ahmet Yılmaz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı / Username</Label>
                <Input id="username" defaultValue="ahmet_yilmaz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta / Email</Label>
                <Input id="email" type="email" defaultValue="ahmet@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon / Phone</Label>
                <Input id="phone" defaultValue="+90 555 123 4567" />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Profili Güncelle / Update Profile</Button>
          </CardContent>
        </Card>

        {/* Wallet Settings */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Wallet className="w-5 h-5 mr-2 text-green-600" />
              Cüzdan Ayarları / Wallet Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-grow">
                <p className="font-medium text-gray-900">Cüzdan Adresi / Wallet Address</p>
                <p className="text-sm text-gray-600 font-mono">
                  {showWalletAddress ? "0x742d35Cc6634C0532925a3b8D404fddF4f" : "0x742d...ddF4f"}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowWalletAddress(!showWalletAddress)}>
                {showWalletAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Cüzdan Durumu / Wallet Status</p>
                <p className="text-sm text-gray-600">Embedded wallet aktif</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Bağlı / Connected</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bell className="w-5 h-5 mr-2 text-yellow-600" />
              Bildirim Ayarları / Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Bildirimleri / Push Notifications</p>
                <p className="text-sm text-gray-600">Tarayıcı bildirimleri</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">E-posta Bildirimleri / Email Notifications</p>
                <p className="text-sm text-gray-600">DAO oylamaları ve etkinlikler</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Shield className="w-5 h-5 mr-2 text-red-600" />
              Gizlilik ve Güvenlik / Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Verilerimi İndir / Download My Data
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Eye className="w-4 h-4 mr-2" />
                Gizlilik Ayarları / Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="w-4 h-4 mr-2" />
                Hesabı Sil / Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Globe className="w-5 h-5 mr-2 text-purple-600" />
              Görünüm ve Dil / Appearance & Language
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Karanlık Mod / Dark Mode</p>
                <p className="text-sm text-gray-600">Koyu tema kullan</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="language">Dil / Language</Label>
              <select
                id="language"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue="tr"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
