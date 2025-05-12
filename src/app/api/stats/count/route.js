import { PrismaClient } from '../../../../../generated/prisma'

export async function GET(req) {
    const prisma = new PrismaClient()

    async function getJokeStats() {
        const today = new Date()
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date()
            date.setDate(today.getDate() - i)
            return date.toISOString().split('T')[0] 
        }).reverse()

        const counts = await Promise.all(
            last7Days.map(async (day) => {
                const startOfDay = new Date(day)
                const endOfDay = new Date(day)
                endOfDay.setDate(endOfDay.getDate() + 1)

                const count = await prisma.joke.count({
                    where: {
                        createdAt: {
                            gte: startOfDay,
                            lt: endOfDay,
                        },
                    },
                })
                return { day, count }
            })
        )

        const totalCount = await prisma.joke.count()

        // Count unique users who have created jokes
        const uniqueUsers = await prisma.joke.findMany({
            distinct: ['username'],
            select: { username: true },
        })
        const uniqueUserCount = uniqueUsers.length

        return { counts, totalCount, uniqueUserCount }
    }

    try {
        const stats = await getJokeStats()
        await prisma.$disconnect()
        return new Response(JSON.stringify(stats), { status: 200 })
    } catch (error) {
        console.error('Error fetching joke stats:', error)
        return new Response(JSON.stringify({ message: 'Error fetching joke stats' }), { status: 500 })
    }
}
