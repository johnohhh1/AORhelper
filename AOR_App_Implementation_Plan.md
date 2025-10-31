# AOR App - Cloud Implementation Plan
## Manual Entry First, Smart Integrations Later

---

## DATA STRATEGY (Revised)

### Phase 1: Manual Entry (MVP)
**Primary Data Input:**
- Leaders manually enter metrics daily/weekly
- Simple forms with validation (e.g., GWAP must be 0-100%)
- Quick-entry shortcuts for common values
- Auto-save/offline support

**Why This Works:**
- Leaders already do manual tracking in spreadsheets/binders
- Fast to build and deploy
- No dependency on POS/KitchenSync systems
- Gives us time to understand data patterns before automation

### Phase 2: Import Options
**Spreadsheet Upload:**
```
┌─────────────────────────────────────┐
│ Import Metrics                       │
├─────────────────────────────────────┤
│ [Upload Excel/CSV]                  │
│                                      │
│ Supported formats:                   │
│ • Excel (.xlsx)                     │
│ • CSV (.csv)                        │
│ • Google Sheets (link)              │
│                                      │
│ Template: [Download Template]       │
└─────────────────────────────────────┘
```

**PDF Import (OCR):**
- Upload photos of existing tracking sheets
- OCR extracts metrics
- Leader reviews/confirms before saving
- Useful for historical data migration

### Phase 3: ChiliHead OpsManager Integration
**Potential Integrations:**

1. **Gmail Intelligence Connection**
   - Deadline alerts from OpsManager → auto-populate task due dates
   - Corporate emails about Big Swings → update Big Swings tracker
   - Schedule requirement emails → flag in scheduling view

2. **SMS Notifications**
   - Use existing Twilio setup from OpsManager
   - Send AOR App alerts via same SMS system
   - Coordinate notifications (don't spam leaders)

3. **Shared Database**
   - OpsManager tracks corporate deadlines
   - AOR App tracks operational execution
   - Link tasks to deadlines for full visibility

4. **KPI Dashboard Sync**
   - Metrics entered in AOR App
   - Automatically populate OpsManager dashboard
   - Single source of truth for performance data

**API Design:**
```python
# Example integration endpoint
@app.post("/api/integrate/opsmanager")
async def sync_with_opsmanager(data: MetricData):
    """
    Send AOR metrics to ChiliHead OpsManager
    for unified dashboard display
    """
    opsmanager_url = settings.OPSMANAGER_API_URL
    response = await post_metrics(opsmanager_url, data)
    return {"synced": True, "timestamp": datetime.now()}
```

---

## REVISED IMPLEMENTATION PHASES

### Phase 1: Core MVP (3-4 weeks) - START HERE
**Focus: Manual Entry + Essential Features**

✅ **Must Have:**
- [ ] Role selection (Culinary/Hospitality/ToGo-Bar)
- [ ] Dashboard with today's priorities
- [ ] Basic task list (weekly/monthly recurring)
- [ ] Metric entry forms (top 5 per role)
- [ ] Schedule posting tracker (Mon 5pm deadline)
- [ ] Simple trend graphs (last 30 days)
- [ ] Mobile-responsive design

📊 **Manual Entry Forms:**

**Culinary:**
```
┌─────────────────────────────────────┐
│ Daily Metrics Entry                 │
│ Date: [Oct 31, 2025]                │
├─────────────────────────────────────┤
│ Food Great @ 72:     [___] %        │
│ Pull Thaw by 12pm:   ☑ Complete     │
│ Safe Score:          [___] %        │
│ Spec/Sold 100%:      [___] %        │
│ TM's >72 hours:      [___] count    │
│                                      │
│ Notes: [_____________________]      │
│                                      │
│ [Save] [Save & Next Day]            │
└─────────────────────────────────────┘
```

**Hospitality:**
```
┌─────────────────────────────────────┐
│ Daily Metrics Entry                 │
│ Date: [Oct 31, 2025]                │
├─────────────────────────────────────┤
│ Dine-In GWAP:        [___] %        │
│ Server Attentive:    [___] %        │
│ Clean Score:         [___] %        │
│ Incremental Add-Ons: $[___]         │
│ Runner Hour Gap:     [___] hours    │
│                                      │
│ Notes: [_____________________]      │
│                                      │
│ [Save] [Save & Next Day]            │
└─────────────────────────────────────┘
```

**To-Go/Bar:**
```
┌─────────────────────────────────────┐
│ Daily Metrics Entry                 │
│ Date: [Oct 31, 2025]                │
├─────────────────────────────────────┤
│ ToGo GWAP:           [___] %        │
│ Missing Items:       [___] %        │
│ Bar Incremental:     $[___]         │
│ MCR Sign Ups:        [___] count    │
│                                      │
│ Notes: [_____________________]      │
│                                      │
│ [Save] [Save & Next Day]            │
└─────────────────────────────────────┘
```

🎯 **Success Criteria:**
- Leader can enter a week of metrics in <5 minutes
- Dashboard shows accurate priorities every morning
- Tasks auto-populate based on frequency rules
- Mobile works perfectly on iPhone/Android

---

### Phase 2: Enhanced Features (3-4 weeks)
**Focus: Team Management + Import Options**

✅ **Add:**
- [ ] Team member performance tracking
- [ ] Coaching notes system
- [ ] Training tracker (@ 90% goal)
- [ ] Digital Connection Board
- [ ] **Excel/CSV Upload** for bulk metric entry
- [ ] **PDF Upload** with OCR for historical data
- [ ] Export reports (Excel, PDF)
- [ ] Email digest notifications

📤 **Import Flow:**
```
Step 1: Upload File
  ↓
Step 2: Map Columns
  "Column A" → Dine-In GWAP
  "Column B" → Server Attentive
  ↓
Step 3: Preview Data
  [Table showing 10 rows]
  ↓
Step 4: Confirm Import
  ✓ Imported 30 days of metrics
```

🎯 **Success Criteria:**
- Upload a month of data from Excel in <2 minutes
- Coaching notes easily searchable
- Training tracker shows exactly who needs what cert
- Export matches corporate reporting format

---

### Phase 3: Advanced Features (2-3 weeks)
**Focus: Analytics + ChiliHead OpsManager Integration**

✅ **Add:**
- [ ] COS results dashboard
- [ ] Predictive alerts (trending issues)
- [ ] Big Swings progress tracker
- [ ] Custom reporting builder
- [ ] **ChiliHead OpsManager API connection**
- [ ] **Unified notification system** (SMS via existing Twilio)
- [ ] **Deadline sync** from Gmail intelligence
- [ ] **KPI dashboard cross-posting**

🔗 **OpsManager Integration Options:**

**Option A: Lightweight (API Only)**
- AOR App posts metrics to OpsManager API
- OpsManager dashboard displays AOR metrics
- No shared database, just REST calls
- Easiest to implement, minimal coupling

**Option B: Medium (Shared Database)**
- Both apps use same PostgreSQL database
- Different schemas (opsmanager.*, aor.*)
- Real-time data sync
- More complex but more powerful

**Option C: Full Integration (Unified System)**
- AOR becomes a module within OpsManager
- Single login, single navigation
- Shared notifications, shared user management
- Most work but best user experience

**Recommendation: Start with Option A, migrate to B if valuable**

🎯 **Success Criteria:**
- Metrics auto-populate OpsManager dashboard
- SMS alerts use existing Twilio setup
- Corporate deadline emails create AOR tasks automatically
- Single pane of glass for all restaurant ops

---

## TECH STACK (Cloud-First)

### Frontend (Next.js)
```javascript
// Project Structure
/app
  /dashboard        // Main dashboard
  /culinary         // Culinary leader views
  /hospitality      // Hospitality leader views
  /togo-bar         // ToGo/Bar leader views
  /tasks            // Task management
  /metrics          // Metric entry & trends
  /team             // Team management
  /api              // API routes (Next.js)
/components
  /ui               // shadcn/ui components
  /charts           // Recharts components
  /forms            // Metric entry forms
/lib
  /db               // Database helpers
  /utils            // Utilities
```

**Key Libraries:**
- `next` - Framework
- `@tanstack/react-query` - Server state management
- `react-hook-form` + `zod` - Form handling & validation
- `recharts` - Charts/graphs
- `date-fns` - Date manipulation
- `lucide-react` - Icons
- `tailwindcss` + `shadcn/ui` - Styling

### Backend (FastAPI or Next.js API Routes?)

**Option 1: Next.js API Routes (Simpler)**
```typescript
// app/api/metrics/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Validate with Zod
  // Save to database
  // Return success
}
```
- All in one repo
- TypeScript end-to-end
- Simpler deployment
- **RECOMMENDED FOR PHASE 1**

**Option 2: Separate FastAPI Backend**
```python
# main.py
@app.post("/api/metrics")
async def save_metrics(metric: MetricCreate, db: Session):
    # Save to database
    return {"id": metric.id}
```
- Python backend (you already know this)
- Easier to integrate with OpsManager (also FastAPI)
- More flexibility for complex operations
- **Better for Phase 3 (OpsManager integration)**

**Recommendation: Start with Next.js API routes (Option 1), migrate to FastAPI if needed for OpsManager integration**

### Database
```sql
-- Core Tables

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL -- 'culinary', 'hospitality', 'togo_bar'
);

CREATE TABLE leaders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    leader_id INTEGER REFERENCES leaders(id),
    metric_date DATE NOT NULL,
    metric_type VARCHAR(50) NOT NULL, -- 'dine_in_gwap', 'server_attentive', etc.
    value DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(leader_id, metric_date, metric_type)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    role_id INTEGER REFERENCES roles(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    frequency VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly', etc.
    due_date DATE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    leader_id INTEGER REFERENCES leaders(id),
    name VARCHAR(100) NOT NULL,
    position VARCHAR(50) NOT NULL, -- 'server', 'cook', 'bartender', etc.
    hire_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE coaching_notes (
    id SERIAL PRIMARY KEY,
    team_member_id INTEGER REFERENCES team_members(id),
    leader_id INTEGER REFERENCES leaders(id),
    note_date DATE NOT NULL,
    topic VARCHAR(255) NOT NULL,
    notes TEXT NOT NULL,
    follow_up_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE training_records (
    id SERIAL PRIMARY KEY,
    team_member_id INTEGER REFERENCES team_members(id),
    training_type VARCHAR(100) NOT NULL, -- 'HOH_Training', 'HOH_VAT', etc.
    completed BOOLEAN DEFAULT FALSE,
    completion_date DATE,
    expiration_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- For Phase 2: Import tracking
CREATE TABLE imports (
    id SERIAL PRIMARY KEY,
    leader_id INTEGER REFERENCES leaders(id),
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- 'excel', 'csv', 'pdf'
    records_imported INTEGER,
    import_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) NOT NULL -- 'success', 'partial', 'failed'
);
```

### Deployment
- **Frontend**: Vercel (free tier to start)
- **Database**: Supabase (free tier, 500MB) or Railway PostgreSQL
- **File Storage**: Vercel Blob or Supabase Storage (for Phase 2 uploads)
- **Domain**: Use Vercel's free subdomain or your own

---

## CLAUDE CODE WORKFLOW

### Setting Up the Project
```bash
# Let Claude Code run this in the sidebar
npx create-next-app@latest aor-app --typescript --tailwind --app
cd aor-app
npx shadcn-ui@latest init
```

### Development Flow
1. **Tell Claude Code what you want:**
   - "Create the Culinary Leader dashboard page"
   - "Add a metric entry form for Hospitality Leader"
   - "Build a tasks list with filters"

2. **Claude Code will:**
   - Generate the necessary files
   - Install required packages
   - Create components
   - Set up routing
   - Handle TypeScript types

3. **You review and test:**
   - Check the UI in browser
   - Test functionality
   - Provide feedback
   - Iterate

### Example Prompt for Claude Code:
```
"Create a metric entry form for the Hospitality Leader with these fields:
- Dine-In GWAP (percentage, 0-100, target 1.4% or lower)
- Server Attentive (percentage, 0-100, target 83% or higher)
- Clean Score (percentage, 0-100, target 73% or higher)
- Incremental Add-Ons (currency, $0-$50)
- Runner Hour Gap (number, 0-24 hours, warning if >5)

Use react-hook-form with zod validation. Style with Tailwind and shadcn/ui.
Save to a Next.js API route that stores in PostgreSQL.
Show success toast on save."
```

Claude Code will generate all the files, types, validation, API route, and UI components.

---

## PHASE 1 DELIVERABLES CHECKLIST

### Week 1: Foundation
- [ ] Next.js project setup with TypeScript
- [ ] shadcn/ui components installed
- [ ] Database schema created
- [ ] Basic authentication (simple password or skip for MVP)
- [ ] Role selection page

### Week 2: Core Features
- [ ] Dashboard layout for all 3 roles
- [ ] Metric entry forms (all 3 roles)
- [ ] Task list with recurring logic
- [ ] Schedule tracker with Mon 5pm alert

### Week 3: Data & Display
- [ ] Database CRUD operations working
- [ ] Metric trend charts (line graphs)
- [ ] Today's priorities calculation
- [ ] Mobile responsive design

### Week 4: Polish & Deploy
- [ ] Error handling and validation
- [ ] Loading states and animations
- [ ] Deploy to Vercel
- [ ] Test with real data
- [ ] User feedback session

---

## POST-MVP ENHANCEMENTS (Pick and Choose)

### Quick Wins (1-2 days each)
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts (Cmd+K to quick-add metric)
- [ ] Print-friendly reports
- [ ] Bulk task completion
- [ ] Duplicate week's data (for consistent metrics)

### Medium Efforts (3-5 days each)
- [ ] Excel import wizard
- [ ] Email notifications (daily digest)
- [ ] Photo upload for audits
- [ ] Performance leaderboard
- [ ] Historical data comparison

### Big Features (1-2 weeks each)
- [ ] OCR for PDF imports
- [ ] ChiliHead OpsManager integration
- [ ] Predictive analytics (ML trending)
- [ ] Multi-location support
- [ ] Role-based permissions system

---

## QUESTIONS BEFORE STARTING

1. **Authentication:** Simple password per role, or proper user accounts?
2. **Hosting:** Vercel okay, or need specific hosting?
3. **Database:** Supabase free tier (500MB) sufficient to start?
4. **Timeline:** Want to ship Phase 1 in 3-4 weeks or faster?
5. **Branding:** Use Chili's colors/logo, or neutral design?
6. **Testing:** Just you, or rolling out to other managers at #605?

---

## NEXT STEPS

1. **Open Claude Code** in the sidebar
2. **Tell it:** "Create a new Next.js app for the AOR Leader Management System"
3. **Share this doc** with Claude Code for context
4. **Start with:** "Let's build the role selection page first"
5. **Iterate fast:** Build → Test → Refine
6. **Deploy often:** Push to Vercel after each feature

You've already built ChiliHead OpsManager, so you know the drill. This will be faster since:
- No email intelligence complexity
- No multi-agent coordination
- Just CRUD + forms + charts
- Claude Code handles the boilerplate

**Ready to start?** Let me know what you want to build first!
