``` mermaid
sequenceDiagram
  actor mark
  participant browser

  mark ->> browser: The note ("I am Mark") into HTML form and click save

  participant server
  browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  Note left of server: The server gets the post request then updates data.json file on the server
  server -->> browser: Status code: 302 (URL redirect)
  deactivate server

  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: HTML document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: the css file
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server-->>browser: the JavaScript file
  deactivate server

  Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
  deactivate server

  Note right of browser: The browser executes the callback function that renders the notes and displays " I am Mark"

  browser -->> mark: "I am Mark"
  Note left of browser: "I am Mark" is displayed among the notes as the most recent note mark input.
```