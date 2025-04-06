``` mermaid
sequenceDiagram
  actor mark
  participant browser
  participant server

  mark ->> browser: Enters "I am Mark" into HTML form and clicks save
  activate browser

  Note left of browser: JavaScript executes:
  Note left of browser: 1. e.preventDefault()<br/>2. Add note to local `notes` array<br/>3. Update DOM immediately (optimistic update)
  browser ->> browser: DOM shows "I am Mark" instantly

  browser ->> server: POST /exampleapp/new_note_spa (JSON payload)
  activate server
  Note right of server: Server appends note to data.json
  server -->> browser: HTTP 201 (Created)
  deactivate server

  browser -->> mark: UI already shows "I am Mark"<br/>before server responded
  deactivate browser
  
```
