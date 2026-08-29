import ChatMessage from "./ChatMessage";

import { useHibaChat } from "../hooks/useHibaChat";

import "../styles/HibaChat.css";

function HibaChat() {
  const {
    question,
    messages,
    loading,
    error,
    handleQuestionChange,
    handleAsk,
    handleKeyDown,
    clearMessages,
  } = useHibaChat();

  return (
    <div className="chat-page">
      <div className="chat-container">

        <header className="chat-header">
          <div className="header-left">
            <div className="header-avatar">
              H
            </div>

            <div>
              <h1>
                Hiba AI Assistant
              </h1>

              <p>
                Your personal AI assistant for Hiba
              </p>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              className="clear-button"
              onClick={clearMessages}
            >
              Clear Chat
            </button>
          )}
        </header>

        <main className="messages-container">

          {messages.length === 0 ? (
            <div className="welcome-section">

              <div className="welcome-icon">
                ✨
              </div>

              <h2>
                Ask me about Hiba
              </h2>

              <p>
                I can answer questions about
                Hiba's family, preferences,
                activities and travels.
              </p>

              <div className="suggestion-list">

                <div className="suggestion">
                  Where has Hiba travelled?
                </div>

                <div className="suggestion">
                  What food does Hiba like?
                </div>

                <div className="suggestion">
                  Who are Hiba's parents?
                </div>

              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))
          )}

          {loading && (
            <div className="message-row message-row-assistant">
              <div className="message-avatar">
                H
              </div>

              <div className="message-bubble assistant-message">
                Thinking...
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              Something went wrong.
              Please try again.
            </div>
          )}

        </main>

        <footer className="chat-footer">

          <div className="input-container">

            <input
              value={question}
              placeholder="Ask something about Hiba..."
              onChange={(event) =>
                handleQuestionChange(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={() =>
                void handleAsk()
              }
              disabled={
                loading ||
                !question.trim()
              }
            >
              {loading
                ? "..."
                : "Ask"}
            </button>

          </div>

          <div className="technology-text">
            Powered by LangChain • RAG • OpenAI
          </div>

        </footer>

      </div>
    </div>
  );
}

export default HibaChat;