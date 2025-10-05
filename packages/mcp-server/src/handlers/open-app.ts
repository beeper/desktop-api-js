toMCPResponse: (output, input) => {
  const lines: string[] = []
  if (output.success) {
    lines.push('Beeper was opened.')
    if (input?.chatID) {
      const chatRef = String(input.chatID)
      lines.push(`Focused chat: ${chatRef}`)
    }
    if (input?.draftText) lines.push(`Draft text populated: ${input.draftText}`)
    if (input?.draftAttachmentPath) lines.push(`Draft attachment populated: ${input.draftAttachmentPath}`)
  } else {
    lines.push('Failed to open Beeper.')
  }
  return { content: [{ type: 'text', text: lines.join('\n') }] }
},