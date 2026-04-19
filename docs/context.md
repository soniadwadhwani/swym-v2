# Swym v2 – Prototype Context

## Overview
Swym is a smart swimming companion prototype consisting of two UIs: a fitness device simulator and a mobile app interface. The prototype is built with static HTML/CSS/JS and configured for deployment on Vercel.

## Folder Structure
```
swym-v2/
├── index.html                  # Landing page linking to both UIs
├── vercel.json                 # Vercel deployment config (static, no build step)
├── css/
│   ├── device.css              # Apple Watch simulator styles
│   └── app.css                 # Mobile app styles
├── js/
│   ├── device.js               # Device session logic (timers, counters, pace)
│   └── app.js                  # App login, role routing, screen navigation
├── html/
│   ├── device/
│   │   └── index.html          # Fitness device UI
│   └── app/
│       └── index.html          # Mobile app UI
├── images/                     # Placeholder for image assets
├── videos/                     # Placeholder for video assets
└── docs/
    └── context.md              # This file
```

## UI 1 – Device Simulator (html/device/)
- Styled as an **Apple Watch** with a rounded watch frame, crown button, and dark theme.
- **Idle screen**: displays a swim icon, "Pool Swim" label, and a green START button.
- **Active session screen**: on pressing START, three live counters begin:
  - **Distance** (meters) – simulated at ~1.2–1.8 m/s with randomness.
  - **Time** (mm:ss) – increments every second.
  - **Pace** (min/100m) – auto-calculated from distance and time.
- **Summary screen**: on pressing STOP, shows final distance, duration, average pace, and lap count (50m laps). A "New Session" button resets to idle.

## UI 2 – Mobile App (html/app/)
- Styled as an **iPhone** with a phone frame, notch, and status bar.
- **Login screen**: accepts a mobile number (+91) and password. Valid password for all accounts is `0000`.
- **Demo accounts & routing**:
  | Phone        | Name          | Role(s)          | Flow                          |
  |--------------|---------------|------------------|-------------------------------|
  | 9767676738   | Coach Rajesh  | Coach only       | → Coach Dashboard             |
  | 7666680066   | Dev Wadhwani  | Learner only     | → Learner Dashboard           |
  | 7972122827   | Arjun Mehta   | Coach + Learner  | → Role Selection → Dashboard  |
- **Role selection screen**: shown only for dual-role users; lets them choose Coach or Learner before proceeding.
- **Coach dashboard**: stats (learners, sessions today, improved), today's schedule, learner list with active/inactive badges, quick actions (assign drill, view reports, message), logout.
- **Learner dashboard**: stats (sessions, total meters, best pace), weekly progress bars (distance goal, sessions goal), recent session cards, coach info, quick actions (start swim, my progress, ask coach), logout.
- **Logout**: clears inputs and returns to login screen.

## Tech Stack
- Pure HTML, CSS, JavaScript – no frameworks or build tools.
- CSS externalized to `css/` folder; JS externalized to `js/` folder.
- Vercel deployment via `vercel.json` with `cleanUrls` enabled.

## Current Status (April 20, 2026)
- All core screens and navigation flows are implemented and functional.
- `images/` and `videos/` folders are created as placeholders (no assets added yet).
- Register button shows a placeholder alert; registration flow not yet built.
