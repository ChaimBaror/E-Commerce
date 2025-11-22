# e-com Project

## Overview
The e-com project is a modern, full-featured e-commerce application built with **Next.js 15**, **React 19**, and **TypeScript**. It provides a comprehensive shopping experience with product browsing, cart management, user authentication, and order processing. The application features a beautiful Material-UI interface, multi-language support (English/Hebrew), and is fully responsive across all devices.

## 🚀 Features

### Core Features
- **Product Browsing**: Browse products with detailed information, images, ratings, and reviews
- **Shopping Cart**: Add products to cart, update quantities, and manage items
- **Checkout Process**: Complete order flow with customer information form
- **Order Management**: Order confirmation emails sent automatically
- **User Authentication**: Google OAuth sign-in with NextAuth.js
- **User Profile**: Personal dashboard with account information, order history, and settings

### UI/UX Features
- **Multi-language Support**: Seamless switching between English and Hebrew using `next-intl`
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Skeleton UI**: Beautiful loading states for better user experience
- **Modern Animations**: Smooth transitions and interactive elements
- **Hero Banner**: Eye-catching homepage banner with auto-dismiss feature
- **Category Filtering**: Filter products by category
- **Pagination**: Navigate through products with customizable items per page
- **Search Functionality**: Search products by name

### Technical Features
- **State Management**: Zustand for efficient cart and application state
- **Email Integration**: Nodemailer for order confirmation emails
- **Type Safety**: Full TypeScript support
- **Component Architecture**: Modular, reusable components (max 100 lines per file)
- **Server-Side Rendering**: Next.js App Router for optimal performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4
- **UI Library**: React 19.1.1
- **Styling**: Material-UI (MUI) 7.3.2
- **Language**: TypeScript 5
- **State Management**: Zustand 5.0.8
- **Internationalization**: next-intl 3.17.2
- **Authentication**: NextAuth.js 4.24.11
- **Email**: Nodemailer 7.0.6

## 📁 Project Structure

```
e-com
├── src
│   ├── app                          # Next.js App Router
│   │   ├── api                      # API routes
│   │   │   ├── auth                 # Authentication endpoints
│   │   │   └── send-order-email     # Email sending endpoint
│   │   ├── auth                     # Authentication pages
│   │   │   ├── signin               # Sign-in page
│   │   │   └── error                # Auth error page
│   │   ├── product                  # Product pages
│   │   │   └── [id]                 # Dynamic product detail page
│   │   ├── user                     # User profile page
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Homepage
│   ├── components                   # React components
│   │   ├── Cart                     # Cart-related components
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartHeader.tsx
│   │   │   ├── CartFooter.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── CheckoutDialog.tsx
│   │   │   ├── CheckoutDialogHeader.tsx
│   │   │   ├── CheckoutDialogActions.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── OrderCompleteDialog.tsx
│   │   │   └── EmptyCart.tsx
│   │   ├── Header                    # Header components
│   │   │   ├── Navbar.tsx
│   │   │   └── LanguageSelector.tsx
│   │   ├── Product                   # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   └── Shared                    # Shared/reusable components
│   │       ├── HeroBanner.tsx
│   │       ├── HeroBanner/           # HeroBanner sub-components
│   │       ├── Footer.tsx
│   │       ├── CategoryFilter.tsx
│   │       ├── ActionButton.tsx
│   │       ├── DialogHeader.tsx
│   │       ├── EmptyState.tsx
│   │       ├── FormField.tsx
│   │       ├── PriceDisplay.tsx
│   │       ├── QuantitySelector.tsx
│   │       └── Skeletons/            # Loading skeleton components
│   │           ├── ProductCardSkeleton.tsx
│   │           ├── ProductPageSkeleton.tsx
│   │           ├── UserProfileSkeleton.tsx
│   │           ├── CheckoutFormSkeleton.tsx
│   │           └── OrderSummarySkeleton.tsx
│   ├── contexts                      # React contexts
│   │   └── AuthContext.tsx           # Authentication context
│   ├── stores                        # Zustand stores
│   │   └── cartStore.ts             # Cart state management
│   ├── lib                           # Utility libraries
│   │   ├── auth.ts                   # NextAuth configuration
│   │   └── email.ts                  # Email service
│   ├── data                          # Static data
│   │   └── data.ts                   # Product data
│   ├── types                         # TypeScript types
│   │   └── index.ts
│   └── styles                        # Global styles
│       ├── theme.ts                  # MUI theme configuration
│       └── globals.css               # Global CSS
├── messages                          # Internationalization files
│   ├── en.json                       # English translations
│   └── he.json                       # Hebrew translations
├── public                            # Static assets
├── .env.local                        # Environment variables (not in git)
├── package.json
├── tsconfig.json
├── SETUP_ENV.md                      # Environment setup guide
└── README.md
```

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/e-com.git
   cd e-com
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory and add the required variables. See [SETUP_ENV.md](./SETUP_ENV.md) for detailed instructions.
   
   Required variables:
   ```env
   # Google OAuth (Required for authentication)
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   
   # NextAuth.js (Required)
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   
   # Email Configuration (Required for order emails)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password_here
   ```

4. **Generate NextAuth Secret:**
   ```bash
   openssl rand -base64 32
   ```

## 🚀 Usage

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

For detailed instructions, see [SETUP_ENV.md](./SETUP_ENV.md).

### Email Configuration

1. Use Gmail or another email provider
2. For Gmail, create an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password
3. Add credentials to `.env.local`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Component Architecture

The project follows a modular component architecture with:
- **Maximum 100 lines per component file** for maintainability
- **Reusable shared components** for common UI patterns
- **Separation of concerns** with dedicated components for specific features
- **Type safety** with TypeScript throughout

## 🌐 Internationalization

The application supports multiple languages using `next-intl`:
- **English** (`en.json`)
- **Hebrew** (`he.json`)

All user-facing text is translatable. Add new translations in the `messages` directory.

## 🔐 Authentication

- **Google OAuth** sign-in via NextAuth.js
- **Session management** with secure JWT tokens
- **Protected routes** for user profile
- **Automatic user profile creation** on first sign-in

## 📧 Email Features

- **Order confirmation emails** sent automatically
- **HTML email templates** with order details
- **Unique order IDs** for tracking
- **Error handling** for email delivery failures

## 🛒 Shopping Features

- **Add to cart** with quantity selection
- **Cart persistence** using localStorage
- **Real-time cart updates** with Zustand
- **Order summary** before checkout
- **Customer information form** for orders

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1920px+)
- **Tablet** (768px - 1919px)
- **Mobile** (320px - 767px)

## 🐛 Troubleshooting

### Common Issues

1. **"client_id is required"** - Check your `.env.local` file and restart the server
2. **Email not sending** - Verify `EMAIL_USER` and `EMAIL_PASS` are correct
3. **Hydration errors** - Usually caused by browser extensions, can be safely ignored
4. **Build errors** - Ensure all dependencies are installed with `npm install`

For more help, see [SETUP_ENV.md](./SETUP_ENV.md).

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Material-UI for the component library
- Next.js team for the amazing framework
- All contributors and users of this project
