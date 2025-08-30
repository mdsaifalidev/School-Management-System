# School Management System

A full-stack web application built with Next.js, React Hook Form, Drizzle ORM, and MySQL for managing school information.

## Features

- **Add School**: Form with validation to register new schools
- **View Schools**: E-commerce style grid layout to browse all schools
- **Image Upload**: Store school images in the `schoolImages` folder
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Form Validation**: Comprehensive client and server-side validation
- **Modern UI**: Clean, professional interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **Database**: MySQL with Drizzle ORM
- **File Upload**: Custom file handling for images
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_PORT=3306
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up MySQL database**
   ```sql
   CREATE DATABASE school_management;
   ```

5. **Generate and push database schema**
   ```bash
   npm run db:generate
   npm run db:push
   ```

6. **Create upload directory**
   ```bash
   mkdir -p public/schoolImages
   ```

7. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses a single `schools` table with the following structure:

```sql
CREATE TABLE schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Project Structure

```
├── app/
│   ├── addSchool/          # Add school page
│   ├── showSchools/        # Display schools page
│   ├── api/schools/        # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── lib/
│   ├── db/                # Database configuration
│   ├── utils/             # Utility functions
│   └── validations/       # Zod schemas
├── public/
│   └── schoolImages/      # Uploaded school images
├── styles/
│   └── globals.css        # Global styles
└── components/            # Reusable components
```

## API Endpoints

- `POST /api/schools` - Add a new school
- `GET /api/schools` - Get all schools

## Form Validation

The add school form includes comprehensive validation:

- **Name**: 2-100 characters
- **Address**: 10-200 characters  
- **City**: 2-50 characters
- **State**: 2-50 characters
- **Contact**: Exactly 10 digits
- **Email**: Valid email format
- **Image**: JPEG/PNG/WebP, max 5MB

## Image Upload

- Images are stored in `public/schoolImages/`
- Filenames are prefixed with timestamps for uniqueness
- Supported formats: JPEG, PNG, WebP
- Maximum file size: 5MB

## Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized for various screen sizes

## Deployment

### Database Setup (Production)

1. Set up MySQL database on your hosting provider
2. Update environment variables with production database credentials
3. Run database migrations

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL=
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Drizzle Studio

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js and Drizzle ORM