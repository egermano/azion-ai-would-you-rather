import { createClient } from "azion/ai";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono Azion!"));

const mainPrompt = `Gere um dilema "Would you rather" em PT-BR. Responda JSON com optionA, optionB, theme, difficulty. Evite conteúdo sensível. 
   Se respeitar o tema informado.
   Se respeitar a dificuldade informada.
   Responda apenas o JSON, sem nenhuma notação extra ou texto que não seja a resposta em JSON.
  `;

const themes = [
  "Plataforma da Azion",
  "Desenvolvimento",
  "Marketing",
  "Design",
  "Marketing",
];

app.get("/chat", async (c) => {
  const theme = c.req.query("theme") || "Plataforma da Azion";
  const difficulty = c.req.query("difficulty") || "easy";

  const client = createClient({
    token: process.env.AZION_TOKEN,
  });

  const response = await client.chat({
    messages: [
      {
        role: "user",
        content: mainPrompt,
      },
      { role: "user", content: `Tema: ${theme}. Dificuldade: ${difficulty}.` },
    ],
    stream: false,
  });

  return c.json(response.data);
});

app.fire();
