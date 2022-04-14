# Broken App Issues
- Changed 'let' and 'var' to const
- Not converting to incoming requests as JSON
    - `app.use(express.json());` line 6
- Created own error handling with *expressError.js*
- Middleware to parse JSON
- Passed error to *next*
- Should use res.json, not res.send
