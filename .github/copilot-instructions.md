# Project Setup Checklist

- [x] Verify workspace guidance exists in `.github/copilot-instructions.md`.
- [x] Clarify requirements: Node.js, Express, HTML, CSS, and vanilla JavaScript.
- [x] Scaffold the Random Quote Generator in the current workspace.
- [x] Implement the frontend and both quote API endpoints.
- [x] Install dependencies and run the automated tests.
- [x] No additional VS Code extensions are required.
- [x] No build task is needed; use the npm scripts in `package.json`.
- [x] Launch the app at `http://localhost:3000`.
- [x] Document setup and API usage in `README.md`.

## Project Notes

- Run `npm install`, then `npm start` to launch the app.
- Run `npm test` to validate the Express endpoints and homepage.
- Quote data is defined in `server.js`; no database or quote service is used.
- Keep frontend assets in `public/` and API tests in `test/`.