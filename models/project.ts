import { Project } from "@/types/project";
import { getSupabaseClient } from "./db";

export enum ProjectStatus {
  Created = "created",
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
    .eq("status", ProjectStatus.Created)
    .single();

  if (!data) return undefined;

  return data;
}

export async function findProjectByName(
  name: string
): Promise<Project | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("name", name)
    .eq("status", ProjectStatus.Created)
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
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit);

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
    .eq("is_featured", true)
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit);

  if (error) return [];

  return data;
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
    .eq("status", ProjectStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit);

  if (error) return [];

  return data;
}
