import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ActivatePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#01312e" }}>
      <div className="w-full max-w-md">
        <Card className="bg-white rounded-xl shadow-lg">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Vizenizi aktive edin</CardTitle>
            <CardDescription className="text-gray-600">
              Ürününüzle birlikte gelen kodu taratarak dijital pasaportunuzu başlatın.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button className="w-full py-6 text-lg rounded-full" style={{ backgroundColor: "#58e6ff", color: "#000" }}>
              QR Kod Tarat
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">veya</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full py-3" style={{ backgroundColor: "#01312e" }}>
                Giriş Yap
              </Button>
            </div>

            <div className="text-center">
              <Link href="/" className="text-sm underline hover:no-underline" style={{ color: "#58e6ff" }}>
                Ana sayfaya dön
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
