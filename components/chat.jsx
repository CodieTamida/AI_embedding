import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am here to help with your AI 481 class!",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "Codie Tamida",
      direction: "outgoing",
    };
  };
}
