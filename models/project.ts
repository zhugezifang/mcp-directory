import { Project } from "@/types/project";
import { getSupabaseClient } from "./db";

export enum ProjectStatus {
  Created = "active",
  Deleted = "deleted",
}

export async function insertProject(project: Project) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("projects").insert(project);

  if (error) throw error;
  return data;
}

export async function findProjectByUuid(
  uuid: string
): Promise<Project | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("uuid", uuid)
    //.eq("status", ProjectStatus.Created)
    .single();

  if (!data) return undefined;

  return data;
}

export async function findProjectByName(
  name: string
): Promise<Project | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("name", name)
    //.eq("status", ProjectStatus.Created)
    .single();

  if (!data) return undefined;

  return data;
}

export async function getProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: false })
    //.order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getProjectsCount(): Promise<number> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("count")
    //.filter("category", "is", null)
    //.eq("status", ProjectStatus.Created);

  if (error) return 0;

  return data?.[0]?.count || 0;
}

export async function getProjectsCountByCategory(
  category: string
): Promise<number> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("count")
    .eq("category", category)
    //.eq("status", ProjectStatus.Created);

  if (error) return 0;

  return data?.[0]?.count || 0;
}

export async function getProjectsByCategory(
  category: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: false })
    //.order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}


export async function updateProjectCategoryById(
  category: string,id:string
): Promise<Project | undefined> {
  const cli = getSupabaseClient();

  const { data, error } = await cli
    .from("projects")
    .update({ category: category })
    .eq("uuid", id);

  if (error) {
    if (error.code === "PGRST116") {
      return undefined;
    }

    throw error;
  }

  if (!data) {
    return undefined;
  }
}


export async function getProjectsIsNullCategory(
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .filter("category", "is", null)
    //.eq("is_featured", true)
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: true })
    //.order("created_at", { ascending: false })
    .range(0,300);

  if (error) return [];
  return data;
}

export async function getFeaturedProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    //.eq("is_featured", true)
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: true })
    //.order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];
  return data;
}

export async function getRandomProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: false })
    //.order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data.sort(() => Math.random() - 0.5);
}

export async function getRandomProjectsIsNullWithDescription(
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .is("description", null)
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: true })
    //.order("created_at", { ascending: false })
    .limit(10);
    //.range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data.sort(() => Math.random() - 0.5);
}


export async function getProjectsWithKeyword(
  keyword: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .or(
      `name.ilike.%${keyword}%,title.ilike.%${keyword}%,description.ilike.%${keyword}%`
    )
    //.eq("status", ProjectStatus.Created)
    .order("id", { ascending: false })
    //.order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getProjectsWithoutSummary(
  page: number,
  limit: number
): Promise<Project[]> {
  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 20;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .is("summary", null)
    //.eq("status", ProjectStatus.Created)
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function updateProject(uuid: string, project: Partial<Project>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("uuid", uuid);

  if (error) throw error;

  return data;
}


export async function updateProjectInfos(uuid: string, description: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .update({ description: description })
    .eq("uuid", uuid);

  if (error) throw error;

  return data;
}
