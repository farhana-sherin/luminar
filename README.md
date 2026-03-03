# 🚀 Luminar Full Stack Project

A full-stack web application built using:

* ⚛️ React (Vite) – Frontend
* 🐍 Django – Backend API
* 🔗 REST API Architecture

This project follows a scalable folder structure suitable for production-level applications.

---

# 📁 Project Structure

```
project-root/
│
├── backend/              # Django Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── apps/
│   └── core settings
│
├── frontend/             # React Frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── Layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

# 🐍 Backend Setup (Django)

## 1️⃣ Navigate to backend

```
cd backend
```

## 2️⃣ Create Virtual Environment

```
python -m venv venv
```

Activate:

### Windows

```
venv\Scripts\activate
```

### Mac/Linux

```
source venv/bin/activate
```

## 3️⃣ Install Dependencies

```
pip install -r requirements.txt
```

## 4️⃣ Run Migrations

```
python manage.py migrate
```

## 5️⃣ Run Backend Server

```
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

# ⚛️ Frontend Setup (React + Vite)

## 1️⃣ Navigate to frontend

```
cd frontend
```

## 2️⃣ Install Dependencies

```
npm install
```

## 3️⃣ Run Development Server

```
npm run dev
```

Frontend runs at:

```
http://localhost:5173/
```

---

# 🛣️ Routing

Routing is handled using:

* `react-router-dom`
* `createBrowserRouter`
* Layout-based nested routes

Router configuration is located in:

```
src/routes/router.jsx
```

---

# 🔐 Future Enhancements

* Authentication (JWT)
* Protected Routes
* API Integration with Axios
* Role-based Access
* Production Deployment (Nginx + Gunicorn)

---

# 🧠 Tech Stack Summary

| Layer    | Technology       |
| -------- | ---------------- |
| Frontend | React + Vite     |
| Routing  | React Router DOM |
| Backend  | Django           |
| Database | SQLite (default) |

---

# 📌 Development Notes

* Frontend and Backend run separately.
* Ensure backend runs before connecting APIs.
* Environment variables should be added later for production.

---

# 👩🏻‍💻 Author

Built as part of Luminar Full Stack Development Training.

---

# 📜 License

For educational purposes.
