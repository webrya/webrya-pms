# Webrya PMS - Property Management System

## 🏗️ Technology Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Database**: MongoDB (instead of PostgreSQL - MongoDB was already installed)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Language Support**: English (EN) + Greek (EL)

## 🗄️ Database Access

**Database Type**: MongoDB  
**Connection String**: `mongodb://localhost:27017/webrya_pms`  
**Database Name**: `webrya_pms`

**Access MongoDB Shell**:
```bash
mongosh mongodb://localhost:27017/webrya_pms
```

**View Collections**:
```bash
show collections
```

**View Users**:
```bash
db.User.find().pretty()
```

**View Properties**:
```bash
db.Property.find().pretty()
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd /app
yarn install
```

### 2. Setup Database
The database is already configured and running. Schema is synced automatically.

### 3. Start Development Server
```bash
yarn dev
# or
sudo supervisorctl restart nextjs
```

### 4. Access Application
- **URL**: http://localhost:3000
- **Login**: Register a new account or use test credentials (if seeded)

## 📋 Features Implemented

### ✅ Core Features
- [x] User Authentication (NextAuth.js with credentials)
- [x] Multi-role system (HOST_PRIVATE, PM_COMPANY, CLEANER, CLEANING_COMPANY)
- [x] Role-based dashboard (hosts see analytics, cleaners see tasks)
- [x] Multi-language support (English + Greek - Ελληνικά)

### ✅ Property Management
- [x] Create/Edit/Delete properties
- [x] Single image per property (URL-based)
- [x] Property settings with validation
- [x] iCal URL configuration

### ✅ Booking Management
- [x] iCal feed parsing (.ics files)
- [x] Extract VEVENT data (DTSTART, DTEND, UID)
- [x] Duplicate prevention via externalUid
- [x] Manual sync with "Sync Bookings" button
- [x] Sync summary (new bookings, new tasks)

### ✅ Task Management
- [x] Auto task generation on new booking
- [x] "Cleaning after checkout" default title
- [x] dueDate = booking.endDate + 1 day
- [x] Task assignment to users
- [x] Editable due date and notes
- [x] Status tracking (open, in_progress, completed)
- [x] Task activity history

### ✅ Dashboard & Analytics
- [x] Role-based rendering (single /dashboard route)
- [x] Host dashboard: properties overview, booking stats, task summary
- [x] Cleaner dashboard: "My Tasks" list only
- [x] Statistics cards
- [x] Empty states

### ✅ Account Settings
- [x] Profile editing (name, view role)
- [x] Password change (for credentials-based auth)
- [x] Language switcher (EN ↔ EL)
- [x] User info in sidebar

### 🔄 Partially Implemented (APIs ready, UI pending)
- [ ] Property invites (API ready, UI to be added)
- [ ] Email notifications (functions ready, SMTP config needed)
- [ ] Booking trend charts (requires chart.js integration)
- [ ] Task status donut chart (requires chart.js integration)

## 🌐 Language Support

The application supports **bilingual operation**:
- **English (EN)**: Primary language
- **Greek (EL)**: Secondary language

Users can switch languages in Settings → Preferences.

### Translation Coverage
All UI elements are translated including:
- Navigation menus
- Form labels
- Button text  
- Empty states
- Role names
- Status labels

## 📁 Project Structure

```
/app
├── prisma/
│   └── schema.prisma          # Database schema (MongoDB)
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication
│   │   │   ├── dashboard/     # Dashboard stats
│   │   │   ├── properties/    # Properties CRUD + sync
│   │   │   ├── tasks/         # Tasks management
│   │   │   └── settings/      # User settings
│   │   ├── auth/              # Login/Register pages
│   │   ├── dashboard/         # Protected dashboard pages
│   │   │   ├── page.tsx       # Main dashboard
│   │   │   ├── properties/    # Properties management
│   │   │   └── settings/      # Settings page
│   │   ├── layout.tsx         # Root layout
│   │   ├── providers.tsx      # Context providers
│   │   └── page.tsx           # Homepage redirect
│   ├── components/
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── LanguageProvider.tsx # i18n context
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   ├── auth.ts            # NextAuth config
│   │   ├── ical.ts            # iCal parser
│   │   ├── email.ts           # Email functions
│   │   └── i18n.ts            # Translations
│   └── middleware.ts          # Route protection
├── .env                       # Environment variables
└── package.json
```

## 🔐 Environment Variables

Required variables in `.env`:
```env
DATABASE_URL="mongodb://localhost:27017/webrya_pms"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Email (Optional - for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="noreply@webrya.com"
```

## 📊 Database Schema

### Collections
- **User**: Authentication + profile
- **Property**: Property details + iCal URL + image
- **PropertyMember**: Property access control
- **Booking**: Parsed from iCal feeds
- **Task**: Auto-generated + manual tasks
- **TaskActivity**: Task history log
- **PropertyInvite**: Invite tokens
- **Notification**: User notifications

## 🧪 Testing

### Create Test User
```bash
# Visit http://localhost:3000/auth/register
# Register with:
# - Name: Test Host
# - Email: host@test.com
# - Password: test123
# - Role: Private Host
```

### Test iCal Sync
1. Add a property
2. Add iCal URL (e.g., from Airbnb/Booking.com)
3. Click "Sync Bookings" button
4. Check new bookings and auto-generated tasks

## 🎨 Design System

- **Color Scheme**: Dark theme (Slate 950 base)
- **Primary Brand**: Brand Blue (#0ea5e9)
- **Glassmorphism**: Frosted glass panels
- **Icons**: Lucide React
- **Responsive**: Mobile-first design

## 📝 Important Notes

1. **Database Choice**: MongoDB was used instead of PostgreSQL because it was pre-installed and ready to use
2. **Image Upload**: Uses URL-based images (not file upload) for simplicity
3. **Email Notifications**: Functions are ready but require SMTP configuration
4. **Charts**: react-chartjs-2 is installed but charts need to be integrated
5. **Property Invites**: Backend API is ready, frontend UI pending

## 🔄 Next Steps for Production

1. Add actual file upload for property images
2. Complete chart integration (bookings trend, task status)
3. Add property invites UI
4. Configure SMTP for email notifications
5. Add booking calendar view
6. Add advanced task filtering
7. Implement real-time notifications
8. Add data export features
9. Set up production database (MongoDB Atlas)
10. Configure production environment variables

## 🛠️ Maintenance

### View Logs
```bash
tail -f /var/log/supervisor/nextjs.out.log
tail -f /var/log/supervisor/nextjs.err.log
```

### Restart Server
```bash
sudo supervisorctl restart nextjs
```

### Update Database Schema
```bash
cd /app
npx prisma db push
npx prisma generate
```

## 📞 Support

For issues or questions:
1. Check logs: `/var/log/supervisor/nextjs.*.log`
2. Verify MongoDB is running: `sudo supervisorctl status mongodb`
3. Check Next.js server: `sudo supervisorctl status nextjs`

---

**Built with ❤️ using Next.js, Prisma, and MongoDB**
