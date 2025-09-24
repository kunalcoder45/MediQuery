```markdown
# 🩺 MediQuery

**MediQuery** is a full-stack medical assistant web app that allows users to:
- Search for nearby medical stores based on location (manual input or GPS).
- Get medicine suggestions based on entered symptoms.
- Works without Google Maps — uses OpenStreetMap (Nominatim + Overpass API).

## 🔗 Live Demo

🌐 Frontend: [https://mediquery.vercel.app](https://mediquery.vercel.app)  
⚙️ Backend: [https://mediquery-server.onrender.com](https://mediquery-server.onrender.com)

---

## 🚀 Features

- 📍 Location-based search for pharmacies using OpenStreetMap.
- 📦 Intelligent medicine suggestions via Google Custom Search API.
- 🔐 CORS-enabled and RESTful APIs.
- ⚡ Fast, mobile-friendly UI using modern stack (Next.js, Tailwind).

---

## 🛠️ Tech Stack

| Frontend          | Backend         | APIs Used                 |
|------------------|----------------|---------------------------|
| Next.js (App dir) | Node.js, Express | OpenStreetMap Nominatim API |
| Tailwind CSS      | node-fetch     | Overpass API              |
| Vercel (Hosting)  | Render (Hosting) | Google Custom Search API (optional) |

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kunalcoder45/MediQuery.git
cd MediQuery
````

### 2. Start the Backend (Server)

```bash
cd server
npm install
node server.js
```

> Make sure PORT 3000 is free and you are connected to the internet.

### 3. Start the Frontend (Client)

```bash
cd ../client
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

### Backend (Render)

1. Push `server/` to a separate GitHub repo.
2. Go to [Render](https://render.com), create a new Web Service.
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Add environment: `PORT = 3000`

### Frontend (Vercel)

1. Push `client/` to GitHub.
2. Go to [Vercel](https://vercel.com), import the repo.
3. Add `.env` variable:

   ```bash
   NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com
   ```
4. Add `vercel.json` for SPA routing:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```

---

## 📬 API Reference

### POST `/api/medical-stores`

**Body:**

```json
{
  "location": "ranchi"
}
```

**Response:**

```json
{
  "stores": [
    {
      "id": 123456,
      "name": "Health Pharmacy",
      "phone": "N/A",
      "lat": "23.3441",
      "lon": "85.3096"
    },
    ...
  ]
}
```

---

## 🧠 Future Improvements

* Add medicine detail pages.
* Save user search history.
* Support user authentication (login/signup).
* Use AI for smarter symptom analysis.

---

## 👨‍💻 Author

Made with ❤️ by [@kunalcoder45](https://github.com/kunalcoder45)

## 📄 License

This project is licensed under the MIT License.

```

---

Let me know if you want this in **Hindi**, or want badges, images, or setup scripts added!
```
