# NextJS + Express CRUD Assignment (Dockerized)

This is a full-stack CRUD application built with **Next.js (Frontend)** and **Node.js + Express + MongoDB (Backend)** using **MongoDB Atlas** and Dockerized for local or production deployment.

---

## 📦 Features

- ✅ Next.js frontend with form validation using Zod
- ✅ Express.js backend using Mongoose
- ✅ MongoDB Atlas integration
- ✅ Docker support for local development

---

## 🔧 Setup

### 1. Clone the Repository

```bash
git clone https://github.com/krish0564/NextJS-Assignent.git
cd NEXTJS-Assignment-main
```

### 2. Environment Variables

Create a `.env` file in the root with:

```bash
MONGO_URI=mongodb+srv://krishnasureka0551:<password:IrtT1BynJIEDVTzS>@cluster0.gl5fbsb.mongodb.net/UserAssignment?retryWrites=true&w=majority&appName=Cluster0


```

---

## 🚀 Run with Docker Compose

```bash
docker-compose up --build
```

- Frontend runs at: [http://localhost:3000](http://localhost:3000)
- Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 🧪 Development (without Docker)

```bash
# In ./Backend
npm install
npm run start

# In ./Frontend
npm install
npm run dev
```

## 📁 Folder Structure

```
.
├── Backend         # Express + Mongoose backend
├── Frontend        # Next.js frontend
├── docker-compose.yml
├── README.md
```
