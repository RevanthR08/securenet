# Dashboard Page - Implementation Guide

## 📋 Overview
The Dashboard page is the main analytics and monitoring center for SentinelX users. It displays threat statistics, recent activity, fraud categories, and provides quick URL testing.

---

## ✅ Frontend - What's Implemented

### 1. **UI Components**
- ✅ Quick stats cards (Total Scans, Blocked, Allowed, Warned)
- ✅ Detection timeline chart (Line chart)
- ✅ Fraud categories breakdown (Pie chart)
- ✅ Recent activity feed
- ✅ Quick URL test section
- ✅ Responsive design (mobile + desktop)

### 2. **Features**
- ✅ Real-time stats display
- ✅ Chart visualizations with Recharts
- ✅ URL quick-test buttons
- ✅ Activity status indicators (Blocked/Allowed/Warned)
- ✅ Chart error handling with SafeChart wrapper
- ✅ Loading states

### 3. **Current Data Sources**
```javascript
// Stats from backend
- Total Scans: GET /api/stats/summary
- Blocked count: statsData.dangerous or statsData.blocked
- Allowed count: statsData.safe or statsData.allowed
- Warned count: statsData.medium or statsData.warned

// User Profile (if logged in)
- GET /api/profile?user_id={userId}
- Displays Aura balance, user stats
```

### 4. **Placeholder Data**
Currently using empty arrays for charts (will show empty until backend provides data):
- `timelineData = []` - For detection timeline chart
- `fraudCategories = []` - For fraud breakdown pie chart
- `recentActivity = []` - For recent scans list

---

## ❌ Backend - What's Needed

### 1. **Current Connected Endpoints** ✅
These are already integrated and working:

#### GET `/api/stats/summary`
**Purpose:** Public statistics for dashboard overview
**Auth Required:** No
**Current Implementation:**
```javascript
const response = await statsService.getSummary();
// Frontend expects:
{
  total_scans: 1250,      // or total_scans
  dangerous: 56,          // or blocked
  safe: 1150,            // or allowed
  medium: 44             // or warned
}
```

#### GET `/api/profile?user_id={UUID}`
**Purpose:** User-specific profile and Aura balance
**Auth Required:** Yes (Bearer token)
**Current Implementation:**
```javascript
const profileData = await profileService.getProfile(userId);
// Frontend expects:
{
  user_id: "uuid",
  name: "User Name",
  email: "user@example.com",
  aura_balance: 180,
  reports_count: 12,
  verified_reports: 9
}
```

---

### 2. **Missing Backend Endpoints** ❌

These endpoints are **NOT yet implemented** but the frontend is ready to consume them:

#### GET `/api/dashboard/timeline?days=7`
**Purpose:** Threat detection timeline data for the chart
**Auth Required:** Yes
**Expected Response:**
```json
{
  "timeline": [
    {
      "date": "Jan 11",
      "blocked": 12,
      "warned": 5,
      "allowed": 18
    },
    {
      "date": "Jan 12",
      "blocked": 28,
      "warned": 8,
      "allowed": 22
    }
  ]
}
```

**Frontend Integration Point:**
```javascript
// In Dashboard component, add:
const timelineData = await dashboardService.getTimeline(7);
// Will populate the line chart automatically
```

---

#### GET `/api/dashboard/fraud-categories`
**Purpose:** Breakdown of fraud types detected
**Auth Required:** Yes
**Expected Response:**
```json
{
  "categories": [
    {
      "name": "UPI Scam",
      "value": 35,
      "color": "#ef4444"
    },
    {
      "name": "Banking Phishing",
      "value": 28,
      "color": "#f97316"
    },
    {
      "name": "Govt Scheme Fraud",
      "value": 18,
      "color": "#8b5cf6"
    },
    {
      "name": "Investment Scam",
      "value": 12,
      "color": "#06b6d4"
    },
    {
      "name": "Job Offer Scam",
      "value": 7,
      "color": "#22c55e"
    }
  ]
}
```

**Frontend Integration Point:**
```javascript
// In Dashboard component, add:
const fraudCategories = await dashboardService.getFraudCategories();
// Will populate the pie chart automatically
```

---

#### GET `/api/dashboard/recent-activity?limit=6`
**Purpose:** Recent scans and their verdicts
**Auth Required:** Yes (user-specific activity)
**Expected Response:**
```json
{
  "activity": [
    {
      "url": "paytm-verify-kyc-secure.xyz",
      "type": "UPI Phishing",
      "status": "blocked",
      "timestamp": "2024-01-17T14:30:00Z"
    },
    {
      "url": "google.com",
      "type": "Safe Website",
      "status": "allowed",
      "timestamp": "2024-01-17T14:25:00Z"
    },
    {
      "url": "sbi-netbanking-login.com",
      "type": "Banking Phishing",
      "status": "blocked",
      "timestamp": "2024-01-17T14:20:00Z"
    }
  ]
}
```

**Frontend Integration Point:**
```javascript
// In Dashboard component, add:
const recentActivity = await dashboardService.getRecentActivity(6);
// Will populate the activity feed automatically
```

---

## 🔧 How to Connect Missing Endpoints

### Step 1: Add to `src/services/services.js`
```javascript
export const dashboardService = {
  getTimeline: async (days = 7) => {
    const response = await api.get(`/api/dashboard/timeline?days=${days}`);
    return response.data.timeline || [];
  },

  getFraudCategories: async () => {
    const response = await api.get('/api/dashboard/fraud-categories');
    return response.data.categories || [];
  },

  getRecentActivity: async (limit = 6) => {
    const response = await api.get(`/api/dashboard/recent-activity?limit=${limit}`);
    return response.data.activity || [];
  },
};
```

### Step 2: Update Dashboard component
In `src/pages/Dashboard/index.jsx`, replace placeholder arrays:

```javascript
import { dashboardService } from '../../services/services';

const Dashboard = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [fraudCategories, setFraudCategories] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [timeline, categories, activity] = await Promise.all([
          dashboardService.getTimeline(7),
          dashboardService.getFraudCategories(),
          dashboardService.getRecentActivity(6)
        ]);
        
        setTimelineData(timeline);
        setFraudCategories(categories);
        setRecentActivity(activity);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Rest of component...
};
```

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│   Dashboard     │
│   Component     │
└────────┬────────┘
         │
         ├─── GET /api/stats/summary (✅ Connected)
         │    └─► Quick Stats Cards
         │
         ├─── GET /api/profile?user_id=X (✅ Connected)
         │    └─► User Aura Balance
         │
         ├─── GET /api/dashboard/timeline (❌ Missing)
         │    └─► Line Chart (Empty for now)
         │
         ├─── GET /api/dashboard/fraud-categories (❌ Missing)
         │    └─► Pie Chart (Empty for now)
         │
         └─── GET /api/dashboard/recent-activity (❌ Missing)
              └─► Activity Feed (Empty for now)
```

---

## 🎯 Priority Summary

| Feature | Status | Priority |
|---------|--------|----------|
| Quick Stats Display | ✅ Working | - |
| User Profile Display | ✅ Working | - |
| Timeline Chart | ⚠️ Empty | HIGH |
| Fraud Categories Chart | ⚠️ Empty | MEDIUM |
| Recent Activity Feed | ⚠️ Empty | MEDIUM |

---

## 📝 Notes for Backend Developer

1. **Authentication**: All dashboard endpoints should require Bearer token except `/api/stats/summary`
2. **User Context**: Timeline, categories, and activity should be user-specific (based on JWT user_id)
3. **Caching**: Consider caching `/api/stats/summary` as it's public and high-traffic
4. **Date Format**: Use ISO 8601 format for timestamps
5. **Colors**: Frontend handles colors for fraud categories - you can return predefined colors or let frontend assign them
6. **Performance**: Dashboard loads all data on mount - keep response times under 500ms

---

## 🚀 Testing

Once backend endpoints are ready:

1. Start backend on `http://localhost:8080`
2. Login to SentinelX
3. Navigate to Dashboard (`/dashboard`)
4. Charts and activity feed should populate automatically
5. Check browser console for any errors

---

## 📂 Related Files

- **Frontend**: `src/pages/Dashboard/index.jsx`
- **Services**: `src/services/services.js`
- **Styles**: `src/pages/Dashboard/Dashboard.css`
- **API Config**: `src/services/api.js`
