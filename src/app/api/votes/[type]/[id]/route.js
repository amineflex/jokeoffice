import { PrismaClient } from '../../../../../../generated/prisma';

export async function POST(request, { params }) {
    const { type, id } = await params;

    // get ip address from request
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr');
    const prisma = new PrismaClient();

    const joke = await prisma.joke.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    async function vote() {
        // find if there is already a vote from this ip address for this post
        const existingVote = await prisma.vote.findFirst({
            where: {
                postId: parseInt(id),
                ipAddress: ip,
            },
        });

        if (existingVote) {
            // if there is, update the vote type
            const updatedVote = await prisma.vote.update({
                where: {
                    id: existingVote.id,
                },
                data: {
                    type: type,
                },
            });

            // Adjust joke's like/dislike count based on the updated vote
            if (existingVote.type !== type) {
                await prisma.joke.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: {
                        likes: type === 'like' ? joke.likes + 1 : joke.likes - 1,
                        dislikes: type === 'dislike' ? joke.dislikes + 1 : joke.dislikes - 1,
                    },
                });
            }

            console.log(updatedVote);
            return;
        }

        // Create a new vote
        const vote = await prisma.vote.create({
            data: {
                postId: parseInt(id),
                ipAddress: ip,
                type: type,
            },
        });

        // Increment joke's like/dislike count based on the new vote
        await prisma.joke.update({
            where: {
                id: parseInt(id),
            },
            data: {
                likes: type === 'like' ? joke.likes + 1 : joke.likes,
                dislikes: type === 'dislike' ? joke.dislikes + 1 : joke.dislikes,
            },
        });
    }

    try {
        await vote();
        await prisma.$disconnect();

        return new Response(JSON.stringify({ message: 'Vote added successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error adding vote:', error);
        await prisma.$disconnect();
        return new Response(JSON.stringify({ message: 'Error adding vote' }), { status: 500 });
    }
}