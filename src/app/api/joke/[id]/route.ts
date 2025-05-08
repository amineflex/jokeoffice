import { PrismaClient } from '../../../../../generated/prisma'


export async function GET(req: Request, { params } ) {

    const prisma = new PrismaClient()

    console.log(req)

    async function getJoke() {
        const joke = await prisma.joke.findUnique({
            where: {
                id: parseInt(params.id),
            },
        })
        return joke
    }

    try {
        const joke = await getJoke()
        await prisma.$disconnect()
        if (!joke) {
            return new Response(JSON.stringify({ message: 'Joke not found' }), { status: 404 })
        }
        return new Response(JSON.stringify(joke), { status: 200 })
    } catch (error) {
        console.error('Error fetching joke:', error)
        return new Response(JSON.stringify({ message: 'Error fetching joke' }), { status: 500 })
    }
}
