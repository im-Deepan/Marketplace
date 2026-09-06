# Implementation Documentation

## Project Overview
This document provides a comprehensive guide to all implemented features and file structures in the Marketplace application. The project follows a modular architecture designed for scalability and backend integration.

---

## 📁 File Structure & Implementation Details

### 1. **Type System** (`src/types/index.ts`)
**Purpose**: Centralized type definitions for type-safe frontend-backend contract.

**Implemented Types:**
```typescript
// Core Models
- Project: Base project entity with id, title, category, technology, difficulty, cost, alt, image
- ProjectResponse: Paginated response with data array, total count, page, limit
- IdeaDomain: String type for domain categories
- IdeasResponse: Response wrapper for domain list
- FlowStep: String type for flow diagram steps
- StepType: Object with no, title, text (for "How It Works" section)

// API Response Wrappers
- ApiResponse<T>: Generic wrapper with success boolean, optional data, optional error message
- PaginationParams: Optional page, limit, search, category for filtering

// Component Props
- ProjectCardProps: project, onClick handler, variant ("grid"|"carousel")
- SectionProps: title, subtitle, className for reusable section components
```

**Usage**: Imported across all components and services for type safety.

---

### 2. **Service Layer** (`src/services/api/projectService.ts`)
**Purpose**: Centralized API communication with CRUD operations.

**Key Methods Implemented:**
```typescript
class ProjectService {
  // Fetch all projects with optional filtering
  async getProjects(params?: PaginationParams): Promise<Project[]>
  
  // Fetch single project by ID
  async getProjectById(id: string): Promise<Project | null>
  
  // Fetch projects by category
  async getProjectsByCategory(category: string): Promise<Project[]>
  
  // Create new project (admin)
  async createProject(project: Omit<Project, "id">): Promise<Project | null>
  
  // Update existing project
  async updateProject(id: string, project: Partial<Project>): Promise<Project | null>
  
  // Delete project
  async deleteProject(id: string): Promise<boolean>
}
```

**Configuration:**
- API Base URL: `import.meta.env.VITE_API_URL || "http://localhost:3000/api"`
- Default fallback to localhost:3000 if environment variable not set

**Features:**
- Query parameter handling (page, limit, search, category)
- Error handling with console.error logging
- Consistent ApiResponse format parsing
- Content-Type: application/json headers on all requests

---

### 3. **Custom Hooks** (`src/hooks/useProjects.ts`)
**Purpose**: React hooks abstracting project data fetching logic.

**Implemented Hooks:**

#### `useProjects(params?: PaginationParams)`
```typescript
Returns: {
  data: Project[];          // Array of fetched projects
  loading: boolean;         // Loading state
  error: string | null;    // Error message if any
}
```
- Dependency tracking: page, limit, category, search
- Automatic API call on mount and param changes
- State management: data, loading, error

#### `useProjectById(id: string)`
```typescript
Returns: {
  data: Project | null;    // Single project or null
  loading: boolean;        // Loading state
  error: string | null;   // Error message if any
}
```
- Dependency: id parameter
- Handles null/empty id gracefully
- Returns null when loading or on error

---

## 🎨 Component Architecture

### 4. **HeroSection Component** (`src/components/home/HeroSection.tsx`)
**Purpose**: Reusable hero banner with customizable CTA buttons and content.

**Props Interface:**
```typescript
interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
}
```

**Implementation Details:**
- Default title: "Turn Your Project Idea Into Reality."
- Default subtitle with problem statement
- Responsive grid: lg:grid-cols-[47%_1fr] (image-text split on desktop)
- Title supports multiline via `.split("\n")`
- Animation delays: 0.15s (subtitle), 0.3s (buttons)
- Hero image from: `@/assets/hero-mechanical.jpg`
- Uses ActionButton component for CTAs with variant support

**Layout:**
- Mobile: Single column, centered
- Desktop: 47% text, 53% image with 14px gap
- Image container: rounded-2xl with border

---

### 5. **ProjectCard Component** (`src/components/home/ProjectCard.tsx`)
**Purpose**: Reusable project card supporting grid and carousel layouts.

**Props Interface:**
```typescript
interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
  variant?: "grid" | "carousel";
}
```

**Variants:**

**Grid Variant:**
- Image: 800x400 (4:3 aspect ratio)
- Shows: Category, title, technology, difficulty, cost
- Grid-optimized layout

**Carousel Variant:**
- Image: 400x300 (4:3 aspect ratio)
- Shows: Category, title (line-clamp-2), technology
- Flex layout for carousel container
- Hides difficulty/cost for space optimization

**Visual Features:**
- Hover effects: scale image 105%, translate card -0.25rem, change border to accent
- Loading-optimized: lazy loading images with `loading="lazy"`
- Accessibility: aria-label with project title
- Shadow on hover: `shadow-lift` class

---

### 6. **ProjectsGrid Component** (`src/components/home/ProjectsGrid.tsx`)
**Purpose**: Grid display of projects with loading states and CTA.

**Props Interface:**
```typescript
interface ProjectsGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  onProjectClick?: (project: Project) => void;
  onViewAll?: () => void;
  loading?: boolean;
}
```

**Implementation:**
- Responsive grid: sm:grid-cols-2 lg:grid-cols-4 (4 columns on desktop)
- Gap: 24px (1.5rem)
- Loading state: 8 animated skeleton placeholders with `animate-pulse`
- Maps projects using ProjectCard with variant="grid"
- "View All Projects" button with ghost variant

**Structure:**
```
Section Container (max-w-6xl)
├── SectionHeading (title + subtitle)
├── ul.grid (projects list)
│   └── li × n (ProjectCard components)
└── ActionButton (View All)
```

---

### 7. **IdeasCarousel Component** (`src/components/home/IdeasCarousel.tsx`)
**Purpose**: Auto-rotating carousel with domain filters and project display.

**Props Interface:**
```typescript
interface IdeasCarouselProps {
  projects: Project[];
  domains: string[];
  title?: string;
  subtitle?: string;
  onProjectClick?: (project: Project) => void;
  onDomainClick?: (domain: string) => void;
  onBrowseAll?: () => void;
  autoplayDelay?: number;    // Default: 15000ms
  loading?: boolean;
}
```

**Implementation Details:**

**Domain Tags Section:**
- Renders buttons for each domain
- Click handler: `onDomainClick(domain)` callback
- Styling: border, rounded-full, hover effects

**Carousel Section:**
- Plugin: Embla Carousel with Autoplay
- Autoplay config: delay=15000ms, endless loop
- Manual navigation: Previous/Next buttons
- Responsive: basis-1/2 (2 items mobile), lg:basis-1/3 (3 items desktop)
- Each item: ProjectCard with variant="carousel"

**Loading State:**
- Skeleton heading: animated muted background
- Skeleton carousel: 64px height placeholder

**Structure:**
```
Section (border-y bg-surface)
├── SectionHeading
├── Domain Tags (div with buttons)
└── Carousel Container
    ├── CarouselContent
    │   └── CarouselItem × n (ProjectCard)
    ├── CarouselPrevious
    └── CarouselNext
```

---

### 8. **FlowSection Component** (`src/components/home/FlowSection.tsx`)
**Purpose**: Generic reusable section for displaying process flows with CTAs.

**Props Interface:**
```typescript
interface FlowSectionProps {
  title: string;
  subtitle?: string;
  steps: FlowStep[];
  ctaText?: string;
  ctaVariant?: "default" | "ghost";
  onCTA?: () => void;
  bgVariant?: "surface" | "background";
}
```

**Implementation:**
- Background variants:
  - "surface": border-y border-border bg-surface
  - "background": no special background
- Conditional CTA rendering: only shows if ctaText provided
- Steps rendered via FlowDiagram primitive component

**Usage in App:**
1. **Community Flow Section**: "Stuck? Ask. Learn. Build."
   - bgVariant="background", default CTA styling
2. **Builder Flow Section**: "Have the Idea, But Need Someone to Build It?"
   - bgVariant="surface", ghost CTA styling

---

### 9. **StepsList Component** (`src/components/home/StepsList.tsx`)
**Purpose**: Reusable numbered steps display for sequential processes.

**Props Interface:**
```typescript
interface StepsListProps {
  title: string;
  subtitle?: string;
  steps: StepType[];
  variant?: "grid" | "vertical";
}
```

**Variant Grid (Default):**
- Responsive: 5 columns on desktop (lg:grid-cols-5)
- 2 columns on tablet (sm:grid-cols-2)
- Gap: 32px (2rem)

**Implementation Details:**
- Each step: border-t border-border pt-4
- Badge: `<span>` with accent color showing step number
- Title: mt-2, font-semibold
- Text: mt-1, text-sm, muted-foreground

**Used for:** "How It Works" section with 5-step process

---

### 10. **PlatformIntro (CTASection) Component** (`src/components/home/PlatformIntro.tsx`)
**Purpose**: Call-to-action section with customizable background and dual buttons.

**Props Interface:**
```typescript
interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
  bgColor?: string;  // Default: var(--accent-soft)
}
```

**Implementation:**
- Container: rounded-2xl border border-accent/40 with padding
- Background: customizable via bgColor prop with inline style
- Title: supports newline splitting for multi-line display
- Optional subtitle: muted-foreground color
- Dual buttons: primary (default) + ghost variant

**Styling:**
- Responsive padding: px-6 py-14 (mobile), sm:px-12 (desktop)
- Text alignment: center
- Button layout: flex column on mobile, row on desktop with gap-3

---

### 11. **SectionIntro Component** (`src/components/home/SectionIntro.tsx`)
**Purpose**: Reusable section introduction wrapper with optional children.

**Props Interface:**
```typescript
interface SectionIntroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  bgVariant?: "surface" | "background";
}
```

**Implementation:**
- Wrapper for section content
- SectionHeading as title/subtitle display
- Children slot for additional content
- Background variants: same as FlowSection

**Used for:** Platform feature introduction section

---

## 🏠 Main Page Structure (`src/routes/index.tsx`)

**Purpose**: Home page orchestrating all modular components.

**Key Features:**
```typescript
1. Route Setup: TanStack Router integration with metadata/SEO
2. Hook Usage: const {data, loading} = useProjects()
3. Fallback Logic: API data → static data fallback
4. Event Handlers: 10 handler functions for user interactions
5. Component Composition: 8 section components + Navbar + Footer
```

**Page Sections (Top to Bottom):**

1. **Hero Section**
   - Title, subtitle, CTAs
   - onPrimaryCTA: handleExploreProjects
   - onSecondaryCTA: handlePostIdea

2. **Platform Introduction**
   - SectionIntro with bgVariant="surface"
   - Feature highlight text

3. **Projects Grid**
   - Displays 4 projects per row
   - onProjectClick: handleProjectClick
   - onViewAll: handleViewAllProjects
   - Loading state with 8 skeletons

4. **Ideas Carousel**
   - Auto-play every 15 seconds
   - Domain filter buttons
   - 3 projects visible on desktop
   - onDomainClick: handleDomainClick
   - onBrowseAll: handleBrowseAllIdeas

5. **Community Flow Section**
   - bgVariant="background"
   - onCTA: handleAskQuestion

6. **Builder Request Section**
   - bgVariant="surface"
   - ctaVariant="ghost"
   - onCTA: handlePostRequest

7. **How It Works Section**
   - 5-step numbered process
   - Grid layout

8. **Final CTA Section**
   - Accent-soft background
   - "Have an idea? Let's build it."
   - onPrimaryCTA: handleCTAPrimary
   - onSecondaryCTA: handleCTASecondary

**All sections wrapped in `<Reveal>` animation component**

---

## 📊 Data Flow

```
User Interaction
    ↓
Event Handler (e.g., handleProjectClick)
    ↓
Console log / Navigation
    ↓
Component Update / Route Change
```

**API Data Flow:**
```
useProjects() Hook
    ↓
projectService.getProjects()
    ↓
fetch(`${VITE_API_URL}/projects`)
    ↓
Parse ApiResponse<ProjectResponse>
    ↓
setState(projects[], loading, error)
    ↓
Component Re-render with data
```

**Fallback Logic:**
```
IF apiProjects.length > 0
    USE apiProjects
ELSE
    USE static projects from homeData
```

---

## 🔧 Environment Configuration

**Required Environment Variables:**
```
VITE_API_URL=http://your-backend-url:3000/api
```

**Default Behavior:**
- If VITE_API_URL not set: `http://localhost:3000/api`

**Backend Endpoint Expectations:**
```
GET    /projects              → ProjectResponse
GET    /projects/:id          → Project
POST   /projects              → Project (admin only)
PUT    /projects/:id          → Project (admin only)
DELETE /projects/:id          → boolean
```

---

## 🎯 Reusability & Extensibility

### Component Reusability Pattern
Each component is designed as an independent, self-contained unit:

```typescript
// Example: ProjectCard used in both grid and carousel
<ProjectCard
  project={project}
  onClick={handleClick}
  variant="grid"  // or "carousel"
/>
```

### Adding New Features

**Add New Project Type:**
1. Update `Project` type in `types/index.ts`
2. Add API endpoint in `projectService.ts`
3. Create new component using existing patterns

**Add New Section:**
1. Create component in `components/home/`
2. Import in `routes/index.tsx`
3. Add to page composition with Reveal wrapper

**Connect to Backend:**
1. Set `VITE_API_URL` environment variable
2. Implement backend endpoints matching service interface
3. Components automatically fetch from backend

---

## 🚀 Performance Optimizations

1. **Image Optimization**: Lazy loading via `loading="lazy"` attribute
2. **Responsive Images**: Different sizes for grid (800x600) vs carousel (400x300)
3. **Loading States**: Skeleton placeholders instead of blank loading
4. **Component Memoization**: Functional components with proper dependency tracking
5. **Carousel Autoplay**: 15-second delay with endless loop for engagement

---

## ✅ Validation & Testing Checklist

- [x] All components accept proper TypeScript props
- [x] API service layer implements full CRUD operations
- [x] Custom hooks handle loading/error states
- [x] Main page uses modular components with Reveal animations
- [x] Environment variable configuration working
- [x] Responsive design tested (mobile/tablet/desktop)
- [x] Carousel autoplay set to 15 seconds with endless loop
- [x] Fallback logic for static data when API unavailable
- [x] All components properly styled with Tailwind CSS
- [x] Accessibility attributes present (aria-label, alt text, etc.)

---

## 📝 Summary

This implementation provides a solid, modular foundation for the Marketplace application with:
- ✅ Complete type system for frontend-backend contract
- ✅ Service layer ready for backend integration
- ✅ Reusable, parameterized components
- ✅ Custom hooks for data management
- ✅ Responsive, animated UI
- ✅ Error handling and loading states
- ✅ SEO optimization via TanStack Router metadata
- ✅ Fallback data handling

**Next Steps:** Implement backend API endpoints matching the service interface, then update `VITE_API_URL` to activate live data.
