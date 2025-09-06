import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#f7f5ef" }}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Digital Identity Card */}
        <Card className="bg-white rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="font-mono text-xl" style={{ color: "#01312e" }}>
              MY VISA - DİJİTAL KİMLİK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">User#12345</h3>
                    <p className="text-sm text-gray-600">UID: WC001234</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Wallet ID</p>
                  <p className="font-mono text-sm">...7a8b</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Katılım Tarihi</p>
                  <p className="text-sm">15 Aralık 2024</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-32 h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR CODE</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Tier Seviyesi</span>
                    <Badge style={{ backgroundColor: "#01312e", color: "#ffffff" }}>Tier 2</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-600">Tier 3'e %35 kaldı</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stamp Timeline */}
        <Card className="bg-white rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="font-mono" style={{ color: "#01312e" }}>
              VİZE DAMGALARI ÇİZELGESİ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#01312e" }}
                >
                  <span className="text-white text-xl">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold">İlk Aktivasyon</h4>
                  <p className="text-sm text-gray-600">15 Aralık 2024</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#58e6ff" }}
                >
                  <span className="text-black text-xl">📝</span>
                </div>
                <div>
                  <h4 className="font-semibold">İlk Paylaşım</h4>
                  <p className="text-sm text-gray-600">16 Aralık 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badge Collection */}
        <Card className="bg-white rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="font-mono" style={{ color: "#01312e" }}>
              ROZET KOLEKSİYONU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#01312e" }}
                >
                  <span className="text-white">🏆</span>
                </div>
                <p className="text-xs font-semibold">İlk Üye</p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#58e6ff" }}
                >
                  <span className="text-black">💬</span>
                </div>
                <p className="text-xs font-semibold">Sosyal</p>
              </div>

              <div className="text-center p-4 border rounded-lg opacity-50">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 bg-gray-300">
                  <span className="text-gray-500">🎯</span>
                </div>
                <p className="text-xs font-semibold text-gray-500">Kilitli</p>
              </div>

              <div className="text-center p-4 border rounded-lg opacity-50">
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 bg-gray-300">
                  <span className="text-gray-500">⭐</span>
                </div>
                <p className="text-xs font-semibold text-gray-500">Kilitli</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
