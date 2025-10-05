toMCPResponse: (output, input, ctx) => {
  const lines: string[] = []
  if (input?.query) lines.push(`Query: "${input.query}"`)
  const results = output?.results
  if (results?.chats?.length) {
    lines.push('\n# Chats')
    for (const chat of results.chats) lines.push(...formatChatToMarkdown(chat, ctx?.apiBaseURL))
  }
  if (results?.in_groups?.length) {
    lines.push('\n# In Groups')
    for (const chat of results.in_groups) lines.push(...formatChatToMarkdown(chat, ctx?.apiBaseURL))
  }
  if (results?.messages?.items?.length) {
    lines.push('\n# Messages')
    lines.push(mapMessagesToText(results.messages, input, ctx))
  }
  return { content: [{ type: 'text', text: lines.join('\n') }] }
},
