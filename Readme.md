# URL Shortener Service

A robust and scalable URL shortening service built with Node.js, Express, and MongoDB. This service provides RESTful APIs for creating short URLs, managing redirections, and tracking analytics.

## Features

- **URL Shortening**: Convert long URLs into short, memorable aliases
- **Custom Aliases**: Support for user-defined short codes
- **Smart Redirection**: Fast URL lookup and redirection
- **Analytics Tracking**: Monitor click counts and access patterns
- **Collision Handling**: Automatic resolution of duplicate aliases
- **Rate Limiting**: Protection against abuse and spam
- **Modular Architecture**: Clean separation of concerns with controllers, services, and models

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, input validation
- **Architecture**: MVC pattern with service layer

## Project Structure

```
url-shortener/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Helper functions
│   └── config/          # Configuration files
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── server.js            # Entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:3000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the application:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Create Short URL
```http
POST /api/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url",
  "customAlias": "mylink" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shortUrl": "http://localhost:3000/mylink",
    "originalUrl": "https://example.com/very/long/url",
    "alias": "mylink",
    "createdAt": "2024-12-04T10:30:00.000Z"
  }
}
```

### Redirect to Original URL
```http
GET /:alias
```

Redirects to the original URL and increments click count.

### Get URL Analytics
```http
GET /api/analytics/:alias
```

**Response:**
```json
{
  "success": true,
  "data": {
    "alias": "mylink",
    "originalUrl": "https://example.com/very/long/url",
    "clicks": 42,
    "createdAt": "2024-12-04T10:30:00.000Z",
    "lastAccessed": "2024-12-04T15:45:00.000Z"
  }
}
```

## Features in Detail

### Alias Generation
- Automatic generation of 6-character alphanumeric aliases
- Support for custom user-defined aliases
- Collision detection and handling

### Rate Limiting
- Configurable rate limits per IP address
- Prevents abuse and ensures fair usage
- Returns `429 Too Many Requests` when limit exceeded

### Analytics
- Track total clicks per shortened URL
- Record last access timestamp
- Expandable for additional metrics

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/url-shortener |
| `BASE_URL` | Base URL for shortened links | http://localhost:3000 |
| `RATE_LIMIT_WINDOW` | Rate limit window (minutes) | 15 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## Development

Run tests:
```bash
npm test
```

Lint code:
```bash
npm run lint
```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] URL expiration dates
- [ ] QR code generation
- [ ] Advanced analytics (geolocation, devices, referrers)
- [ ] Bulk URL shortening
- [ ] API key management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/url-shortener](https://github.com/yourusername/url-shortener)
