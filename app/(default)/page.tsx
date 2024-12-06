import { getFeaturedProjects, getProjectsWithKeyword } from "@/models/project";

import LandingPage from "@/templates/tailspark/landing/page";
import { Project } from "@/types/project";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  let projects: Project[] = [];

  if (q) {
    projects = await getProjectsWithKeyword(q as string, 1, 100);
  } else {
    projects = await getFeaturedProjects(1, 100);
  }

  return <LandingPage page={pagejson} projects={projects} />;
}
