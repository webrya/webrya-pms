# Webrya PMS - Property Management System

## ✅ Η Εφαρμογή Λειτουργεί!

**URL**: http://localhost:3000

## 🎉 Τι Είναι Έτοιμο

Η εφαρμογή είναι πλήρως λειτουργική με:
- ✅ Authentication (Login/Register)
- ✅ Role-based Access (HOST, PM_COMPANY, CLEANER, CLEANING_COMPANY)
- ✅ Dashboard με statistics
- ✅ Property Management (Create/Edit/Delete με εικόνες)
- ✅ iCal Booking Sync (Airbnb, Booking.com κλπ)
- ✅ Auto Task Generation (δημιουργεί tasks μετά από κάθε checkout)
- ✅ Task Assignment & Management
- ✅ Account Settings
- ✅ MongoDB Database (Replica Set)

## 🚀 Πρώτα Βήματα

### 1. Δημιουργία Λογαριασμού

Πήγαινε στο: http://localhost:3000

1. Κάνε κλικ στο "Sign up"
2. Συμπλήρωσε:
   - **Name**: Το όνομά σου
   - **Email**: test@example.com
   - **Password**: test123 (τουλάχιστον 6 χαρακτήρες)
   - **Role**: Διάλεξε:
     - **Private Host** - Για ιδιώτες ιδιοκτήτες
     - **Property Management Company** - Για εταιρείες διαχείρισης
     - **Cleaner** - Για καθαριστές
     - **Cleaning Company** - Για εταιρείες καθαρισμού

### 2. Χρήση της Εφαρμογής

**Αν είσαι Host/PM Company:**
1. Πήγαινε στο "Properties" → "Add Property"
2. Προσθέσε το ακίνητό σου (όνομα, περιγραφή, διεύθυνση)
3. Προσθέσε iCal URL από Airbnb ή Booking.com
4. Κάνε κλικ "Sync Bookings" για να φέρεις τις κρατήσεις
5. Αυτόματα δημιουργούνται tasks καθαρισμού!

**Αν είσαι Cleaner:**
1. Θα δεις "My Tasks" στο dashboard
2. Εμφανίζονται οι εργασίες που σου έχουν ανατεθεί

## 🗄️ Database Access

**Database**: MongoDB (Replica Set)  
**Connection**: `mongodb://localhost:27017/webrya_pms`

### Πρόσβαση στη Βάση

```bash
# MongoDB Shell
mongosh mongodb://localhost:27017/webrya_pms

# Δες όλους τους χρήστες
db.User.find().pretty()

# Δες όλα τα properties
db.Property.find().pretty()

# Δες όλες τις κρατήσεις
db.Booking.find().pretty()

# Δες όλα τα tasks
db.Task.find().pretty()
```

### Prisma Studio (GUI)
```bash
cd /app
npx prisma studio
# Ανοίγει στο http://localhost:5555
```

## 📊 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Backend**: Next.js API Routes
- **Database**: **MongoDB Replica Set**
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **UI**: Tailwind CSS (Dark Theme)
- **Icons**: Lucide React
- **State**: TanStack Query

## 🎯 Χαρακτηριστικά που Λειτουργούν

### ✅ Authentication
- Register νέων χρηστών
- Login με email/password
- Protected routes
- Role-based access control

### ✅ Properties
- Δημιουργία ακινήτων
- Επεξεργασία (όνομα, περιγραφή, διεύθυνση, iCal URL)
- Διαγραφή ακινήτων
- Upload εικόνας (URL-based)
- Προβολή με κάρτες

### ✅ iCal Booking Sync
- Parse .ics files από Airbnb, Booking.com
- Extract DTSTART, DTEND, UID
- Αποφυγή duplicates με externalUid
- Manual "Sync Bookings" button
- Returns summary (πόσες νέες κρατήσεις, πόσα νέα tasks)

### ✅ Auto Task Generation
- **Αυτόματη δημιουργία** task για κάθε νέα κράτηση
- Τίτλος: "Cleaning after checkout"
- Due Date: booking.endDate + 1 ημέρα
- Status: "open"
- Συνδεδεμένο με booking & property

### ✅ Task Management
- Ανάθεση tasks σε χρήστες
- Επεξεργασία due date
- Προσθήκη notes
- Update status (open, in_progress, completed)
- Activity history

### ✅ Dashboard
- **Hosts**: Properties overview, bookings count, tasks summary
- **Cleaners**: "My Tasks" list only
- Statistics cards
- Empty states

### ✅ Settings
- Edit profile (name)
- View role
- Change password
- User info στο sidebar

## 🧪 Test Accounts

Έχουν δημιουργηθεί 2 test accounts:

**Host Account:**
- Email: `host@test.com`
- Password: `test123`
- Role: HOST_PRIVATE

**Cleaner Account:**
- Email: `cleaner@test.com`
- Password: `test123`
- Role: CLEANER

## 🔧 Χρήσιμες Εντολές

```bash
# Restart του Next.js server
sudo supervisorctl restart nextjs

# Δες logs
tail -f /var/log/supervisor/nextjs.out.log
tail -f /var/log/supervisor/nextjs.err.log

# Restart MongoDB
sudo supervisorctl restart mongodb

# Status όλων των services
sudo supervisorctl status

# Prisma commands
cd /app
npx prisma generate      # Regenerate client
npx prisma db push       # Sync schema to DB
npx prisma studio        # Open GUI
```

## 🐛 Γνωστά Θέματα

### Υποστήριξη Ελληνικών (Προσωρινά Disabled)
Η πολύγλωσση υποστήριξη (Ελληνικά/English) είναι προσωρινά απενεργοποιημένη λόγω σφάλματος compilation. Όλα τα UI elements είναι τώρα στα **Αγγλικά**.

**Για να την επαναφέρεις:**
1. Διόρθωσε το `/app/src/components/LanguageProvider.tsx`
2. Ενεργοποίησέ το στο `/app/src/app/providers.tsx`
3. Update όλα τα pages να χρησιμοποιούν `useLanguage()` hook

### Features Pending
- [ ] Property invites UI (το backend είναι έτοιμο)
- [ ] Email notifications (χρειάζονται SMTP settings)
- [ ] Booking trend charts
- [ ] Task status charts
- [ ] Bookings calendar view
- [ ] Actual file upload για εικόνες

## 📁 Δομή Project

```
/app
├── prisma/
│   └── schema.prisma          # MongoDB Schema
├── src/
│   ├── app/
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Login/Register
│   │   │   ├── dashboard/     # Stats
│   │   │   ├── properties/    # CRUD + Sync
│   │   │   ├── tasks/         # Tasks
│   │   │   └── settings/      # Profile/Password
│   │   ├── auth/              # Login/Register Pages
│   │   ├── dashboard/         # Protected Pages
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Sidebar.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── ical.ts
│   │   └── email.ts
│   └── middleware.ts
└── .env
```

## 🌍 Environment Variables

```env
DATABASE_URL="mongodb://localhost:27017/webrya_pms"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="noreply@webrya.com"
```

## 💡 Demo Scenario

1. **Register ως Host** (http://localhost:3000)
2. **Add Property** "Beach Villa"
3. **Προσθήκη iCal URL** από Airbnb
4. **Click "Sync Bookings"** → Δημιουργούνται bookings + tasks
5. **Register δεύτερο account ως Cleaner**
6. **Assign task σε cleaner** (από host account)
7. **Login ως cleaner** → Βλέπεις "My Tasks"

## 🎉 Σύνοψη

Η εφαρμογή είναι **έτοιμη και λειτουργική**! 

✅ **Όλα τα core features υλοποιημένα**  
✅ **MongoDB Replica Set configured**  
✅ **Authentication working**  
✅ **iCal sync working**  
✅ **Auto task generation working**  
✅ **Role-based access working**  
✅ **2 test accounts created**  

**URL**: http://localhost:3000  
**Database**: MongoDB at `mongodb://localhost:27017/webrya_pms`

---

**Καλή χρήση! 🚀**
