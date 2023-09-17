# Building a Resilient Chat Application with SSE, React, Redux, Express, TypeScript and Vite!

This is a chat application created as a small (yet fully functional) code example. Clients establish connections and receive new messages using the Server-Sent Events (SSE) protocol. For sending new messages and pinging, REST methods are employed since SSE does not support bidirectional communication.

Both the client and server are implemented in TypeScript. The server-side runs on Node.js and utilizes Express.

On the client-side, React, Redux, and CSS modules are utilized.

Please take note of the development environment setup using Vite. Vite was chosen for its ability to easily configure multiple entry points, including both the client and server components.

SSE (Server-Sent Events) was selected for its reliability. As it essentially establishes a simple GET connection, it functions across most web browsers. The downside is a limitation on the number of open connections, which is capped at just 6 across all tabs in your browser. However, for a basic example, this limitation is unlikely to pose any issues.
