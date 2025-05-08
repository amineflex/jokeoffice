import { PrismaClient } from '../../../../generated/prisma'



export async function GET(req: Request) {
    const prisma = new PrismaClient()

    async function getJokes() {
        const jokes = await prisma.joke.findMany()
        return jokes
    }

    try {
        const jokes = await getJokes()
        await prisma.$disconnect()
        return new Response(JSON.stringify(jokes), { status: 200 })
    } catch (error) {
        console.error('Error fetching jokes:', error)
        return new Response(JSON.stringify({ message: 'Error fetching jokes' }), { status: 500 })
    }
}

