# College Marketplace

A modern, full-featured college marketplace built with Next.js 14, TypeScript, and Tailwind CSS. Students can buy, sell, and chat with each other in a beautiful, responsive interface.

## Features

- 🔐 **Authentication** - Demo login with multiple provider options
- 🛍️ **Product Marketplace** - Browse, search, and filter products
- 📱 **Product Details** - Full-screen product views with image galleries
- 💬 **Real-time Chat** - Chat with sellers about products
- ➕ **List Items** - Easy product listing with drag & drop image upload
- 👤 **User Profiles** - Manage listings and view chat history
- 🎨 **Modern UI** - Beautiful glassmorphism design with animations
- 📱 **Responsive** - Works perfectly on mobile and desktop
- 💾 **Local Storage** - Data persists across sessions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context + Local Storage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd college-marketplace
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
college-marketplace/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page with routing
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── chat/             # Chat functionality
│   ├── context/          # React Context providers
│   ├── listing/          # Product listing components
│   ├── marketplace/      # Main marketplace components
│   ├── product/          # Product detail components
│   ├── profile/          # User profile components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## Key Components

### Authentication
- **Login**: Demo authentication with multiple provider options
- **User Context**: Manages user state across the app

### Marketplace
- **Product Cards**: Responsive grid of product listings
- **Search & Filter**: Real-time search functionality
- **Header**: Sticky header with search and navigation

### Product Management
- **Product Details**: Full-screen product view with image gallery
- **List Item**: Form for adding new products with drag & drop
- **AI Description**: Smart description generation

### Chat System
- **Chat Interface**: Real-time messaging simulation
- **Chat History**: Persistent chat storage
- **Auto Responses**: Simulated seller responses

### User Profile
- **Profile Management**: Edit user information
- **My Listings**: View and manage posted items
- **Chat History**: Access to all conversations

## Features in Detail

### 🎨 Modern Design
- Glassmorphism UI with backdrop blur effects
- Smooth animations using Framer Motion
- Responsive design for all screen sizes
- Dark theme optimized for readability

### 🔍 Search & Discovery
- Real-time search across product titles, descriptions, and tags
- Category-based filtering
- Condition-based sorting
- Sample data generation for demo purposes

### 📸 Image Management
- Drag & drop image upload
- Multiple image support (up to 6 per product)
- Image preview and removal
- Placeholder images for demo products

### 💬 Chat System
- Real-time messaging simulation
- Chat history persistence
- Product-specific conversations
- Auto-response simulation for demo

### 📱 Mobile Optimized
- Touch-friendly interface
- Responsive grid layouts
- Mobile-first design approach
- Optimized navigation for small screens

## Development

### Adding New Features

1. **Components**: Add new components in the appropriate directory under `components/`
2. **Types**: Define new TypeScript types in `types/index.ts`
3. **Utilities**: Add helper functions in `lib/utils.ts`
4. **Styling**: Use Tailwind CSS classes for styling

### State Management

The app uses React Context for global state management:
- `MarketplaceContext`: Manages products, users, and chats
- Local storage for data persistence
- Optimistic updates for better UX

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow the glassmorphism design pattern
- Maintain consistent spacing and typography
- Ensure responsive design for all components

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for college students everywhere.
