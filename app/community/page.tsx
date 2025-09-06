"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Plus, Search, Award, Clock, User } from "lucide-react"

export default function CommunityPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [isWriting, setIsWriting] = useState(false)

  const posts = [
    {
      id: 1,
      author: "Ahmet K.",
      level: 3,
      role: "Tasarımcı",
      title: "YAWZ Polo Tişört Styling Rehberi",
      summary: "Polo tişörtünüzü farklı kombinlerle nasıl stilize edebileceğinizi gösteriyorum",
      type: "style",
      readTime: "3 dk",
      likes: 24,
      comments: 8,
      publishedAt: "2 saat önce",
      featured: true,
      tags: ["Stil", "Polo", "Kombin"],
    },
    {
      id: 2,
      author: "Zeynep M.",
      level: 4,
      role: "Modalist",
      title: "Organik Pamuk Kumaş Özellikleri",
      summary: "YAWZ'ın kullandığı %100 organik pamuk kumaşın avantajları ve bakım önerileri",
      type: "design",
      readTime: "5 dk",
      likes: 18,
      comments: 12,
      publishedAt: "1 gün önce",
      featured: false,
      tags: ["Kumaş", "Sürdürülebilirlik", "Bakım"],
    },
    {
      id: 3,
      author: "Can D.",
      level: 2,
      role: "Katılımcı",
      title: "İstanbul Atölye Etkinliği Raporu",
      summary: "Geçen hafta katıldığım YAWZ atölye etkinliğinden notlar ve fotoğraflar",
      type: "report",
      readTime: "4 dk",
      likes: 31,
      comments: 15,
      publishedAt: "3 gün önce",
      featured: false,
      tags: ["Etkinlik", "Atölye", "İstanbul"],
    },
  ]

  const quests = [
    {
      id: 1,
      title: "İlk İçeriğini Paylaş",
      description: "The Block'ta ilk yazını yayınla",
      reward: 50,
      difficulty: "Kolay",
      progress: 0,
      maxProgress: 1,
    },
    {
      id: 2,
      title: "Haftalık Okuyucu",
      description: "Bu hafta 3 içerik oku ve yorum yap",
      reward: 20,
      difficulty: "Orta",
      progress: 1,
      maxProgress: 3,
    },
    {
      id: 3,
      title: "Topluluk Destekçisi",
      description: "5 farklı yazıya beğeni ver",
      reward: 15,
      difficulty: "Kolay",
      progress: 3,
      maxProgress: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-weclub-visa-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-weclub-power-black mb-2">The Block</h1>
              <p className="text-gray-600">Topluluk tarafından üretilen kaliteli içerikler</p>
            </div>
            <Button onClick={() => setIsWriting(true)} className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90">
              <Plus className="w-4 h-4 mr-2" />
              Yeni İçerik
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="İçeriklerde ara..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              {["all", "style", "design", "video", "report"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "bg-weclub-yawz-green" : ""}
                >
                  {filter === "all"
                    ? "Tümü"
                    : filter === "style"
                      ? "Stil"
                      : filter === "design"
                        ? "Tasarım"
                        : filter === "video"
                          ? "Video"
                          : "Rapor"}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Featured Post */}
            {posts
              .filter((post) => post.featured)
              .map((post) => (
                <Card key={post.id} className="border-2 border-weclub-yawz-green">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-weclub-yawz-green text-white">Öne Çıkan</Badge>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                        <Badge variant="outline" className="text-xs">
                          L{post.level} {post.role}
                        </Badge>
                      </div>
                      <span className="text-gray-500">{post.publishedAt}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Paylaş
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {/* Regular Posts */}
            <div className="space-y-4">
              {posts
                .filter((post) => !post.featured)
                .map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-weclub-yawz-green rounded-full flex items-center justify-center text-white font-bold">
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{post.author}</span>
                              <Badge variant="outline" className="text-xs">
                                L{post.level} {post.role}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{post.publishedAt}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.summary}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-1" />
                            Paylaş
                          </Button>
                        </div>
                        <div className="flex gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Quests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-weclub-yawz-green" />
                  <span>Haftalık Görevler</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quests.map((quest) => (
                  <div key={quest.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{quest.title}</h4>
                      <div className="weclub-yp-counter">+{quest.reward} YP</div>
                    </div>
                    <p className="text-xs text-gray-600">{quest.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-weclub-yawz-green h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {quest.progress}/{quest.maxProgress}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {quest.difficulty}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Topluluk İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Aktif Yazarlar</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Bu Ay Yayınlanan</span>
                  <span className="font-semibold">43</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Toplam Okuma</span>
                  <span className="font-semibold">2.1K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ortalama Puan</span>
                  <span className="font-semibold">4.8/5</span>
                </div>
              </CardContent>
            </Card>

            {/* Writing Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Yazım Rehberi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-weclub-yawz-green rounded-full mt-2 flex-shrink-0" />
                  <span>Özgün ve kaliteli içerik üretin</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-weclub-yawz-green rounded-full mt-2 flex-shrink-0" />
                  <span>Kaynaklarınızı belirtin</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-weclub-yawz-green rounded-full mt-2 flex-shrink-0" />
                  <span>Marka tonuna uygun yazın</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-weclub-yawz-green rounded-full mt-2 flex-shrink-0" />
                  <span>Görsel kalitesine dikkat edin</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Write Content Modal */}
      {isWriting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Yeni İçerik Oluştur</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsWriting(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">İçerik Türü</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="style">Stil Yazısı</option>
                  <option value="design">Tasarım Önerisi</option>
                  <option value="video">Video İçerik</option>
                  <option value="report">Etkinlik Raporu</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <Input placeholder="İçeriğinizin başlığını yazın..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Özet (280 karakter)</label>
                <Textarea placeholder="İçeriğinizin kısa özetini yazın..." maxLength={280} rows={3} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">İçerik</label>
                <Textarea placeholder="İçeriğinizi buraya yazın..." rows={8} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Etiketler</label>
                <Input placeholder="Etiketleri virgülle ayırın..." />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="ai-assist" />
                <label htmlFor="ai-assist" className="text-sm">
                  AI yardımı kullandım (şeffaflık için)
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsWriting(false)}>
                  İptal
                </Button>
                <Button className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90">Taslak Kaydet</Button>
                <Button className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90">İncelemeye Gönder</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
