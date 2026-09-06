import { useEffect, useState } from "react";
import { Project, PaginationParams } from "@/types";
import { projectService } from "@/services/api/projectService";

type UseProjectsState = {
  data: Project[];
  loading: boolean;
  error: string | null;
};

export function useProjects(params?: PaginationParams) {
  const [state, setState] = useState<UseProjectsState>({
    data: [],
    loading: true,
    error: null,
  });

  const page = params?.page;
  const limit = params?.limit;
  const category = params?.category;
  const search = params?.search;

  useEffect(() => {
    const fetchProjects = async () => {
      setState({ data: [], loading: true, error: null });
      const projects = await projectService.getProjects({ page, limit, category, search });
      setState({ data: projects, loading: false, error: null });
    };

    fetchProjects();
  }, [page, limit, category, search]);

  return state;
}

export function useProjectById(id: string) {
  const [state, setState] = useState<UseProjectsState & { data: Project | null }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProject = async () => {
      setState({ data: null, loading: true, error: null });
      const project = await projectService.getProjectById(id);
      setState({ data: project, loading: false, error: null });
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return state;
}
