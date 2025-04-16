const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { mood } = JSON.parse(event.body || "{}");

  const prompt = `
You are a poetic color oracle. Generate a 5-color CSS palette for the mood: "${mood}". 

Respond only in this exact format:
[
  { "name": "MistyRose", "hex": "#FFE4E1" },
  { "name": "LavenderBlush", "hex": "#FFF0F5" },
  { "name": "Thistle", "hex": "#D8BFD8" },
  { "name": "LightSteelBlue", "hex": "#B0C4DE" },
  { "name": "HoneyDew", "hex": "#F0FFF0" }
]
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.85,
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "[]";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: content,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
