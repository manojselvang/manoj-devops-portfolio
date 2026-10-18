# Manoj Selvan G — DevOps Portfolio

A full-stack personal portfolio built with React + Vite and Java + Spring Boot. This is the **application repository**, kept separate from the CI/CD infrastructure project.

## Stack
- Frontend: React, Vite, CSS
- Backend: Java 17+, Spring Boot, Maven
- Containerization: separate Dockerfiles for frontend and backend
- Content: backend API returns portfolio profile, skills, projects, experience, health, and version data
- Future hosting: frontend can be deployed to Vercel; the Spring Boot backend must be hosted separately (for example, AWS or another Java-capable host)

## Repository layout
```text
manoj-devops-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
├── backend/
│   ├── src/main/java/com/portfolio/
│   ├── src/main/resources/
│   ├── src/test/java/com/portfolio/
│   ├── pom.xml
│   └── Dockerfile
└── .gitignore
```

## Run locally

### Backend
Requires Java 17+ and Maven.

```bash
cd backend
mvn spring-boot:run
```

Backend default URL: `http://localhost:8080`

Try:
- `http://localhost:8080/api/profile`
- `http://localhost:8080/api/projects`
- `http://localhost:8080/api/skills`
- `http://localhost:8080/api/experience`
- `http://localhost:8080/api/health`
- `http://localhost:8080/api/version`

### Frontend
Requires Node.js 20+.

```bash
cd frontend
npm install
npm run dev
```

Frontend default URL: `http://localhost:5173`. Vite proxies `/api` requests to the backend at `http://localhost:8080`.

## Docker
Build from the repository root:

```bash
docker build -t manojselvang/portfolio-backend:local ./backend
docker build -t manojselvang/portfolio-frontend:local ./frontend
```

Run the backend:

```bash
docker run --rm -p 8080:8080 manojselvang/portfolio-backend:local
```

Run the frontend container:

```bash
docker run --rm -p 8081:80 manojselvang/portfolio-frontend:local
```

The NGINX container proxies `/api/` to `portfolio-backend:8080` only when that hostname is resolvable on the same Docker network. For local testing, use the Vite dev server or create a Docker network and run the backend with the alias `portfolio-backend`.

## Notes
- Update the LinkedIn, GitHub, email, and resume links in `frontend/src/App.jsx` before publishing.
- Experience and education information is based on the profile documents provided for this project. Review dates and wording before making the repository public.
- The pipeline animation is a UI demonstration, not live Jenkins telemetry.
- Keep Jenkinsfile, Kubernetes manifests, AWS infrastructure, and deployment automation in your **separate CI/CD project repository**.
