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
      console.log("Webhook URL trouvée, tentative d'envoi...");
      try {
        const webhookData = {
          content: `${content}`,
          username: `${username}`,
        };

        console.log("Données du webhook:", webhookData);

        const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(webhookData),
        });

        console.log("Réponse du webhook:", response.status, response.statusText);
        const responseData = await response.text();
        console.log("Contenu de la réponse:", responseData);

      } catch (error) {
        console.error("Erreur détaillée lors de l'envoi vers Discord:", error);
      }
    } else {
      console.log("Aucune URL de webhook trouvée dans les variables d'environnement");
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
