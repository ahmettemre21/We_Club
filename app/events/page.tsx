"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Plane, QrCode, X } from "lucide-react"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null)

  const upcomingEvents = [
    {
      id: 1,
      title: "YAWZ Tasarım Atölyesi",
      type: "Atölye",
      date: "2024-02-15",
      time: "19:00",
      endTime: "21:30",
      location: "İstanbul - Karaköy",
      venue: "YAWZ Studio",
      capacity: 25,
      registered: 18,
      description:
        "Sürdürülebilir moda tasarımının temellerini öğrenin. Organik kumaşlarla kendi tasarımınızı yaratın.",
      pnr: "YWZ240215",
      gate: "Studio-A",
      seat: "W-12",
      status: "registered",
      requirements: ["Level 2+", "RSVP Gerekli"],
      agenda: [
        "19:00 - Karşılama & Tanışma",
        "19:30 - Sürdürülebilir Tasarım Sunumu",
        "20:00 - Hands-on Atölye",
        "21:30 - Networking & Kapanış",
      ],
    },
    {
      id: 2,
      title: "WeClub İlkbahar Koleksiyonu Lansmanı",
      type: "Lansman",
      date: "2024-03-01",
      time: "20:00",
      endTime: "22:00",
      location: "Ankara - Çankaya",
      venue: "Armada AVM Etkinlik Salonu",
      capacity: 100,
      registered: 67,
      description:
        "2024 İlkbahar koleksiyonunu ilk görenler arasında olun. Özel indirimler ve sürprizler sizi bekliyor.",
      pnr: "YWZ240301",
      gate: "Main-Hall",
      seat: "VIP-A",
      status: "registered",
      requirements: ["Level 3+", "Davetiye Gerekli"],
      agenda: [
        "20:00 - VIP Karşılama",
        "20:30 - Koleksiyon Tanıtımı",
        "21:00 - Fashion Show",
        "21:30 - Cocktail & Networking",
      ],
    },
    {
      id: 3,
      title: "Sürdürülebilirlik Paneli",
      type: "Panel",
      date: "2024-03-20",
      time: "14:00",
      endTime: "16:00",
      location: "İzmir - Alsancak",
      venue: "İzmir Ekonomi Üniversitesi",
      capacity: 150,
      registered: 89,
      description: "Moda endüstrisinde sürdürülebilirlik konusunda uzmanlarla buluşma. Soru-cevap oturumu dahil.",
      pnr: "YWZ240320",
      gate: "Konf-B",
      seat: "G-45",
      status: "registration-open",
      requirements: ["Tüm Seviyeler"],
      agenda: ["14:00 - Açılış Konuşması", "14:30 - Panel Tartışması", "15:30 - Soru & Cevap", "16:00 - Networking"],
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "YAWZ Kurucu Hikayesi",
      type: "Söyleşi",
      date: "2024-01-10",
      location: "İstanbul - Beyoğlu",
      attendees: 45,
      rating: 4.8,
      stamps: ["Katılımcı", "Networking", "İlk Etkinlik"],
    },
    {
      id: 5,
      title: "Organik Pamuk Üretim Gezisi",
      type: "Gezi",
      date: "2023-12-05",
      location: "Denizli - Çivril",
      attendees: 22,
      rating: 4.9,
      stamps: ["Gezgin", "Üretim Tanığı", "Sürdürülebilirlik"],
    },
  ]

  const handleRSVP = (eventId: number) => {
    console.log(`RSVP for event ${eventId}`)
  }

  const handleCheckIn = (eventId: number) => {
    console.log(`Check-in for event ${eventId}`)
  }

  const showTicket = (eventId: number) => {
    setSelectedTicket(eventId)
  }

  const closeTicket = () => {
    setSelectedTicket(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "check-in-open":
        return <Badge className="bg-green-100 text-green-800">Check-in Açık</Badge>
      case "boarding-soon":
        return <Badge className="bg-yellow-100 text-yellow-800">Yakında Başlıyor</Badge>
      case "registration-open":
        return <Badge className="bg-blue-100 text-blue-800">Kayıt Açık</Badge>
      case "registered":
        return <Badge className="bg-green-100 text-green-800">Kayıtlı</Badge>
      default:
        return <Badge variant="outline">Bilinmiyor</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-weclub-visa-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-weclub-power-black mb-2">Etkinlikler</h1>
          <p className="text-gray-600">Uçuşa hazır: Kapılar açılıyor</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Yaklaşan Etkinlikler</TabsTrigger>
            <TabsTrigger value="past">Geçmiş Etkinlikler</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{event.type}</Badge>
                        {getStatusBadge(event.status)}
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{event.description}</p>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Gereksinimler:</h4>
                    <div className="flex gap-2">
                      {event.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Agenda */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Program:</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {event.agenda.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-weclub-yawz-green rounded-full mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      {event.status === "registration-open" && (
                        <Button
                          onClick={() => handleRSVP(event.id)}
                          className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90"
                        >
                          Kayıt Ol
                        </Button>
                      )}
                      {event.status === "registered" && (
                        <>
                          <Button
                            onClick={() => showTicket(event.id)}
                            className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90"
                          >
                            <Plane className="w-4 h-4 mr-2" />
                            Biletim
                          </Button>
                          <Button onClick={() => handleCheckIn(event.id)} variant="outline">
                            <QrCode className="w-4 h-4 mr-2" />
                            Check-in
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{event.capacity - event.registered} kişilik yer kaldı</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{event.type}</Badge>
                        <Badge className="bg-gray-100 text-gray-800">Tamamlandı</Badge>
                      </div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} katılımcı</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm">
                        <span>⭐ {event.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Earned Stamps */}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-sm mb-2">Kazanılan Mühürler:</h4>
                    <div className="flex gap-2">
                      {event.stamps.map((stamp, index) => (
                        <Badge key={index} className="bg-weclub-yawz-green text-white text-xs">
                          🏆 {stamp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Event Quest Progress */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plane className="w-5 h-5 text-weclub-yawz-green" />
              <span>Etkinlik Görevleri</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">3 Etkinlik → Gezgin</span>
                  <Badge variant="outline">2/3</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-weclub-yawz-green h-2 rounded-full w-2/3" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">5 Etkinlik + Şehir Dışı → Kaşif</span>
                  <Badge variant="outline">1/5</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-weclub-yawz-green h-2 rounded-full w-1/5" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">10 Etkinlik → Star</span>
                  <Badge variant="outline">2/10</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-weclub-yawz-green h-2 rounded-full w-1/5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative">
            {/* Ticket slides in from left */}
            <div className="animate-in slide-in-from-left-full duration-500">
              {(() => {
                const event = upcomingEvents.find((e) => e.id === selectedTicket)
                if (!event) return null

                return (
                  <div className="bg-white rounded-lg shadow-2xl max-w-md mx-4 overflow-hidden">
                    {/* Close button */}
                    <button
                      onClick={closeTicket}
                      className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 rounded-full p-2 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Boarding Pass Header */}
                    <div className="bg-gradient-to-r from-weclub-yawz-green to-weclub-trust-blue text-white p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-6 h-6" />
                          <span className="font-bold text-lg">BOARDING PASS</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-75">PNR</div>
                          <div className="font-mono font-bold text-lg">{event.pnr}</div>
                        </div>
                      </div>

                      <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                      <p className="text-sm opacity-90">{event.type}</p>
                    </div>

                    {/* Ticket Details */}
                    <div className="p-6 space-y-6">
                      {/* Flight Info Style Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Etkinlik Zamanı</div>
                          <div className="font-mono font-bold text-lg">{event.date}</div>
                          <div className="font-mono text-sm text-gray-600">{event.time}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Bitiş Saati</div>
                          <div className="font-mono font-bold text-lg">{event.endTime}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Gate</div>
                          <div className="font-mono font-bold text-lg">{event.gate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wide">Seat/Zone</div>
                          <div className="font-mono font-bold text-lg">{event.seat}</div>
                        </div>
                      </div>

                      {/* Venue */}
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Etkinlik Yeri</div>
                        <div className="font-semibold">{event.venue}</div>
                        <div className="text-sm text-gray-600">{event.location}</div>
                      </div>

                      {/* Description */}
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Açıklama</div>
                        <p className="text-sm text-gray-700">{event.description}</p>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="flex justify-center py-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>

                      {/* Barcode Style Bottom */}
                      <div className="border-t pt-4">
                        <div className="font-mono text-xs text-center text-gray-500 tracking-widest">
                          YAWZ&lt;&lt;{event.pnr}&lt;&lt;{event.gate}&lt;&lt;{event.seat}
                          &lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                        </div>
                        <div className="font-mono text-xs text-center text-gray-500 tracking-widest mt-1">
                          {event.date.replace(/-/g, "")}&lt;{event.time.replace(":", "")}&lt;WECLUB&lt;
                          {event.type.toUpperCase()}&lt;&lt;&lt;YAWZ
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
