# Google OAuth Authentication Setup

## 1. Google Cloud Console Setup

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)

4. **Get Client ID and Secret**
   - Copy the Client ID and Client Secret
   - Add them to your environment variables

## 2. Environment Variables

Add these to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## 3. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## 4. Features Included

### Authentication Flow
- Google OAuth sign-in
- Automatic user profile creation
- Session management
- Secure JWT tokens

### User Interface
- Sign-in page with Google button
- User profile page with account information
- Navbar integration with user avatar
- Dropdown menu for profile actions

### User Profile Page
- User information display
- Order history (placeholder)
- Wishlist (placeholder)
- Settings section
- Sign out functionality

### Navbar Integration
- Sign-in button for guests
- User avatar with dropdown menu
- Profile and sign-out options
- Responsive design

## 5. Usage

1. **Sign In**: Click "Sign In" in the navbar
2. **Profile**: Click on your avatar to access profile menu
3. **User Page**: Visit `/user` to see your profile
4. **Sign Out**: Use the dropdown menu or profile page

## 6. Customization

- Modify user profile page in `src/app/user/page.tsx`
- Update sign-in page in `src/app/auth/signin/page.tsx`
- Customize navbar in `src/components/Header/Navbar.tsx`
- Add more user features as needed

## 7. Security Notes

- Never commit credentials to version control
- Use environment variables for all sensitive data
- NextAuth.js handles secure session management
- JWT tokens are used for stateless authentication
