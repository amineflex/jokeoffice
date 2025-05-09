import { PrismaClient } from "../../../../generated/prisma";

export async function POST(req) {
  const requestBody = await req.json();
  const { username, content } = requestBody;

  const prisma = new PrismaClient();

  async function addJoke() {
    const joke = await prisma.joke.create({
      data: {
        username: username,
        content: content,
      },
    });
    console.log(joke);

    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const webhookData = {
          content: `**Nouvelle blague de @${username}**\n${content}`,
          username: "JokeOffice",
        };

        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        });
      } catch (error) {
        console.error("Error sending to Discord:", error);
      }
    }

    return joke;
  }

  try {
    const joke = await addJoke();
    await prisma.$disconnect();
    return new Response(
      JSON.stringify({ message: "Joke added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding joke:", error);
    await prisma.$disconnect();
    return new Response(JSON.stringify({ message: "Error adding joke" }), {
      status: 500,
    });
  }
}
