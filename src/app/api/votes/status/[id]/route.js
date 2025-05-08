import { PrismaClient } from '../../../../../../generated/prisma';


export async function GET(request, { params }) {
    const { id } = params;

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr');
    
    // get all votes for the ip
    const prisma = new PrismaClient()
    const votes = await prisma.vote.findUnique({
        where: {
            ipAddress: ip,
            postId: parseInt(id),
        },
    })

    await prisma.$disconnect()
    return new Response(JSON.stringify(votes), { status: 200 })
    

}