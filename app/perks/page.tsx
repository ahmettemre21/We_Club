"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, MapPin, Clock, Star, Gift, Coffee, Plane, Dumbbell, GraduationCap, Briefcase } from "lucide-react"

export default function PerksPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const perkCategories = [
    { id: "all", name: "Tümü", icon: Gift },
    { id: "travel", name: "Seyahat", icon: Plane },
    { id: "cafe", name: "Kafe & Restoran", icon: Coffee },
    { id: "fitness", name: "Spor & Sağlık", icon: Dumbbell },
    { id: "education", name: "Eğitim", icon: GraduationCap },
    { id: "coworking", name: "Co-working", icon: Briefcase },
  ]

  const perks = [
    {
      id: 1,
      title: "Turkish Airlines Lounge Erişimi",
      category: "travel",
      partner: "Turkish Airlines",
      description: "İstanbul Havalimanı Business Lounge'a ücretsiz erişim",
      discount: "Ücretsiz",
      location: "İstanbul Havalimanı",
      validUntil: "2024-12-31",
      levelRequired: 4,
      usageLimit: "Ayda 2 kez",
      rating: 4.8,
      usedCount: 156,
      qrCode: "TK-IST-001",
      terms: ["Geçerli boarding pass gerekli", "Maksimum 3 saat kalış", "Alkollü içecekler dahil değil"],
    },
    {
      id: 2,
      title: "Starbucks %20 İndirim",
      category: "cafe",
      partner: "Starbucks",
      description: "Tüm Starbucks mağazalarında geçerli indirim",
      discount: "%20",
      location: "Tüm Türkiye",
      validUntil: "2024-06-30",
      levelRequired: 2,
      usageLimit: "Günde 1 kez",
      rating: 4.5,
      usedCount: 892,
      qrCode: "SB-TR-002",
      terms: ["Promosyonlarla birleştirilemez", "Minimum 25 TL alışveriş", "Sadece içecekler"],
    },
    {
      id: 3,
      title: "Fitness First Günlük Pass",
      category: "fitness",
      partner: "Fitness First",
      description: "Tüm Fitness First salonlarında günlük ücretsiz erişim",
      discount: "Ücretsiz",
      location: "İstanbul, Ankara, İzmir",
      validUntil: "2024-09-30",
      levelRequired: 3,
      usageLimit: "Ayda 4 kez",
      rating: 4.6,
      usedCount: 234,
      qrCode: "FF-TR-003",
      terms: ["Kimlik ibrazı zorunlu", "Grup dersleri dahil değil", "Havuz kullanımı dahil"],
    },
    {
      id: 4,
      title: "Udemy Kurs İndirimi",
      category: "education",
      partner: "Udemy",
      description: "Tasarım ve teknoloji kurslarında özel indirim",
      discount: "%40",
      location: "Online",
      validUntil: "2024-08-31",
      levelRequired: 2,
      usageLimit: "Ayda 2 kurs",
      rating: 4.7,
      usedCount: 445,
      qrCode: "UD-TR-004",
      terms: ["Sadece seçili kurslar", "İndirim otomatik uygulanır", "Sertifika dahil"],
    },
    {
      id: 5,
      title: "WeWork Günlük Masa",
      category: "coworking",
      partner: "WeWork",
      description: "WeWork lokasyonlarında günlük masa rezervasyonu",
      discount: "Ücretsiz",
      location: "İstanbul - Levent, Maslak",
      validUntil: "2024-12-31",
      levelRequired: 4,
      usageLimit: "Ayda 5 gün",
      rating: 4.9,
      usedCount: 78,
      qrCode: "WW-IST-005",
      terms: ["24 saat önceden rezervasyon", "WiFi ve çay/kahve dahil", "Toplantı odası ayrı ücret"],
    },
    {
      id: 6,
      title: "Mado %15 İndirim",
      category: "cafe",
      partner: "Mado",
      description: "Tüm Mado şubelerinde geçerli indirim",
      discount: "%15",
      location: "Tüm Türkiye",
      validUntil: "2024-07-31",
      levelRequired: 2,
      usageLimit: "Haftada 2 kez",
      rating: 4.3,
      usedCount: 567,
      qrCode: "MD-TR-006",
      terms: ["Dondurma ve tatlılarda geçerli", "Minimum 50 TL", "Paket serviste geçersiz"],
    },
  ]

  const filteredPerks = selectedCategory === "all" ? perks : perks.filter((perk) => perk.category === selectedCategory)

  const handleUsePerk = (perkId: number) => {
    console.log(`Using perk ${perkId}`)
    // In real app, this would generate a QR code or coupon
  }

  const getLevelBadgeColor = (level: number) => {
    if (level <= 2) return "bg-blue-100 text-blue-800"
    if (level <= 4) return "bg-green-100 text-green-800"
    return "bg-purple-100 text-purple-800"
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = perkCategories.find((cat) => cat.id === category)
    if (!categoryData) return Gift
    return categoryData.icon
  }

  return (
    <div className="min-h-screen bg-weclub-visa-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-weclub-power-black mb-2">WeClub Ayrıcalıklar</h1>
          <p className="text-gray-600">Üründen fazlası: Özel indirimler ve deneyimler</p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {perkCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category.id ? "bg-weclub-yawz-green" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Perks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerks.map((perk) => {
            const Icon = getCategoryIcon(perk.category)
            return (
              <Card key={perk.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-weclub-yawz-green/10 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-weclub-yawz-green" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{perk.title}</CardTitle>
                        <p className="text-sm text-gray-600">{perk.partner}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-weclub-yawz-green">{perk.discount}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 text-sm">{perk.description}</p>

                  {/* Location and Validity */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{perk.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Geçerlilik: {perk.validUntil}</span>
                    </div>
                  </div>

                  {/* Requirements and Usage */}
                  <div className="flex items-center justify-between">
                    <Badge className={getLevelBadgeColor(perk.levelRequired)}>
                      Level {perk.levelRequired}+ Gerekli
                    </Badge>
                    <span className="text-xs text-gray-500">{perk.usageLimit}</span>
                  </div>

                  {/* Rating and Usage Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{perk.rating}</span>
                    </div>
                    <span className="text-gray-500">{perk.usedCount} kez kullanıldı</span>
                  </div>

                  {/* Terms */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-gray-700">Koşullar:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {perk.terms.slice(0, 2).map((term, index) => (
                        <li key={index} className="flex items-start space-x-1">
                          <span className="text-weclub-yawz-green">•</span>
                          <span>{term}</span>
                        </li>
                      ))}
                      {perk.terms.length > 2 && (
                        <li className="text-weclub-yawz-green text-xs">+{perk.terms.length - 2} koşul daha...</li>
                      )}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleUsePerk(perk.id)}
                    className="w-full bg-weclub-yawz-green hover:bg-weclub-yawz-green/90"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    QR ile Kullan
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Usage Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ayrıcalık Kullanım İstatistikleriniz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-weclub-yawz-green mb-1">12</div>
                <div className="text-sm text-gray-600">Bu Ay Kullanılan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-weclub-yawz-green mb-1">₺847</div>
                <div className="text-sm text-gray-600">Toplam Tasarruf</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-weclub-yawz-green mb-1">6</div>
                <div className="text-sm text-gray-600">Favori Partner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-weclub-yawz-green mb-1">4.7</div>
                <div className="text-sm text-gray-600">Ortalama Puanınız</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partner Spotlight */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Partner Spotlight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <Plane className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold">Turkish Airlines</h3>
                <p className="text-sm text-gray-600">Premium seyahat deneyimi</p>
                <Badge variant="outline">Yeni Partner</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold">Starbucks</h3>
                <p className="text-sm text-gray-600">En popüler ayrıcalık</p>
                <Badge variant="outline">En Çok Kullanılan</Badge>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold">WeWork</h3>
                <p className="text-sm text-gray-600">Profesyonel çalışma alanı</p>
                <Badge variant="outline">Premium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
