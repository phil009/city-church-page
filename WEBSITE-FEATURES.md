# City Church Calabar — Website Features & Capabilities
**Prepared for: Social Media Team**
**Website:** citychurchcalabar.org

---

## Overview

The City Church Calabar website is a full-featured digital platform built to serve members, reach guests, and extend the ministry online. It covers everything from live streaming and giving to volunteer sign-ups and an online store — all in one place.

---

## Pages at a Glance

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | First impression, intro, pastors, testimonials |
| About | `/about` | Vision, mission, who we are |
| Live | `/live` | Watch services live or catch up on sermons |
| Events | `/events` | Recurring programmes and events |
| Ministries | `/ministries` | Explore teams and volunteer sign-up |
| Small Groups | `/small-groups` | Find or lead a community group |
| Store | `/store` | Purchase messages and church resources |
| Giving | `/giving` | Online and bank transfer donations |
| Prayer Request | `/prayer-request` | Submit personal prayer requests |
| Contact | `/contact` | General enquiries and directions |

---

## Page-by-Page Breakdown

---

### 🏠 Home (`/`)

The main landing page. Designed as a welcoming front door for both new visitors and existing members.

**Sections:**

1. **Hero Slider**
   - 3 rotating slides (auto-advances every 3 seconds)
   - Slide 1: "Welcome to City Church Calabar" → links to About page
   - Slide 2: "We Teach in Series" → links to Events page
   - Slide 3: "Raising Change Agents" → links to Ministries page
   - Social media icons (Facebook, Instagram, YouTube) displayed on the slider

2. **Introduction**
   - Tagline: *"A Life Development Church with practical teachings and loving relationships"*
   - 4 highlight cards: Refreshing Worship, Word by Revelation, Believers' Community, The Junior Church
   - Service times prominently shown: **Sundays 9:30 AM & 11:00 AM**

3. **Testimonials Slider**
   - 4 rotating member testimonials (auto-advances every 5 seconds)
   - Theme: *"It's the Lord's Doing"*

4. **Who We Are**
   - Auto-rotating images of pastors and congregation
   - Vision: *"A living church that shifts lives through the WORD"*

5. **Gallery**
   - Infinite horizontal scroll of church photos
   - Expandable social media follow button

6. **Meet Our Pastors**
   - 5 pastor cards, each with a rotating portfolio of images:
     - Pst. Tony Aleogena-Raphael (Lead Pastor)
     - Pst. Anointed Enoh
     - Pst. Mark Ettan
     - Pst. Aniekan Umoh
     - Pst. Goodluck Opue

7. **Prayer Section**
   - 3 prayer event cards:
     - **Friday Prayers** — 6–7 PM at The Big Tent
     - **Pre-Service Prayers** — Sundays 8:30–9 AM at The Big Tent
     - **Hour of Tongues** — Mon–Fri 5–6 AM via Telegram
   - Contact: @citychurchcalabar or +234 803 681 1155

8. **Contact Section**
   - Phone, email, and address displayed
   - Embedded contact form (Name, Email, Phone, Message)

---

### ℹ️ About (`/about`)

Gives visitors a clear picture of who City Church is and what we believe.

**Sections:**
- Vision: *"To raise change agents"*
- Mission: *"A church with a heart for people who are far from Jesus... creating environments that help them take their next steps"*
- Who We Are image carousel
- Meet Our Pastors (same 5 pastors as home)
- Testimonials carousel

---

### 📺 Live (`/live`)

Connects members and visitors to church services whether they're in the building or not.

**Features:**
- **Real-time status indicator** — detects if the channel is currently live
  - When live: shows a pulsing **"Watch Live"** button
  - When offline: shows **"Watch Previous Sermons"**
- **Countdown** to next service when not streaming
- **Previous Sermons section** — automatically pulls the latest videos from our YouTube channel
- **Share button** — uses the native Web Share API so visitors can share the stream
- **External stream link** — connects to ccubed.online.church

**Integrations:** YouTube API v3

---

### 📅 Events (`/events`)

A clean reference for all recurring church programmes.

**8 recurring events listed:**

| Event | When | Venue |
|---|---|---|
| Sunday Service | Sundays 9:30 AM & 11:00 AM | The Big Tent |
| Heritage Sunday | First Sunday of each month | The Big Tent |
| Friday Prayers | Every Friday 6:00 PM | The Big Tent |
| Power Point | Last Friday of each month 6:00 PM | The Big Tent |
| Night of Incense | Last Friday of each quarter 6:00 PM | The Big Tent |
| Movie Night | Every 3rd Friday 7:00 PM | The Big Tent |
| Annual Thanksgiving | First Sunday of January | The Big Tent |
| Christmas @ City Church | Christmas week | The Big Tent |

---

### ⛪ Ministries (`/ministries`)

Helps members explore service opportunities and sign up directly from the website.

**Intro Section:**
- Overview of specialised ministry areas: worship, youth, women's, and men's missions

**Volunteer Sign-Up — 4-Step Flow:**

| Step | What Happens |
|---|---|
| 1 – Your Calling | Choose from 10 purpose/support-based calling descriptions |
| 2 – Your Role | Select a specific unit within that team |
| 3 – Your Match | See a personalised match card with full team description + "Learn More" option |
| 4 – Sign Up | Fill in name, email, phone, and any notes |

**Callings covered:**

*The Five Purposes:*
- Ministry Team (9 units)
- Maturity Team (4 units)
- Membership Team (3 units)
- Magnification (2 units — Sweet Incense, Vertical Blade)
- Missions (1 unit)

*Support & Operations:*
- Production (5 units — Sound, Lighting, Streaming, Pixel, Photography)
- Guest Services (7 units)
- Service Programming
- Creative Arts Department (Dance, Drama, Spoken Word)
- Brand Communications (4 units)
- Group Life

**All sign-ups are automatically logged to Airtable** with the member's details, their selected calling, team, and unit.

---

### 👥 Small Groups (`/small-groups`)

Connects members to community groups across Calabar.

**Sections:**
- Why Join: Deeper Connections, Spiritual Growth, Life Support
- **14 active small groups** displayed in a browsable carousel — each with group number, leader name, location, landmark, and a direct WhatsApp join link
- How It Works: 3-step process (Browse → Click WhatsApp link → Join)

**Forms:**
- **Join a Group** — collects Name, Email, Phone, and optional reason; notifies group leader
- **Lead a Group** — collects Name, Email, Phone, previous leadership experience, vision for group, and availability preference

---

### 🛒 Store (`/store`)

A full online store for purchasing church resources and audio messages.

**Features:**
- Product grid (2–5 columns depending on screen size)
- **Search** with 300ms debounce filtering by name and description
- **Pagination** — 10 products per page
- Loading skeleton cards while products are fetched
- Separate visual indicators for digital (music icon) vs physical (package icon) products

**Payment:**
- All purchases handled securely via **Paystack**
- Physical and most digital products link directly to Paystack checkout

**Minister Form (select audios only):**
- The audio teachings **"Change Agent"** and **"Catalysis"** trigger a special flow before purchase:
  1. Visitor is asked: *"Are you a minister?"*
  2. If **yes** → fills a short form (Full Name, Primary Unit, Team/Directorate, commitment checkbox)
  3. Form data is **logged to a dedicated Airtable table** before redirecting to Paystack
  4. If **no** → goes straight to Paystack checkout

**Integrations:** Paystack API (product catalog + checkout), Airtable (minister log)

---

### 💰 Giving (`/giving`)

Multiple giving options for members and partners.

**3 giving methods:**

1. **e-Give (Bank Transfer)**
   - *Local:* Zenith Bank PLC — City Church Calabar — **101 339 5192**
   - *International USD:* GTBank — City Church Calabar — **017 343 6755**
   - *International GBP:* GTBank — City Church Calabar — **017 343 6762**
   - Use description field to specify purpose

2. **Credit Card / Online**
   - Secure one-time or recurring donations via Paystack
   - "Give Now" button links directly to payment page

3. **In-Person**
   - During Sunday services or at the office
   - Office hours: Tuesday–Friday, 9:00 AM – 4:30 PM

---

### 🙏 Prayer Request (`/prayer-request`)

An always-available way for anyone to submit a prayer request.

**Prayer information shown:**
- Hour of Tongues: Mon–Fri 5–6 AM (Telegram)
- Friday Prayers: 6–7 PM at The Big Tent
- Prayer Line: +234 803 681 1155 (available 24/7 for urgent needs)
- All requests are treated as confidential

**Form fields:**
- Name, Email, Phone (optional)
- Urgency level: Urgent or Standard
- Full prayer request (text)
- *"Keep this request confidential"* checkbox
- *"Allow sharing during prayer meetings"* checkbox

---

### 📬 Contact (`/contact`)

For general enquiries.

**Contact information:**
- **Phone:** +234 803 681 1155
- **Email:** info@citychurchcalabar.org
- **Address:** 98 Ndidem Usang Iso Rd, Efut Ekondo 540222, Calabar, Cross River

**Contact form:** Name, Email, Phone, Message

---

## Social Media Content Ideas

| Page / Feature | Suggested Caption / Hook |
|---|---|
| Live page | *"Can't make it in person? We're live every Sunday — link in bio"* |
| Previous Sermons | *"Missed Sunday? Catch up on the full message — link in bio"* |
| Store — audio messages | *"The full teaching series is now available in our online store"* |
| Volunteer sign-up | *"Find your place to serve — take the quiz on our website"* |
| Small groups | *"Community happens in small groups. Find yours — link in bio"* |
| Prayer request | *"Whatever you're going through, our prayer team is here. Submit a request anytime"* |
| Giving | *"Give online in seconds, from anywhere in the world — link in bio"* |
| Events | *"Here's everything happening at City Church this month"* |
| Pastor carousel | *"Meet the team behind City Church Calabar"* |
| Testimonials | *"Real stories. Real transformation. Here's what God is doing at City Church"* |

---

## Technical Highlights (for context)

- **Mobile-friendly** — fully responsive across all screen sizes
- **Live-aware** — the Live page auto-detects stream status and updates in real time
- **Automated logging** — volunteer sign-ups and minister audio purchases are logged automatically to Airtable, no manual work needed
- **YouTube integration** — sermon videos are pulled automatically from the church channel
- **Secure payments** — all transactions handled by Paystack (no card details stored on our servers)

---

*Document prepared from current website codebase — April 2026*
