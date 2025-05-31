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

## 📋 Prerequisites

- **Node.js** v16.x or higher
- **npm** package manager
- **WhoisXMLAPI key** (free account at [WhoisXMLAPI](https://whoisxmlapi.com/))
- **GitHub account** (for deployment)
- **Vercel account** (for frontend hosting)
- **Render account** (for backend hosting)

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

## 🌐 Deployment Guide

### Step 1: Prepare Your Code for Deployment

#### Push to GitHub
1. Create a new repository on GitHub
2. Push your local code to GitHub:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend to Render

#### 1. Create Render Account
- Go to [render.com](https://render.com)
- Click **"Get Started for Free"**
- Sign up using your GitHub account

#### 2. Connect GitHub Repository
- In Render dashboard, click **"New +"**
- Select **"Web Service"**
- Click **"Connect a repository"**
- Choose your GitHub repository from the list

#### 3. Configure Backend Service
Fill in the following settings:
- **Name**: `whois-backend` (or your preferred name)
- **Root Directory**: `Backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `node ./src/app.js`
- **Instance Type**: `Free` (or `Starter` for $7/month - no sleeping)

#### 4. Add Environment Variables
In the **Environment Variables** section, click **"Add Environment Variable"** and add:
- **Key**: `NODE_ENV`, **Value**: `production`
- **Key**: `PORT`, **Value**: `10000`
- **Key**: `WHOIS_API_KEY`, **Value**: `your_actual_whois_api_key`
- **Key**: `LOG_LEVEL`, **Value**: `info`

#### 5. Deploy Backend
- Click **"Create Web Service"**
- Wait for deployment (5-10 minutes)
- Once deployed, copy your backend URL: `https://your-service-name.onrender.com`

### Step 3: Deploy Frontend to Vercel

#### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Click **"Start Deploying"**
- Sign up using your GitHub account

#### 2. Import GitHub Repository
- In Vercel dashboard, click **"Add New..."**
- Select **"Project"**
- Click **"Import"** next to your GitHub repository

#### 3. Configure Frontend Project
- **Project Name**: `whois-lookup-app` (or your preferred name)
- **Framework Preset**: `Vite` (should auto-detect)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (should auto-fill)
- **Output Directory**: `dist` (should auto-fill)
- **Install Command**: `npm install` (should auto-fill)

#### 4. Add Environment Variables
- Click **"Environment Variables"**
- Add the following:
  - **Name**: `VITE_APP_API_URL`
  - **Value**: `https://your-backend-name.onrender.com` (your Render URL from Step 2)
  - **Environment**: Select all (Production, Preview, Development)

#### 5. Deploy Frontend
- Click **"Deploy"**
- Wait for deployment (2-5 minutes)
- Once deployed, copy your frontend URL: `https://your-app-name.vercel.app`

### Step 4: Update Backend CORS Configuration

#### 1. Update Render Environment Variables
- Go back to your Render dashboard
- Navigate to your backend service
- Go to **"Environment"** tab
- Click **"Add Environment Variable"**
- Add:
  - **Key**: `CORS_ORIGIN`
  - **Value**: `https://your-app-name.vercel.app` (your Vercel URL from Step 3)
- Click **"Save Changes"**

This will automatically redeploy your backend with the new CORS settings.

### Step 5: Test Your Deployment

#### 1. Test Backend
Visit your backend health endpoint:
```
https://your-backend-name.onrender.com/health
```

#### 2. Test Frontend
Visit your frontend URL:
```
https://your-app-name.vercel.app
```

#### 3. Test Full Application
1. Open your frontend URL
2. Enter a domain name (e.g., `google.com`)
3. Select lookup type and click "Lookup Domain"
4. Verify you receive WHOIS data

## 🔄 Updating Your Deployment

### Auto-Deploy Setup
Both Render and Vercel automatically redeploy when you push to your main branch:

```bash
# Make your changes
git add .
git commit -m "Update application"
git push origin main
```

- **Render**: Will automatically rebuild and redeploy backend
- **Vercel**: Will automatically rebuild and redeploy frontend

### Manual Redeploy
**Render:**
1. Go to your service dashboard
2. Click **"Manual Deploy"**
3. Select **"Deploy latest commit"**

**Vercel:**
1. Go to your project dashboard
2. Go to **"Deployments"** tab
3. Click **"Redeploy"** on latest deployment

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

### Local Development Issues

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

**Frontend can't connect to backend:**
- Verify backend is running at http://localhost:5000/health
- Check browser console for CORS or network errors
- Ensure both servers are running simultaneously

### Deployment Issues

**Render Backend Issues:**
- **Build Failed**: Check build logs in Render dashboard for missing dependencies or build errors
- **Service Won't Start**: Verify `package.json` has correct start script (`npm start`)
- **Environment Variables**: Ensure all required environment variables are set correctly
- **Service Sleeping**: Free tier services sleep after 15 minutes of inactivity (upgrade to Starter plan to avoid this)
- **Port Issues**: Render automatically assigns port via `PORT` environment variable

**Vercel Frontend Issues:**
- **Build Failed**: Check build logs in Vercel dashboard for TypeScript or build errors
- **Environment Variables**: Verify `VITE_APP_API_URL` is set correctly
- **Root Directory**: Ensure root directory is set to `frontend`
- **Build Command**: Should be `npm run build` for Vite projects

**CORS Errors in Production:**
- Verify `CORS_ORIGIN` in Render exactly matches your Vercel URL
- Check browser console for specific CORS error messages
- Ensure both services are deployed and running
- Make sure there are no trailing slashes in URLs

**API Calls Failing:**
- Test backend directly: Visit `https://your-backend-name.onrender.com/health`
- Check if backend service is sleeping (free tier limitation)
- Verify WhoisXMLAPI key is working and has quota remaining
- Check network tab in browser dev tools for detailed error messages

### General Issues

**Dependencies issues:**
- Delete `node_modules` and `package-lock.json` in both directories
- Run `npm install` again in both Backend and frontend directories
- Ensure you're using Node.js v16 or higher

**API quota exceeded:**
- Check your WhoisXMLAPI dashboard for quota usage
- Free accounts have limited requests per month
- Consider upgrading your WhoisXMLAPI plan if needed

## 💰 Hosting Costs

### Free Tier Limitations
**Render (Backend):**
- 750 hours/month free
- Service sleeps after 15 minutes of inactivity
- Cold start delay (30+ seconds) after sleep
- 512MB RAM, 0.1 CPU

**Vercel (Frontend):**
- 100GB bandwidth/month
- Unlimited static deployments
- 100 serverless function executions/day
- 10 second function timeout

### Paid Upgrades
**Render Starter ($7/month):**
- Always-on service (no sleeping)
- 512MB RAM, 0.5 CPU
- Better performance and reliability

**Vercel Pro ($20/month):**
- 1TB bandwidth
- 1000 serverless function executions/day
- Advanced analytics and monitoring

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

**Production monitoring:**
- Monitor Render service logs for backend issues
- Check Vercel function logs for frontend issues
- Use browser dev tools to debug production issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WhoisXMLAPI](https://whoisxmlapi.com/) for providing WHOIS data services
- [Vercel](https://vercel.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Need Help?** 
- Check the troubleshooting section above
- Open an issue on GitHub
- Test the live demo first: https://tlv-300-home-assignment.vercel.app/

**Happy coding! 🚀**
