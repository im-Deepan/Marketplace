# Quick Reference Guide

A fast lookup guide for the ProjectHub marketplace application. For detailed information, see [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md) and [README.md](./README.md).

---

## 🗂️ File Organization at a Glance

```
src/
├── types/index.ts                    # TypeScript interfaces (11 types)
├── services/api/projectService.ts    # API communication (6 CRUD methods)
├── hooks/useProjects.ts              # Data fetching hooks (2 hooks)
├── components/home/
│   ├── HeroSection.tsx               # Hero banner
│   ├── ProjectCard.tsx               # Project card (2 variants)
│   ├── ProjectsGrid.tsx              # Grid display
│   ├── IdeasCarousel.tsx             # Auto-playing carousel
│   ├── FlowSection.tsx               # Generic flow section
│   ├── StepsList.tsx                 # Numbered steps
│   ├── PlatformIntro.tsx             # CTA section
│   ├── SectionIntro.tsx              # Section wrapper
│   ├── Navbar.tsx                    # Navigation
│   ├── Footer.tsx                    # Footer
│   ├── primitives.tsx                # Base components
│   └── theme.tsx                     # Theme toggle
├── routes/index.tsx                  # Main page (8 sections)
├── data/homeData.ts                  # Static data
├── assets/                           # Images
└── lib/                              # Utilities
```

---

## 🎯 Quick Component Lookup

### Finding a Component

| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| Hero | `HeroSection.tsx` | Top banner | title, subtitle, CTAs |
| Grid | `ProjectsGrid.tsx` | 4-column layout | projects, loading |
| Carousel | `IdeasCarousel.tsx` | Auto-play carousel | projects, domains |
| Flow | `FlowSection.tsx` | Process steps | title, steps, bgVariant |
| Steps | `StepsList.tsx` | Numbered list | title, steps, variant |
| CTA | `PlatformIntro.tsx` | Call-to-action | title, CTAs, bgColor |
| Card | `ProjectCard.tsx` | Project item | project, onClick, variant |

### Adding a Component to Page

```typescript
// 1. Import
import MyComponent from "@/components/home/MyComponent";

// 2. Use with Reveal
<Reveal as="div">
  <MyComponent prop1="value" onCallback={handler} />
</Reveal>
```

---

## 🔌 API Service Quick Reference

### Getting Projects

```typescript
// All projects with pagination
const projects = await projectService.getProjects({
  page: 1,
  limit: 10,
  category: "IoT",
  search: "smart"
});

// Single project
const project = await projectService.getProjectById("123");

// By category
const iotProjects = await projectService.getProjectsByCategory("IoT");
```

### Creating/Updating/Deleting

```typescript
// Create
const newProject = await projectService.createProject({
  title: "...",
  category: "...",
  // ... other fields
});

// Update
const updated = await projectService.updateProject("123", {
  title: "New Title"
});

// Delete
const success = await projectService.deleteProject("123");
```

---

## 📊 Hooks Quick Reference

### useProjects Hook

```typescript
// Fetch projects with filters
const {data, loading, error} = useProjects({
  page: 1,
  limit: 10,
  category: "Robotics",
  search: "sensor"
});

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>{data.map(p => <ProjectCard project={p} />)}</div>;
```

### useProjectById Hook

```typescript
// Fetch single project
const {data: project, loading} = useProjectById("project-123");

if (loading) return <Skeleton />;
return <ProjectDetail project={project} />;
```

---

## 🎨 Component Props Cheat Sheet

### HeroSection Props
```typescript
{
  title?: string;              // "Turn Your Project..."
  subtitle?: string;           // Descriptive text
  primaryCTA?: string;         // "Explore Projects"
  secondaryCTA?: string;       // "Post Your Idea"
  onPrimaryCTA?: () => void;  // Click handler
  onSecondaryCTA?: () => void;// Click handler
}
```

### ProjectCard Props
```typescript
{
  project: Project;                    // Project object
  onClick?: (project: Project) => void;// Click handler
  variant?: "grid" | "carousel";       // Layout variant
}
```

### ProjectsGrid Props
```typescript
{
  projects: Project[];                 // Array of projects
  title?: string;                      // Section title
  subtitle?: string;                   // Description
  onProjectClick?: (project) => void; // Card click
  onViewAll?: () => void;             // View all button
  loading?: boolean;                   // Loading state
}
```

### IdeasCarousel Props
```typescript
{
  projects: Project[];                 // Carousel items
  domains: string[];                   // Filter buttons
  title?: string;                      // Section title
  onProjectClick?: (project) => void; // Card click
  onDomainClick?: (domain) => void;   // Domain button
  onBrowseAll?: () => void;           // Browse all
  autoplayDelay?: number;              // Default: 15000ms
  loading?: boolean;                   // Loading state
}
```

### FlowSection Props
```typescript
{
  title: string;                       // Section title
  subtitle?: string;                   // Description
  steps: FlowStep[];                   // Step items
  ctaText?: string;                    // Button text
  ctaVariant?: "default" | "ghost";   // Button style
  onCTA?: () => void;                 // Button click
  bgVariant?: "surface" | "background"; // Background
}
```

### StepsList Props
```typescript
{
  title: string;                       // Section title
  subtitle?: string;                   // Description
  steps: StepType[];                   // Step items
  variant?: "grid" | "vertical";       // Layout
}
```

### PlatformIntro Props
```typescript
{
  title: string;                       // Section title
  subtitle?: string;                   // Description
  primaryCTA?: string;                 // Button 1
  secondaryCTA?: string;               // Button 2
  onPrimaryCTA?: () => void;          // Click handler
  onSecondaryCTA?: () => void;        // Click handler
  bgColor?: string;                    // Background color
}
```

---

## 🌐 Backend Integration Steps

### 1. Setup Environment
```env
# .env file
VITE_API_URL=http://localhost:3000/api
```

### 2. Implement Endpoints
```
GET    /api/projects              (paginated list)
GET    /api/projects/:id          (single project)
POST   /api/projects              (create)
PUT    /api/projects/:id          (update)
DELETE /api/projects/:id          (delete)
```

### 3. Response Format
```json
{
  "success": true,
  "data": {
    "data": [...],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

### 4. Test
```bash
# Components automatically fetch from API
# Fallback to static data if API fails
```

---

## 🚀 Common Tasks

### Add New Project Field
1. Update `Project` type in `types/index.ts`
2. Update backend schema
3. No changes needed to components (generic)

### Add New Section to Homepage
1. Create component in `components/home/`
2. Import in `routes/index.tsx`
3. Add to page with `<Reveal>` wrapper

### Connect to New API Endpoint
1. Add type in `types/index.ts`
2. Add method to `projectService.ts`
3. Create hook in `hooks/useProjects.ts`
4. Use hook in component

### Style a Component
- Use Tailwind CSS classes
- Check `primitives.tsx` for base styles
- Use CSS variables in `theme.tsx`

### Add Loading State
- Use `loading` prop from hook
- Show skeleton or spinner
- Hide content while loading

---

## 🎯 Event Handlers in Main Page

```typescript
// Define handlers in routes/index.tsx

handleExploreProjects()        // Hero primary CTA
handlePostIdea()               // Hero secondary CTA
handleProjectClick(project)    // Project card click
handleDomainClick(domain)      // Domain filter click
handleViewAllProjects()        // Grid view all
handleBrowseAllIdeas()         // Carousel browse all
handleAskQuestion()            // Community CTA
handlePostRequest()            // Builder request CTA
handleCTAPrimary()             // Final CTA primary
handleCTASecondary()           // Final CTA secondary
```

All handlers currently log to console. Connect them to navigation/routing as needed.

---

## ⚙️ Configuration

### Environment Variables
```env
# Required
VITE_API_URL=http://localhost:3000/api

# Optional (defaults provided)
VITE_APP_NAME=ProjectHub
VITE_APP_URL=http://localhost:5173
```

### Carousel Settings
```typescript
// ideasCarousel.tsx, line ~27
autoplayDelay = 15000  // 15 seconds
// No other config needed - endless loop is default
```

### Grid Layout
```typescript
// projectsGrid.tsx, line ~35
// sm:grid-cols-2 lg:grid-cols-4
// 2 columns on tablet, 4 on desktop
```

### Carousel Items Visible
```typescript
// ideasCarousel.tsx, line ~76
// basis-1/2 lg:basis-1/3
// 2 items mobile, 3 items desktop
```

---

## 🔍 Debugging Tips

### Check Component Props
```typescript
// Add to component
console.log('Component props:', { title, projects, loading });
```

### Verify API Call
```typescript
// Add to service method
console.log('Fetching from:', url);
console.log('Response:', data);
```

### Check Hook State
```typescript
// Add to hook
console.log('Hook state:', { data, loading, error });
```

### Test Styling
- Open DevTools → Elements tab
- Inspect component
- Check Tailwind classes are applied
- Verify CSS variables are set

### Test Responsiveness
- DevTools → Device toolbar
- Test mobile (375px), tablet (768px), desktop (1440px)
- Check breakpoints: sm:, lg:, etc.

---

## 📊 Type Reference

### Project Type
```typescript
{
  id?: string;
  title: string;
  category: string;
  technology: string;
  difficulty: string;
  cost: string;
  alt: string;
  image: string;
}
```

### ProjectResponse Type
```typescript
{
  data: Project[];
  total: number;
  page: number;
  limit: number;
}
```

### ApiResponse<T> Type
```typescript
{
  success: boolean;
  data?: T;
  error?: string;
}
```

### PaginationParams Type
```typescript
{
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}
```

---

## 🧪 Testing Checklist

- [ ] Components render without errors
- [ ] Props type-check correctly
- [ ] API service methods return correct types
- [ ] Hooks update component when data changes
- [ ] Fallback data shows when API fails
- [ ] Carousel rotates every 15 seconds
- [ ] Loading states display
- [ ] Responsive design works
- [ ] All buttons clickable
- [ ] Images load properly

---

## 📚 Documentation Reference

| Document | Use For |
|----------|---------|
| [README.md](./README.md) | Setup, overview, tech stack |
| [IMPLEMENTATIONS.md](./IMPLEMENTATIONS.md) | Detailed code examples, patterns |
| [MODULAR_ARCHITECTURE.md](./MODULAR_ARCHITECTURE.md) | Architecture decisions, patterns |
| [UPDATE_LOG.md](./UPDATE_LOG.md) | What was implemented and when |
| **This File** | Quick lookup and common tasks |

---

## 🔗 Useful Links

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TanStack Router](https://tanstack.com/router/latest)
- [Embla Carousel](https://www.embla-carousel.com/)

---

**Last Updated:** September 6, 2026  
**Quick Reference Version:** 1.0.0
