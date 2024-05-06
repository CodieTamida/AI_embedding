"use client";
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
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am here to help with your AI 481 class!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "Codie Tamida",
      direction: "outgoing",
    };
    // const newMessages = [...messages, newMessage];
    // setMessages(newMessages);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log(messages);

    try {
      const response = await fetch("http://0.0.0.0:8001/api/About", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message }),
      });
      console.log("This is printing:", message);

      if (!response.ok) {
        throw new Error("Failed to send message", message);
      }
      const data = await response.json();
      // console.log("Here is the data:", data);
      // console.log("Response:", data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.response.response,
          sender: "ChatGPT",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Failed to send messaged:", error);
    }
    setTyping(false);
  };
  return (
    <div className="App">
      <div style={{ position: "relative", height: "600px", width: "700px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                typing ? (
                  <TypingIndicator content="You're helper is typing..." />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
