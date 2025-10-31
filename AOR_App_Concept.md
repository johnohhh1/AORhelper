# Comprehensive AOR App - Concept Design
## For Culinary, Hospitality, and To-Go/Bar Leaders

---

## Core App Architecture

### Navigation Structure
```
┌─────────────────────────────────────────┐
│  [Culinary] [Hospitality] [To-Go/Bar]  │ ← Role Selector Tabs
├─────────────────────────────────────────┤
│  Dashboard | Tasks | Metrics | Team    │ ← Main Navigation
└─────────────────────────────────────────┘
```

---

## 1. DASHBOARD VIEW (Home Screen)

### Today's Priorities Card
```
┌─────────────────────────────────────┐
│ Today's Priorities - [Role Name]    │
│ Friday, October 31, 2025            │
├─────────────────────────────────────┤
│ ⚠️ CRITICAL                         │
│ □ HOH Schedule Due (5pm Deadline)   │ ← Culinary
│ □ Pull Thaw Check (12pm)            │ ← Culinary
│                                      │
│ 📊 METRICS TO ENTER                 │
│ □ Dine-In GWAP (Current: 1.6%)     │ ← Hospitality
│ □ Server Attentive Check            │ ← Hospitality
│ □ ToGo Missing Items                │ ← To-Go/Bar
│                                      │
│ ✅ COACHING NEEDED                  │
│ □ 3 Servers Below 82% Attentive     │ ← Hospitality
│ □ 2 TMs Over 9% Missing Items       │ ← To-Go/Bar
└─────────────────────────────────────┘
```

### Weekly/Monthly Overview Card
```
┌─────────────────────────────────────┐
│ This Week (Oct 28 - Nov 3)         │
├─────────────────────────────────────┤
│ Tasks: 12 of 15 Complete  ▓▓▓▓░     │
│ Training @ 90%: 7/8 Certified       │
│ Connection Board: Updated Daily ✓    │
└─────────────────────────────────────┘
```

### Metric Snapshot (Role-Specific)
**Culinary:**
```
┌─────────────────────────────────────┐
│ Key Metrics                          │
├─────────────────────────────────────┤
│ Food Great @ 72:        98% ✓       │
│ Safe Score:             94% ✓       │
│ Spec/Sold 100%:         97% ⚠️      │
│ TM's >72 hrs:           3 TMs       │
└─────────────────────────────────────┘
```

**Hospitality:**
```
┌─────────────────────────────────────┐
│ Key Metrics                          │
├─────────────────────────────────────┤
│ Dine-In GWAP:          1.2% ✓       │
│ Server Attentive:       85% ✓       │
│ Clean Score:            75% ⚠️      │
│ Incremental Add-Ons:    $8.20 ✓     │
└─────────────────────────────────────┘
```

**To-Go/Bar:**
```
┌─────────────────────────────────────┐
│ Key Metrics                          │
├─────────────────────────────────────┤
│ ToGo GWAP:             29% ✓        │
│ Missing Items:         7.5% ✓       │
│ Bar Incremental:       $11.50 ✓     │
│ MCR Sign Ups:          12 this week │
└─────────────────────────────────────┘
```

---

## 2. TASKS VIEW

### Task Management System
**Filter Bar:**
```
[All] [Due Today] [This Week] [Overdue] [Completed]
Sort: [Due Date ▼]
```

**Task Card Layout:**
```
┌─────────────────────────────────────┐
│ 🔴 HOH Schedules                    │
│ Due: Mon 5pm | Frequency: Weekly    │
├─────────────────────────────────────┤
│ Post 2 weeks out schedule           │
│ Status: [Not Started ▼]             │
│ [Mark Complete] [Add Note]          │
│                                      │
│ Last Completed: Oct 21, 5:00pm      │
└─────────────────────────────────────┘
```

### Recurring Task Categories:
- **Daily**: Pull Thaw Check, Connection Board Update, Metric Entry
- **Weekly**: Training checks, GWAP reviews, Coaching sessions, LINC By Whens
- **EOP**: Job Aids, Inventory, Checklists
- **Monthly**: Marketing Guide Validation, DSI Orders, Monthly Safety
- **Quarterly**: Trainer Meetings, Big Swing Rollouts, Steritech Self Audit

### Smart Reminders:
- Push notifications 1 day before
- Email digest every morning
- SMS for critical deadlines (optional)

---

## 3. METRICS VIEW

### Data Entry Interface
**Quick Entry Card:**
```
┌─────────────────────────────────────┐
│ Quick Metric Entry - [Date]         │
├─────────────────────────────────────┤
│ Dine-In GWAP:     [____] %          │
│ Server Attentive: [____] %          │
│ Clean Score:      [____] %          │
│                                      │
│ [Save] [Save & Email Report]        │
└─────────────────────────────────────┘
```

### Trend Visualization
**Chart Types:**
- Line graphs for daily/weekly trends
- Bar charts for TM performance comparisons
- Gauge charts for target tracking (e.g., 90% training goal)
- Heat maps for schedule adherence

**Example View:**
```
Dine-In GWAP Trend (Last 30 Days)
Target: 1.4% or lower

2.0% ┤
1.8% ┤     
1.6% ┤  ●     ●
1.4% ┼──────●─────●───●───● ← Target Line
1.2% ┤           ●   ●   ●
1.0% ┤
     └───────────────────────────
     Oct 1              Oct 31
```

### Performance Scorecards
**Individual TM Tracking:**
```
┌─────────────────────────────────────┐
│ Server Performance - Jane Doe       │
├─────────────────────────────────────┤
│ Attentive Score:    79% ⚠️ (Need 83%)│
│ Clean Score:        88% ✓           │
│ Trend:              ↑ Improving     │
│ Last Coaching:      Oct 25          │
│                                      │
│ [Add Coaching Note] [View History]  │
└─────────────────────────────────────┘
```

### COS Results Dashboard
**Culinary:**
```
┌─────────────────────────────────────┐
│ COS - Food Results                  │
├─────────────────────────────────────┤
│ Top Issues:                          │
│ 1. Fries temp variance (12 items)   │
│ 2. Rib overcook (8 items)           │
│ 3. Queso portioning (5 items)       │
│                                      │
│ [View Full Report] [Add Action Plan]│
└─────────────────────────────────────┘
```

**To-Go/Bar:**
```
┌─────────────────────────────────────┐
│ COS - Liquor Results                │
├─────────────────────────────────────┤
│ Monthly Trends:                      │
│ Over-pour incidents:    ↓ -15%      │
│ Spec violations:        ↓ -8%       │
│ Margarita consistency:  ↑ +22%      │
│                                      │
│ [View Detailed Analysis]            │
└─────────────────────────────────────┘
```

---

## 4. TEAM VIEW

### Schedule Management
**Calendar View:**
```
┌─────────────────────────────────────┐
│ Week of Nov 4-10, 2025              │
│ [< Previous Week] [Next Week >]     │
├─────────────────────────────────────┤
│ MON  TUE  WED  THU  FRI  SAT  SUN  │
│  AM   AM   AM   AM   AM   AM   AM  │
│  PM   PM   PM   PM   PM   PM   PM  │
│                                      │
│ Status: ✓ Posted Mon 5pm            │
│ Coverage: 98% (2 open shifts)       │
└─────────────────────────────────────┘
```

### Training Tracker
```
┌─────────────────────────────────────┐
│ Training @ 90% Goal                 │
├─────────────────────────────────────┤
│ HOH Training:  8/9  (89%) ⚠️        │
│ HOH VAT:       9/9  (100%) ✓        │
│ HOH VFD:       8/9  (89%) ⚠️        │
│                                      │
│ Action: 1 TM needs VAT cert by Fri  │
│ [View Training Matrix]              │
└─────────────────────────────────────┘
```

### Coaching Notes System
```
┌─────────────────────────────────────┐
│ Recent Coaching Sessions            │
├─────────────────────────────────────┤
│ Oct 30 - John Smith (Server)        │
│ Topic: Server Attentive improvement │
│ Follow-up: Check scores on Nov 6    │
│                                      │
│ Oct 29 - Maria Garcia (ToGo)        │
│ Topic: Missing items (was 12%)      │
│ Follow-up: Daily check next week    │
│                                      │
│ [Add New Coaching Note]             │
└─────────────────────────────────────┘
```

### Connection Board (Digital)
```
┌─────────────────────────────────────┐
│ HOH Connection Board                │
│ Last Updated: Today 2:15pm          │
├─────────────────────────────────────┤
│ [Add Recognition] [Add Goal] [Issue]│
│                                      │
│ 🎉 Shoutout: Mike - Perfect temps!  │
│ 🎯 Goal: Zero queso portions off    │
│ ⚠️ Issue: Walk-in temp fluctuation  │
│                                      │
│ [View Full Board] [Export]          │
└─────────────────────────────────────┘
```

---

## 5. SHARED FEATURES (All Roles)

### Big Swings Tracker
```
┌─────────────────────────────────────┐
│ F26 Q2 Big Swings Progress          │
├─────────────────────────────────────┤
│ ChiliHead Hospitality               │
│ Progress: ▓▓▓▓▓▓▓░░░ 70%           │
│                                      │
│ Delicious Food & Drinks             │
│ □ Southwest Queso                   │
│ ✓ Chicken Bacon Ranch Nachos        │
│ □ Hot Product in Hot Wells          │
│                                      │
│ Chili's Clean & Safe                │
│ ✓ Burger Mitts                      │
│ □ Ice Machine                       │
│ ✓ Cold Hold: Chicken                │
└─────────────────────────────────────┘
```

### Marketing Guide Validation (Monthly)
```
┌─────────────────────────────────────┐
│ Marketing Guide - November          │
├─────────────────────────────────────┤
│ Items to Validate:                  │
│ □ POS updates installed             │
│ □ Signage correct & displayed       │
│ □ Menu boards updated               │
│ □ Team trained on new items         │
│                                      │
│ Due: Nov 30                         │
│ [Mark Complete] [Add Photos]        │
└─────────────────────────────────────┘
```

### Steritech Self Audit (Quarterly)
```
┌─────────────────────────────────────┐
│ Steritech Self Audit - Q2           │
├─────────────────────────────────────┤
│ Last Audit: Oct 15 - Score: 96      │
│ Next Due: Jan 15, 2026              │
│                                      │
│ Critical Items:                      │
│ ✓ Burger Mitts (24/24 checks)      │
│ ✓ Ice Machine (Weekly logs)        │
│ ⚠️ Cold Hold: 2 violations this Q   │
│                                      │
│ [Start New Audit] [View History]    │
└─────────────────────────────────────┘
```

---

## 6. TECHNICAL FEATURES

### Data Integration
- **Import**: Pull data from POS, scheduling systems, KitchenSync
- **Export**: Generate reports for GM review, email to corporate
- **API**: Connect to existing ChiliHead OpsManager if applicable

### Mobile Optimization
- Touch-friendly UI for floor use
- Offline mode for data entry (sync when online)
- Quick-action buttons for common tasks
- Voice notes for coaching documentation

### Notifications & Alerts
- Smart deadlines (e.g., "HOH Schedule due in 2 hours")
- Metric alerts (e.g., "Dine-In GWAP at 1.8%, above target")
- Team performance alerts (e.g., "3 servers need coaching")
- Daily digest email with priorities

### Reporting
- Weekly summary reports (auto-generated)
- Month-end performance review
- Quarterly Big Swing progress report
- Custom date range exports

---

## 7. ROLE-SPECIFIC UNIQUE FEATURES

### Culinary Leader Specifics
- **Pull Thaw Timer**: Countdown to 12pm deadline with alerts
- **Prep Order Tracker**: Digital job aid checklist
- **Food Great @ 72**: Photo upload for quality documentation
- **Safe Score Tracker**: Trending with action plan notes

### Hospitality Leader Specifics
- **Culture Calendar**: Monthly event planning with reminders
- **Guest Per Hour Calculator**: Real-time GPH tracking
- **Runner Hour Gap**: Automatic calculation from schedule
- **5/10 Culture Tracker**: Recognition event logging

### To-Go/Bar Leader Specifics
- **MCR Sign Up Tracker**: Daily goal tracking with leaderboard
- **B/W/L Inventory**: Beer/Wine/Liquor order planning
- **Perfect Pres Validation**: Monthly checklist with photos
- **2nd Bartender Scheduler**: Smart scheduling for peak times

---

## 8. USER EXPERIENCE DESIGN

### Color Coding System
- 🔴 Red: Overdue or Critical
- 🟡 Yellow: Due Soon or Warning
- 🟢 Green: Complete or On Track
- 🔵 Blue: Informational
- ⚫ Gray: Not Yet Due

### Quick Actions (Floating Button)
```
           [+]
         /  |  \
    [📊]  [✓]  [👥]
   Metric Task Team
```

### Accessibility
- Large touch targets (min 44x44px)
- High contrast mode
- Text-to-speech for coaching notes
- Screen reader compatible

---

## 9. IMPLEMENTATION PHASES

### Phase 1: Core MVP (4-6 weeks)
- Dashboard view with today's priorities
- Basic task management (weekly/monthly)
- Simple metric entry (top 3-5 per role)
- Schedule posting tracker

### Phase 2: Enhanced Features (4-6 weeks)
- Full task management system
- Comprehensive metrics with trends
- Team management with coaching notes
- Connection board digital version

### Phase 3: Advanced Analytics (4-6 weeks)
- COS results dashboard
- Predictive alerts (trending issues)
- Performance scorecards
- Custom reporting

### Phase 4: Integration & Polish (2-4 weeks)
- API integrations with POS/KitchenSync
- Mobile app optimization
- Notification system refinement
- User feedback incorporation

---

## 10. TECH STACK RECOMMENDATION

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts or Chart.js
- **State Management**: Zustand or React Query
- **Mobile**: PWA with offline support

### Backend
- **API**: FastAPI (Python)
- **Database**: PostgreSQL
- **Caching**: Redis
- **File Storage**: S3 or similar (for photos)
- **Task Queue**: Celery (for scheduled tasks/reminders)

### Infrastructure
- **Hosting**: Vercel (Frontend) + Railway/Render (Backend)
- **Monitoring**: Sentry
- **Analytics**: Plausible or PostHog
- **Email**: SendGrid or Resend
- **SMS**: Twilio (for critical alerts)

---

## 11. KEY SUCCESS METRICS

### Adoption Metrics
- Daily active users per role
- Tasks completed on time (target: >95%)
- Average time to complete daily priorities
- Mobile vs desktop usage ratio

### Operational Metrics
- Metrics entered consistently (target: 7 days/week)
- Training @ 90% goal achievement
- Schedule posting on-time rate
- Coaching documentation rate

### Business Impact
- GWAP improvement trends
- Server Attentive score increases
- Missing Items reduction
- Safe Score maintenance at 93%+

---

## QUESTIONS FOR REFINEMENT

1. **Data Sources**: Can we pull live data from POS/KitchenSync, or is this manual entry?
2. **User Management**: Single login per manager or shared team account?
3. **Photo Storage**: For audits/validation, what's the expected volume?
4. **Notification Preferences**: Email, SMS, Push - what do leaders want?
5. **Historical Data**: How far back should we keep records? (GM binder = 12 months)
6. **Multi-location**: Is this for #605 only, or will it scale to other locations?
7. **Corporate Reporting**: What formats do they want for submissions?
8. **Integration Priority**: Which system integration is most valuable first?

---

*This concept doc provides the foundation for building a comprehensive, role-specific AOR management system that keeps leaders on top of their responsibilities while reducing administrative overhead.*
