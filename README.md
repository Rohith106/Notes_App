<div align="center">
	<h1>🗒️ Notes Management Web App</h1>
	<p>Full-stack notes application with a React + Vite frontend and an Express backend using MySQL (migrated from MongoDB) and optional Upstash rate limiting.</p>
	<img src="frontend/public/vite.svg" alt="Logo" width="70" />
</div>

---

## 🚀 Features
- Create, read, update, and delete notes
- Clean, minimal backend structure (single–file server logic)
- MongoDB backend
- RESTful API under `/api/notes`
- TailwindCSS styled UI
- Environment-based configuration

## 🧱 Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Axios, TailwindCSS |
| Backend | Node.js, Express |
| Database | MongoDb |
| Tooling | Nodemon, dotenv |

## 📂 Project Structure
```
backend/
	package.json
	src/
		server.js            # Express app (CORS, routes)
		notesRoutes.js       # Notes routes
		notesController.js   # Controllers (request handling)
		notesModel.js       
frontend/
	package.json
	src/
		pages/               # Page components (Home, Create, Detail)
		components/          # Reusable UI pieces
		lib/axios.js         # Axios instance
		App.jsx / main.jsx   # App entry
```

## ⚙️ Environment Variables
Create `backend/.env`:
```
PORT=5001
MONGODB_URI
MONGO_DB_KEY

```
If you are not using rate limiting, you can remove the Upstash variables and comment out related code.

## 🗄️ Database Schema
Run this in MySQL:
```sql
CREATE DATABASE IF NOT EXISTS notes_app;
USE notes_app;

CREATE TABLE IF NOT EXISTS notes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get note by id |
| POST | `/api/notes` | Create new note (JSON: `{ title, content }`) |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Sample Create Request
```bash
curl -X POST http://localhost:5001/api/notes \
	-H "Content-Type: application/json" \
	-d '{"title":"Test","content":"Hello"}'
```

## 🖥️ Local Development
Backend:
```bash
cd backend
npm install
npm run dev
```
Frontend (new terminal):
```bash
cd frontend
npm install
npm run dev
```
Open: http://localhost:5173

## 🌐 CORS
The server currently allows:
```
http://localhost:5173
http://localhost:5174
```
Add more origins by editing `allowedOrigins` in `backend/src/server.js`.

## 🛡️ Rate Limiting
Implemented with Upstash sliding window (10 requests per 20 seconds). To disable, comment out:
```js
app.use(rateLimiter);
```
in `server.js`.

## 🔄 Migration Notes
Originally MongoDB + Mongoose. Now uses direct MySQL queries via `mysql2/promise`. No ORM layer. Each call gets a fresh connection (fine for small scale; for production consider a pool).

## 🧪 Potential Improvements
- Connection pooling with `mysql.createPool()`
- Add Jest tests for controllers/models
- Add Docker Compose for MySQL + App
- Add GitHub Actions CI
- Add auth (JWT) & user-specific notes

## 🐛 Troubleshooting
| Issue | Cause | Fix |
|-------|-------|-----|
| CORS blocked | Frontend on different port | Add port to `allowedOrigins` |
| Access denied MySQL | Wrong credentials | Check `.env` values |
| 500 errors on update/delete | Invalid `id` | Ensure frontend uses `note.id` |
| Rate limit 429 | Too many rapid requests | Increase window or disable limiter |

## 📜 License
Add a LICENSE file (MIT recommended) if you plan to open source.

---
Made with focus on simplicity and clarity. PRs welcome.
