"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X, Settings, Wallet, LogOut, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "./auth-provider"
import { LoginModal } from "./login-modal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, logout } = useAuth()

  const userData = {
    name: "Ahmet Yılmaz",
    tier: "Katılımcı",
    tierLevel: 2,
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/community", label: "Community" },
    { href: "/dao", label: "DAO" },
    { href: "/passport", label: "Passport" },
    { href: "/my-visa", label: "My Visa" },
    { href: "/events", label: "Events" }, // Moved Events next to My Visa in the array order
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 hidden md:block">
        <div className="max-w-[1280px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/images/we-club-logo-black.png" alt="WeClub" width={120} height={48} className="h-8 w-auto" />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-gray-700 hover:text-black hover:underline transition-all duration-200 group relative"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex flex-col items-end space-y-3">
              {!user ? (
                <>
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => setShowLoginModal(true)}
                      variant="outline"
                      className="rounded-full px-6 py-2 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors bg-transparent"
                    >
                      Giriş Yap
                    </Button>
                    <Link href="/activate">
                      <Button
                        className="rounded-full px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#01312e" }}
                      >
                        Vizemı Aktive Et
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="rounded-full p-2 text-gray-600 hover:text-gray-900">
                      <Wallet className="w-5 h-5" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.role} • {user.votingPower} oy</div>
                  </div>
                  <Button 
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="rounded-full px-4 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Tabbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link href="/" className="flex flex-col items-center justify-center space-y-1 text-xs">
            <div className="w-6 h-6 flex items-center justify-center">🏠</div>
            <span>Ana Sayfa</span>
          </Link>
          <Link href="/tasks" className="flex flex-col items-center justify-center space-y-1 text-xs">
            <div className="w-6 h-6 flex items-center justify-center">🧭</div>
            <span>Görevler</span>
          </Link>
          <Link href="/passport" className="flex flex-col items-center justify-center space-y-1 text-xs">
            <div className="w-6 h-6 flex items-center justify-center">📘</div>
            <span>Pasaport</span>
          </Link>
          <Link href="/my-visa" className="flex flex-col items-center justify-center space-y-1 text-xs">
            <div className="w-6 h-6 flex items-center justify-center">🆔</div>
            <span>Vizem</span>
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center space-y-1 text-xs"
          >
            <Menu className="w-6 h-6" />
            <span>Diğer</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Image src="/images/we-club-logo-black.png" alt="WeClub" width={100} height={40} className="h-6 w-auto" />
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {isLoggedIn && (
                <div className="pb-4 border-b">
                  <p className="font-medium text-gray-900">{userData.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600">{userData.tier}</p>
                    <Badge className="bg-blue-600 text-white text-xs">Level {userData.tierLevel}</Badge>
                  </div>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-lg font-medium text-gray-900 hover:text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  )
}
