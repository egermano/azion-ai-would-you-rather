const themes = ["Plataforma da Azion", "Cyber Security", "Web Development"];

const mainPrompt = `Gere um dilema "Would you rather" em PT-BR. Responda JSON com optionA, optionB, theme, difficulty. Evite conteúdo sensível. 
   Se respeitar o tema informado.
   Se respeitar a dificuldade informada.
   Responda apenas o JSON, sem nenhuma notação extra ou texto que não seja a resposta em JSON.
  `;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

async function handleRequest(event) {
  const { request, args } = event;

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: CORS_HEADERS
    });
  }

  const theme = themes[Math.floor(Math.random() * themes.length)];
  const difficulty = "easy";

  console.log("[simple-ai-would-you-rather]", request, args);

  const modelResponse = await Azion.AI.run(
    "Qwen/Qwen3-30B-A3B-Instruct-2507-FP8",
    {
      stream: false,
      messages: [
        {
          role: "system",
          content: mainPrompt,
        },
        {
          role: "user",
          content: `Tema: ${theme}. Dificuldade: ${difficulty}.`,
        },
      ],
    }
  );

  console.log("[simple-ai-would-you-rather]", modelResponse);

  return new Response(JSON.stringify(modelResponse), {
    status: 200,
    headers: { 
      "Content-Type": "application/json",
      ...CORS_HEADERS
    },
  });
}

// For Edge Firewall functions, use 'firewall' instead of 'fetch' in the addEventListener.

addEventListener("fetch", (event) => {
  try {
    return event.respondWith(handleRequest(event));
  } catch (e) {
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        ...CORS_HEADERS
      },
    });
  }
});
