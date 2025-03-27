# User Management API

## Description
A comprehensive user management API built with NestJS that handles user information, including personal details, contact information, address, and academic history. The API provides full CRUD operations and supports file uploads for user photos.

## Features
- User profile management with multiple related entities
- File upload support for user photos
- Data validation and error handling
- PostgreSQL database integration
- RESTful API endpoints
- CORS enabled for frontend integration

## Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with the following variables:
```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=codehunter
DB_PASSWORD=your_password
DB_NAME=new
```

4. Create the PostgreSQL database:
```bash
createdb new
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## API Endpoints

### Users
- `POST /users` - Create a new user
  - Accepts multipart/form-data
  - Fields:
    - photo (file)
    - firstName (string)
    - lastName (string)
    - dob (ISO date string)
    - occupation (string)
    - gender (string)
    - contact (object)
    - address (object)
    - academics (object)

- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a specific user
- `PUT /users/:id` - Update a user
  - Accepts multipart/form-data
  - Same fields as POST, all optional
- `DELETE /users/:id` - Delete a user

### Request Body Examples

#### Create User
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "occupation": "Developer",
  "gender": "Male",
  "contact": {
    "email": "john@example.com",
    "phone": "1234567890",
    "fax": "0987654321",
    "linkedInUrl": "https://linkedin.com/in/johndoe"
  },
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001"
  },
  "academics": {
    "pastSchools": ["Harvard", "MIT"]
  }
}
```

## Database Schema

### UserInfo (UserInfoTB)
- id (PK)
- firstName
- lastName
- dob
- occupation
- gender
- photoPath
- contact (1:1 relation)
- address (1:1 relation)
- academics (1:1 relation)

### UserContact (UserContactTB)
- id (PK)
- email (unique)
- phone (unique)
- fax (optional)
- linkedInUrl (optional)

### UserAddress (UserAddressTB)
- id (PK)
- street
- city
- state
- country
- zipCode

### UserAcademics (UserAcademicsTB)
- id (PK)
- pastSchools (string array)

## Error Handling
The API implements comprehensive error handling:
- Validation errors (400 Bad Request)
- Not found errors (404 Not Found)
- Duplicate entry errors (400 Bad Request)
- Server errors (500 Internal Server Error)

## Development

### Available Scripts
```bash
# Format code
npm run format

# Lint code
npm run lint

# Run tests
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

### Project Structure
```
src/
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   ├── user-info.entity.ts
│   │   ├── user-contact.entity.ts
│   │   ├── user-address.entity.ts
│   │   └── user-academics.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.module.ts
└── main.ts
```

## File Upload
- Photos are stored in the `/uploads` directory
- Supported formats: JPEG, PNG, GIF
- File size and type validations are implemented
- Unique filename generation with timestamp

## Security Considerations
- Input validation using class-validator
- CORS configuration for frontend access
- Database query parameter sanitization
- File upload restrictions

## Production Deployment
1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Ensure database migrations are applied
4. Start the application:
```bash
npm run start:prod
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the UNLICENSED license.
