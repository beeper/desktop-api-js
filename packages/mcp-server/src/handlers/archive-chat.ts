toMCPResponse: (output, input) => {
  const lines: string[] = []
  lines.push('# Archive Chat')
  if (output.success) {
    lines.push(`Chat ${input?.chatID} ${input?.archived === false ? 'unarchived' : 'archived'}.`)
  } else {
    lines.push('Failed to update archive state.')
  }
  lines.push('\n# Using this information\n')
  lines.push('- Use search_chats to verify the chat moved to the expected inbox.')
  return { content: [{ type: 'text', text: lines.join('\n') }] }
},