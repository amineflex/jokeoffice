import { PrismaClient } from '../../../../../../generated/prisma';


export async function GET(request, { params }) {
    const { ip } = params;
    
    // get all votes for the ip
    const prisma = new PrismaClient()
    const votes = await prisma.vote.findMany({
        where: {
            ipAddress: ip,
        },
    })
    console.log(votes)
    await prisma.$disconnect()
    return new Response(JSON.stringify(votes), { status: 200 })
    

}