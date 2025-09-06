"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Zap, CheckCircle, Star } from "lucide-react"

export default function TasksPage() {
  const [userLevel, setUserLevel] = useState(3)
  const [userRole, setUserRole] = useState("Tasarımcı")
  const [totalYP, setTotalYP] = useState(285)
  const [weeklyStreak, setWeeklyStreak] = useState(5)

  const dailyTasks = [
    {
      id: 1,
      title: "Günlük Okuma",
      description: "The Block'ta bir içerik oku ve 60 saniye geçir",
      reward: 5,
      difficulty: "Kolay",
      progress: 1,
      maxProgress: 1,
      completed: true,
      category: "engagement",
    },
    {
      id: 2,
      title: "Topluluk Etkileşimi",
      description: "Bir yazıya yorum yap veya beğeni ver",
      reward: 5,
      difficulty: "Kolay",
      progress: 0,
      maxProgress: 1,
      completed: false,
      category: "engagement",
    },
    {
      id: 3,
      title: "DAO Katılımı",
      description: "Aktif bir oylamaya katıl",
      reward: 10,
      difficulty: "Orta",
      progress: 0,
      maxProgress: 1,
      completed: false,
      category: "governance",
    },
  ]

  const weeklyTasks = [
    {
      id: 4,
      title: "İçerik Üreticisi",
      description: "The Block'ta bir yazı yayınla",
      reward: 50,
      difficulty: "Zor",
      progress: 0,
      maxProgress: 1,
      completed: false,
      category: "creation",
      levelRequired: 2,
    },
    {
      id: 5,
      title: "Haftalık Okuyucu",
      description: "Bu hafta 3 farklı içerik oku",
      reward: 20,
      difficulty: "Orta",
      progress: 1,
      maxProgress: 3,
      completed: false,
      category: "engagement",
    },
    {
      id: 6,
      title: "Topluluk Destekçisi",
      description: "5 farklı yazıya beğeni ver",
      reward: 15,
      difficulty: "Kolay",
      progress: 3,
      maxProgress: 5,
      completed: false,
      category: "engagement",
    },
  ]

  const roleTasks = [
    {
      id: 7,
      title: "Tasarım Önerisi",
      description: "Yeni koleksiyon için tasarım önerisi paylaş",
      reward: 100,
      difficulty: "Zor",
      progress: 0,
      maxProgress: 1,
      completed: false,
      category: "creation",
      roleRequired: "Tasarımcı",
      levelRequired: 3,
    },
    {
      id: 8,
      title: "Stil Rehberi",
      description: "Bir ürün için styling rehberi oluştur",
      reward: 75,
      difficulty: "Orta",
      progress: 0,
      maxProgress: 1,
      completed: false,
      category: "creation",
      roleRequired: "Tasarımcı",
      levelRequired: 3,
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "İlk Adım",
      description: "İlk görevini tamamla",
      icon: "🎯",
      unlocked: true,
      unlockedAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Haftalık Kahraman",
      description: "7 gün üst üste görev tamamla",
      icon: "🔥",
      unlocked: true,
      unlockedAt: "2024-01-15",
    },
    {
      id: 3,
      title: "İçerik Yaratıcısı",
      description: "İlk içeriğini yayınla",
      icon: "✍️",
      unlocked: false,
      requirement: "The Block'ta içerik yayınla",
    },
    {
      id: 4,
      title: "DAO Katılımcısı",
      description: "İlk oyunu kullan",
      icon: "🗳️",
      unlocked: true,
      unlockedAt: "2024-01-12",
    },
    {
      id: 5,
      title: "Topluluk Lideri",
      description: "100 YP topla",
      icon: "👑",
      unlocked: true,
      unlockedAt: "2024-01-18",
    },
    {
      id: 6,
      title: "Etkinlik Aşığı",
      description: "3 etkinliğe katıl",
      icon: "🎪",
      unlocked: false,
      requirement: "2/3 etkinlik tamamlandı",
    },
  ]

  const levelProgress = {
    current: userLevel,
    next: userLevel + 1,
    currentYP: totalYP,
    nextLevelYP: userLevel === 3 ? 400 : userLevel === 4 ? 600 : 800,
    progressPercentage: userLevel === 3 ? (totalYP / 400) * 100 : 0,
  }

  const handleCompleteTask = (taskId: number) => {
    console.log(`Completing task ${taskId}`)
    // In real app, this would call the API and update state
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Kolay":
        return "bg-green-100 text-green-800"
      case "Orta":
        return "bg-yellow-100 text-yellow-800"
      case "Zor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "engagement":
        return Target
      case "creation":
        return Star
      case "governance":
        return Trophy
      default:
        return Target
    }
  }

  return (
    <div className="min-h-screen bg-weclub-visa-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        {/* Header with User Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-weclub-power-black mb-2">Görevler & Başarımlar</h1>
              <p className="text-gray-600">Katkınıza göre seviye atlayın ve rozetler kazanın</p>
            </div>
            <div className="text-right">
              <div className="weclub-yp-counter text-lg">{totalYP} YP</div>
              <div className="text-sm text-gray-600 mt-1">{weeklyStreak} günlük seri</div>
            </div>
          </div>

          {/* Level Progress Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-weclub-yawz-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                    L{userLevel}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Level {userLevel} - {userRole}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {levelProgress.nextLevelYP - levelProgress.currentYP} YP kaldı → Level {levelProgress.next}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">İlerleme</div>
                  <div className="text-lg font-bold text-weclub-yawz-green">
                    %{Math.round(levelProgress.progressPercentage)}
                  </div>
                </div>
              </div>
              <Progress value={levelProgress.progressPercentage} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{levelProgress.currentYP} YP</span>
                <span>{levelProgress.nextLevelYP} YP</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily">Günlük</TabsTrigger>
            <TabsTrigger value="weekly">Haftalık</TabsTrigger>
            <TabsTrigger value="role">Rol Görevleri</TabsTrigger>
            <TabsTrigger value="achievements">Başarımlar</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Günlük Görevler</h2>
              <Badge className="bg-weclub-yawz-green text-white">
                <Zap className="w-3 h-3 mr-1" />
                {weeklyStreak} günlük seri
              </Badge>
            </div>

            {dailyTasks.map((task) => {
              const Icon = getCategoryIcon(task.category)
              return (
                <Card key={task.id} className={task.completed ? "bg-green-50 border-green-200" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            task.completed ? "bg-green-100" : "bg-weclub-yawz-green/10"
                          }`}
                        >
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Icon className="w-5 h-5 text-weclub-yawz-green" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                            <div className="weclub-yp-counter text-sm">+{task.reward} YP</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {task.completed ? (
                          <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleCompleteTask(task.id)}
                            className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90"
                          >
                            Tamamla
                          </Button>
                        )}
                      </div>
                    </div>
                    {!task.completed && task.maxProgress > 1 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>İlerleme</span>
                          <span>
                            {task.progress}/{task.maxProgress}
                          </span>
                        </div>
                        <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Haftalık Görevler</h2>

            {weeklyTasks.map((task) => {
              const Icon = getCategoryIcon(task.category)
              return (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-weclub-yawz-green/10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-weclub-yawz-green" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                            <div className="weclub-yp-counter text-sm">+{task.reward} YP</div>
                            {task.levelRequired && (
                              <Badge variant="outline" className="text-xs">
                                Level {task.levelRequired}+
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleCompleteTask(task.id)}
                          className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90"
                          disabled={task.levelRequired && userLevel < task.levelRequired}
                        >
                          {task.levelRequired && userLevel < task.levelRequired ? "Kilitli" : "Başla"}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>İlerleme</span>
                        <span>
                          {task.progress}/{task.maxProgress}
                        </span>
                      </div>
                      <Progress value={(task.progress / task.maxProgress) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="role" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Rol Görevleri - {userRole}</h2>
              <p className="text-sm text-gray-600">Rolünüze özel görevler ve ilerlemeler</p>
            </div>

            {roleTasks.map((task) => {
              const Icon = getCategoryIcon(task.category)
              const canAccess =
                userLevel >= (task.levelRequired || 0) && (!task.roleRequired || task.roleRequired === userRole)

              return (
                <Card key={task.id} className={!canAccess ? "opacity-60" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-weclub-yawz-green/10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-weclub-yawz-green" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
                            <div className="weclub-yp-counter text-sm">+{task.reward} YP</div>
                            {task.roleRequired && (
                              <Badge variant="outline" className="text-xs">
                                {task.roleRequired}
                              </Badge>
                            )}
                            {task.levelRequired && (
                              <Badge variant="outline" className="text-xs">
                                Level {task.levelRequired}+
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button
                          size="sm"
                          onClick={() => handleCompleteTask(task.id)}
                          className="bg-weclub-yawz-green hover:bg-weclub-yawz-green/90"
                          disabled={!canAccess}
                        >
                          {!canAccess ? "Kilitli" : "Başla"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Başarımlar</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={achievement.unlocked ? "bg-yellow-50 border-yellow-200" : "bg-gray-50"}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                    {achievement.unlocked ? (
                      <div className="space-y-1">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Trophy className="w-3 h-3 mr-1" />
                          Kazanıldı
                        </Badge>
                        <div className="text-xs text-gray-500">{achievement.unlockedAt}</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Badge variant="outline">Kilitli</Badge>
                        {achievement.requirement && (
                          <div className="text-xs text-gray-500">{achievement.requirement}</div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievement Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Başarım İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-weclub-yawz-green mb-1">
                      {achievements.filter((a) => a.unlocked).length}
                    </div>
                    <div className="text-sm text-gray-600">Kazanılan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-weclub-yawz-green mb-1">{achievements.length}</div>
                    <div className="text-sm text-gray-600">Toplam</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-weclub-yawz-green mb-1">
                      %{Math.round((achievements.filter((a) => a.unlocked).length / achievements.length) * 100)}
                    </div>
                    <div className="text-sm text-gray-600">Tamamlanma</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-weclub-yawz-green mb-1">
                      #{Math.floor(Math.random() * 100) + 1}
                    </div>
                    <div className="text-sm text-gray-600">Sıralama</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
