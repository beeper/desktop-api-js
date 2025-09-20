# Beeper Desktop API MCP Server

> **⚠️ Warning: Work in Progress**
>
> This project is work in progress and should not be used.
> Please use the built-in MCP server Beeper Desktop comes with for now.
>
> We plan to migrate the built-in server to this package soon.
>
> [Learn more about the built-in Beeper Desktop MCP server here.](https://developers.beeper.com/desktop-api/mcp/)

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export BEEPER_ACCESS_TOKEN="My Access Token"
npx -y @beeper/desktop-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "beeper_desktop_api_api": {
      "command": "npx",
      "args": ["-y", "@beeper/desktop-mcp", "--client=claude", "--tools=all"],
      "env": {
        "BEEPER_ACCESS_TOKEN": "My Access Token"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations
- `--tag` includes a set of endpoints with custom tags provided

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ----------------------- | ------------------------ | --------------- |
| `x-beeper-access-token` | `accessToken` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "beeper_desktop_api_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "@beeper/desktop-mcp/server";

// import a specific tool
import getAccounts from "@beeper/desktop-mcp/tools/accounts/get-accounts";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [getAccounts, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `accounts`:

- `get_accounts` (`read`) tags: [accounts]: List connected accounts on this device. Use to pick account context.

### Resource `app`:

- `open_in_app` (`write`) tags: [app]: Open Beeper Desktop and optionally navigate to a specific chat, message, or pre-fill draft text and attachment.
- `search` (`read`) tags: [app]: Search for chats, participant name matches in groups, and the first page of messages in one call. Use this when the user asks for a specific chat, group, or person.

### Resource `chats`:

- `get_chat` (`read`) tags: [chats]: Get chat details: metadata, participants (limited), last activity.
- `archive_chat` (`write`) tags: [chats]: Archive or unarchive a chat.
- `search_chats` (`read`) tags: [chats]: Search chats by title/network or participants using Beeper Desktop's renderer algorithm. Optional 'scope'.

### Resource `chats.reminders`:

- `set_chat_reminder` (`write`) tags: [chats]: Set a reminder for a chat at a specific time.
- `clear_chat_reminder` (`write`) tags: [chats]: Clear a chat reminder.

### Resource `messages`:

- `search_messages` (`read`) tags: [messages]: Search messages across chats using Beeper's message index.
  - When to use: find messages by text and/or filters (chatIDs, accountIDs, chatType, media type filters, sender, date ranges).
  - CRITICAL: Query is LITERAL WORD MATCHING, NOT semantic search! Only finds messages containing these EXACT words.
    • ✅ RIGHT: query="dinner" or query="sick" or query="error" (single words users type)
    • ❌ WRONG: query="dinner plans tonight" or query="health issues" (phrases/concepts)
    • The query matches ALL words provided (in any order). Example: query="flight booking" finds messages with both "flight" AND "booking".
  - Performance: provide chatIDs/accountIDs when known. Omitted 'query' returns results based on filters only. Partial matches enabled; 'excludeLowPriority' defaults to true.
  - Workflow tip: To search messages in specific conversations: 1) Use find-chats to get chatIDs, 2) Use search-messages with those chatIDs.
  - IMPORTANT: Chat names vary widely. ASK the user for clarification:
    • "Which chat do you mean by family?" (could be "The Smiths", "Mom Dad Kids", etc.)
    • "What's the name of your work chat?" (could be "Team", company name, project name)
    • "Who are the participants?" (use scope="participants" in search-chats)
    Returns: matching messages and referenced chats.
- `send_message` (`write`) tags: [messages]: Send a text message to a specific chat. Supports replying to existing messages. Returns the sent message ID and a deeplink to the chat
