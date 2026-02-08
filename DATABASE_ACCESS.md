# 🗄️ Database Access Guide

## Connection Details

**Database Type**: MongoDB  
**Host**: localhost  
**Port**: 27017  
**Database Name**: webrya_pms  
**Connection String**: `mongodb://localhost:27017/webrya_pms`

## Accessing MongoDB

### Option 1: MongoDB Shell (mongosh)
```bash
# Connect to database
mongosh mongodb://localhost:27017/webrya_pms

# Inside mongosh:
show collections          # List all collections
db.User.find()           # View all users
db.Property.find()       # View all properties
db.Booking.find()        # View all bookings
db.Task.find()           # View all tasks
```

### Option 2: Using Prisma Studio (GUI)
```bash
cd /app
npx prisma studio
```
This will open a web interface at http://localhost:5555

### Option 3: Using MongoDB Compass (if installed)
- Download: https://www.mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- Select database: `webrya_pms`

## Useful MongoDB Commands

### View All Data
```javascript
// View all users with pretty formatting
db.User.find().pretty()

// Count documents
db.User.countDocuments()
db.Property.countDocuments()

// Find specific user by email
db.User.findOne({ email: "host@test.com" })

// View properties with owner info
db.Property.aggregate([
  {
    $lookup: {
      from: "User",
      localField: "ownerId",
      foreignField: "_id",
      as: "owner"
    }
  }
])
```

### Create Test Data
```javascript
// Note: The app will auto-generate IDs
// Register through the UI at /auth/register for best results
```

### Delete All Data (Reset)
```javascript
db.User.deleteMany({})
db.Property.deleteMany({})
db.Booking.deleteMany({})
db.Task.deleteMany({})
db.TaskActivity.deleteMany({})
db.Notification.deleteMany({})
db.PropertyMember.deleteMany({})
db.PropertyInvite.deleteMany({})
```

### Backup Database
```bash
# Backup
mongodump --db=webrya_pms --out=/tmp/backup

# Restore
mongorestore --db=webrya_pms /tmp/backup/webrya_pms
```

## Database Schema Overview

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: Enum (HOST_PRIVATE, PM_COMPANY, CLEANER, CLEANING_COMPANY),
  language: Enum (en, el),
  createdAt: Date,
  updatedAt: Date
}
```

### Property Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  address: String,
  icalUrl: String,
  imageUrl: String,
  ownerId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Property),
  externalUid: String (unique - from iCal),
  startDate: Date,
  endDate: Date,
  summary: String,
  source: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Property),
  bookingId: ObjectId (ref: Booking),
  title: String,
  dueDate: Date,
  status: Enum (open, in_progress, completed),
  assignedToId: ObjectId (ref: User),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Quick Queries

### Find all properties for a specific user
```javascript
// Replace with actual user ID
const userId = ObjectId("...")
db.Property.find({ ownerId: userId })
```

### Find upcoming bookings
```javascript
const now = new Date()
db.Booking.find({ endDate: { $gte: now } }).sort({ startDate: 1 })
```

### Find pending tasks
```javascript
db.Task.find({ 
  status: { $in: ["open", "in_progress"] } 
}).sort({ dueDate: 1 })
```

### Tasks assigned to specific user
```javascript
const userId = ObjectId("...")
db.Task.find({ assignedToId: userId })
```

## Admin Tasks

### Update user role
```javascript
db.User.updateOne(
  { email: "user@example.com" },
  { $set: { role: "PM_COMPANY" } }
)
```

### Change user language preference
```javascript
db.User.updateOne(
  { email: "user@example.com" },
  { $set: { language: "el" } }
)
```

## Monitoring

### Check database size
```javascript
db.stats()
```

### Index information
```javascript
db.User.getIndexes()
db.Property.getIndexes()
```

## Troubleshooting

### If connection fails:
```bash
# Check if MongoDB is running
sudo supervisorctl status mongodb

# Restart MongoDB
sudo supervisorctl restart mongodb

# Check logs
tail -f /var/log/mongodb/mongod.log
```

### Clear Prisma cache
```bash
cd /app
rm -rf node_modules/.prisma
npx prisma generate
```

---

**Need help?** Check the main README.md or application logs at `/var/log/supervisor/nextjs.*.log`
