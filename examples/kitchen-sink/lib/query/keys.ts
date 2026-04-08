export const queryKeys = {
  profilePrefix(profileID: string) {
    return ["profile", profileID] as const;
  },

  probe(profileID: string) {
    return ["profile", profileID, "probe"] as const;
  },

  accounts(profileID: string) {
    return ["profile", profileID, "accounts"] as const;
  },

  chats(profileID: string, filters: Record<string, unknown>) {
    return ["profile", profileID, "chats", filters] as const;
  },

  chat(profileID: string, chatID: string) {
    return ["profile", profileID, "chat", chatID] as const;
  },

  messages(profileID: string, chatID: string, pagingWindow: Record<string, unknown>) {
    return ["profile", profileID, "messages", chatID, pagingWindow] as const;
  },

  chatsSearch(profileID: string, params: Record<string, unknown>) {
    return ["profile", profileID, "chats-search", params] as const;
  },

  messagesSearch(profileID: string, params: Record<string, unknown>) {
    return ["profile", profileID, "messages-search", params] as const;
  },

  lab(profileID: string, operation: string, params: Record<string, unknown>) {
    return ["profile", profileID, "lab", operation, params] as const;
  },
};
