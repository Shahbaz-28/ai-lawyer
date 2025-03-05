# AI Lawyer Platform Documentation

## Overview
The AI Lawyer platform delivers AI-powered legal assistance through a secure, user-authenticated system. All features require Supabase authentication to ensure security and personalization.

## Technology Stack
| Component | Technolog |
|-----------|------------|
| Frontend | React (Next.js) with Tailwind CSS |
| Auth & Database | Supabase |
| AI Models | DeepSeek & Cursor |
| Deployment | Vercel |

## Database Schema

### Tables

#### users
- id: uuid (primary key)
- email: string (unique)
- created_at: timestamp
- full_name: string
- role: enum ['user', 'admin']
- last_login: timestamp

#### conversations
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- title: string
- created_at: timestamp
- updated_at: timestamp
- status: enum ['active', 'archived']

#### messages
- id: uuid (primary key)
- conversation_id: uuid (foreign key -> conversations.id)
- content: text
- role: enum ['user', 'assistant']
- created_at: timestamp
- tokens: integer

#### documents
- id: uuid (primary key)
- user_id: uuid (foreign key -> users.id)
- title: string
- content: text
- document_type: enum ['contract', 'brief', 'letter', 'other']
- created_at: timestamp
- updated_at: timestamp

#### user_preferences
- user_id: uuid (foreign key -> users.id)
- theme: enum ['light', 'dark', 'system']
- language: string
- notification_settings: jsonb

## Project Structure

## Core Application Flow

### 1. Initial Access
- Landing page displays platform introduction
- Prominent login button for authentication

### 2. Authentication Process
- Supabase authentication flow:
  - User clicks login
  - Redirect to Supabase auth
  - Authentication verification
  - Session token generation
  - Redirect back to application

### 3. Main Dashboard
Upon successful authentication, users access:
- Interactive chat interface
- AI-powered legal response system
- Case analysis tools

### 4. Session Management
- Secure logout functionality
- Automatic session cleanup
- Redirect to login page

## Key Features

### Authentication & Data Security
- Supabase-powered user authentication
- Secure session management
- Protected user data storage

### AI Legal Services
- Real-time legal query processing
- Comprehensive case analysis
- Automated document generation

### User Interface
- Modern Tailwind CSS design
- Persistent chat history
- Full responsive layout
- Mobile-optimized interface

### Security Implementation
- Authentication-gated access
- Automatic session expiration
- Encrypted data transmission
- Secure data storage

## Technical Notes
- All API endpoints require valid authentication
- User data is encrypted at rest
- Session tokens are securely managed through Supabase
- Regular security audits and updates are performed
