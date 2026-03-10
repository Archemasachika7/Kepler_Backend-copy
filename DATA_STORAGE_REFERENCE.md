# Kepler Backend — Data Storage & API Keys Reference

> Quick-reference for every database, storage service, and secret used in this project.
> See `.env.example` for the full list of environment variables.

---

## 1. Environment Variables & API Keys

| Variable | Service | Purpose | Used In |
|---|---|---|---|
| `PORT` | Server | HTTP listen port (default `8000`) | `src/index.ts` |
| `SERVER` | MongoDB Atlas | Connection string (`user:pass@cluster`) | `src/utils/connection.utils.ts` |
| `DATABASE` | MongoDB Atlas | Database name | `src/utils/connection.utils.ts` |
| `POSTGRES_URL` | PostgreSQL | Full connection string | `src/utils/postgresConnection.utils.ts` |
| `REDIS_URL` | Redis (ioredis) | BullMQ queue & session management | `src/index.ts` |
| `JWT_ACCESS_SECRET` | JWT | Signs short-lived access tokens | `src/config.ts`, `src/index.ts` |
| `JWT_REFRESH_SECRET` | JWT | Signs long-lived refresh tokens | `src/config.ts`, `src/index.ts` |
| `GOOGLE_CLIENT_ID` | Google OAuth | Passport Google login | `src/config.ts`, `src/index.ts` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth | Passport Google login | `src/config.ts`, `src/index.ts` |
| `GOOGLE_CALLBACK_URL` | Google OAuth | OAuth callback URL | `src/config.ts`, `src/index.ts` |
| `GMAIL_USER` | Gmail API | Sender email address | `src/config.ts` |
| `GMAIL_PASS` | Gmail API | App password | `src/config.ts` |
| `GMAIL_CLIENT_ID` | Gmail API | OAuth2 client for sending mail | `src/config.ts`, `src/utils/gmailAPISetup.utils.ts` |
| `GMAIL_CLIENT_SECRET` | Gmail API | OAuth2 secret for sending mail | `src/config.ts`, `src/utils/gmailAPISetup.utils.ts` |
| `GMAIL_REFRESH_TOKEN` | Gmail API | OAuth2 refresh token | `src/config.ts`, `src/utils/gmailAPISetup.utils.ts` |
| `GMAIL_REDIRECT_URI` | Gmail API | OAuth2 redirect URI | `src/config.ts`, `src/utils/gmailAPISetup.utils.ts` |
| `BREVO_API_KEY` | Brevo (SendinBlue) | Fallback email transporter | `src/config.ts`, `src/utils/mailsend.utils.ts` |
| `RAZORPAY_KEY_ID` | Razorpay | Payment gateway key | `src/config.ts`, `src/index.ts` |
| `RAZORPAY_SECRET` | Razorpay | Payment gateway secret | `src/config.ts`, `src/index.ts` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary | Image/file cloud storage | `src/utils/cloudinaryupload.utils.ts` |
| `CLOUDINARY_API_KEY` | Cloudinary | API authentication | `src/utils/cloudinaryupload.utils.ts` |
| `CLOUDINARY_API_SECRET` | Cloudinary | API secret | `src/utils/cloudinaryupload.utils.ts` |

---

## 2. MongoDB Collections

Connection: `mongodb+srv://${SERVER}/${DATABASE}` (see `src/utils/connection.utils.ts`)

### 2.1 `collection` — User Profiles

| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `phone` | String | Required |
| `email` | String | Required, **unique** |
| `password` | String | Hashed with scrypt |
| `country`, `state`, `city` | String | Location |
| `education_type` | String | |
| `college`, `college_stream`, `college_year`, `college_department` | String | College details |
| `school`, `school_year` | String | School details |
| `work_country`, `work_state`, `work_city`, `work_company`, `work_position`, `work_duration` | String | Work details |
| `refercode` | Mixed | Required |
| `usenumber` | Number | Required |
| `isvalid` | Number | Required |
| `paidAmount` | Boolean | |
| `referrer_refer_code` | String | Required, default `"NULL"` |

**File:** `src/models/collection.model.ts`

### 2.2 `tokenschema` — Email Verification Tokens

| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Ref: `User` |
| `email_id` | String | Required |
| `name` | String | Required |
| `token` | String | Required |
| `createdAt` | Date | Auto-expires after **24 hours** |
| `details` | String | |
| `locations` | String | |

**File:** `src/models/Token.model.ts`

### 2.3 `historyschema` — Login/Logout History

| Field | Type | Notes |
|---|---|---|
| `userId` | ObjectId | Required |
| `name` | String | Required |
| `email` | String | Required, indexed |
| `logintime` | Date | Default: `Date.now` |
| `logouttime` | Date | Default: `null` |
| `status` | String | `active` or `inactive` |
| `details` | String | |
| `locations` | String | |

**File:** `src/models/History.model.ts`

### 2.4 `talkcollection` — Discussion Messages

| Field | Type | Notes |
|---|---|---|
| `group_name` | String | Required, indexed |
| `problem_name` | String | Indexed |
| `name` | String | Required |
| `email` | String | Required |
| `message` | String | |
| `image` | String | |
| `image_title` | String | |
| `date` | String | |
| `createdAt`, `updatedAt` | Date | Auto (timestamps: true) |

**File:** `src/models/talkcollection.model.ts`

### 2.5 `codingModel` — Coding Challenge Progress

| Field | Type | Notes |
|---|---|---|
| `email` | String | Required, indexed |
| `name` | String | Required |
| `streak` | Number | |
| `highestStreak` | Number | |
| `lastSolved` | Date | |
| `numberSolved` | Number | |
| `submissions` | Array | Objects: `{ name, date, difficulty, time, memory, status }` |
| `keplerBits` | Number | |

**File:** `src/models/coding.model.ts`

### 2.6 `admittedCoursesModel` — Course Enrollment & Payments

| Field | Type | Notes |
|---|---|---|
| `email` | String | Required, indexed |
| `name` | String | Required |
| `admittedCourses` | Array | `{ name, coursePaymentDate, upcomingPaymentDate, lastDateToPay, validity }` |
| `additionalCourses` | String[] | |
| `appliedAdditionalCourses` | String[] | |
| `selectedCourses` | String[] | |
| `transaction_details` | Array | `{ name, value, copy, color, salutation }` |
| `payment_details` | Array | Same shape as above |
| `upcoming_payment_details` | Array | Same shape as above |
| `log_details` | Array | `{ name, value1, value2, value3 }` |

**File:** `src/models/admittedCourses.model.ts`

---

## 3. PostgreSQL Tables

Connection: `process.env.POSTGRES_URL` (see `src/utils/postgresConnection.utils.ts`)

### 3.1 `library` — Library Books

| Column | Type | Notes |
|---|---|---|
| `course` | VARCHAR(255) | NOT NULL, PK part |
| `title` | VARCHAR(255) | NOT NULL, PK part |
| `author` | VARCHAR(255) | NOT NULL |
| `url` | VARCHAR(255) | NOT NULL, PK part |

**Primary Key:** `(course, title, url)` · **Index:** `idx_library_course` on `course`
**File:** `src/postgresModels/LibraryBookSchema/CreateLibrarySchema.postgres.ts`

### 3.2 `connectionProfileSchema` — User Connection Profiles

| Column | Type | Notes |
|---|---|---|
| `email` | VARCHAR(255) | NOT NULL, **PK** |
| `headline` | VARCHAR(255) | |
| `bio` | TEXT | |
| `githuburl` | VARCHAR(255) | |
| `linkedinurl` | VARCHAR(255) | |
| `portfoliourl` | VARCHAR(255) | |
| `techstack` | TEXT[] | |
| `skills` | TEXT[] | |
| `projects` | JSONB | |
| `isOpenToWork` | BOOLEAN | |
| `avatar` | VARCHAR(255) | |
| `endorsements` | INT | Default `0` |

**File:** `src/postgresModels/ConnectionProfileDetails/createConnectionProfileDetails.postgres.ts`

### 3.3 `connectedEmailSchema` — Connections Between Users

| Column | Type | Notes |
|---|---|---|
| `owneremail` | VARCHAR(255) | NOT NULL |
| `connectedemail` | VARCHAR(255) | NOT NULL |

**File:** `src/postgresModels/ConnectedEmailSchema/CreateConnectionEmailSchema.postgres.ts`

### 3.4 `connectionrequestschema` — Pending Connection Requests

| Column | Type | Notes |
|---|---|---|
| `senderemail` | VARCHAR(255) | NOT NULL |
| `receiveremail` | VARCHAR(255) | NOT NULL |

**File:** `src/postgresModels/ConnectedEmailSchema/CreateConnectionRequestSchema.postgres.ts`

### 3.5 `kepconchats` — Connection Chat Messages

| Column | Type | Notes |
|---|---|---|
| `sender` | VARCHAR(255) | |
| `receiver` | VARCHAR(255) | |
| `chatmessage` | VARCHAR(255) | |
| `date` | VARCHAR(255) | |

**File:** `src/postgresModels/KepConChatSchema/createKepConChatSchema.postgres.ts`

### 3.6 `user_referral_schema` — User Referrals & Wallets

| Column | Type | Notes |
|---|---|---|
| `refer_code` | VARCHAR(255) | NOT NULL, **PK** |
| `wallet_balance` | INT | Default `0` |
| `number_of_referrals` | INT | Default `0` |
| `referral_given_list` | TEXT | Default `'[]'` |
| `account_number` | VARCHAR(255) | Default `''` |
| `ifsc_code` | VARCHAR(255) | Default `''` |
| `account_holder_name` | VARCHAR(255) | Default `''` |
| `branch` | VARCHAR(255) | Default `''` |
| `upi_id` | VARCHAR(255) | Default `''` |
| `bank_name` | VARCHAR(255) | Default `''` |

**File:** `src/postgresModels/UserReferralSchema/CreateUserReferralSchema.postgres.ts`

### 3.7 `referral_money_tracker` — Referral Payouts

| Column | Type | Notes |
|---|---|---|
| `referral_giver_refer_code` | VARCHAR(255) | NOT NULL |
| `referral_giver_email` | VARCHAR(255) | NOT NULL |
| `referral_money_given_date` | VARCHAR(255) | NOT NULL |
| `money_given_status` | VARCHAR(255) | NOT NULL |
| `amount_given` | VARCHAR(255) | |

**File:** `src/postgresModels/ReferralMoneyTracker/CreatReferrlalMoneyTracker.postgresModel.ts`

---

## 4. Other Data Services

### 4.1 Redis

- **Library:** `ioredis` + `bullmq`
- **Env var:** `REDIS_URL`
- **Usage:** BullMQ email queue (`emailQueue`), scheduled jobs
- **File:** `src/index.ts`

### 4.2 Cloudinary (Image / File Storage)

- **Library:** `cloudinary` v1 + `multer-storage-cloudinary`
- **Env vars:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **Upload endpoint:** `POST` via multer middleware — returns `{ url: <cloudinary_url> }`
- **Files:** `src/utils/cloudinaryupload.utils.ts`, `src/controllers/imagestore.controller.ts`

### 4.3 Email Services

| Service | Priority | Library | Env Vars |
|---|---|---|---|
| Gmail API (OAuth2) | Primary | `googleapis` | `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_REDIRECT_URI` |
| Brevo (SendinBlue) | Fallback | `nodemailer-sendinblue-transport` | `BREVO_API_KEY` |

**File:** `src/utils/mailsend.utils.ts`, `src/utils/gmailAPISetup.utils.ts`

---

## 5. API Routes Overview

| Route | Auth | Description |
|---|---|---|
| `POST /login` | Public | User login |
| `POST /users` | Public | User registration |
| `GET /api` | Public | Query endpoints |
| `GET /auth` | Public | Google OAuth login |
| `POST /authRefreshToken` | Public | Refresh JWT tokens |
| `POST /logout` | Public | User logout |
| `GET /liveusers` | Protected | Currently active users |
| `GET /historyusers` | Protected | Login history |
| `/problems/*` | Protected | Coding problems CRUD |
| `/razorpay/*` | Protected | Payment creation & verification |
| `/referCode/*` | Protected | Referral code management |
| `/library/*` | Protected + Valid | Library book resources |
| `/talks/*` | Protected + Valid | Discussion forum |
| `/payment/*` | Protected + Valid | Course payment processing |
| `/connections/*` | Protected + Valid | User connections/networking |
| `/playlist/*` | Protected + Valid | Video playlists |
| `/admins/*` | Protected + Valid | Admin dashboard |
| `/referralMoneyTracker/*` | Protected + Valid | Referral money tracking |
| `/gmailAuth/*` | Public | Gmail OAuth flow |
