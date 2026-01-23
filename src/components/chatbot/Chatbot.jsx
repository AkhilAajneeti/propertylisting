import { useEffect, useRef, useState } from "react";
import SparkleIcon from "./SparkleIcon";

import { getGeminiReply } from "../../api/hfChat.js";
export default function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Welcome to Jenika Ventures" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // const sendMessage = () => {
  //   if (!input.trim()) return;

  //   setMessages(m => [...m, { from: "user", text: input }]);
  //   setInput("");
  //   setTyping(true);

  //   // Fake bot response (UI demo)
  //   setTimeout(() => {
  //     setTyping(false);
  //     setMessages(m => [
  //       ...m,
  //       { from: "bot", text: "This is a sample AI response." }
  //     ]);
  //   }, 1500);
  // };
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((m) => [...m, { from: "user", text: input }]);
    setInput("");
    setTyping(true);

    const reply = await getGeminiReply(input);

    setTyping(false);
    setMessages((m) => [...m, { from: "bot", text: reply }]);
  };
  if (!isOpen) return null;

  return (
    <div className="chatbot-box">
      {/* Header */}
      <div className="chatbot-header">
        <div className="title">
          <SparkleIcon /> AI Assist
        </div>
        <button onClick={onClose}>✕</button>
      </div>

      {/* Messages */}
      <div className="chatbot-body">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.from}`}>
            {msg.text}
          </div>
        ))}

        {typing && (
          <div className="bubble bot typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chatbot-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}
