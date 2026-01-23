const apiKey = import.meta.env.VITE_GROQ_API_KEY;

if (!apiKey) {
  console.error("Groq API key missing");
} else {
  console.log("✅ Groq API key loaded");
}

export const getGeminiReply = async (message) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",

          // ⭐ THIS IS THE MOST IMPORTANT PART
          messages: [
            {
              role: "system",
              content: `
You are an AI chatbot for a real estate website.

Rules:
- Answer ONLY real estate related questions.
- Topics allowed: properties, flats, plots, prices, locations,
  amenities, site visits, booking, loans, contact details.
- Keep answers short, clear, and professional.
- If user asks something unrelated (coding, politics, movies, etc),
  politely say you can help only with real estate queries.
- Do NOT answer general knowledge questions.
`
            },
            {
              role: "user",
              content: message
            }
          ],

          temperature: 0.5,
          max_tokens: 300
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return (
      data?.choices?.[0]?.message?.content ||
      "Sorry, I can help only with real estate related questions."
    );
  } catch (error) {
    console.error("Groq API error:", error);
    return "AI temporarily unavailable.";
  }
};
