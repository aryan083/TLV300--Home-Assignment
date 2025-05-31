# WHOIS Lookup Application

A modern, full-stack WHOIS lookup tool built with React and Express.js that provides comprehensive domain information and contact details using WhoisXMLAPI.

## 🌐 Live Demo

- **Frontend**: https://tlv-300-home-assignment.vercel.app/
- **Backend API**: https://tlv300-home-assignment.onrender.com

## 🚀 Features

- **Domain Information Lookup**: Get registrar details, registration/expiration dates, domain age, and name servers
- **Contact Information Lookup**: Retrieve registrant, technical, and administrative contact information
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Validation**: Client-side domain validation with immediate feedback
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript, Tailwind CSS, Vite (Hosted on Vercel)
- **Backend**: Node.js with Express.js, WhoisXMLAPI integration (Hosted on Render)
- **Development**: Hot reload, CORS enabled, comprehensive logging

## 📋 Prerequisites for Local Development

- **Node.js** v16.x or higher
- **npm** package manager
- **WhoisXMLAPI key** (free account at [WhoisXMLAPI](https://whoisxmlapi.com/))

## 🚀 Running Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TLV300--Home-Assignment
```

### 2. Setup Backend

Navigate to backend directory:
```bash
cd Backend
```

Install dependencies:
```bash
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit the `.env` file and add your WhoisXMLAPI key:
```
WHOIS_API_KEY=your_whois_api_key_here
NODE_ENV=development
PORT=5000
LOG_LEVEL=debug
```

**Get Your API Key:**
1. Visit [WhoisXMLAPI](https://whoisxmlapi.com/)
2. Sign up for a free account
3. Go to your dashboard and copy your API key
4. Paste it in the `.env` file

Start the backend server:
```bash
npm run dev
```

The backend will be running at: http://localhost:5000

### 3. Setup Frontend

Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will be running at: http://localhost:3000

### 4. Verify Setup

- **Frontend**: Open http://localhost:3000 in your browser
- **Backend Health Check**: Visit http://localhost:5000/health
- **API Test**: http://localhost:5000/api/whois?domain=google.com&type=domain

## 🎯 How to Use

1. **Enter Domain**: Type any domain name (e.g., `google.com`, `amazon.com`)
2. **Select Lookup Type**: 
   - **Domain Information**: Get registrar, dates, name servers
   - **Contact Information**: Get registrant, admin, technical contacts
3. **Click "Lookup Domain"**: View comprehensive WHOIS data
4. **View Results**: See formatted domain or contact details

### Demo Domains to Try
- `amazon.com` - Full domain data available
- `google.com` - Another example with complete information
- `github.com` - Tech company domain
- `microsoft.com` - Large corporation domain

## 🧪 Running Tests

**Backend Tests:**
```bash
cd Backend
npm test
```


**Run Tests with Coverage:**
```bash
# Backend
cd Backend
npm run test:coverage

```

## 🏗 Project Structure

```
whois-lookup-app/
├── Backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # API request handlers
│   │   ├── services/        # WhoisXMLAPI integration
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Validation & error handling
│   │   └── utils/           # Logging and utilities
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API communication layer
│   │   ├── config/         # Configuration files
│   │   └── App.tsx         # Main application component
│   ├── package.json
│   └── vite.config.ts      # Vite configuration
└── README.md
```

## 🔧 API Endpoints

**Base URL (Local)**: http://localhost:5000
**Base URL (Production)**: https://tlv300-home-assignment.onrender.com

### GET /api/whois
Retrieve WHOIS information for a domain.

**Parameters:**
- `domain` (required): The domain name to lookup
- `type` (required): Either "domain" or "contact"

**Example Request:**
```
GET /api/whois?domain=example.com&type=domain
```

### GET /health
Check backend server status.

**Example Request:**
```
GET /health
```

## 🐛 Troubleshooting

### Backend Issues

**Backend won't start:**
- Check if `.env` file exists in Backend directory
- Verify WHOIS_API_KEY is set in `.env` file
- Ensure port 5000 is not in use by another application

**API key errors:**
- Make sure you copied the complete API key from WhoisXMLAPI
- Check for extra spaces or characters in the `.env` file
- Verify your WhoisXMLAPI account is active and has quota remaining

**Port already in use:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Frontend Issues

**Frontend can't connect to backend:**
- Verify backend is running at http://localhost:5000/health
- Check browser console for CORS or network errors
- Ensure both servers are running simultaneously

**Port 3000 already in use:**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Module not found errors:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### General Issues

**Dependencies issues:**
- Delete `node_modules` and `package-lock.json` in both directories
- Run `npm install` again in both Backend and frontend directories
- Ensure you're using Node.js v16 or higher

**API quota exceeded:**
- Check your WhoisXMLAPI dashboard for quota usage
- Free accounts have limited requests per month
- Consider upgrading your WhoisXMLAPI plan if needed

## 🔍 Development Tips

**View detailed backend logs:**
```bash
cd Backend
DEBUG=* npm run dev
```

**Test API directly:**
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test WHOIS lookup
curl "http://localhost:5000/api/whois?domain=google.com&type=domain"
```

**Frontend debugging:**
- Open browser developer tools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for API request/response details
- Look for CORS errors in the console

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



**Need Help?** 
- Check the troubleshooting section above
- Open an issue on GitHub
- Test the live demo first: https://tlv-300-home-assignment.vercel.app/

**Happy coding!**
