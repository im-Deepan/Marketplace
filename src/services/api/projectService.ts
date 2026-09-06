import { Project, ProjectResponse, IdeasResponse, PaginationParams, ApiResponse } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

class ProjectService {
  /**
   * Fetch all projects with optional filters
   */
  async getProjects(params?: PaginationParams): Promise<Project[]> {
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
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const data: ApiResponse<ProjectResponse> = await response.json();
      return data.data?.data || [];
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  }

  /**
   * Fetch a single project by ID
   */
  async getProjectById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch project: ${response.statusText}`);
      }

      const data: ApiResponse<Project> = await response.json();
      return data.data || null;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  }

  /**
   * Fetch projects by category
   */
  async getProjectsByCategory(category: string): Promise<Project[]> {
    return this.getProjects({ category });
  }

  /**
   * Create a new project (admin only)
   */
  async createProject(project: Omit<Project, "id">): Promise<Project | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error(`Failed to create project: ${response.statusText}`);
      }

      const data: ApiResponse<Project> = await response.json();
      return data.data || null;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    }
  }

  /**
   * Update a project
   */
  async updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.statusText}`);
      }

      const data: ApiResponse<Project> = await response.json();
      return data.data || null;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    }
  }

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Error deleting project:", error);
      return false;
    }
  }
}

export const projectService = new ProjectService();
