import { PrismaClient } from '../../../../../generated/prisma'

export async function GET(req) {
    const prisma = new PrismaClient()

    async function getJokeStats() {
        const userCounts = await prisma.joke.groupBy({
            by: ['username'], // Group by username
            _count: {
                username: true, // Count based on username
            },
            orderBy: {
                _count: {
                    username: 'desc', // Order by count of username
                },
            },
        })

        return { userCounts }
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
