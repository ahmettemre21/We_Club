import Link from "next/link"
import Image from "next/image"
import { Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Image src="/images/we-club-logo-white.png" alt="WeClub" width={120} height={48} className="h-8 w-auto" />
            <p className="text-sm text-gray-300 leading-relaxed">
              WeClub, doğrulanmış YAWZ ürün sahiplerinin zincir üstü topluluğudur.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Keşfet</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/community" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Community
              </Link>
              <Link href="/my-visa" className="block text-sm text-gray-300 hover:text-white transition-colors">
                My Visa
              </Link>
              <Link href="/dao" className="block text-sm text-gray-300 hover:text-white transition-colors">
                DAO
              </Link>
              <Link href="/passport" className="block text-sm text-gray-300 hover:text-white transition-colors">
                YAWZ Passport
              </Link>
            </div>
          </div>

          {/* Help Center */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Yardım Merkezi</h3>
            <div className="space-y-2">
              <Link href="/faq" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Sıkça Sorulan Sorular
              </Link>
              <Link href="/contact" className="block text-sm text-gray-300 hover:text-white transition-colors">
                İletişim
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white">Yasal</h3>
            <div className="space-y-2">
              <Link href="/terms" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Hizmet Şartları
              </Link>
              <Link href="/privacy" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-sm text-gray-400 text-center">© 2025 WeClub by YAWZ. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
