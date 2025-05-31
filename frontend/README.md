
# WHOIS Lookup Application

A modern, full-stack WHOIS lookup tool built with React and Express.js that provides comprehensive domain information and contact details.

## 🚀 Features

- **Domain Information Lookup**: Get registrar details, registration/expiration dates, domain age, and name servers
- **Contact Information Lookup**: Retrieve registrant, technical, and administrative contact information
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Validation**: Client-side domain validation with immediate feedback
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive Design** with mobile-first approach

### Backend (Specification)
- **Node.js** with Express.js
- **WhoisXMLAPI** integration
- **CORS** enabled for cross-origin requests
- **Environment-based configuration**

## 📋 Prerequisites

- Node.js v16.x or higher
- npm or Yarn package manager
- WhoisXMLAPI key (for backend implementation)

## 🚀 Getting Started

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whois-lookup-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Backend Setup (When Implementing)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install express cors axios dotenv
   ```

3. **Create environment file**
   ```bash
   # Create .env file
   echo "WHOIS_API_KEY=your_whois_api_key_here" > .env
   echo "PORT=5000" >> .env
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   # or
   node server.js
   ```

5. **Verify backend is running**
   Test endpoint: `GET http://localhost:5000/api/whois?domain=example.com&type=domain`

## 🎯 Usage

1. **Enter a domain name** (e.g., `google.com`, `github.com`)
2. **Select information type**:
   - **Domain Information**: Registrar, dates, age, name servers
   - **Contact Information**: Registrant, technical, administrative contacts
3. **Click "Lookup Domain"** to fetch the data
4. **View results** in a beautifully formatted table

### Demo Domains

Try these domains to see different response types:
- `example.com` - Standard demo data
- `google.com` - Google's domain information
- `github.com` - GitHub's domain information
- `nonexistent.xyz` - Error response example

## 🏗 Project Structure

```
src/
├── components/
│   ├── DomainLookupForm.tsx    # Main input form
│   ├── ResultTable.tsx         # Data display table
│   └── ErrorAlert.tsx          # Error message component
├── services/
│   └── api.ts                  # API communication layer
├── pages/
│   └── Index.tsx               # Main application page
└── App.tsx                     # Application root
```

## 🔧 API Integration

The frontend is designed to work with a backend API with the following endpoint:

```
GET /api/whois?domain=<domain>&type=<type>
```

**Parameters:**
- `domain`: The domain name to lookup
- `type`: Either "domain" or "contact"

**Response Format:**
```json
{
  "status": "success",
  "data": {
    // Domain or contact information object
  }
}
```

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient styling
- **Micro-interactions**: Hover effects and smooth transitions
- **Loading States**: Animated spinners during API calls
- **Form Validation**: Real-time domain format validation
- **Error Handling**: User-friendly error messages
- **Responsive Tables**: Mobile-optimized data display

## 🔒 Security Considerations

- Client-side input validation
- API key protection (server-side only)
- CORS configuration for allowed origins
- No sensitive data exposed to client

## 🧪 Testing

### Manual Testing Scenarios

1. **Valid Domain (Domain Info)**:
   - Input: `google.com`, Type: "Domain Information"
   - Expected: Table with registrar, dates, age, hostnames

2. **Valid Domain (Contact Info)**:
   - Input: `google.com`, Type: "Contact Information"  
   - Expected: Table with contact names and email

3. **Invalid Domain**:
   - Input: `invalid-domain`
   - Expected: Validation error message

4. **Non-existent Domain**:
   - Input: `nonexistent.xyz`
   - Expected: "Domain not found" error

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- WhoisXMLAPI for WHOIS data services
- Tailwind CSS for the styling framework
- Lucide React for beautiful icons
- React team for the amazing framework

---

**Note**: This frontend implementation includes a mock API service for demonstration purposes. In production, replace the mock service with actual backend API calls to your Express.js server with WhoisXMLAPI integration.
