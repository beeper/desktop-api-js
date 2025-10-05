toMCPResponse: (output, input) => {
  const lines: string[] = []
  lines.push('# Set Reminder')
  if (output.success) {
    lines.push(`Reminder set for chat ${input?.chatID} at ${input?.reminder?.remindAtMs}.`)
  } else {
    lines.push('Failed to set reminder.')
  }
  lines.push('\n# Using this information\n')
  lines.push('- Use clear_chat_reminder to remove it later.')
  return { content: [{ type: 'text', text: lines.join('\n') }] }
},