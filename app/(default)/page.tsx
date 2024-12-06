import LandingPage from "@/templates/tailspark/landing/page";
import { getFeaturedProjects } from "@/models/project";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export default async function () {
  const featuredProjects = await getFeaturedProjects(1, 100);

  return <LandingPage page={pagejson} projects={featuredProjects} />;
}
