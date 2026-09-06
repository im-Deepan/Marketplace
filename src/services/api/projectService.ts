import { Project, ProjectResponse, IdeasResponse, PaginationParams, ApiResponse } from "@/types";
import { projects as defaultProjects, ideaDomains as defaultDomains } from "@/data/homeData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

class ProjectService {
  private localProjects: Project[] = [...defaultProjects];

  /**
   * Filter local projects based on search, category, and pagination
   */
  private getFilteredLocalProjects(params?: PaginationParams): Project[] {
    let result = [...this.localProjects];

    if (params?.category) {
      const cat = params.category.toLowerCase();
      result = result.filter((p) => p.category.toLowerCase() === cat);
    }

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.technology.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q),
      );
    }

    if (params?.page && params?.limit) {
      const start = (params.page - 1) * params.limit;
      result = result.slice(start, start + params.limit);
    }

    return result;
  }

  /**
   * Fetch all projects with optional filters
   */
  async getProjects(params?: PaginationParams): Promise<Project[]> {
    if (!API_BASE_URL) {
      return this.getFilteredLocalProjects(params);
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append("page", params.page.toString());
      if (params?.limit) queryParams.append("limit", params.limit.toString());
      if (params?.search) queryParams.append("search", params.search);
      if (params?.category) queryParams.append("category", params.category);

      const response = await fetch(`${API_BASE_URL}/projects?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return this.getFilteredLocalProjects(params);
      }

      const data: ApiResponse<ProjectResponse> = await response.json();
      return data.data?.data || this.getFilteredLocalProjects(params);
    } catch {
      return this.getFilteredLocalProjects(params);
    }
  }

  /**
   * Fetch a single project by ID or title
   */
  async getProjectById(id: string): Promise<Project | null> {
    if (!API_BASE_URL) {
      const found = this.localProjects.find((p) => p.id === id || p.title === id);
      return found || null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const found = this.localProjects.find((p) => p.id === id || p.title === id);
        return found || null;
      }

      const data: ApiResponse<Project> = await response.json();
      return data.data || null;
    } catch {
      const found = this.localProjects.find((p) => p.id === id || p.title === id);
      return found || null;
    }
  }

  /**
   * Fetch projects by category
   */
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return this.getProjects({ category });
  }

  /**
   * Fetch idea domains
   */
  async getIdeaDomains(): Promise<string[]> {
    return [...defaultDomains];
  }

  /**
   * Create a new project
   */
  async createProject(project: Omit<Project, "id">): Promise<Project | null> {
    const newProject: Project = {
      ...project,
      id: String(Date.now()),
    };

    if (!API_BASE_URL) {
      this.localProjects.unshift(newProject);
      return newProject;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        this.localProjects.unshift(newProject);
        return newProject;
      }

      const data: ApiResponse<Project> = await response.json();
      return data.data || newProject;
    } catch {
      this.localProjects.unshift(newProject);
      return newProject;
    }
  }

  /**
   * Update a project
   */
  async updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
    const index = this.localProjects.findIndex((p) => p.id === id || p.title === id);
    if (index !== -1) {
      this.localProjects[index] = { ...this.localProjects[index], ...project } as Project;
    }

    if (!API_BASE_URL) {
      return index !== -1 ? this.localProjects[index] || null : null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        return index !== -1 ? this.localProjects[index] || null : null;
      }

      const data: ApiResponse<Project> = await response.json();
      return data.data || null;
    } catch {
      return index !== -1 ? this.localProjects[index] || null : null;
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<boolean> {
    this.localProjects = this.localProjects.filter((p) => p.id !== id && p.title !== id);

    if (!API_BASE_URL) {
      return true;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.ok;
    } catch {
      return true;
    }
  }
}

export const projectService = new ProjectService();
