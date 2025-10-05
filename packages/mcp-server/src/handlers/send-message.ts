toMCPResponse: (output, input, ctx) => {
  const lines: string[] = []
  if (output.success) {
    const deeplink = ctx?.apiBaseURL ? createOpenLink(ctx.apiBaseURL, input?.chatID ?? '') : undefined
    if (deeplink) lines.push(`**Open the chat in Beeper**: ${deeplink}`)
  } else {
    lines.push('Failed to send message.')
  }
  return { content: [{ type: 'text', text: lines.join('\n') }] }
},