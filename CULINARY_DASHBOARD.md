# Culinary Leader Dashboard - Feature Documentation

## 🎉 Overview

A comprehensive, mobile-responsive dashboard for Culinary Leaders to manage daily metrics, track priorities, and monitor team performance.

**Route:** `/dashboard/culinary`

---

## ✨ Features Implemented

### 1. **Professional Header Section**
- **Welcome Message:** Personalized greeting ("Welcome, Tiffany Larkins")
- **Current Date:** Formatted as "EEEE, MMMM d, yyyy" (e.g., "Friday, November 1, 2025")
- **Role Badge:** Red badge displaying "Culinary Leader"
- **Responsive Design:** Stacks on mobile, side-by-side on desktop

### 2. **Today's Priorities Card**
Located in the left sidebar, displays:
- **Daily Metric Entry Status**
  - Green "Done" badge if metrics entered today
  - Yellow "Pending" badge if not yet entered
- **Pull & Thaw Check** - Daily task by 12:00 PM
- **BOH Schedule Due** - Weekly reminder for Monday 5:00 PM deadline
- **Visual Indicators:** Color-coded icons (green checkmarks, amber clocks, blue alerts)

### 3. **Metric Snapshot Card**
Real-time display of today's entered metrics (appears after submission):
- **Last Updated Time:** Shows exact time of last metric entry
- **Color-Coded Metric Display:**
  - 🟢 **Green:** On target or above
  - 🟡 **Yellow:** Within 3% of target
  - 🔴 **Red:** Below target threshold
- **All 5 Metrics Displayed:**
  - Food Great @ 72
  - Safe Score
  - Spec/Sold 100%
  - TM's >72 Hours
  - Pull Thaw

### 4. **Metric Entry Form**
Comprehensive form with real-time validation:

#### Form Fields:
1. **Date Picker** - Defaults to today, can select past dates
2. **Food Great @ 72** (%)
   - Target: 95%+
   - Range: 0-100
   - Live color indicator on input border
3. **Safe Score** (%)
   - Target: 93%+
   - Range: 0-100
4. **Spec/Sold 100%** (%)
   - Target: 99%+
   - Range: 0-100
5. **TM's >72 Hours** (count)
   - Target: 0
   - Integer input
   - Red if >0, green if 0
6. **Pull Thaw** (%)
   - Target: 95%+
   - Range: 0-100
7. **Notes** (optional textarea)
   - 500 character max
   - For issues or highlights

#### Form Validation:
- **zod schema** with type-safe validation
- **react-hook-form** for performance and UX
- **Real-time feedback:** Input borders change color as you type
- **Badge indicators:** Show "On Target", "Close", or "Below Target"

#### Color System:
- **Green borders:** Metric meets or exceeds target
- **Yellow borders:** Within 3% of target (warning)
- **Red borders:** Below target threshold (needs attention)

### 5. **API Integration**
Two endpoints created:

#### POST `/api/metrics`
Save or update daily metrics
```json
{
  "userId": "string",
  "role": "CULINARY",
  "date": "2025-11-01",
  "foodGreat72": 98.5,
  "safeScore": 94.2,
  "specSold100": 99.8,
  "tmsAbove72": 0,
  "pullThaw": 96.0,
  "notes": "Great day!"
}
```

**Response:**
- Success: `{ success: true, message: "Metrics saved successfully", data: {...} }`
- Error: `{ success: false, message: "error description" }`

#### GET `/api/metrics`
Fetch metrics by user, role, and optional date
```
GET /api/metrics?userId=temp-user-id&role=CULINARY&date=2025-11-01
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "userId": "...",
    "date": "2025-11-01",
    "foodGreat72": 98.5,
    ...
  }
}
```

---

## 🎨 Design Features

### Color Palette
- **Primary Red:** `#DC2626` (Chili's inspired)
- **Success Green:** `#16A34A` / `#10B981`
- **Warning Yellow:** `#EAB308`
- **Danger Red:** `#EF4444`
- **Slate Gray:** Background and text
- **Gradient Backgrounds:**
  - Header: Red to Orange
  - Priorities: Blue to Indigo
  - Snapshot: Green to Emerald

### Typography
- **Headers:** Bold, 3xl/2xl sizes
- **Labels:** Medium weight, color-coded
- **Body Text:** Slate gray for readability
- **Badges:** Semibold, uppercase

### Spacing & Layout
- **Mobile-First:** Single column on small screens
- **Tablet/Desktop:** 3-column grid (1 sidebar + 2 main)
- **Card Padding:** Generous padding for touch targets
- **Form Grid:** 2-column on medium+ screens

---

## 🛠️ Technical Implementation

### Dependencies Added
```json
{
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x",
  "date-fns": "^3.x",
  "@radix-ui/react-label": "^2.x",
  "@radix-ui/react-slot": "^1.x"
}
```

### Components Created
1. **`/components/ui/form.tsx`** - Form context and field components
2. **`/components/ui/input.tsx`** - Text/number input
3. **`/components/ui/label.tsx`** - Form labels
4. **`/components/ui/textarea.tsx`** - Multi-line text input
5. **`/components/ui/badge.tsx`** - Status badges with variants

### Helper Functions
```typescript
// Get metric status based on target
getMetricStatus(value, target, isHigherBetter)
// Returns: "success" | "warning" | "danger"

// Get CSS classes for input styling
getInputClassName(value, target, isHigherBetter)
// Returns: Tailwind classes for colored borders

// MetricBadge component - Shows status badge
<MetricBadge value={95} target={93} />

// MetricDisplay component - Shows metric in snapshot
<MetricDisplay label="Safe Score" value={94} target={93} unit="%" />
```

---

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile (320px-640px):**
  - Single column layout
  - Full-width cards
  - Stacked form inputs
  - Touch-friendly buttons (min 44px)

- **Tablet (640px-1024px):**
  - 2-column form grid
  - Sidebar and main content stacked
  - Larger text for readability

- **Desktop (1024px+):**
  - 3-column grid layout
  - Sidebar (1/3 width) + Main (2/3 width)
  - Horizontal navigation in header

### Touch Targets
- **Buttons:** 48px minimum height
- **Inputs:** 40px height
- **Tap zones:** 44x44px per Apple HIG

---

## 🔮 Next Steps & Roadmap

### Immediate (Ready to Build)
1. **Authentication Integration**
   - Replace `temp-user-id` with actual user ID from auth context
   - Implement NextAuth.js or custom JWT
   - Add user session management

2. **Database Setup**
   - Configure PostgreSQL (Supabase, Railway, or Neon)
   - Run `npx prisma generate`
   - Run `npx prisma db push`
   - Seed initial data

3. **Metric Visualization**
   - Install Recharts: `npm install recharts`
   - Create line chart component for 30-day trends
   - Add target line overlay
   - Implement date range selector

### Phase 2 Features
4. **Task Management System**
   - Auto-generate tasks based on frequency
   - Mark tasks complete with timestamp
   - Recurring task regeneration

5. **Team Member Tracking**
   - List view of BOH team members
   - Performance indicators per member
   - Link to coaching notes

6. **Schedule Tracker Widget**
   - Countdown to Monday 5pm deadline
   - Mark posted with timestamp
   - History view (last 12 weeks)

### Phase 3 Enhancements
7. **Notifications**
   - Browser push for task reminders
   - Email digest for daily summary
   - Alert when metrics below target

8. **Reports & Export**
   - Weekly summary report
   - Quarterly check-in data export
   - PDF generation for coaching docs

---

## 🧪 Testing Instructions

### Manual Testing Checklist

**Form Validation:**
- [ ] Enter value > 100 → Error message appears
- [ ] Enter negative value → Error message appears
- [ ] Enter decimal (e.g., 95.5) → Accepted
- [ ] Leave required field empty → Error on submit
- [ ] Fill all fields correctly → Success message

**Color Indicators:**
- [ ] Food Great @ 72: Enter 98 → Green border
- [ ] Food Great @ 72: Enter 93 → Yellow border
- [ ] Food Great @ 72: Enter 88 → Red border
- [ ] TM's >72 Hours: Enter 0 → Green border
- [ ] TM's >72 Hours: Enter 5 → Red border

**Responsive Design:**
- [ ] Open on mobile (320px) → Single column, readable text
- [ ] Open on tablet (768px) → Form in 2 columns
- [ ] Open on desktop (1280px) → Full 3-column layout
- [ ] Rotate device → Layout adjusts smoothly

**Data Persistence:**
- [ ] Submit metrics → Success message appears
- [ ] Reload page → Metrics still displayed in snapshot
- [ ] Change date → Previous date's metrics load
- [ ] Edit existing metrics → Updates correctly

---

## 💡 Usage Tips

### For Development
1. **Run dev server:** `npm run dev`
2. **Navigate to:** `http://localhost:3000/dashboard/culinary`
3. **Test without DB:** Form will show validation errors but won't persist
4. **With DB:** Connect PostgreSQL and run Prisma migrations first

### For Production
1. **Environment Variables:**
   ```env
   DATABASE_URL="postgresql://user:pass@host:5432/db"
   ```
2. **Build:** `npm run build`
3. **Start:** `npm start`

### Sample Data Entry
```
Date: Today
Food Great @ 72: 98.5
Safe Score: 94.2
Spec/Sold 100%: 99.8
TM's >72 Hours: 0
Pull Thaw: 96.0
Notes: "Excellent day! All targets met."
```

---

## 🐛 Known Issues / TODOs

### Current Limitations
1. **No Authentication:** Using placeholder `temp-user-id`
   - **Impact:** All users share same data
   - **Fix:** Implement NextAuth.js (see Phase 2)

2. **Prisma Client Not Generated:** Build works but runtime will fail without DB
   - **Impact:** API calls will error without database
   - **Fix:** Set up PostgreSQL and run `prisma generate`

3. **No Data Visualization:** Metrics entered but not graphed
   - **Impact:** Can't see trends over time
   - **Fix:** Add Recharts line chart component

4. **Static Priorities:** Tasks are hardcoded, not dynamic
   - **Impact:** Can't mark complete or add new tasks
   - **Fix:** Implement Task model and API

### Future Enhancements
- [ ] Add keyboard shortcuts (e.g., Ctrl+S to save)
- [ ] Auto-save draft every 30 seconds
- [ ] Offline mode with IndexedDB cache
- [ ] Bulk import from Excel spreadsheet
- [ ] Voice input for hands-free entry
- [ ] Print-friendly view for documentation

---

## 📚 Code References

### Key Files
- **Dashboard Page:** `app/(dashboard)/dashboard/culinary/page.tsx` (530 lines)
- **API Route:** `app/api/metrics/route.ts` (170 lines)
- **Form Component:** `components/ui/form.tsx` (200 lines)
- **Badge Component:** `components/ui/badge.tsx` (50 lines)
- **Prisma Schema:** `prisma/schema.prisma` (Metric model, lines 25-50)

### Important Functions
- **Line 38:** `getMetricStatus()` - Determines color indicator
- **Line 51:** `CulinaryDashboard()` - Main component
- **Line 75:** `fetchTodayMetrics()` - API call to load existing data
- **Line 99:** `onSubmit()` - Form submission handler
- **Line 495:** `MetricBadge()` - Helper component for badges
- **Line 510:** `MetricDisplay()` - Helper component for snapshot

---

## 🎓 Learning Resources

### Technologies Used
- **Next.js 14:** https://nextjs.org/docs
- **React Hook Form:** https://react-hook-form.com/
- **Zod Validation:** https://zod.dev/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com/
- **date-fns:** https://date-fns.org/

### Related PRD Sections
- **Epic 1: Metric Tracking** (AOR_App_PRD.md, lines 99-113)
- **FR-3: Metric Entry** (lines 219-228)
- **FR-4: Metric Visualization** (lines 230-237)
- **NFR-2: Usability** (lines 341-346)

---

**Built with ❤️ for Chili's #605**
**Version:** 1.0.0 (MVP Phase 1)
**Last Updated:** November 1, 2025
