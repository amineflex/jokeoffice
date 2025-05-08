import { PrismaClient } from '../../../../generated/prisma'


export async function POST(req: Request) {

    // get the body of the requesta
    const requestBody = await req.json()
    const { username, content } = requestBody

    const prisma = new PrismaClient()

    async function addJoke() {
        const joke = await prisma.joke.create({
        data: {
            username: username,
            content: content,
        },
        })
        console.log(joke)
    }


    try {
        addJoke()
            .then(async () => {
            await prisma.$disconnect()
            })
            .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    
        return new Response(JSON.stringify({ message: 'Joke added successfully' }), { status: 200 })
    } catch (error) {
        console.error('Error adding joke:', error)
        return new Response(JSON.stringify({ message: 'Error adding joke' }), { status: 500 })
    }
    

}




