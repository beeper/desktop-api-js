toMCPResponse: (output, input) => {
  const lines: string[] = []
  lines.push('# Clear Reminder')
  if (output.success) {
    lines.push(`Reminder cleared for chat ${input?.chatID}.`)
  } else {
    lines.push('Failed to clear reminder.')
  }
  lines.push('\n# Using this information\n')
  lines.push('- You can set another reminder with set_chat_reminder.')
  return { content: [{ type: 'text', text: lines.join('\n') }] }
},