# 🗄️ Database Access Guide

## Connection Details

**Database Type**: PostgreSQL (Supabase)  
**Host**: db.ywtpuntsxlgsimaqzuxo.supabase.co  
**Port**: 5432  
**Database Name**: postgres  
**Connection String**: `postgresql://postgres:[YOUR-PASSWORD]@db.ywtpuntsxlgsimaqzuxo.supabase.co:5432/postgres`

## Accessing PostgreSQL

### Option 1: psql (CLI)
```bash
# Connect to database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.ywtpuntsxlgsimaqzuxo.supabase.co:5432/postgres"

# Inside psql:
\dt                 # List all tables
\d "User"           # Describe the User table
```

### Option 2: Prisma Studio (GUI)
```bash
cd /app
npx prisma studio
```
This will open a web interface at http://localhost:5555

## Useful PostgreSQL Queries

### View All Data
```sql
-- View all users
SELECT * FROM "User";

-- Count rows
SELECT COUNT(*) FROM "User";
SELECT COUNT(*) FROM "Property";

-- Find specific user by email
SELECT * FROM "User" WHERE email = 'host@test.com';
```

### Delete All Data (Reset)
```sql
TRUNCATE TABLE
  "Notification",
  "PropertyInvite",
  "TaskActivity",
  "Task",
  "Booking",
  "PropertyMember",
  "Property",
  "User"
RESTART IDENTITY CASCADE;
```

### Backup Database
```bash
# Backup
pg_dump "postgresql://postgres:[YOUR-PASSWORD]@db.ywtpuntsxlgsimaqzuxo.supabase.co:5432/postgres" > /tmp/webrya_pms_backup.sql

# Restore
psql "postgresql://postgres:[YOUR-PASSWORD]@db.ywtpuntsxlgsimaqzuxo.supabase.co:5432/postgres" < /tmp/webrya_pms_backup.sql
```

## Database Schema Overview

### User Table
```sql
-- Columns (high level)
-- id (uuid), email, password, name, role, language, createdAt, updatedAt
```

### Property Table
```sql
-- Columns (high level)
-- id (uuid), name, description, address, icalUrl, imageUrl, ownerId, createdAt, updatedAt
```

## Quick Queries

### Find all properties for a specific user
```sql
-- Replace with actual user ID
SELECT * FROM "Property" WHERE "ownerId" = '00000000-0000-0000-0000-000000000000';
```
