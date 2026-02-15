<div align="center">
<h1> StoreFlow Backend </h1>


**Robust, scalable backend API for the StoreFlow store management platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://www.postgresql.org/)

[Features](#-features) • [Getting Started](#-getting-started) • [API Docs](#-api-documentation) • [Contributing](#-contributing) • [Deployment](#-deployment)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Database Setup](#-database-setup)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
  - [How to Contribute](#how-to-contribute)
  - [Development Setup](#development-setup)
  - [Code Standards](#code-standards)
  - [API Design Guidelines](#api-design-guidelines)
  - [Database Guidelines](#database-guidelines)
  - [Authentication & Security](#authentication--security)
  - [Testing](#testing)
  - [Commit Guidelines](#commit-guidelines)
  - [Pull Request Process](#pull-request-process)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Error Handling](#-error-handling)
- [Logging](#-logging)
- [Performance](#-performance)
- [Security](#-security)
- [Deployment](#-deployment)
- [Monitoring](#-monitoring)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**StoreFlow Backend** is a RESTful API service built with Node.js, Express, and TypeScript that powers the StoreFlow store management platform. It provides comprehensive endpoints for managing stores, inventory, orders, customers, and analytics with enterprise-grade security, scalability, and performance.

### Why StoreFlow Backend?

- **🚀 High Performance**: Optimized database queries and caching strategies
- **🔒 Secure**: JWT authentication, role-based access control, data encryption
- **📊 Scalable**: Microservices-ready architecture with horizontal scaling support
- **🧪 Well-Tested**: Comprehensive test coverage with unit, integration, and E2E tests
- **📝 Well-Documented**: Complete API documentation with OpenAPI/Swagger
- **🔄 Real-Time**: WebSocket support for real-time updates
- **🌐 Production-Ready**: Battle-tested in production environments

---

## ✨ Features

### Core API Features

#### 🏪 Store Management
- Multi-store support with store hierarchy
- Store configuration and settings
- Store hours and holiday management
- Store location and geofencing
- Staff assignment and role management

#### 📦 Inventory Management
- Real-time inventory tracking
- Multi-location inventory
- Stock movements and transfers
- Low stock alerts and notifications
- Batch and serial number tracking
- Inventory auditing and reconciliation
- Automatic reorder point calculations

#### 🛒 Order Processing
- Order creation and management
- Order status workflow (pending → processing → completed)
- Payment processing integration
- Shipping label generation
- Return and refund processing
- Order notes and activity logs
- Bulk order operations

#### 👥 Customer Management
- Customer profiles and authentication
- Purchase history tracking
- Loyalty points and rewards
- Customer segmentation
- Communication preferences
- Address book management

#### 💳 Payment Processing
- Multiple payment gateway support (Stripe, PayPal)
- Secure payment handling
- Refund processing
- Payment history and reconciliation
- PCI DSS compliance

#### 📊 Analytics & Reporting
- Sales analytics and trends
- Inventory reports
- Customer insights
- Revenue analytics
- Custom report generation
- Data export in multiple formats

#### 🔔 Notifications
- Email notifications (transactional and marketing)
- SMS notifications
- Push notifications
- Webhook support for third-party integrations
- Notification templates and preferences

### Advanced Features

- **🔐 Advanced Authentication**: JWT with refresh tokens, OAuth 2.0, 2FA
- **🔑 Role-Based Access Control**: Fine-grained permissions system
- **📡 Real-Time Updates**: WebSocket support for live data
- **🔄 Event-Driven Architecture**: Event bus for async operations
- **📤 File Upload**: Image and document upload with validation
- **🌍 Geolocation**: Store locator and distance calculations
- **🔍 Full-Text Search**: Elasticsearch integration
- **📊 Rate Limiting**: Request throttling and abuse prevention
- **🗄️ Caching**: Redis-based caching for improved performance
- **📝 Audit Logging**: Complete audit trail of all operations
- **🔧 Maintenance Mode**: Graceful shutdown and maintenance support

---

## 🏗️ Architecture

StoreFlow Backend follows a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
│            (Web, Mobile, Third-party Services)              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────┐
│                  API Gateway / Load Balancer                 │
│              (Rate Limiting, SSL Termination)                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┼────────────────────────────────────┐
│                  Express.js Application                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Middleware Layer                        │   │
│  │  • Authentication    • Validation   • Error Handler  │   │
│  │  • Logging          • CORS         • Rate Limiting   │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Controller Layer                        │   │
│  │  • Request handling   • Response formatting          │   │
│  │  • Input validation   • HTTP status codes            │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌────────────────────┼─────────────────────────────────┐   │
│  │              Service Layer                           │   │
│  │  • Business logic    • Data validation               │   │
│  │  • Complex operations • External API calls           │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                      │
│  ┌────────────────────┼─────────────────────────────────┐   │
│  │          Data Access Layer (Repository)              │   │
│  │  • Database queries  • ORM operations                │   │
│  │  • Transaction mgmt  • Query optimization            │   │
│  └────────────────────┬─────────────────────────────────┘   │
└───────────────────────┼──────────────────────────────────────┘
                        │
┌───────────────────────┼──────────────────────────────────────┐
│                  Data Layer                                  │
│  ┌─────────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  │
│  │ PostgreSQL  │  │  Redis   │  │   S3    │  │Elasticsearch│
│  │  (Primary)  │  │ (Cache)  │  │(Storage)│  │  (Search)  │ │
│  └─────────────┘  └──────────┘  └─────────┘  └──────────┘  │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  External Services                           │
│  • Email (SendGrid)    • SMS (Twilio)                        │
│  • Payment (Stripe)    • Storage (AWS S3)                    │
│  • Maps (Google Maps)  • Shipping (ShipStation)              │
└──────────────────────────────────────────────────────────────┘
```

### Design Patterns

- **Layered Architecture**: Separation of concerns (Controller → Service → Repository)
- **Repository Pattern**: Abstract data access logic
- **Dependency Injection**: Loose coupling and testability
- **Factory Pattern**: Object creation
- **Strategy Pattern**: Payment processing, notification delivery
- **Observer Pattern**: Event-driven operations
- **Singleton Pattern**: Database connections, configuration

---

## 🛠️ Tech Stack

### Core Technologies

- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js 4.18+
- **Language**: TypeScript 5.0+
- **Package Manager**: npm / yarn / pnpm

### Database & Storage

- **Primary Database**: PostgreSQL 14+
- **ORM**: Prisma 5.0+ / TypeORM 0.3+
- **Cache**: Redis 7.0+
- **Search Engine**: Elasticsearch 8.0+ (optional)
- **File Storage**: AWS S3 / Local storage
- **Message Queue**: Bull / RabbitMQ

### Authentication & Security

- **Authentication**: JWT (jsonwebtoken)
- **OAuth**: Passport.js with strategies
- **Password Hashing**: bcrypt / argon2
- **Encryption**: crypto (built-in)
- **Rate Limiting**: express-rate-limit
- **Security Headers**: helmet
- **CORS**: cors
- **Input Validation**: Joi / Zod

### External Services

- **Email**: SendGrid / Nodemailer
- **SMS**: Twilio
- **Payment**: Stripe SDK
- **File Upload**: multer
- **Image Processing**: sharp
- **PDF Generation**: pdfkit / puppeteer
- **Maps**: Google Maps API

### Testing

- **Test Framework**: Jest 29+
- **HTTP Testing**: Supertest
- **Mocking**: jest-mock
- **E2E Testing**: Custom test suite
- **Load Testing**: Artillery / k6
- **Coverage**: Istanbul (built into Jest)

### Development Tools

- **Code Quality**: ESLint, Prettier
- **Type Checking**: TypeScript compiler
- **Git Hooks**: Husky + lint-staged
- **API Documentation**: Swagger / OpenAPI 3.0
- **Logging**: Winston / Pino
- **Process Manager**: PM2 (production)
- **Monitoring**: Prometheus + Grafana

### DevOps

- **Containerization**: Docker
- **Orchestration**: Kubernetes (optional)
- **CI/CD**: GitHub Actions / GitLab CI
- **Cloud Platform**: AWS / GCP / Azure
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt / AWS Certificate Manager

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node --version   # v18.0.0 or higher
npm --version    # v9.0.0 or higher
psql --version   # PostgreSQL 14.0 or higher
redis-cli --version  # Redis 7.0 or higher
```

### Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/SENODROOM/StoreFlow-Backend.git
cd StoreFlow-Backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 4. Set up database
npm run db:create
npm run db:migrate
npm run db:seed  # Optional: Load sample data

# 5. Start Redis (in another terminal)
redis-server

# 6. Start development server
npm run dev

# 🎉 API is running at http://localhost:5000
# 📚 API docs available at http://localhost:5000/api-docs
```

---

## 📦 Installation

### Standard Installation

```bash
# Clone the repository
git clone https://github.com/SENODROOM/StoreFlow-Backend.git
cd StoreFlow-Backend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Docker Installation

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
APP_NAME=StoreFlow API
APP_VERSION=1.0.0
PORT=5000
HOST=localhost
API_PREFIX=/api/v1

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/storeflow_dev
DB_HOST=localhost
DB_PORT=5432
DB_NAME=storeflow_dev
DB_USER=storeflow_user
DB_PASSWORD=your_secure_password
DB_SSL=false
DB_LOGGING=true

# Database Connection Pool
DB_POOL_MIN=2
DB_POOL_MAX=10

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=3600

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-change-in-production
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-token-secret-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d
JWT_ALGORITHM=HS256

# Session
SESSION_SECRET=your-session-secret-min-32-chars
SESSION_MAX_AGE=86400000

# Cookie
COOKIE_SECRET=your-cookie-secret
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

# Password Hashing
BCRYPT_ROUNDS=12
PASSWORD_MIN_LENGTH=8

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false

# CORS
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@storeflow.com
EMAIL_FROM_NAME=StoreFlow
EMAIL_SUPPORT=support@storeflow.com

# Email (SMTP - Alternative)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Payment (Stripe)
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLIC_KEY=pk_test_your-stripe-public-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
STRIPE_API_VERSION=2023-10-16

# AWS S3 (File Storage)
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=storeflow-uploads
AWS_S3_ACL=private

# File Upload
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
UPLOAD_PATH=./uploads

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Logging
LOG_LEVEL=debug  # error, warn, info, http, verbose, debug, silly
LOG_FORMAT=combined  # combined, common, dev, short, tiny
LOG_DIR=./logs
LOG_MAX_SIZE=20m
LOG_MAX_FILES=14d

# Monitoring & APM
SENTRY_DSN=your-sentry-dsn
NEW_RELIC_LICENSE_KEY=your-new-relic-key

# Feature Flags
ENABLE_SWAGGER=true
ENABLE_RATE_LIMITING=true
ENABLE_CORS=true
ENABLE_COMPRESSION=true
ENABLE_REQUEST_LOGGING=true
ENABLE_CACHING=true
ENABLE_WEBSOCKETS=true

# Pagination
DEFAULT_PAGE_SIZE=20
MAX_PAGE_SIZE=100

# Timezone
TZ=UTC

# Security
BCRYPT_SALT_ROUNDS=12
TOKEN_EXPIRY=24h
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME=2h

# WebSocket
WS_PORT=5001
WS_PATH=/ws

# Elasticsearch (Optional)
ELASTICSEARCH_NODE=http://localhost:9200
ELASTICSEARCH_INDEX=storeflow

# Maintenance
MAINTENANCE_MODE=false
MAINTENANCE_MESSAGE=System is under maintenance

# Testing
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/storeflow_test
```

---

## 🗄️ Database Setup

### PostgreSQL Setup

```bash
# Create database user
createuser -s storeflow_user

# Create database
createdb -O storeflow_user storeflow_dev

# Set password
psql -c "ALTER USER storeflow_user PASSWORD 'your_password';"
```

### Run Migrations

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run migrate

# Reset database (development only)
npm run migrate:reset

# Create a new migration
npm run migrate:create -- --name add_user_table
```

### Seed Database

```bash
# Seed with sample data
npm run seed

# Seed specific tables
npm run seed:users
npm run seed:products
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload
npm run dev:debug        # Start with debugger
npm start                # Start production server

# Building
npm run build            # Compile TypeScript to JavaScript
npm run build:watch      # Build in watch mode

# Database
npm run db:create        # Create database
npm run db:drop          # Drop database
npm run migrate          # Run migrations
npm run migrate:create   # Create new migration
npm run migrate:reset    # Reset database
npm run migrate:rollback # Rollback last migration
npm run seed             # Seed database
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio

# Testing
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:unit        # Run unit tests only
npm run test:integration # Run integration tests only
npm run test:e2e         # Run end-to-end tests

# Code Quality
npm run lint             # Lint all files
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run type-check       # TypeScript type checking

# Utilities
npm run clean            # Clean build directory
npm run docs:generate    # Generate API documentation
npm run logs             # View logs
npm run db:backup        # Backup database
npm run db:restore       # Restore database
```

---

## 🤝 Contributing

We welcome contributions from developers of all experience levels! Whether you're fixing bugs, adding features, improving documentation, or optimizing performance, your help is appreciated.

### 🌟 Why Contribute?

- **Learn Backend Development**: Work with Node.js, TypeScript, PostgreSQL, Redis
- **Enhance Your Skills**: Database design, API development, authentication, testing
- **Real-World Experience**: Production-grade codebase with best practices
- **Build Your Portfolio**: Showcase your backend development expertise
- **Join the Community**: Connect with developers worldwide
- **Make an Impact**: Help businesses improve their operations

### How to Contribute

#### 1. Find Something to Work On

**Good places to start:**
- 🟢 Issues labeled [`good first issue`](https://github.com/SENODROOM/StoreFlow-Backend/labels/good%20first%20issue)
- 🆘 Issues labeled [`help wanted`](https://github.com/SENODROOM/StoreFlow-Backend/labels/help%20wanted)
- 🐛 [`bug`](https://github.com/SENODROOM/StoreFlow-Backend/labels/bug) fixes
- 📖 [`documentation`](https://github.com/SENODROOM/StoreFlow-Backend/labels/documentation) improvements
- ⚡ [`performance`](https://github.com/SENODROOM/StoreFlow-Backend/labels/performance) optimizations

**Areas we especially need help with:**
- 🔐 Security enhancements and auditing
- ⚡ Performance optimization and caching
- 🧪 Test coverage improvement
- 📚 API documentation
- 🔌 Third-party integrations
- 🗄️ Database query optimization
- 🔄 Event-driven architecture
- 📊 Analytics and reporting features

#### 2. Set Up Your Development Environment

```bash
# Fork the repository on GitHub (click Fork button)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/StoreFlow-Backend.git
cd StoreFlow-Backend

# Add upstream remote
git remote add upstream https://github.com/SENODROOM/StoreFlow-Backend.git

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run db:create
npm run migrate
npm run seed

# Start Redis
redis-server

# Start development server
npm run dev
```

#### 3. Create a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Code refactoring
- `docs/update-description` - Documentation
- `perf/optimization-name` - Performance improvements
- `test/test-description` - Adding tests
- `chore/task-description` - Maintenance tasks

#### 4. Make Your Changes

Follow our [code standards](#code-standards) and best practices:

- ✅ Write clean, readable, maintainable code
- ✅ Follow TypeScript best practices
- ✅ Add comprehensive error handling
- ✅ Write unit and integration tests
- ✅ Update API documentation
- ✅ Add input validation
- ✅ Follow RESTful API conventions
- ✅ Optimize database queries
- ✅ Add logging where appropriate
- ✅ Consider security implications

#### 5. Test Your Changes

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Test specific files
npm test -- auth.test.ts
```

#### 6. Commit Your Changes

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Stage your changes
git add .

# Commit with conventional commit message
git commit -m "feat(products): add product search endpoint with filters"
```

**Commit message format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or tool changes
- `security`: Security improvements

**Examples:**
```bash
feat(auth): implement JWT refresh token rotation
fix(orders): correct order total calculation with discounts
docs(api): add OpenAPI documentation for products endpoint
perf(products): optimize product list query with indexes
refactor(services): extract payment logic into separate service
test(auth): add integration tests for login flow
security(auth): add rate limiting to login endpoint
```

#### 7. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

### Development Setup

#### System Requirements

- Node.js 18.0.0 or higher
- PostgreSQL 14.0 or higher
- Redis 7.0 or higher
- npm 9.0.0 or higher (or yarn/pnpm)
- Git 2.30.0 or higher

#### Recommended Tools

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - Thunder Client / REST Client (API testing)
  - PostgreSQL Explorer
  - GitLens
  - Error Lens
  
- **Database Tools**:
  - pgAdmin 4 / DBeaver / TablePlus
  - Prisma Studio (`npm run prisma:studio`)
  
- **API Testing**:
  - Postman / Insomnia / Thunder Client
  - Swagger UI (included)

#### Initial Setup Checklist

- [ ] Node.js and npm installed
- [ ] PostgreSQL installed and running
- [ ] Redis installed and running
- [ ] Repository cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Database created and migrations run
- [ ] Seed data loaded (optional)
- [ ] Development server running successfully
- [ ] All tests passing
- [ ] API documentation accessible

### Code Standards

#### TypeScript Best Practices

**1. Strong Typing**

```typescript
// ❌ Bad - Using any
async function getUser(id: any) {
  return await db.user.findUnique({ where: { id } });
}

// ✅ Good - Proper typing
async function getUser(id: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { id },
  });
}
```

**2. Interface Definitions**

```typescript
// models/User.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}
```

**3. Type Guards**

```typescript
// utils/typeGuards.ts
export function isUser(obj: any): obj is User {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.firstName === 'string'
  );
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
```

#### API Design Guidelines

**1. Controller Pattern**

```typescript
// controllers/productController.ts
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/productService';
import { asyncHandler } from '../middleware/asyncHandler';
import { ValidationError } from '../errors';

export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * @desc    Get all products with pagination and filters
   * @route   GET /api/v1/products
   * @access  Public
   */
  getProducts = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        page = 1,
        limit = 20,
        sortBy = 'createdAt',
        order = 'desc',
        search,
        category,
        minPrice,
        maxPrice,
      } = req.query;

      // Validate pagination params
      const pageNum = Math.max(1, Number(page));
      const limitNum = Math.min(100, Math.max(1, Number(limit)));

      const result = await this.productService.findAll({
        page: pageNum,
        limit: limitNum,
        sortBy: sortBy as string,
        order: order as 'asc' | 'desc',
        filters: {
          search: search as string,
          category: category as string,
          minPrice: minPrice ? Number(minPrice) : undefined,
          maxPrice: maxPrice ? Number(maxPrice) : undefined,
        },
      });

      res.status(200).json({
        success: true,
        data: result.products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: result.total,
          pages: Math.ceil(result.total / limitNum),
        },
      });
    }
  );

  /**
   * @desc    Get single product by ID
   * @route   GET /api/v1/products/:id
   * @access  Public
   */
  getProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      const product = await this.productService.findById(id);

      if (!product) {
        throw new ValidationError('Product not found', 404);
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    }
  );

  /**
   * @desc    Create new product
   * @route   POST /api/v1/products
   * @access  Private/Admin
   */
  createProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const productData = req.body;

      const product = await this.productService.create(productData);

      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully',
      });
    }
  );

  /**
   * @desc    Update product
   * @route   PUT /api/v1/products/:id
   * @access  Private/Admin
   */
  updateProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const updateData = req.body;

      const product = await this.productService.update(id, updateData);

      if (!product) {
        throw new ValidationError('Product not found', 404);
      }

      res.status(200).json({
        success: true,
        data: product,
        message: 'Product updated successfully',
      });
    }
  );

  /**
   * @desc    Delete product
   * @route   DELETE /api/v1/products/:id
   * @access  Private/Admin
   */
  deleteProduct = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      await this.productService.delete(id);

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    }
  );
}
```

**2. Service Layer**

```typescript
// services/productService.ts
import { PrismaClient } from '@prisma/client';
import { CreateProductDto, UpdateProductDto, ProductFilters } from '../types';
import { ValidationError } from '../errors';
import { CacheService } from './cacheService';

export class ProductService {
  constructor(
    private prisma: PrismaClient,
    private cache: CacheService
  ) {}

  async findAll(options: {
    page: number;
    limit: number;
    sortBy: string;
    order: 'asc' | 'desc';
    filters: ProductFilters;
  }) {
    const { page, limit, sortBy, order, filters } = options;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { sku: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.category) {
      where.categoryId = filters.category;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    // Check cache
    const cacheKey = `products:${JSON.stringify({ page, limit, filters })}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Execute queries in parallel
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          category: true,
          images: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = { products, total };

    // Cache result
    await this.cache.set(cacheKey, JSON.stringify(result), 300); // 5 minutes

    return result;
  }

  async findById(id: string) {
    // Check cache
    const cacheKey = `product:${id}`;
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    });

    if (product) {
      await this.cache.set(cacheKey, JSON.stringify(product), 300);
    }

    return product;
  }

  async create(data: CreateProductDto) {
    // Validate SKU uniqueness
    const existing = await this.prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (existing) {
      throw new ValidationError('Product with this SKU already exists', 400);
    }

    const product = await this.prisma.product.create({
      data: {
        ...data,
        slug: this.generateSlug(data.name),
      },
      include: {
        category: true,
      },
    });

    // Invalidate list cache
    await this.cache.deletePattern('products:*');

    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    // Check if product exists
    const existing = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new ValidationError('Product not found', 404);
    }

    // If SKU is being updated, check uniqueness
    if (data.sku && data.sku !== existing.sku) {
      const skuExists = await this.prisma.product.findUnique({
        where: { sku: data.sku },
      });

      if (skuExists) {
        throw new ValidationError('Product with this SKU already exists', 400);
      }
    }

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        slug: data.name ? this.generateSlug(data.name) : undefined,
      },
      include: {
        category: true,
      },
    });

    // Invalidate cache
    await this.cache.delete(`product:${id}`);
    await this.cache.deletePattern('products:*');

    return product;
  }

  async delete(id: string) {
    // Check if product exists
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new ValidationError('Product not found', 404);
    }

    // Soft delete
    await this.prisma.product.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });

    // Invalidate cache
    await this.cache.delete(`product:${id}`);
    await this.cache.deletePattern('products:*');
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
```

**3. Repository Pattern (Optional)**

```typescript
// repositories/productRepository.ts
import { PrismaClient, Product, Prisma } from '@prisma/client';

export class ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(options: {
    where?: Prisma.ProductWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
    include?: Prisma.ProductInclude;
  }): Promise<Product[]> {
    return this.prisma.product.findMany(options);
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async update(
    id: string,
    data: Prisma.ProductUpdateInput
  ): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.ProductWhereInput): Promise<number> {
    return this.prisma.product.count({ where });
  }
}
```

**4. Middleware**

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler';
import { AuthenticationError } from '../errors';
import { UserService } from '../services/userService';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookie
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new AuthenticationError('Not authorized to access this route');
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      // Get user from database
      const userService = new UserService();
      const user = await userService.findById(decoded.id);

      if (!user || !user.isActive) {
        throw new AuthenticationError('User not found or inactive');
      }

      // Attach user to request
      req.user = user;

      next();
    } catch (error) {
      throw new AuthenticationError('Not authorized to access this route');
    }
  }
);

// Authorize specific roles
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AuthenticationError('Not authorized to access this route');
    }

    if (!roles.includes(req.user.role)) {
      throw new AuthenticationError(
        `User role '${req.user.role}' is not authorized to access this route`
      );
    }

    next();
  };
};
```

**5. Input Validation**

```typescript
// validators/productValidator.ts
import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().max(2000).required(),
  sku: Joi.string()
    .trim()
    .pattern(/^[A-Z0-9-]+$/)
    .required(),
  price: Joi.number().min(0).precision(2).required(),
  compareAtPrice: Joi.number().min(0).precision(2).optional(),
  cost: Joi.number().min(0).precision(2).optional(),
  stock: Joi.number().integer().min(0).default(0),
  categoryId: Joi.string().uuid().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().optional(),
      })
    )
    .max(10)
    .optional(),
  isActive: Joi.boolean().default(true),
  isFeatured: Joi.boolean().default(false),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().max(2000).optional(),
  price: Joi.number().min(0).precision(2).optional(),
  compareAtPrice: Joi.number().min(0).precision(2).optional(),
  cost: Joi.number().min(0).precision(2).optional(),
  stock: Joi.number().integer().min(0).optional(),
  categoryId: Joi.string().uuid().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  isActive: Joi.boolean().optional(),
  isFeatured: Joi.boolean().optional(),
});

// Middleware to validate request body
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errors,
      });
    }

    req.body = value;
    next();
  };
};
```

### Database Guidelines

**1. Migration Best Practices**

```typescript
// migrations/20240215_create_products_table.ts
import { Prisma } from '@prisma/client';

export async function up(prisma: Prisma.TransactionClient) {
  await prisma.$executeRaw`
    CREATE TABLE products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(120) NOT NULL UNIQUE,
      description TEXT,
      sku VARCHAR(50) NOT NULL UNIQUE,
      price DECIMAL(10, 2) NOT NULL,
      compare_at_price DECIMAL(10, 2),
      cost DECIMAL(10, 2),
      stock INTEGER NOT NULL DEFAULT 0,
      category_id UUID NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT true,
      is_featured BOOLEAN NOT NULL DEFAULT false,
      is_deleted BOOLEAN NOT NULL DEFAULT false,
      deleted_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
    );
  `;

  // Create indexes
  await prisma.$executeRaw`
    CREATE INDEX idx_products_category ON products(category_id);
  `;
  await prisma.$executeRaw`
    CREATE INDEX idx_products_sku ON products(sku);
  `;
  await prisma.$executeRaw`
    CREATE INDEX idx_products_slug ON products(slug);
  `;
  await prisma.$executeRaw`
    CREATE INDEX idx_products_active ON products(is_active);
  `;
  await prisma.$executeRaw`
    CREATE INDEX idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
  `;
}

export async function down(prisma: Prisma.TransactionClient) {
  await prisma.$executeRaw`DROP TABLE IF EXISTS products CASCADE;`;
}
```

**2. Query Optimization**

```typescript
// Optimize N+1 queries with includes
const orders = await prisma.order.findMany({
  include: {
    customer: true,
    items: {
      include: {
        product: true,
      },
    },
  },
});

// Use select to reduce data transfer
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    stock: true,
  },
});

// Use transactions for data consistency
await prisma.$transaction(async (tx) => {
  // Create order
  const order = await tx.order.create({ data: orderData });

  // Update stock
  for (const item of orderData.items) {
    await tx.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    });
  }

  return order;
});

// Use pagination
const products = await prisma.product.findMany({
  skip: (page - 1) * limit,
  take: limit,
});
```

### Authentication & Security

**1. Password Hashing**

```typescript
// utils/password.ts
import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
  return await bcrypt.hash(password, rounds);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
```

**2. JWT Token Generation**

```typescript
// utils/jwt.ts
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    algorithm: 'HS256',
  });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    algorithm: 'HS256',
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
}
```

**3. Rate Limiting**

```typescript
// middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redis';

export const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:auth:',
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later',
});
```

### Testing

**1. Unit Tests**

```typescript
// tests/unit/services/productService.test.ts
import { ProductService } from '../../../src/services/productService';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { ValidationError } from '../../../src/errors';

jest.mock('../../../src/config/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

let prisma: DeepMockProxy<PrismaClient>;
let productService: ProductService;

beforeEach(() => {
  prisma = mockDeep<PrismaClient>();
  productService = new ProductService(prisma);
  mockReset(prisma);
});

describe('ProductService', () => {
  describe('findById', () => {
    it('should return a product when found', async () => {
      const mockProduct = {
        id: '123',
        name: 'Test Product',
        price: 29.99,
        stock: 100,
      };

      prisma.product.findUnique.mockResolvedValue(mockProduct as any);

      const result = await productService.findById('123');

      expect(result).toEqual(mockProduct);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
        include: expect.any(Object),
      });
    });

    it('should return null when product not found', async () => {
      prisma.product.findUnique.mockResolvedValue(null);

      const result = await productService.findById('999');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new product successfully', async () => {
      const createData = {
        name: 'New Product',
        sku: 'SKU123',
        price: 49.99,
        stock: 50,
        categoryId: 'cat-123',
      };

      const mockProduct = { id: '123', ...createData, slug: 'new-product' };

      prisma.product.findUnique.mockResolvedValue(null);
      prisma.product.create.mockResolvedValue(mockProduct as any);

      const result = await productService.create(createData as any);

      expect(result).toEqual(mockProduct);
    });

    it('should throw error when SKU already exists', async () => {
      const createData = {
        name: 'New Product',
        sku: 'EXISTING-SKU',
        price: 49.99,
      };

      prisma.product.findUnique.mockResolvedValue({ id: '456' } as any);

      await expect(productService.create(createData as any)).rejects.toThrow(
        ValidationError
      );
    });
  });
});
```

**2. Integration Tests**

```typescript
// tests/integration/products.test.ts
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let authToken: string;

beforeAll(async () => {
  // Clean database
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create test user and get token
  const response = await request(app).post('/api/v1/auth/register').send({
    email: 'test@example.com',
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
  });

  authToken = response.body.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Product API', () => {
  describe('GET /api/v1/products', () => {
    it('should return products list', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty('pagination');
    });

    it('should filter products by price range', async () => {
      const response = await request(app)
        .get('/api/v1/products?minPrice=10&maxPrice=50')
        .expect(200);

      expect(response.body.success).toBe(true);
      response.body.data.forEach((product: any) => {
        expect(product.price).toBeGreaterThanOrEqual(10);
        expect(product.price).toBeLessThanOrEqual(50);
      });
    });
  });

  describe('POST /api/v1/products', () => {
    it('should create a new product with valid data', async () => {
      const productData = {
        name: 'Test Product',
        description: 'A test product',
        sku: 'TEST-SKU-001',
        price: 29.99,
        stock: 100,
        categoryId: 'test-category-id',
      };

      const response = await request(app)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toMatchObject({
        name: productData.name,
        sku: productData.sku,
        price: productData.price,
      });
    });

    it('should return 400 for invalid product data', async () => {
      const response = await request(app)
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Invalid' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/products')
        .send({ name: 'Product' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/products/:id', () => {
    let productId: string;

    beforeAll(async () => {
      const product = await prisma.product.create({
        data: {
          name: 'Detail Test Product',
          sku: 'DETAIL-SKU',
          price: 39.99,
          stock: 50,
          categoryId: 'test-category',
        },
      });
      productId = product.id;
    });

    it('should return product details', async () => {
      const response = await request(app)
        .get(`/api/v1/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', productId);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/v1/products/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});
```

**3. E2E Tests**

```typescript
// tests/e2e/orderFlow.test.ts
import request from 'supertest';
import app from '../../src/app';

describe('Complete Order Flow', () => {
  let authToken: string;
  let customerId: string;
  let productId: string;
  let orderId: string;

  it('should register a new customer', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'customer@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      })
      .expect(201);

    authToken = response.body.token;
    customerId = response.body.data.id;
  });

  it('should browse products', async () => {
    const response = await request(app)
      .get('/api/v1/products')
      .expect(200);

    expect(response.body.data.length).toBeGreaterThan(0);
    productId = response.body.data[0].id;
  });

  it('should create an order', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        items: [
          {
            productId,
            quantity: 2,
          },
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'Test City',
          state: 'TC',
          zipCode: '12345',
          country: 'US',
        },
      })
      .expect(201);

    orderId = response.body.data.id;
    expect(response.body.data.status).toBe('pending');
  });

  it('should process payment for order', async () => {
    const response = await request(app)
      .post(`/api/v1/orders/${orderId}/payment`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        paymentMethod: 'stripe',
        paymentToken: 'tok_visa',
      })
      .expect(200);

    expect(response.body.data.paymentStatus).toBe('paid');
  });

  it('should retrieve order details', async () => {
    const response = await request(app)
      .get(`/api/v1/orders/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.data.id).toBe(orderId);
    expect(response.body.data.items).toBeDefined();
  });
});
```

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature
feat(products): add product search with Elasticsearch

# Bug fix
fix(auth): resolve token refresh race condition

# Documentation
docs(api): update API documentation for products endpoint

# Performance
perf(database): add indexes for frequently queried fields

# Refactor
refactor(services): extract payment logic into separate service

# Test
test(orders): add integration tests for order creation flow

# Security
security(auth): implement rate limiting on login endpoint

# Chore
chore(deps): update dependencies to latest versions
```

### Pull Request Process

#### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] ⚡ Performance improvement
- [ ] 🔐 Security improvement
- [ ] ♻️ Code refactoring

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Database Changes
- [ ] New migrations added
- [ ] Seed data updated
- [ ] No database changes

## API Changes
- [ ] New endpoints added
- [ ] Existing endpoints modified
- [ ] Breaking changes to API
- [ ] No API changes

## Testing
### Test Coverage
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] All tests passing

### Manual Testing
- [ ] Tested locally
- [ ] Tested API endpoints with Postman/Insomnia
- [ ] Checked database integrity
- [ ] Verified error handling
- [ ] Tested edge cases

## Documentation
- [ ] API documentation updated (Swagger/OpenAPI)
- [ ] README updated
- [ ] Code comments added
- [ ] Migration notes added (if applicable)

## Security Considerations
- [ ] Input validation implemented
- [ ] Authentication/authorization checked
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] Rate limiting considered
- [ ] Sensitive data handled properly

## Performance Impact
<!-- Describe any performance implications -->

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] Any dependent changes have been merged
- [ ] Database migrations are reversible

## Additional Notes
<!-- Any additional information or context -->
```

---

## 📁 Project Structure

```
StoreFlow-Backend/
├── src/
│   ├── config/                # Configuration files
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── aws.ts
│   │   └── app.config.ts
│   ├── controllers/           # Request handlers
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── orderController.ts
│   │   └── customerController.ts
│   ├── services/              # Business logic
│   │   ├── authService.ts
│   │   ├── productService.ts
│   │   ├── orderService.ts
│   │   ├── paymentService.ts
│   │   └── emailService.ts
│   ├── repositories/          # Data access layer (optional)
│   │   ├── productRepository.ts
│   │   └── orderRepository.ts
│   ├── middleware/            # Custom middleware
│   │   ├── auth.ts
│   │   ├── validation.ts
│   │   ├── errorHandler.ts
│   │   ├── rateLimiter.ts
│   │   └── logger.ts
│   ├── routes/                # API routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── products.routes.ts
│   │   ├── orders.routes.ts
│   │   └── customers.routes.ts
│   ├── models/                # TypeScript interfaces/types
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Order.ts
│   │   └── index.ts
│   ├── validators/            # Input validation schemas
│   │   ├── authValidator.ts
│   │   ├── productValidator.ts
│   │   └── orderValidator.ts
│   ├── utils/                 # Utility functions
│   │   ├── asyncHandler.ts
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   ├── email.ts
│   │   └── helpers.ts
│   ├── errors/                # Custom error classes
│   │   ├── AppError.ts
│   │   ├── ValidationError.ts
│   │   ├── AuthenticationError.ts
│   │   └── index.ts
│   ├── types/                 # TypeScript type definitions
│   │   ├── express.d.ts
│   │   └── index.d.ts
│   ├── events/                # Event handlers
│   │   ├── orderEvents.ts
│   │   └── emailEvents.ts
│   ├── jobs/                  # Background jobs
│   │   ├── emailJob.ts
│   │   └── inventorySync.ts
│   ├── websocket/             # WebSocket handlers
│   │   └── index.ts
│   ├── app.ts                 # Express app setup
│   └── server.ts              # Server entry point
├── prisma/                    # Prisma ORM
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts                # Database seeding
├── tests/                     # Tests
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── setup.ts
├── docs/                      # Documentation
│   ├── api/                   # API documentation
│   ├── architecture/          # Architecture docs
│   └── deployment/            # Deployment guides
├── scripts/                   # Utility scripts
│   ├── backup-db.sh
│   └── restore-db.sh
├── logs/                      # Application logs
├── uploads/                   # File uploads (dev only)
├── .github/                   # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .env.example               # Environment variables template
├── .eslintrc.js               # ESLint configuration
├── .prettierrc                # Prettier configuration
├── tsconfig.json              # TypeScript configuration
├── jest.config.js             # Jest configuration
├── docker-compose.yml         # Docker Compose configuration
├── Dockerfile                 # Docker configuration
├── package.json
└── README.md
```

---

## 📚 API Documentation

API documentation is available via Swagger UI:

**Development**: http://localhost:5000/api-docs

### Example Endpoints

```
# Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password

# Products
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PUT    /api/v1/products/:id
DELETE /api/v1/products/:id
POST   /api/v1/products/:id/images

# Orders
GET    /api/v1/orders
GET    /api/v1/orders/:id
POST   /api/v1/orders
PUT    /api/v1/orders/:id
DELETE /api/v1/orders/:id
POST   /api/v1/orders/:id/payment

# Customers
GET    /api/v1/customers
GET    /api/v1/customers/:id
POST   /api/v1/customers
PUT    /api/v1/customers/:id
DELETE /api/v1/customers/:id

# Inventory
GET    /api/v1/inventory
PUT    /api/v1/inventory/:id
POST   /api/v1/inventory/transfer

# Analytics
GET    /api/v1/analytics/sales
GET    /api/v1/analytics/inventory
GET    /api/v1/analytics/customers
```

---

## 🗄️ Database Schema

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  firstName     String
  lastName      String
  role          UserRole  @default(CUSTOMER)
  isActive      Boolean   @default(true)
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  orders        Order[]
  addresses     Address[]
}

model Product {
  id              String      @id @default(uuid())
  name            String
  slug            String      @unique
  description     String?
  sku             String      @unique
  price           Decimal     @db.Decimal(10, 2)
  compareAtPrice  Decimal?    @db.Decimal(10, 2)
  cost            Decimal?    @db.Decimal(10, 2)
  stock           Int         @default(0)
  categoryId      String
  category        Category    @relation(fields: [categoryId], references: [id])
  isActive        Boolean     @default(true)
  isFeatured      Boolean     @default(false)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  images          ProductImage[]
  orderItems      OrderItem[]
}

model Order {
  id              String      @id @default(uuid())
  orderNumber     String      @unique
  customerId      String
  customer        User        @relation(fields: [customerId], references: [id])
  status          OrderStatus @default(PENDING)
  subtotal        Decimal     @db.Decimal(10, 2)
  tax             Decimal     @db.Decimal(10, 2)
  shipping        Decimal     @db.Decimal(10, 2)
  total           Decimal     @db.Decimal(10, 2)
  paymentStatus   PaymentStatus @default(PENDING)
  paymentMethod   String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  items           OrderItem[]
  payments        Payment[]
}

enum UserRole {
  ADMIN
  MANAGER
  STAFF
  CUSTOMER
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

---

## 🔐 Authentication

JWT-based authentication with refresh tokens:

```typescript
// Login response
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "email": "user@example.com",
      "role": "customer"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}

// Include token in requests
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## ⚠️ Error Handling

Standardized error responses:

```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

---

## 📊 Logging

Structured logging with Winston:

```typescript
logger.info('User registered successfully', { userId: '123' });
logger.error('Database connection failed', { error: err.message });
```

---

## ⚡ Performance

- Redis caching for frequently accessed data
- Database query optimization with indexes
- Connection pooling
- Response compression
- Rate limiting

---

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention (using ORM)
- XSS protection
- CSRF protection
- Rate limiting
- HTTPS enforcement
- Security headers (Helmet.js)
- CORS configuration

---

## 🚀 Deployment

### Docker Deployment

```bash
# Build image
docker build -t storeflow-backend .

# Run container
docker run -p 5000:5000 --env-file .env storeflow-backend
```

### PM2 Deployment

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start dist/server.js --name storeflow-api

# View logs
pm2 logs storeflow-api

# Monitor
pm2 monit
```

---

## 📊 Monitoring

- Prometheus metrics
- Grafana dashboards
- Sentry error tracking
- Application logs
- Database monitoring

---

## 🐛 Troubleshooting

**Database Connection Issues:**
```bash
# Check PostgreSQL is running
pg_isready

# Check connection
psql -U storeflow_user -d storeflow_dev
```

**Redis Connection Issues:**
```bash
# Check Redis is running
redis-cli ping

# Should return PONG
```

---

## 🗺️ Roadmap

- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Real-time inventory sync
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Mobile SDK
- [ ] Webhook management UI

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **GitHub**: [SENODROOM](https://github.com/SENODROOM)
- **Email**: backend@storeflow.com
- **API Docs**: https://api.storeflow.com/docs

---

## 🙏 Acknowledgments

Thank you to all contributors who have helped build StoreFlow Backend!

[![Contributors](https://contrib.rocks/image?repo=SENODROOM/StoreFlow-Backend)](https://github.com/SENODROOM/StoreFlow-Backend/graphs/contributors)

---

<div align="center">

**Built with ❤️ by the StoreFlow community**

[⬆ Back to top](#storeflow-backend)

</div>
