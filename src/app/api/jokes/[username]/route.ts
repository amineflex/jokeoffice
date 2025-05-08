import { PrismaClient } from '../../../../../generated/prisma'


export async function GET(req: Request, { params }) {
    
    const prisma = new PrismaClient()
    console.log(req)

    async function getJokesByUsername() {
        const jokes = await prisma.joke.findMany({
            where: {
                username: params.username,
            },
        })
        return jokes
    }

    try {
        const jokes = await getJokesByUsername()
        await prisma.$disconnect()
        return new Response(JSON.stringify(jokes), { status: 200 })
    } catch (error) {
        console.error('Error fetching jokes:', error)
        return new Response(JSON.stringify({ message: 'Error fetching jokes' }), { status: 500 })
    }
}