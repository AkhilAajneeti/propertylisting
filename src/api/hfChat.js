const chatbotApi = import.meta.env.VITE_CHATBOT_API;

if (!chatbotApi) {
  console.error("Chatbot API missing");
}

export const getGeminiReply = async (message) => {
  try {
    const response = await fetch(chatbotApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || "AI unavailable";
  } catch (error) {
    console.error("Chatbot error:", error);
    return "AI temporarily unavailable.";
  }
};




