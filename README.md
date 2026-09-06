# ProjectHub - Marketplace Platform

A modern, modular React application for discovering mechanical projects, finding project ideas, asking technical questions, and connecting with builders.

## 🎯 Project Overview

ProjectHub is a marketplace platform designed to help students and makers:
- **Discover** real projects built by others
- **Explore** project ideas by domain (IoT, Robotics, Automation, etc.)
- **Collaborate** with community through Q&A
- **Connect** with builders and vendors for project assistance

## 🏗️ Architecture

The application follows a **modular, component-based architecture** designed for scalability and backend integration:

```
Frontend Architecture:
├── types/          - TypeScript interfaces & type definitions
├── services/       - API communication layer
├── hooks/          - Custom React hooks for data management
├── components/     - Reusable UI components
└── routes/         - Page components (TanStack Router)
```

## 🚀 Quick Start

### Prerequisites
- **Bun** (recommended) or Node.js 18+
- **Environment Variables**: Create `.env` file with:
	```
	VITE_API_URL=http://localhost:3000/api
	```

### Installation

```bash
# Clone repository
git clone <repository-url>
cd marketplace

# Install dependencies (using Bun)
bun install

# Or with npm
npm install
```

### Development Server

```bash
# Start dev server
bun run dev

# Or with npm
npm run dev
```

Server runs on `http://localhost:5173`

### Build for Production

```bash
# Build
bun run build

# Preview build
bun run preview
```

## 📁 File Structure & Components

### Core Layers

#### **1. Type System** (`src/types/index.ts`)
Centralized TypeScript definitions for frontend-backend contract:
- `Project` - Project entity model
- `ProjectResponse` - Paginated API response
- `ApiResponse<T>` - Generic API wrapper
- `PaginationParams` - Filtering parameters
- `ProjectCardProps` - Component prop types
- [View full documentation →](./IMPLEMENTATIONS.md#1-type-system)

#### **2. Service Layer** (`src/services/api/projectService.ts`)
API communication with CRUD operations:
- `getProjects()` - Fetch all projects with filters
- `getProjectById()` - Get single project
- `getProjectsByCategory()` - Filter by category
- `createProject()` - Create new project (admin)
- `updateProject()` - Update existing project
- `deleteProject()` - Delete project
- [View full documentation →](./IMPLEMENTATIONS.md#2-service-layer)

#### **3. Custom Hooks** (`src/hooks/useProjects.ts`)
React hooks for data fetching:
- `useProjects()` - Fetch projects list with pagination/search
- `useProjectById()` - Fetch single project
- [View full documentation →](./IMPLEMENTATIONS.md#3-custom-hooks)

### Components

#### **Home Page Components** (`src/components/home/`)

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| **HeroSection** | Hero banner with CTAs | title, subtitle, primaryCTA, secondaryCTA, callbacks |
| **ProjectCard** | Project card (grid/carousel) | project, onClick, variant |
| **ProjectsGrid** | Projects grid display | projects, title, subtitle, loading, callbacks |
| **IdeasCarousel** | Auto-rotating carousel | projects, domains, title, autoplayDelay, callbacks |
| **FlowSection** | Process flow display | title, steps, ctaText, bgVariant, callback |
| **StepsList** | Numbered steps list | title, steps, variant |
| **PlatformIntro** | CTA section | title, subtitle, CTAs, bgColor |
| **SectionIntro** | Section wrapper | title, subtitle, children, bgVariant |
| **Navbar** | Navigation header | (responsive, mobile menu) |
| **Footer** | Page footer | (social links, info) |

[View detailed component documentation →](./IMPLEMENTATIONS.md#🎨-component-architecture)

### Main Page (`src/routes/index.tsx`)

The homepage orchestrates all components in a modular composition:

1. **Hero Section** - Main call-to-action with project showcase image
2. **Platform Introduction** - Feature highlight section
3. **Projects Grid** - 4-column responsive grid of projects
4. **Ideas Carousel** - Auto-playing carousel with domain filters (15-second rotation)
5. **Community Flow** - "Ask. Learn. Build." process flow
6. **Builder Request** - Find builders for your projects flow
7. **How It Works** - 5-step numbered process
8. **Final CTA** - Last call-to-action section

**All sections wrapped in `<Reveal>` animation component for smooth entrance effects.**

## 🔌 Backend Integration

### API Configuration

Set the API base URL via environment variable:
```env
VITE_API_URL=http://your-backend:3000/api
```

### Expected API Endpoints

The service layer expects these endpoints:

```
GET    /api/projects              # List projects (paginated)
GET    /api/projects/:id          # Get single project
POST   /api/projects              # Create project
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
```

### Response Format

All endpoints should return this format:

```json
{
	"success": true,
	"data": {
		// endpoint-specific data
	},
	"error": null  // null if success: true
}
```

### Example Response

```json
{
	"success": true,
	"data": {
		"data": [
			{
				"id": "1",
				"title": "Smart Plant Monitoring",
				"category": "IoT",
				"technology": "ESP32, Python",
				"difficulty": "Beginner",
				"cost": "₹2,500",
				"alt": "Plant monitoring system",
				"image": "https://..."
			}
		],
		"total": 100,
		"page": 1,
		"limit": 10
	}
}
```

## 🎨 Features

### Visual Features
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Animations** - Reveal component with staggered entrance effects
- ✅ **Auto-playing Carousel** - 15-second rotation with endless loop
- ✅ **Loading States** - Skeleton placeholders for async operations
- ✅ **Hover Effects** - Interactive card transformations
- ✅ **Dark/Light Theme** - Theme toggle support

### Functional Features
- ✅ **Project Discovery** - Browse all projects with grid view
- ✅ **Ideas Exploration** - Filter ideas by domain
- ✅ **Community Q&A** - Ask questions section
- ✅ **Builder Network** - Connect with builders
- ✅ **Pagination Ready** - Service layer supports page/limit params
- ✅ **Search Ready** - Filter by search query
- ✅ **Category Filtering** - Filter by project category

## 📦 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Node.js + Bun | 1.4.2 |
| **Language** | TypeScript | 5.8.3 |
| **Framework** | React | 19.2.0 |
| **Router** | TanStack Router | 1.170.18 |
| **Build Tool** | Vite | 8.1.5 |
| **CSS** | Tailwind CSS | 4.2.1 |
| **UI Components** | Radix UI + shadcn/ui | Latest |
| **Carousel** | Embla Carousel | 8.6.0 |
| **Forms** | React Hook Form | 7.71.2 |
| **Validation** | Zod | 3.25.76 |
| **Data Fetching** | TanStack Query | 5.101.1 |
| **Icons** | Lucide React | 0.575.0 |

## 📚 Documentation

- **[IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md)** - Detailed implementation guide with code examples
- **[MODULAR_ARCHITECTURE.md](./MODULAR_ARCHITECTURE.md)** - Architecture patterns and backend integration guide

## 🔄 Development Workflow

### Adding a New Component

1. **Create component** in `src/components/home/ComponentName.tsx`
2. **Define props interface** with TypeScript
3. **Import in main page** (`src/routes/index.tsx`)
4. **Use in composition** with Reveal wrapper

Example:
```typescript
// Create component
export interface MyComponentProps {
	title: string;
	onClick?: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onClick }) => {
	return <div>{title}</div>;
};

// Use in main page
<Reveal as="div">
	<MyComponent title="Hello" onClick={() => {}} />
</Reveal>
```

### Adding a New API Service Method

1. **Define types** in `src/types/index.ts`
2. **Add method** to `ProjectService` class
3. **Create hook** in `src/hooks/useProjects.ts`
4. **Use in component** via the hook

### Connecting to Real Backend

1. Set `VITE_API_URL` environment variable
2. Implement backend endpoints
3. Test API calls (should be automatic via hooks)
4. Handle API errors in components

## 🧪 Testing Checklist

- [ ] All components render without errors
- [ ] Carousel auto-plays every 15 seconds
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] API data fetching works when backend is available
- [ ] Fallback to static data when API unavailable
- [ ] All buttons show cursor-pointer on hover
- [ ] Loading states display correctly
- [ ] Hero image loads properly
- [ ] Theme toggle works
- [ ] Mobile menu toggle works

## 🐛 Troubleshooting

### Port already in use
```bash
# Change Vite port
npm run dev -- --port 3000
```

### API not connecting
```bash
# Check VITE_API_URL is set correctly
echo $VITE_API_URL

# Or check environment
cat .env
```

### Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules
bun install

# Rebuild
bun run build
```

## 📈 Performance Metrics

- **Lazy Loading**: Images load on-demand with `loading="lazy"`
- **Code Splitting**: Components loaded via TanStack Router
- **Bundle Size**: Optimized with Vite tree-shaking
- **Core Web Vitals**: Optimized for LCP, FID, CLS

## 🔐 Security Considerations

- ✅ No sensitive data in frontend code
- ✅ API Base URL configurable via environment
- ✅ User inputs properly handled
- ✅ CORS headers from backend required
- ⚠️ TODO: Add authentication layer
- ⚠️ TODO: Add error boundary component
- ⚠️ TODO: Implement request/response interceptors

## 🚦 Version History

### v1.0.0 (Current)
- ✅ Modular component architecture
- ✅ API service layer with CRUD operations
- ✅ Custom React hooks for data fetching
- ✅ Complete type system
- ✅ Hero section, projects grid, ideas carousel
- ✅ Community Q&A and builder request flows
- ✅ How It Works process steps
- ✅ Final CTA section
- ✅ Responsive design with Tailwind CSS
- ✅ Auto-playing carousel (15-second delay)
- ✅ Loading states and error handling

### Upcoming Features
- 🔄 Authentication & authorization
- 🔄 User profiles & portfolios
- 🔄 Advanced search & filtering
- 🔄 Messaging system between users
- 🔄 Project rating & reviews
- 🔄 Admin dashboard

## 📞 Support & Contributing

For questions or issues:
1. Check [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md) for detailed docs
2. Review component props interfaces
3. Check browser console for error messages
4. Verify environment variables are set

## 📄 License

This project is built with Lovable and is available for your use.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TanStack Router Guide](https://tanstack.com/router/latest)
- [Embla Carousel Docs](https://www.embla-carousel.com/)

---

**Last Updated:** 2026-09-06  
**Status:** Active Development  
**Maintainer:** [Your Name]

## Building with Lovable

This project was built with [Lovable](https://lovable.dev).

- **Ship faster**: Describe what you want to build and Lovable handles the code
- **Stay in sync**: Every change made in Lovable is committed straight to this repository
- **Full ownership**: This code is yours. Push to `main` on GitHub and your changes sync back into Lovable

[Continue developing in Lovable editor →](https://lovable.dev/projects/1ae6bf9d-5081-4264-a473-8074fbe0cf4f)
