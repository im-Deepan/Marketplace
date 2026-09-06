// Project types
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

export type ProjectResponse = {
  data: Project[];
  total: number;
  page: number;
  limit: number;
};

// Idea/Domain types
export type IdeaDomain = string;

export type IdeasResponse = {
  data: IdeaDomain[];
};

// Flow step types
export type FlowStep = string;

export type StepType = {
  no: string;
  title: string;
  text: string;
};

// API Response wrapper
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Pagination
export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
};

// Component prop types
export type ProjectCardProps = {
  project: Project;
  onClick?: (project: Project) => void;
  variant?: "grid" | "carousel";
};

export type SectionProps = {
  title: string;
  subtitle?: string;
  className?: string;
};
