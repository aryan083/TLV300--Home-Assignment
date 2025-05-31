# WHOIS API Backend

This is the backend service for the WHOIS API application. It provides an API endpoint to fetch domain and contact information using the WHOIS XML API.

## Features

- Domain information lookup
- Contact information lookup
- Error handling and logging
- Input validation
- Unit tests
- Production-ready configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WHOIS XML API key

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and update with your WHOIS API key:
   ```bash
   cp .env.example .env
   ```
4. Update the `WHOIS_API_KEY` in `.env` with your actual API key

## Development

Start the development server:
```bash
npm run dev
```

The server will start on port 5000 (or the port specified in your .env file).

## Testing

Run the test suite:
```bash
npm test
```

## API Endpoints

### GET /api/whois

Get WHOIS information for a domain.

Query Parameters:
- `domain` (required): Domain name to lookup
- `type` (required): Type of information to retrieve ('domain' or 'contact')

Example Response (domain type):
```json
{
  "status": "success",
  "data": {
    "domainName": "example.com",
    "registrarName": "Example Registrar",
    "registrationDate": "2020-01-01T00:00:00Z",
    "expirationDate": "2025-01-01T00:00:00Z",
    "estimatedDomainAge": "3 years",
    "hostnames": "ns1.example.com, ns2.ex..."
  }
}
```

Example Response (contact type):
```json
{
  "status": "success",
  "data": {
    "domainName": "example.com",
    "registrantName": "John Doe",
    "technicalContactName": "Tech Support",
    "administrativeContactName": "Admin",
    "contactEmail": "admin@example.com"
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 400: Bad Request (invalid parameters)
- 500: Internal Server Error

Error Response Format:
```json
{
  "status": "error",
  "message": "Error message here"
}
```

## Production Deployment

1. Set NODE_ENV to 'production' in .env
2. Build and start:
   ```bash
   npm start
   ```

## License

MIT
