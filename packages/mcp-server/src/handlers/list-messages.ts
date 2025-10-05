toMCPResponse: (output, input, ctx) => {
  const lines: string[] = []
  lines.push('# Messages')

  const items = output.items || []
  const hasMore = !!output.hasMore

  if (hasMore) {
    lines.push(`\nShowing ${items.length} messages (more available)`)
    if (output.oldestCursor) {
      lines.push(`Next page (older): cursor='${output.oldestCursor}', direction='before'`)
    }
    if (output.newestCursor) {
      lines.push(`Previous page (newer): cursor='${output.newestCursor}', direction='after'`)
    }
  } else if (items.length > 0) {
    lines.push(`\nShowing ${items.length} message${items.length === 1 ? '' : 's'}`)
  }

  if (items.length === 0) {
    lines.push('\nNo messages found.')
  } else {
    lines.push(mapMessagesToText(output, input, ctx))
  }

  return { content: [{ type: 'text', text: lines.join('\n') }] }
},