"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Award, Trophy, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MyVisaPage() {
  // Mock user data - would come from auth context/API
  const userData = {
    name: "Ahmet Yılmaz",
    username: "ahmet_yilmaz",
    uid: "WC-2025-001234",
    joinDate: "15 Ocak 2025",
    walletId: "0x742d35Cc6634C0532925a3b8D404fddF4f",
    expiryDate: "15 Ocak 2026",
    tier: "Katılımcı",
    tierLevel: 2,
    photo: "/male-professional-headshot.jpg",
  }

  const visaStamps = [
    { id: 1, event: "İlk Aktivasyon", date: "15 Ocak 2025", location: "İstanbul", type: "activation" },
    { id: 2, event: "Community Katılımı", date: "18 Ocak 2025", location: "Online", type: "community" },
    { id: 3, event: "İlk DAO Oylaması", date: "22 Ocak 2025", location: "Online", type: "dao" },
    { id: 4, event: "YAWZ Etkinliği", date: "28 Ocak 2025", location: "Ankara", type: "event" },
  ]

  const badges = [
    {
      id: 1,
      name: "İlk Adım",
      description: "İlk aktivasyonu tamamladı",
      icon: "🎯",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Topluluk Üyesi",
      description: "Community'ye katıldı",
      icon: "👥",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      name: "Karar Verici",
      description: "İlk DAO oyunu kullandı",
      icon: "🗳️",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      name: "Etkinlik Katılımcısı",
      description: "Bir etkinliğe katıldı",
      icon: "🎪",
      color: "bg-orange-100 text-orange-800",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2 relative">
          <h1 className="text-3xl font-bold text-gray-900">VİZEM / MY VISA</h1>
          <p className="text-gray-600">WeClub Ekosistem Vizesi</p>
          <div className="absolute top-0 right-0">
            <Link href="/settings">
              <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
                <Settings className="w-4 h-4" />
                <span>Ayarlar</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Visa Card */}
        <Card className="bg-white border-2 border-gray-300 shadow-lg">
          <CardContent className="p-0">
            {/* Visa Header */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-8 py-4 border-b-2 border-gray-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">YAWZ EKOSİSTEM / YAWZ ECOSYSTEM</h2>
                  <p className="text-lg font-semibold text-gray-700">VİZE / VISA</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">VİZE NO. / VISA NO.</p>
                  <p className="text-lg font-bold text-gray-900">{userData.uid}</p>
                </div>
              </div>
            </div>

            {/* Visa Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Photo Section */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative">
                    <Image
                      src={userData.photo || "/placeholder.svg"}
                      alt="Kullanıcı Fotoğrafı"
                      width={200}
                      height={380}
                      className="rounded-lg border-2 border-gray-300 object-cover"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">AD SOYAD / FULL NAME</p>
                      <p className="text-lg font-bold text-gray-900">{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">KULLANICI ADI / USERNAME</p>
                      <p className="text-lg font-bold text-gray-900">@{userData.username}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">KATILIM TARİHİ / JOIN DATE</p>
                      <p className="text-lg font-bold text-gray-900">{userData.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">GEÇERLİLİK / VALIDITY</p>
                      <p className="text-lg font-bold text-gray-900">{userData.expiryDate}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-gray-600 mb-1">CÜZDAN ADRESİ / WALLET ADDRESS</p>
                      <p className="text-lg font-mono font-bold text-gray-900 break-all">{userData.walletId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">ÜYELİK SEVİYESİ / TIER LEVEL</p>
                      <p className="text-lg font-bold text-gray-900">
                        Level {userData.tierLevel} {userData.tier}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Machine Readable Zone */}
            <div className="bg-gray-100 border-t-2 border-gray-300 px-8 py-6">
              <div className="font-mono text-xl text-gray-800 space-y-3 leading-relaxed">
                <p>
                  YAWZ&lt;&lt;{userData.uid.replace("WC-", "").replace("-", "")}
                  &lt;&lt;TR&lt;&lt;&lt;WECLUB&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;AHMET&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                </p>
                <p>
                  {userData.uid.replace("-", "")}250115&lt;{userData.tier.toUpperCase()}&lt;IST&lt;L{userData.tierLevel}
                  260115&lt;&lt;&lt;YAWZ&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;YILMAZ&lt;
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visa Stamps Timeline */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="w-6 h-6 mr-2 text-gray-700" />
              VİZE DAMGALARI / VISA STAMPS
            </h3>
            <div className="space-y-4">
              {visaStamps.map((stamp, index) => (
                <div
                  key={stamp.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-600"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-900">{stamp.event}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {stamp.date}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {stamp.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge
                      className={`${
                        stamp.type === "activation"
                          ? "bg-gray-100 text-gray-800 border border-gray-300"
                          : stamp.type === "community"
                            ? "bg-gray-200 text-gray-800 border border-gray-400"
                            : stamp.type === "dao"
                              ? "bg-gray-300 text-gray-900 border border-gray-500"
                              : "bg-gray-400 text-white border border-gray-600"
                      }`}
                    >
                      {stamp.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badge Collection */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-gray-700" />
              ROZET KOLEKSİYONU / BADGE COLLECTION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-gray-50 rounded-lg p-4 text-center border-2 border-gray-200 hover:border-gray-400 transition-colors"
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  <Badge className="bg-gray-200 text-gray-800 border border-gray-300">Kazanıldı</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
