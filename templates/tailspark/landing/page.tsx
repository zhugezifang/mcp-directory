import Hero from "./components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "./components/projects";
import Search from "./components/search";

export default function ({
  page,
  projects,
}: {
  page: Page;
  projects: Project[];
}) {
  return (
    <div>
      {page.hero && <Hero hero={page.hero} />}
      <Search />
      <Projects projects={projects} />
    </div>
  );
}
