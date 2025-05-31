# WHOIS Lookup Application

A modern, full-stack WHOIS lookup tool built with React and Express.js that provides comprehensive domain information and contact details using WhoisXMLAPI.

## 🚀 Features

- **Domain Information Lookup**: Get registrar details, registration/expiration dates, domain age, and name servers
- **Contact Information Lookup**: Retrieve registrant, technical, and administrative contact information
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Validation**: Client-side domain validation with immediate feedback
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **API Integration**: RESTful API with WhoisXMLAPI backend integration

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive Design** with mobile-first approach

### Backend
- **Node.js** with Express.js
- **WhoisXMLAPI** integration
- **CORS** enabled for cross-origin requests
- **Environment-based configuration**
- **Comprehensive logging** with Winston
- **Input validation** with express-validator

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16.x or higher
- **npm** or **Yarn** package manager
- **WhoisXMLAPI key** (sign up at [WhoisXMLAPI](https://whoisxmlapi.com/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd whois-lookup-app
```

### 2. Backend Setup

#### Navigate to Backend Directory

```bash
cd Backend
```

#### Install Backend Dependencies

```bash
npm install
```

#### Create Environment Configuration

Create a `.env` file in the Backend directory:

```bash
touch .env
```

Add the following environment variables to `.env`:

```env
# WhoisXMLAPI Configuration
WHOIS_API_KEY=your_whois_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Logging Configuration
LOG_LEVEL=info
```

#### Get Your WhoisXMLAPI Key

1. Visit [WhoisXMLAPI](https://whoisxmlapi.com/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Replace `your_whois_api_key_here` in the `.env` file

#### Start the Backend Server

For development with auto-reload:

```bash
npm run dev
```

For production:

```bash
npm start
```

#### Verify Backend is Running

Test the API endpoint:

```bash
curl "http://localhost:5000/api/whois?domain=example.com&type=domain"
```

Expected response:
```json
{
  "status": "success",
  "data": {
    "domainName": "example.com",
    "registrarName": "...",
    "registrationDate": "...",
    "expirationDate": "...",
    "estimatedDomainAge": "...",
    "hostnames": "..."
  }
}
```

### 3. Frontend Setup

#### Navigate to Frontend Directory

```bash
cd ../frontend
```

#### Install Frontend Dependencies

```bash
npm install
```

#### Start the Frontend Development Server

```bash
npm start
```

#### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 🧪 Running Tests

### Backend Tests

Navigate to the Backend directory and run tests:

```bash
cd Backend
```

#### Run All Tests

```bash
npm test
```

#### Run Tests with Coverage

```bash
npm run test:coverage
```

#### Run Tests in Watch Mode

```bash
npm run test:watch
```

#### View Coverage Report

After running coverage tests, open the HTML report:

```bash
open coverage/lcov-report/index.html
```

### Frontend Tests

Navigate to the Frontend directory and run tests:

```bash
cd frontend
```

#### Run All Tests

```bash
npm test
```

#### Run Tests in Watch Mode

```bash
npm test -- --watch
```

#### Run Tests with Coverage

```bash
npm test -- --coverage
```

## 🎯 Usage Guide

### 1. Domain Information Lookup

1. Enter a domain name (e.g., `google.com`, `github.com`)
2. Select **"Domain Information"** from the dropdown
3. Click **"Lookup Domain"**
4. View results including:
   - Domain Name
   - Registrar Name
   - Registration Date
   - Expiration Date
   - Domain Age
   - Name Servers

### 2. Contact Information Lookup

1. Enter a domain name
2. Select **"Contact Information"** from the dropdown
3. Click **"Lookup Domain"**
4. View contact details including:
   - Registrant Name
   - Technical Contact
   - Administrative Contact
   - Contact Email

### 3. Demo Domains for Testing

Try these domains to see different response types:
- `amazon.com` - Real domain with full data
- `google.com` - Another real domain example
- `github.com` - Tech company domain
- `nonexistent.xyz` - Error response example

## 🏗 Project Structure

```
whois-lookup-app/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── whoisController.js     # API route handlers
│   │   ├── services/
│   │   │   └── whoisService.js        # WhoisXMLAPI integration
│   │   ├── middleware/
│   │   │   ├── errorHandler.js        # Global error handling
│   │   │   └── validation.js          # Input validation
│   │   ├── routes/
│   │   │   └── whois.js              # API routes
│   │   ├── utils/
│   │   │   └── logger.js             # Logging configuration
│   │   ├── tests/
│   │   │   ├── whoisController.test.js
│   │   │   └── whoisService.test.js
│   │   └── app.js                    # Express app configuration
│   ├── server.js                     # Server entry point
│   ├── package.json
│   └── .env                          # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DomainLookupForm.tsx  # Main input form
│   │   │   ├── ResultTable.tsx       # Data display table
│   │   │   └── ErrorAlert.tsx        # Error message component
│   │   ├── services/
│   │   │   └── api.ts                # API communication layer
│   │   ├── pages/
│   │   │   └── Index.tsx             # Main application page
│   │   └── App.tsx                   # Application root
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔧 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### GET /whois

Retrieve WHOIS information for a domain.

**Parameters:**
- `domain` (required): The domain name to lookup
- `type` (required): Either "domain" or "contact"

**Example Requests:**

```bash
# Domain Information
curl "http://localhost:5000/api/whois?domain=example.com&type=domain"

# Contact Information
curl "http://localhost:5000/api/whois?domain=example.com&type=contact"
```

**Response Format:**

Success Response:
```json
{
  "status": "success",
  "data": {
    // Domain or contact information object
  }
}
```

Error Response:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## 🔒 Security Considerations

- **API Key Protection**: WhoisXMLAPI key is stored server-side only
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Configured for allowed origins
- **Rate Limiting**: Consider implementing rate limiting for production
- **Error Handling**: No sensitive data exposed in error messages

## 🚀 Deployment

### Backend Deployment

1. **Environment Variables**: Set production environment variables
2. **Process Manager**: Use PM2 or similar for production
3. **Reverse Proxy**: Configure Nginx or Apache
4. **SSL Certificate**: Enable HTTPS for production

### Frontend Deployment

1. **Build for Production**:
   ```bash
   npm run build
   ```

2. **Serve Static Files**: Deploy build folder to your hosting service

### Environment Variables for Production

```env
# Production Backend .env
WHOIS_API_KEY=your_production_api_key
PORT=5000
NODE_ENV=production
LOG_LEVEL=warn
```

## 🧪 Testing Scenarios

### Manual Testing Checklist

#### ✅ Valid Domain Tests
- [ ] `google.com` with domain type
- [ ] `amazon.com` with contact type
- [ ] `github.com` with both types

#### ✅ Error Handling Tests
- [ ] Invalid domain format (`invalid-domain`)
- [ ] Non-existent domain (`nonexistent.xyz`)
- [ ] Empty domain input
- [ ] Network connectivity issues

#### ✅ UI/UX Tests
- [ ] Form validation messages
- [ ] Loading states during API calls
- [ ] Responsive design on mobile
- [ ] Error message display
- [ ] Table formatting and readability

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Issue**: `WHOIS API key not configured`
```bash
# Solution: Check your .env file
cat Backend/.env
# Ensure WHOIS_API_KEY is set correctly
```

**Issue**: `Port 5000 already in use`
```bash
# Solution: Kill the process or use a different port
lsof -ti:5000 | xargs kill -9
# Or change PORT in .env file
```

**Issue**: `Module not found`
```bash
# Solution: Reinstall dependencies
cd Backend
rm -rf node_modules package-lock.json
npm install
```

#### Frontend Issues

**Issue**: `Cannot connect to backend`
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API URL in frontend code

**Issue**: `npm start fails`
```bash
# Solution: Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode

Enable debug logging:

```bash
# Backend debug mode
cd Backend
DEBUG=* npm run dev

# Frontend debug mode
cd frontend
REACT_APP_DEBUG=true npm start
```

## 📊 Performance Monitoring

### Backend Metrics
- API response times
- Error rates
- WhoisXMLAPI quota usage

### Frontend Metrics
- Page load times
- API call success rates
- User interaction metrics

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**:
   ```bash
   npm test
   ```
5. **Commit your changes**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Follow semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WhoisXMLAPI](https://whoisxmlapi.com/) for WHOIS data services
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide React](https://lucide.dev/) for beautiful icons
- [React](https://reactjs.org/) team for the amazing framework
- [Express.js](https://expressjs.com/) for the backend framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [API Documentation](#-api-documentation)
3. Open an issue on GitHub
4. Contact the development team

---

**Happy coding! 🚀**