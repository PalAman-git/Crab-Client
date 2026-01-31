# 🦀 CrabClient

**CrabClient** is a smart, attention-first client management tool for freelancers that helps ensure no client follow-up, invoice, or deadline is ever missed.

Freelancers don’t lose work because of bad skills — they lose it because things slip through the cracks. CrabClient is built to solve exactly that.



## ✨ What is CrabClient?

CrabClient is a lightweight SaaS-style web application designed for **freelancers and solo developers** who juggle multiple clients and responsibilities.

Instead of acting like a heavy CRM, CrabClient focuses on one core idea:

> **Manage attention, not paperwork.**

Everything in CrabClient revolves around *attention items* — things that require timely action, such as:
- Client follow-ups
- Pending invoices
- Upcoming deadlines


## 🎯 The Problem

Most existing tools:
- Are bloated with features freelancers don’t need
- Require heavy setup (pipelines, forms, contracts)
- Hide important follow-ups inside cluttered dashboards

As a result, freelancers:
- Forget to follow up
- Miss invoice reminders
- Lose trust and revenue


## 💡 The Solution

CrabClient provides a **single, focused workflow**:

- Capture client-related obligations instantly
- See exactly what needs attention *today*
- Get reminded before things become problems

No noise. No over-engineering.


## 🧠 Core Concept: Attention Items

CrabClient models all work as **Attention Items**, such as:

- 📨 Follow-up reminders  
- 🧾 Invoice reminders  
- ⏰ Deadlines  

Each attention item has:
- A type (follow-up, invoice, deadline)
- A priority
- A due date
- A client association

This keeps the system simple, flexible, and powerful.


## 🧩 Phase 1 Features (Current)

- 🔐 Authentication (JWT-based) &#10003;
- 👤 Client management
- ⭐ Attention items (follow-ups, invoices, deadlines)
- 📅 “Today” dashboard showing what needs focus
- 🧾 Invoice tracking (lightweight, reminder-based)
- 🛎️ In-app notifications (email planned)


## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Backend:** Next.js Route Handlers
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT (HTTP-only cookies)
- **Styling:** Tailwind CSS
- **Deployment:** Planned for Vercel


## 🗄️ Database Design (High Level)

CrabClient uses a minimal, scalable schema centered around three core entities:

- `User` – the freelancer
- `Client` – people the freelancer works with
- `Attention` – follow-ups, invoices, and deadlines

This design avoids feature bloat while remaining future-proof.


## 🧭 Product Philosophy

CrabClient is built with these principles:

- **Clarity over cleverness**
- **Focus over features**
- **Calm UX over noisy dashboards**
- **Freelancers first**

The app is intentionally opinionated to reduce decision fatigue.


## 🚀 Future Roadmap

Planned features (post Phase-1):

- Email notifications & daily summaries
- Smart follow-up suggestions
- Client health indicators
- Basic analytics (overdue items, response times)
- Subscription & billing


## 📦 Getting Started (Development)

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run development server
npm run dev

```

## Make sure to set up your environment variables in .env file:

- DATABASE_URL=
- JWT_SECRET=


## 📄 License

This project is currently under development and not licensed for production use yet.


## 🙌 Why CrabClient?

CrabClient exists to help freelancers stay reliable, organized, and professional without drowning in tools they don’t need.

If it helps one freelancer stop losing work due to missed follow-ups — it’s doing its job.
