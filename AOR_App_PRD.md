# Product Requirements Document (PRD)
## AOR Leader Management Application

**Project Name:** AOR Leader App  
**Version:** 1.0 (Phase 1 MVP)  
**Date:** October 31, 2025  
**Owner:** Johnohhh (Managing Partner, Chili's #605)  
**Status:** Ready for Development  

---

## 1. EXECUTIVE SUMMARY

### Overview
The AOR (Area of Ownership) Leader Management Application is a comprehensive digital tool designed to help Culinary Leaders, Hospitality Leaders, and To-Go/Bar Leaders at Chili's Bar & Grill manage their daily, weekly, monthly, and quarterly responsibilities efficiently. The application replaces manual tracking methods (spreadsheets, paper forms, binders) with a centralized, mobile-friendly platform that ensures accountability, tracks performance metrics, and streamlines operational excellence.



### Success Criteria
- **Adoption:** 100% of 3 leader roles using daily (Culinary, Hospitality, To-Go/Bar)
- **Efficiency:** Reduce administrative time from 2-3 hours/week to <30 minutes/week
- **Compliance:** 95%+ on-time task completion rate
- **Performance:** Improve key metrics (GWAP, Server Attentive, Missing Items) by 10%+ within 90 days
- **Satisfaction:** 8/10+ user satisfaction score after 30 days



### Current State
Leaders at Chili's #605 are responsible for extensive operational oversight across their Areas of Ownership. Each role (Culinary, Hospitality, To-Go/Bar) has:
- 15-20 recurring tasks at various frequencies (daily, weekly, EOP, monthly, quarterly)
- 5-8 key performance metrics to track and trend
- 8-12 team members to coach, train, and schedule
- Corporate Big Swings initiatives to execute and validate
- Quarterly check-ins requiring documentation and reflection

**Pain Points:**
1. **Fragmentation:** Data scattered across Excel, paper forms, email, SMS
2. **Missed Deadlines:** No automated reminders for time-sensitive tasks (schedules due Mon 5pm)
3. **Poor Visibility:** Can't quickly see trends or identify struggling team members
4. **Manual Entry:** Duplicate data entry across multiple systems
5. **Compliance Risk:** Paper forms can be lost, damaged, or incomplete
6. **Coaching Gaps:** Reactive coaching when metrics drop vs proactive intervention

### Desired State
Leaders have a single, mobile-friendly application where they:
- See daily priorities automatically prioritized by urgency
- Enter metrics once and see instant trend analysis
- Get proactive alerts when team members need coaching
- Access their data anywhere (phone, tablet, desktop)
- Generate reports for quarterly check-ins in seconds
- Spend time leading people, not managing paperwork

---

## 3. GOALS & OBJECTIVES

### Primary Goals
1. **Reduce Administrative Burden:** Cut paperwork time by 75%
2. **Improve Compliance:** Achieve 95%+ on-time completion of recurring tasks
3. **Enhance Performance:** Drive 10%+ improvement in key metrics within 90 days
4. **Enable Proactive Management:** Identify coaching needs before metrics drop

### Secondary Goals
5. **Increase Visibility:** Give GM real-time view of all 3 AOR areas
6. **Standardize Documentation:** Consistent coaching note format and retention
7. **Support Growth:** Scalable to other Chili's locations beyond #605
8. **Future Integration:** Foundation for ChiliHead OpsManager connectivity

### Non-Goals (Explicitly Out of Scope for MVP)
- POS system integration (manual entry for Phase 1)
- KitchenSync real-time data pulls
- Team member scheduling tool (track posting, not create schedules)
- Inventory management
- Time clock/payroll integration
- Multi-location management (single store for MVP)

---

## 4. USER PERSONAS



---



---



---



---

## 5. USER STORIES & USE CASES

### Epic 1: Metric Tracking
**As a** Culinary Leader  
**I want to** enter daily metrics (Food Great @ 72, Safe Score, Spec/Sold 100%)  
**So that** I can track trends and identify issues before corporate audits  

**Acceptance Criteria:**
- Form with 5 key metrics (Food Great, Safe Score, Spec/Sold, TM's >72, Pull Thaw)
- Date defaults to today, can select past dates for catch-up
- Validation: percentages 0-100, counts must be integers
- Auto-save draft on field blur (offline support)
- Success confirmation with "View Trends" link
- Mobile-friendly (thumb-reachable buttons)



---

### Epic 2: Task Management
**As a** Hospitality Leader  
**I want to** see my daily, weekly, and monthly tasks in priority order  
**So that** I never miss critical deadlines (like FOH schedule posting)  

**Acceptance Criteria:**
- Task list auto-generates based on frequency (daily/weekly/monthly/quarterly)
- Due dates calculated automatically (e.g., "Schedule due: Next Mon 5pm")
- Priority sort: Overdue → Due Today → Due This Week → Future
- Visual indicators: Red (overdue), Yellow (due soon), Green (on track)
- One-click mark complete with timestamp
- Recurring tasks auto-regenerate after completion



---

### Epic 3: Team Performance Tracking
**As a** To-Go/Bar Leader  
**I want to** track individual team member performance (ToGo Missing Items)  
**So that** I can coach proactively and praise high performers  

**Acceptance Criteria:**
- List view of all team members with current performance
- Color-coded indicators: Green (<9%), Yellow (9-11%), Red (>11%)
- Click team member to see 30-day trend
- "Add Coaching Note" button for below-target TMs
- "Send Praise" button for above-target TMs
- Filter by position (ToGo, Bartender, Bar Server)



---

### Epic 4: Schedule Posting Tracker
**As a** Culinary/Hospitality Leader  
**I want to** track when schedules are posted vs deadline  
**So that** I maintain compliance and avoid last-minute scrambles  

**Acceptance Criteria:**
- Dedicated "Schedule Tracker" widget on dashboard
- Shows: Next due date (Mon 5pm), countdown timer, completion status
- History view: Last 12 weeks posted on-time or late
- Notification settings: 1 day before, 4 hours before, 1 hour before
- One-click "Mark Posted" with automatic timestamp
- Warning if marked late (after 5pm Monday)



---

### Epic 5: Big Swings Tracker
**As any** Leader  
**I want to** track progress on quarterly Big Swings initiatives  
**So that** I can demonstrate execution during quarterly check-ins  

**Acceptance Criteria:**
- List of current quarter's Big Swings (e.g., F26 Q2)
- Progress bars for each initiative (0-100%)
- Sub-tasks: Southwest Queso, Chicken Bacon Ranch Nachos, etc.
- Photo upload for validation (e.g., Burger Mitts compliance)
- Notes field for execution challenges
- Auto-generates report for quarterly check-in



---

### Epic 6: Coaching Notes & Documentation
**As any** Leader  
**I want to** document coaching conversations with timestamps  
**So that** I have evidence for performance reviews and accountability  

**Acceptance Criteria:**
- Quick-add coaching note from any team member view
- Required fields: Date, Team Member, Topic, Notes
- Optional: Follow-up date, Action items
- Searchable by team member, date range, topic
- Export to PDF for quarterly reviews
- Notes retained for 12 months minimum



---

## 6. FUNCTIONAL REQUIREMENTS

### FR-1: Authentication & Authorization
- FR-1.1: User login with email/password
- FR-1.2: Role assignment (Culinary, Hospitality, To-Go/Bar, GM)
- FR-1.3: Role-based views (leaders see only their AOR)
- FR-1.4: GM role sees all 3 AORs in read-only mode
- FR-1.5: Password reset via email
- FR-1.6: Session timeout after 4 hours of inactivity

### FR-2: Dashboard
- FR-2.1: Today's Priorities card (due today + overdue)
- FR-2.2: Key Metrics snapshot (top 5 per role)
- FR-2.3: Weekly overview card (tasks completed, training %)
- FR-2.4: Quick links to most-used features
- FR-2.5: Notification badge for unread alerts
- FR-2.6: Role selector toggle (if user has multiple roles)

### FR-3: Metric Entry
- FR-3.1: Daily metric form per role:
  - Culinary: Food Great @ 72, Safe Score, Spec/Sold 100%, TM's >72, Pull Thaw
  - Hospitality: Dine-In GWAP, Server Attentive, Clean, Incremental Add-Ons, Runner Gap
  - To-Go/Bar: ToGo GWAP, Missing Items, Bar Incremental, MCR Sign Ups
- FR-3.2: Date picker (default today, can enter past dates)
- FR-3.3: Field validation with error messages
- FR-3.4: Optional notes field (max 500 characters)
- FR-3.5: Auto-save draft every 30 seconds
- FR-3.6: Success confirmation with "View Trends" link

### FR-4: Metric Visualization
- FR-4.1: Line graph for each metric (last 30 days default)
- FR-4.2: Target line overlay (e.g., 1.4% for Dine-In GWAP)
- FR-4.3: Color zones: Green (on target), Yellow (warning), Red (critical)
- FR-4.4: Date range selector (7/30/90 days, custom)
- FR-4.5: Hover tooltips with exact values
- FR-4.6: Export chart as PNG or include in PDF report

### FR-5: Task Management
- FR-5.1: Auto-generated task list based on role + frequency
- FR-5.2: Task frequencies: Daily, Weekly, Mon-Wed, EOP, Monthly, Quarterly, Yearly, Custom
- FR-5.3: Calculated due dates (e.g., "Next Monday 5pm" for schedules)
- FR-5.4: Priority sort: Overdue → Due Today → This Week → Future
- FR-5.5: Mark complete with timestamp
- FR-5.6: Add notes to task (optional)
- FR-5.7: Recurring tasks regenerate automatically
- FR-5.8: Filter: All, Today, This Week, Overdue, Completed
- FR-5.9: Search tasks by keyword

### FR-6: Schedule Tracker
- FR-6.1: Dedicated widget showing next schedule deadline
- FR-6.2: Countdown timer (e.g., "Due in 23 hours")
- FR-6.3: "Mark Posted" button with timestamp capture
- FR-6.4: History view (last 12 weeks)
- FR-6.5: On-time percentage calculation
- FR-6.6: Late posting warning (if after 5pm Monday)
- FR-6.7: Notification settings (1 day, 4 hours, 1 hour before)

### FR-7: Team Management
- FR-7.1: Add team members (name, position, hire date)
- FR-7.2: Assign to leader (Culinary → HOH, Hospitality → FOH, etc.)
- FR-7.3: Performance tracking per team member
- FR-7.4: Color-coded indicators (green/yellow/red based on targets)
- FR-7.5: Individual trend graphs (30-day default)
- FR-7.6: Filter by position, status, performance level

### FR-8: Training Tracker
- FR-8.1: Training types per role:
  - Culinary: HOH Training, HOH VAT, HOH VFD
  - Hospitality: FOH Training, FOH VAT, FOH VFD
  - To-Go/Bar: Similar structure
- FR-8.2: Track completion status (not started, in progress, completed)
- FR-8.3: Completion date and expiration date (if applicable)
- FR-8.4: @ 90% goal tracker (e.g., 8/9 certified = 89%)
- FR-8.5: Alert when falling below 90%
- FR-8.6: Bulk update (e.g., mark all HOH as VAT certified)

### FR-9: Coaching Notes
- FR-9.1: Quick-add from team member view
- FR-9.2: Required fields: Date, Team Member, Topic, Notes
- FR-9.3: Optional: Follow-up date, Action items
- FR-9.4: Timestamp and leader name auto-captured
- FR-9.5: Search by team member, date range, topic, keyword
- FR-9.6: View coaching history per team member
- FR-9.7: Export to PDF (individual or bulk)
- FR-9.8: Reminder notification on follow-up date

### FR-10: Connection Board (Digital)
- FR-10.1: Post recognition, goals, or issues
- FR-10.2: Required fields: Type (recognition/goal/issue), Text (max 280 chars)
- FR-10.3: Optional: Attach to team member, Add photo
- FR-10.4: Last updated timestamp visible
- FR-10.5: Export to PDF for printing/posting
- FR-10.6: "Daily Update Required" indicator if not updated today

### FR-11: Big Swings Tracker
- FR-11.1: List current quarter's initiatives (e.g., F26 Q2)
- FR-11.2: Sub-tasks per initiative with checkboxes
- FR-11.3: Progress bar calculation (completed / total tasks)
- FR-11.4: Photo upload for validation (max 5MB per photo)
- FR-11.5: Notes field per initiative
- FR-11.6: Export progress report (PDF) for quarterly check-in

### FR-12: Reports & Export
- FR-12.1: Weekly summary report (auto-generated Monday mornings)
- FR-12.2: Monthly performance report
- FR-12.3: Quarterly check-in report (all AOR data)
- FR-12.4: Custom date range reports
- FR-12.5: Export formats: PDF, Excel
- FR-12.6: Email report directly from app

### FR-13: Notifications
- FR-13.1: Push notifications (browser, mobile PWA)
- FR-13.2: Email notifications (daily digest, critical alerts)
- FR-13.3: Notification types:
  - Task due soon (1 day, 4 hours, 1 hour before)
  - Metric entered successfully
  - Team member needs coaching (below target 3+ days)
  - Training certification expiring
  - Schedule deadline approaching
- FR-13.4: Notification settings page (enable/disable per type)
- FR-13.5: Snooze option (1 hour, 4 hours, 1 day)

### FR-14: Data Import (Phase 2)
- FR-14.1: Upload Excel (.xlsx) or CSV
- FR-14.2: Column mapping interface
- FR-14.3: Preview data before import (first 10 rows)
- FR-14.4: Validation with error reporting
- FR-14.5: Import history log
- FR-14.6: Template download for standard format

---

## 7. NON-FUNCTIONAL REQUIREMENTS

### NFR-1: Performance
- NFR-1.1: Page load time <2 seconds on 4G mobile
- NFR-1.2: Form submission response <500ms
- NFR-1.3: Chart rendering <1 second for 90 days of data
- NFR-1.4: Support 10 concurrent users (3 leaders + GM + future expansion)

### NFR-2: Usability
- NFR-2.1: Mobile-first responsive design (320px to 1920px)
- NFR-2.2: Touch targets min 44x44px (Apple HIG)
- NFR-2.3: Maximum 3 clicks to reach any feature
- NFR-2.4: Keyboard shortcuts for power users (optional)
- NFR-2.5: Consistent UI patterns (same button styles, spacing, colors)

### NFR-3: Accessibility
- NFR-3.1: WCAG 2.1 Level AA compliance
- NFR-3.2: Screen reader compatible (ARIA labels)
- NFR-3.3: High contrast mode option
- NFR-3.4: Minimum font size 16px (18px preferred)
- NFR-3.5: Color is not sole indicator (use icons + text)

### NFR-4: Security
- NFR-4.1: HTTPS only (TLS 1.3)
- NFR-4.2: Password requirements: 8+ chars, 1 upper, 1 lower, 1 number
- NFR-4.3: Rate limiting on API endpoints (100 req/min per user)
- NFR-4.4: SQL injection prevention (parameterized queries)
- NFR-4.5: XSS prevention (sanitize inputs)
- NFR-4.6: CSRF tokens on all forms
- NFR-4.7: Session tokens rotated on role change

### NFR-5: Reliability
- NFR-5.1: 99.5% uptime target (43 minutes downtime/month)
- NFR-5.2: Automated daily backups (retained 30 days)
- NFR-5.3: Graceful degradation if database unavailable
- NFR-5.4: Offline mode for metric entry (sync when online)
- NFR-5.5: Error logging with Sentry or similar

### NFR-6: Scalability
- NFR-6.1: Support up to 50 users (10 locations * 5 managers)
- NFR-6.2: Handle 1000 metric entries per day
- NFR-6.3: Store 2 years of historical data
- NFR-6.4: Database queries <100ms for typical operations

### NFR-7: Maintainability
- NFR-7.1: TypeScript for type safety
- NFR-7.2: Component-based architecture (reusable UI)
- NFR-7.3: API documentation (OpenAPI/Swagger)
- NFR-7.4: Code comments for complex business logic
- NFR-7.5: Automated tests for critical paths (80% coverage goal)

### NFR-8: Compatibility
- NFR-8.1: Browsers: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+
- NFR-8.2: Mobile: iOS 14+, Android 10+
- NFR-8.3: Progressive Web App (PWA) installable
- NFR-8.4: Works on tablets (iPad, Android tablets)

---

## 8. TECHNICAL REQUIREMENTS

### TR-1: Frontend Stack
- **Framework:** Next.js 14+ (App Router, React Server Components)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS 3+ + shadcn/ui components
- **Forms:** react-hook-form + zod validation
- **Charts:** Recharts or Chart.js
- **State:** TanStack React Query (server state) + Zustand (client state)
- **Icons:** lucide-react
- **Date Handling:** date-fns
- **HTTP Client:** Fetch API (native) or Axios

### TR-2: Backend Stack (Option 1: Next.js API Routes)
- **API:** Next.js API Routes (TypeScript)
- **ORM:** Prisma or Drizzle ORM
- **Validation:** Zod schemas
- **Authentication:** NextAuth.js or custom JWT

### TR-2 (Alternative): Backend Stack (Option 2: FastAPI)
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+
- **ORM:** SQLAlchemy
- **Validation:** Pydantic models
- **Authentication:** JWT tokens (PyJWT)

### TR-3: Database
- **RDBMS:** PostgreSQL 15+
- **Hosting:** Supabase (free tier: 500MB) or Railway
- **Migrations:** Prisma Migrate (Option 1) or Alembic (Option 2)
- **Backup:** Automated daily backups to S3 or Supabase built-in

### TR-4: Hosting & Deployment
- **Frontend:** Vercel (free tier)
- **Backend:** Vercel Serverless Functions (Option 1) or Railway (Option 2)
- **Domain:** Vercel subdomain (free) or custom domain
- **SSL:** Auto-provisioned via Vercel/Railway
- **CI/CD:** GitHub Actions → Vercel auto-deploy on push to main

### TR-5: File Storage (Phase 2+)
- **Service:** Vercel Blob Storage or Supabase Storage
- **Use Cases:** Photos for Big Swings validation, coaching documentation
- **Max Size:** 5MB per file, 100MB total per month (free tier)

### TR-6: Monitoring & Analytics
- **Error Tracking:** Sentry (free tier: 5K events/month)
- **Analytics:** Plausible (privacy-friendly) or PostHog
- **Logging:** Vercel Logs or Railway built-in logs
- **Uptime:** UptimeRobot (free tier: 50 monitors)

### TR-7: Email (Phase 1+)
- **Service:** Resend (free tier: 3K emails/month) or SendGrid
- **Use Cases:** Password resets, daily digests, critical alerts
- **Templates:** React Email for HTML templates

### TR-8: Notifications (Phase 2+)
- **Push:** Web Push API (browser native, free)
- **SMS:** Twilio (via ChiliHead OpsManager integration)
- **In-App:** Toast notifications (sonner library)

### TR-9: Development Tools
- **Package Manager:** pnpm (faster than npm)
- **Linter:** ESLint + Prettier
- **Git:** GitHub for version control
- **Editor:** VSCode with recommended extensions
- **AI Assistant:** Claude Code (sidebar) for development

---

## 9. MVP SCOPE (PHASE 1)

### IN SCOPE ✅
**Core Features:**
- ✅ User authentication (email/password)
- ✅ Role selection (Culinary, Hospitality, To-Go/Bar)
- ✅ Dashboard with today's priorities
- ✅ Metric entry forms (all 3 roles)
- ✅ Metric trend graphs (30-day default)
- ✅ Task list (auto-generated, recurring)
- ✅ Schedule tracker (Mon 5pm deadline)
- ✅ Mark tasks complete with timestamp
- ✅ Basic team member list
- ✅ Mobile-responsive design (PWA-ready)

**Data:**
- ✅ Manual metric entry (no POS integration)
- ✅ 30 days of historical data storage
- ✅ Basic export (copy/paste or print)

**Notifications:**
- ✅ In-app notifications (toast messages)
- ✅ Browser push (if permissions granted)

**Deployment:**
- ✅ Vercel hosting (frontend + API)
- ✅ Supabase PostgreSQL (free tier)
- ✅ HTTPS with Vercel SSL

### OUT OF SCOPE ❌ (Future Phases)
**Phase 2 Features:**
- ❌ Excel/CSV import
- ❌ PDF import with OCR
- ❌ Email notifications (daily digest)
- ❌ Coaching notes system
- ❌ Training tracker with @ 90% goal
- ❌ Digital Connection Board
- ❌ Team performance scorecards
- ❌ Photo upload for audits

**Phase 3 Features:**
- ❌ ChiliHead OpsManager integration
- ❌ SMS notifications via Twilio
- ❌ COS results dashboard
- ❌ Predictive analytics (trending alerts)
- ❌ Custom report builder
- ❌ Multi-location support

**Not Planned:**
- ❌ POS system integration
- ❌ KitchenSync real-time data
- ❌ Scheduling tool (create schedules)
- ❌ Inventory management
- ❌ Time clock integration
- ❌ Payroll integration

---

## 10. SUCCESS METRICS

### Adoption Metrics (Target: Within 30 Days)
- **User Activation:** 100% of 3 leader roles have logged in and entered ≥1 metric
- **Daily Active Users:** 80%+ of leaders use app 5+ days/week
- **Feature Usage:**
  - Metric entry: 95%+ of days have at least 1 metric per role
  - Task completion: 90%+ tasks marked complete on time
  - Schedule tracker: 100% schedules marked posted (on-time or late)

### Efficiency Metrics (Target: Within 60 Days)
- **Time Savings:** Reduce admin time from 2-3 hours/week to <30 min/week (self-reported)
- **Data Entry Speed:** <2 minutes to enter all daily metrics
- **Mobile Usage:** 60%+ of metric entries from mobile device

### Compliance Metrics (Target: Within 90 Days)
- **On-Time Tasks:** 95%+ of recurring tasks completed by due date
- **Schedule Posting:** 95%+ schedules posted before Mon 5pm deadline
- **Data Completeness:** 90%+ of days have complete metric data (no blanks)

### Performance Metrics (Target: Within 90 Days)
- **Culinary:**
  - Food Great @ 72: Maintain 95%+ (currently 98%)
  - Safe Score: Maintain 93%+ (currently 94%)
  - Spec/Sold 100%: Improve from 97% to 99%
- **Hospitality:**
  - Dine-In GWAP: Improve from 1.6% to 1.4% target
  - Server Attentive: Maintain 85%+ (currently 85%)
  - Clean Score: Improve from 75% to 78%
- **To-Go/Bar:**
  - ToGo Missing Items: Improve from 9.5% to 8% target
  - Bar Incremental: Maintain $11+ (currently $11.50)

### User Satisfaction (Target: After 30 Days)
- **NPS Score:** 8/10+ (would recommend to other leaders)
- **Ease of Use:** 9/10+ for mobile metric entry
- **Value:** 9/10+ for "saves me time" sentiment
- **Retention:** 100% still using after 90 days

---

## 11. TIMELINE & MILESTONES

### Pre-Development (Complete)
- ✅ **Oct 31:** AOR responsibilities documented
- ✅ **Oct 31:** App concept designed
- ✅ **Oct 31:** PRD written

### Phase 1: MVP Development (3-4 Weeks)

**Week 1: Foundation (Nov 4-10)**
- Day 1-2: Next.js project setup, database schema, authentication
- Day 3-4: Dashboard layout, role selection, routing
- Day 5-7: Basic UI components (shadcn/ui), styling

**Milestone 1.1:** Can log in, see dashboard, switch roles

---

**Week 2: Core Features (Nov 11-17)**
- Day 1-3: Metric entry forms (all 3 roles) with validation
- Day 4-5: Save metrics to database, retrieve for display
- Day 6-7: Task list (auto-generation, mark complete)

**Milestone 1.2:** Can enter metrics, see task list, mark tasks done

---

**Week 3: Data & Trends (Nov 18-24)**
- Day 1-3: Trend graphs (line charts for each metric)
- Day 4-5: Schedule tracker widget
- Day 6-7: Mobile responsive testing and fixes

**Milestone 1.3:** Can see metric trends, track schedule posting, works on mobile

---

**Week 4: Polish & Deploy (Nov 25-Dec 1)**
- Day 1-2: Error handling, loading states, toast notifications
- Day 3: Browser testing (Chrome, Safari, Firefox)
- Day 4: Deploy to Vercel staging environment
- Day 5: User acceptance testing with 1 leader
- Day 6-7: Bug fixes, final polish

**Milestone 1.4:** MVP deployed to production, first leader onboarded

---

### Phase 1: Post-Launch (Week 5-6, Dec 2-15)
- **Week 5:** Onboard remaining 2 leaders, collect feedback
- **Week 6:** Bug fixes, quick wins, prepare Phase 2 roadmap

**Milestone 1.5:** All 3 leaders using daily, 90%+ tasks on-time

---

### Phase 2: Enhanced Features (Weeks 7-10, Dec 16-Jan 12)
- Week 7: Excel/CSV import, team member management
- Week 8: Coaching notes system, training tracker
- Week 9: Digital Connection Board, photo uploads
- Week 10: Email notifications, export reports

**Milestone 2.1:** Phase 2 features launched, 30-day data imported

---

### Phase 3: Advanced Integration (Weeks 11-13, Jan 13-Feb 2)
- Week 11: ChiliHead OpsManager API integration (metrics sync)
- Week 12: SMS notifications via Twilio, predictive alerts
- Week 13: COS dashboard, custom reporting

**Milestone 3.1:** Full integration with OpsManager, unified notifications

---

## 12. DEPENDENCIES & RISKS

### Critical Dependencies
1. **Vercel Account:** Free tier limits (100GB bandwidth/month)
   - **Mitigation:** Monitor usage, upgrade if needed ($20/mo Pro)

2. **Supabase Database:** Free tier limits (500MB, 2GB bandwidth/month)
   - **Mitigation:** Start with free tier, migrate to Railway if needed

3. **Leader Availability:** Need 1-2 hours/week for feedback during development
   - **Mitigation:** Schedule recurring check-ins (Fridays 3pm)

4. **Historical Data:** Need past metrics for testing trend graphs
   - **Mitigation:** Create seed data, or use Phase 2 import for real data

### Technical Risks
1. **Next.js Learning Curve:** First Claude Code project
   - **Impact:** Medium | **Probability:** Low
   - **Mitigation:** Claude Code handles boilerplate, focus on business logic

2. **Mobile Performance:** Charts may be slow on older phones
   - **Impact:** Medium | **Probability:** Medium
   - **Mitigation:** Optimize chart rendering, test on target devices

3. **Offline Mode Complexity:** Auto-save + sync is tricky
   - **Impact:** Low | **Probability:** Medium
   - **Mitigation:** Defer to Phase 2, use simple auto-save for MVP

4. **Database Schema Changes:** May need migrations mid-development
   - **Impact:** Low | **Probability:** High
   - **Mitigation:** Use Prisma migrations, test on staging first

### Organizational Risks
1. **User Adoption:** Leaders may resist change from spreadsheets
   - **Impact:** High | **Probability:** Low
   - **Mitigation:** Co-design with leaders, emphasize time savings

2. **Data Entry Compliance:** Leaders forget to enter metrics daily
   - **Impact:** Medium | **Probability:** Medium
   - **Mitigation:** Push notifications, make entry <2 min, gamification

3. **Scope Creep:** Adding features mid-Phase 1
   - **Impact:** High | **Probability:** High
   - **Mitigation:** Strict MVP scope, defer to Phase 2 roadmap

---

## 13. FUTURE CONSIDERATIONS (Post-Phase 3)

### Multi-Location Expansion
- Scale to other Chili's locations (e.g., nearby stores)
- Add location switcher for multi-store GMs
- Aggregate reporting across locations
- White-label for Chili's corporate rollout

### Advanced Analytics
- Machine learning predictions (e.g., "GWAP will exceed target in 3 days")
- Anomaly detection (e.g., "Safe Score dropped 5% overnight")
- Correlation analysis (e.g., "Low Server Attentive correlates with high table turns")

### Team Gamification
- Leaderboards for MCR sign-ups, low missing items, etc.
- Badges/achievements for streak days (7 days no late tasks)
- Team challenges (e.g., "Lowest GWAP week wins prize")

### Corporate Integration
- API for Chili's corporate systems
- Auto-submit quarterly check-in reports
- Pull Big Swings initiatives from corporate calendar

### Voice/AI Features
- Voice entry for metrics (hands-free in kitchen)
- AI coaching suggestions based on trends
- Natural language queries ("How's my GWAP trending?")

---

## 14. OPEN QUESTIONS

**Need Answers Before Development:**

1. **Authentication:**
   - Simple password per role (easy, less secure)
   - Individual accounts per leader (proper, more setup)
   - **Recommendation:** Individual accounts with email/password

2. **GM Access:**
   - Read-only dashboard showing all 3 AORs?
   - Or just direct access to each leader's view?
   - **Recommendation:** Read-only unified dashboard for GM

3. **Historical Data:**
   - Import existing spreadsheet data for trends?
   - Start fresh with today's date?
   - **Recommendation:** Seed 30 days of sample data for testing, real import in Phase 2

4. **Branding:**
   - Use Chili's official colors/logo (need permission?)
   - Neutral design (gray/blue) to avoid trademark issues?
   - **Recommendation:** Start neutral, add branding if scaling

5. **Deployment Timeline:**
   - Launch MVP before Thanksgiving (Nov 28)?
   - Or wait until after holidays (Jan 2)?
   - **Recommendation:** Launch Dec 2 (Week 5), gives buffer for holidays



---

## 15. APPROVAL & SIGN-OFF

**PRD Author:** Johnohhh (Managing Partner, Chili's #605)  
**Date:** October 31, 2025  
**Version:** 1.0  



---

*This PRD is a living document and will be updated as requirements evolve. All changes require approval from the GM.*
