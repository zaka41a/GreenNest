# 🚀 Quick Start Guide - GreenNest

## ⚡ Fast Setup (5 minutes)

### Prerequisites Check
```bash
node --version  # Should be >= 16
npm --version
mongod --version  # Should be >= 5.0
```

### 1. Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Seed database with plants & admin user
npm run seed

# Start backend server
npm run dev
```

✅ Backend running on `http://localhost:5000`

### 3. Frontend Setup

**Open new terminal:**

```bash
# From project root
npm install

# Start frontend
npm run dev
```

✅ Frontend running on `http://localhost:5173`

### 4. Test the Application

1. Open `http://localhost:5173`
2. Click "Login"
3. Use admin credentials:
   - **Email:** `admin@greennest.com`
   - **Password:** `admin123`
4. Navigate to **Admin** dashboard
5. Try adding/editing a plant
6. Browse **Products** page
7. Add items to **Cart**

## 📦 Available Scripts

### Backend (`/backend`)
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend (root)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Make sure MongoDB is running
```bash
brew services start mongodb-community  # macOS
```

### Port Already in Use
```
Error: Port 5000 is already in use
```

**Solution:** Kill the process or change port in `.env`
```bash
lsof -ti:5000 | xargs kill -9  # macOS/Linux
```

### CORS Errors
Make sure backend is running on port 5000 and frontend `.env` has:
```
VITE_API_URL=http://localhost:5000/api
```

### Cannot Login
Make sure you've seeded the database:
```bash
cd backend
npm run seed
```

## 🎯 API Testing

### Test with cURL

**Get all plants:**
```bash
curl http://localhost:5000/api/plants
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@greennest.com","password":"admin123"}'
```

### Test with Postman

Import this collection:
```json
{
  "info": { "name": "GreenNest API" },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"admin@greennest.com\",\"password\":\"admin123\"}"
        },
        "url": "http://localhost:5000/api/auth/login"
      }
    }
  ]
}
```

## 📝 Default Test Accounts

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | `admin@greennest.com` | `admin123` | Full access + Admin dashboard |

## 🌱 Sample Plants

After seeding, you'll have 6 plants:
- Snake Plant ($24.99) - Air-Purifying
- Peace Lily ($29.99) - Air-Purifying
- ZZ Plant ($34.50) - Low-Light
- Golden Pothos ($19.99) - Low-Light
- Parlor Palm ($22.00) - Pet-Friendly
- Calathea ($31.00) - Pet-Friendly

## 🔄 Reset Database

To start fresh:
```bash
cd backend
mongo greennest --eval "db.dropDatabase()"
npm run seed
```

## 📚 Next Steps

- Read full [README.md](./README.md) for detailed documentation
- Explore API endpoints at `http://localhost:5000/api`
- Check out the Admin dashboard at `/admin`
- Try creating custom plants!

---

**Need help?** Open an issue on GitHub or email zaksab98@gmail.com
