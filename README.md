# e-com Project

## Overview
The e-com project is a modern e-commerce application built with React and TypeScript. It provides a user-friendly interface for browsing products, managing a shopping cart, and completing purchases. The application supports multiple languages and is styled using Material-UI.

## Features
- **Product Browsing**: Users can view a list of products with details such as name, price, and description.
- **Shopping Cart**: Users can add products to their cart, update quantities, and proceed to checkout.
- **Multi-language Support**: The application supports English and Hebrew, allowing users to switch languages seamlessly.
- **Responsive Design**: The application is designed to work on various screen sizes, providing a great user experience on both desktop and mobile devices.

## Project Structure
```
e-com
├── src
│   ├── app
│   │   └── page.ts
│   ├── components
│   │   ├── Cart
│   │   │   ├── CartDrawer.tsx
│   │   │   └── CheckoutDialog.tsx
│   │   ├── Header
│   │   │   ├── LanguageSelector.tsx
│   │   │   └── Navbar.tsx
│   │   ├── Product
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   └── Shared
│   │       ├── HeroBanner.tsx
│   │       ├── Footer.tsx
│   │       └── CategoryFilter.tsx
│   ├── contexts
│   │   ├── CartContext.tsx
│   │   └── LanguageContext.tsx
│   ├── hooks
│   │   └── useProducts.ts
│   ├── utils
│   │   └── translations.ts
│   ├── styles
│   │   └── theme.ts
│   ├── types
│   │    └── index.ts
│   └── i18n.ts
├── messages
│   ├── en.json
│   └── he.json
├── public
│   └── images
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/e-com.git
   ```
2. Navigate to the project directory:
   ```
   cd e-com
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm start
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.