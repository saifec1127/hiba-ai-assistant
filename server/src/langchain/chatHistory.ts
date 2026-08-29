type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const chatSessions = new Map<string, ChatMessage[]>();

function getOrCreateSession(
  sessionId: string
): ChatMessage[] {
  const existingHistory =
    chatSessions.get(sessionId);

  if (existingHistory) {
    return existingHistory;
  }

  const newHistory: ChatMessage[] = [];

  chatSessions.set(
    sessionId,
    newHistory
  );

  return newHistory;
}

export function addUserMessage(
  sessionId: string,
  content: string
) {
  const history =
    getOrCreateSession(sessionId);

  history.push({
    role: "user",
    content,
  });
}

export function addAssistantMessage(
  sessionId: string,
  content: string
) {
  const history =
    getOrCreateSession(sessionId);

  history.push({
    role: "assistant",
    content,
  });
}

export function getChatHistory(
  sessionId: string
) {
  return getOrCreateSession(sessionId);
}

export function formatChatHistory(
  sessionId: string
) {
  const history =
    getOrCreateSession(sessionId);

  return history
    .map((message) => {
      if (message.role === "user") {
        return `User: ${message.content}`;
      }

      return `Assistant: ${message.content}`;
    })
    .join("\n");
}

export function clearChatHistory(
  sessionId: string
) {
  chatSessions.delete(sessionId);
}