    toMCPResponse: (output, input, ctx) => ({
      content: [
        {
          type: 'text' as const,
          text: mapMessagesToText(output, input, ctx),
        },
      ],
    }),