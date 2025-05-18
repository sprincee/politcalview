# PoliView 

## Description
PoliView is a web application designed to make legislative information accessible for everyone. It's aim is to simplify complex federal and state legislative information, helping citizens stay informed and engaged with the democratic process. 
In a fully realized PoliView, users can search for bills, track legislation, follow repersentatives, and recieve notifications about bills they care about.

## Target Browsers
This application is optimized for:
- **Desktop:** Chrome 90+, Firefox 90+, Safari 14+, Edge 90+

## Hosted -- Seamlessly on Vercel
Link : https://politcalview.vercel.app

---

## Developer Manual

### How to Install the Application and Dependancies

1. **Prerequisites:**
- Node.js (v18 or higher)
- npm (v8 or higher)

2. **Clone the repository.**
```bash
git clone https://github.com/sprincee/politcalview.git
cd politicalview
```

3. **Install dependencies:**
```bash
npm install
```
This will install all the required dependencies including:
- **Core:** Next.js 15.3.2, React 19, TypeScript
- **UI/Animations:** Framer Motion, TailwindCSS
- **Data Fetching:** Axios, SWR
- **Authentication/Database:** Supabase client and auth helpers

**NOTE:** The following dependencies are installed but not actively used in the current implementation:
- D3.js (intalled for planned data visualization features)
- react-toastify (installed for planned usage; never implemented)
- critters/beasties (installed for debugging, not needed)
- browserify-fs (installed to resolve module resolution issues, not needed)

4. **Set up environment variables:**
Create a `.env.local` file in the root directory with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CONGRESS_API_KEY=your_congress_api_key
NEXT_PUBLIC_OPENSTATES_API_KEY=your_openstates_api_key

```
**NOTE:** You'll need to obtain your own API keys from:
- Supabase: Create a project at https://supabase.com
- Congress.gov API: Register at https://api.congress.gov
- OpenStates API: Register at https://open.pluralpolicy.com

### How to Run the Application on a Server

1. **Development mode:**
```bash
npm run dev
```
This will start a development server with Turbopack at `http://localhost:3000`

2. **Production build:**
```bash
npm run build
npm start
```
This will create an optimized production build and start a server at `http://localhost:3000`

3. Deployment to Vercel
The application is configured for easy deployment to Vercel. Connect your Github repo to Vercel and:
- Add the required environment variables in Vercel's project settings
- Vercel will automatically build and deploy your application

### How to Run Tests

1. **Run ESLint:**
```bash
npm run lint
```

2. **Run type checking:**
```bash
npx tsc --noEmit
```

### API Endpoints

#### External API Integration

The application connects to the Congress.gov API to fetch legislative data. Our application provides interfaces to this API through these functions:

1. **Legislative Data Functions:**
- `fetchRecentBills()` - Retrives recent bills from Congress API
- `searchBills(query)` - Searches for bills matching the query
- `getBillDetails(congressNum, billType, billNumber)` - Gets detailed information about a specific bill

#### Database Interactions

Our application uses Supabase as a backend database and authentication provider:

1. **Authentication:**
   - Sign up, sign in, and sign out functionality via Supabase Auth

2. **Data Functions:**
   - These functions exist in our codebase but weren't fully implemented in the UI:
     - `getUserProfile(userId)` - Gets user profile information
     - `updateUserProfile(userId, profile)` - Updates user profile
     - `saveSearchQuery(userId, query)` - Saves search history

Note: While we implemented the database functions for saving bills and user preferences, the complete feature with UI integration wasn't finalized in this version.

### Database Schema

Our application uses Supabase as the database provider. Below is the database schema:

#### Tables

1. **bills**
   - `id` (primary key): text - Unique identifier for the bill
   - `title`: text - Title of the bill
   - `description`: text - Description of the bill
   - `introduced_date`: date - Date when the bill was introduced
   - `last_action_date`: date - Date of the last action on the bill
   - `last_action_text`: text - Description of the last action
   - `bill_number`: text - Official bill number
   - `bill_type`: text - Type of bill (e.g., HR, S)
   - `congress`: text - Congress number
   - `chamber`: text - Chamber (house/senate)
   - `sponsor`: text - Bill sponsor
   - `status`: text - Current status of the bill
   - `source`: text - Source of the bill data (e.g., federal)
   - `state`: text - State (for state bills)
   - `simple_summary`: text - Simplified summary of the bill
   - `url`: text - URL to the bill's official page
   - `created_at`: timestamp - When the record was created
   - `updated_at`: timestamp - When the record was last updated

2. **saved_bills** (Relationship table between users and bills)
   - `id` (primary key): uuid - Unique identifier
   - `user_id`: uuid - Foreign key to auth.users.id
   - `bill_id`: text - Foreign key to bills.id
   - `created_at`: timestamp - When the bill was saved

3. **search_history**
   - `id` (primary key): uuid - Unique identifier
   - `user_id`: uuid - Foreign key to auth.users.id
   - `query`: text - Search query text
   - `created_at`: timestamp - When the search was performed

4. **user_profiles**
   - `id` (primary key): uuid - Unique identifier (matches auth.users.id)
   - `display_name`: text - User's display name
   - `email`: text - User's email
   - `notification_email`: text - Email for notifications
   - `created_at`: timestamp - When the profile was created
   - `updated_at`: timestamp - When the profile was last updated

5. **bill_tags** (Tags for categorizing bills)
   - `id` (primary key): uuid - Unique identifier
   - `name`: text - Tag name

6. **bill_to_tags** (Relationship table between bills and tags)
   - `bill_id`: text - Foreign key to bills.id
   - `tag_id`: uuid - Foreign key to bill_tags.id

7. **legislators**
   - `id` (primary key): text - Unique identifier for the legislator
   - `first_name`: text - Legislator's first name
   - `last_name`: text - Legislator's last name
   - `full_name`: text - Legislator's full name
   - `state`: text - State represented
   - `chamber`: text - Chamber (house/senate)
   - `party`: text - Political party
   - `photo_url`: text - URL to legislator's photo
   - `website_url`: text - URL to legislator's website
   - `source`: text - Source of legislator data
   - `created_at`: timestamp - When the record was created
   - `updated_at`: timestamp - When the record was last updated

#### Relationships
- Users have many saved bills (one-to-many relationship via saved_bills)
- Users have many search queries (one-to-many relationship via search_history)
- Bills can have many tags (many-to-many relationship via bill_to_tags)
- Tags can be applied to many bills (many-to-many relationship via bill_to_tags)

### Known Bugs and Future Development Roadmap

#### Known Bugs
- **Responsive Design:** Some UI elements may not display optimally on very small mobile screens
- **Log out:** Currently, no UI way to log out

#### Future Development Roadmap
1. **Short-term improvements:**
- Implement the Dashboard UI fully
- Improve the UI for the Login page
- Redirect bills to their proper governmental links

2. **Medium-term features:**
- Complete and enable bill saving functionality
- Implement real user profiles with preferences
- Implement search history for users
- Implement notification preferences for users
- Use OpenAI API to enable simplified summaries for bills

3. **Long-Term Visions:**
- Expand to state-level legislation tracking
- Add repersentative contact information and voting records
- Enable email notifications for bill status changes
- Create a mobile app version for better mobile experience