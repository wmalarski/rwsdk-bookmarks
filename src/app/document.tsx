import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>@redwoodjs/starter-standard</title>
      <link href="/src/client.tsx" rel="modulepreload" />
      <link href={styles} rel="stylesheet" />
    </head>
    <body>
      <div className="dark" id="root">
        {children}
      </div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
