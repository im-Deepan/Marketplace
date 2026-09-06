# Modular Architecture Documentation

## Project Structure

Your application is now organized into modular, reusable components and services designed for easy backend integration.

### Directory Structure

```
src/
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx         # Hero banner with CTA buttons
│   │   ├── SectionIntro.tsx        # Reusable section introduction
│   │   ├── ProjectCard.tsx         # Reusable project card (grid & carousel variants)
│   │   ├── ProjectsGrid.tsx        # Projects grid section
│   │   ├── IdeasCarousel.tsx       # Ideas carousel with autoplay
│   │   ├── FlowSection.tsx         # Generic flow/steps section
│   │   ├── StepsList.tsx           # Steps list component
│   │   ├── Navbar.tsx              # Navigation bar
│   │   ├── Footer.tsx              # Footer
│   │   ├── primitives.tsx          # Base components (ActionButton, SectionHeading, etc.)
│   │   └── theme.tsx               # Theme toggle
│   └── ui/                         # shadcn/ui components
├── services/
│   └── api/
│       └── projectService.ts       # API service for projects
├── hooks/
│   ├── useProjects.ts              # Custom hooks for data fetching
│   └── use-mobile.tsx              # Mobile detection hook
├── types/
│   └── index.ts                    # TypeScript interfaces & types
├── data/
│   └── homeData.ts                 # Static data (fallback)
├── routes/
│   └── index.tsx                   # Main home page (orchestrator)
└── lib/
    └── utils.ts                    # Utility functions
```

## Core Components

### 1. **HeroSection.tsx**
Reusable hero banner component.

```typescript
<HeroSection
  title="Your Title"
  subtitle="Your subtitle"
  primaryCTA="Button 1"
  secondaryCTA="Button 2"
  onPrimaryCTA={() => {}}
  onSecondaryCTA={() => {}}
/>
```

### 2. **ProjectCard.tsx**
Reusable project card with two variants.

```typescript
<ProjectCard
  project={projectObject}
  onClick={(project) => handleClick(project)}
  variant="grid" // or "carousel"
/>
```

### 3. **ProjectsGrid.tsx**
Grid display of projects with loading states.

```typescript
<ProjectsGrid
  projects={projects}
  title="Explore Real Projects"
  onProjectClick={handleProjectClick}
  onViewAll={handleViewAll}
  loading={false}
/>
```

### 4. **IdeasCarousel.tsx**
Auto-playing carousel with domain filters.

```typescript
<IdeasCarousel
  projects={projects}
  domains={ideaDomains}
  title="Discover Project Ideas"
  onProjectClick={handleProjectClick}
  onDomainClick={handleDomainClick}
  onBrowseAll={handleBrowseAll}
  autoplayDelay={15000}
  loading={false}
/>
```

### 5. **FlowSection.tsx**
Generic section for displaying flow steps or CTAs.

```typescript
<FlowSection
  title="Section Title"
  subtitle="Subtitle"
  steps={flowSteps}
  ctaText="Call to Action"
  ctaVariant="default"
  onCTA={() => {}}
  bgVariant="surface"
/>
```

## Services & Hooks

### **projectService.ts**
API service layer for backend integration.

```typescript
import { projectService } from "@/services/api/projectService";

// Fetch all projects
await projectService.getProjects({ page: 1, limit: 10 });

// Fetch by category
await projectService.getProjectsByCategory("Robotics");

// Create project
await projectService.createProject(newProject);

// Update project
await projectService.updateProject(id, updates);

// Delete project
await projectService.deleteProject(id);
```

### **useProjects.ts**
Custom React hook for data fetching.

```typescript
import { useProjects, useProjectById } from "@/hooks/useProjects";

// Get all projects
const { data: projects, loading, error } = useProjects({ 
  page: 1, 
  limit: 10, 
  category: "IoT" 
});

// Get single project
const { data: project, loading } = useProjectById("project-id");
```

## Types

All TypeScript types are defined in `types/index.ts`:

```typescript
export type Project = {
  id?: string;
  title: string;
  category: string;
  technology: string;
  difficulty: string;
  cost: string;
  alt: string;
  image: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
};
```

## Backend Integration

### 1. Configure API Base URL
Set `VITE_API_URL` in `.env`:

```
VITE_API_URL=http://localhost:3000/api
```

### 2. API Endpoints Expected

The `projectService` expects these endpoints:

```
GET    /api/projects              # List all projects
GET    /api/projects/:id          # Get single project
POST   /api/projects              # Create project
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
```

### 3. Response Format

All API responses should follow this format:

```typescript
{
  success: boolean;
  data: Project | ProjectResponse | null;
  error?: string;
}
```

### 4. Example Backend Response

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
        "image": "url-to-image"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

## Usage Example

In your pages or components:

```typescript
import { useProjects } from "@/hooks/useProjects";
import ProjectsGrid from "@/components/home/ProjectsGrid";

export function ExamplePage() {
  const { data: projects, loading } = useProjects({ limit: 20 });

  const handleProjectClick = (project) => {
    // Navigate or open modal
    console.log("Selected:", project);
  };

  return (
    <ProjectsGrid
      projects={projects}
      loading={loading}
      onProjectClick={handleProjectClick}
    />
  );
}
```

## Benefits of This Architecture

✅ **Reusable Components** - Each component can be used independently  
✅ **Separation of Concerns** - Logic, data, and UI are separate  
✅ **Easy Backend Integration** - Service layer handles all API calls  
✅ **Type Safe** - Full TypeScript support with proper types  
✅ **Loading States** - Built-in handling for async operations  
✅ **Flexible** - Props allow customization without modifying components  
✅ **Maintainable** - Clear structure makes it easy to extend  
✅ **Testable** - Components and services can be tested independently  

## Next Steps

1. **Implement Backend API** - Create endpoints matching the expected format
2. **Update Environment Variables** - Set `VITE_API_URL`
3. **Connect Event Handlers** - Link CTA buttons to navigation/routing
4. **Add Error Handling** - Implement error UI components
5. **Add Authentication** - Integrate auth into projectService
6. **Implement Pagination** - Add pagination UI to ProjectsGrid
7. **Add Search/Filters** - Use `useProjects` with filter parameters

---

All components follow React best practices and are optimized for performance!
