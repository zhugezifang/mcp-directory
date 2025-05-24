import Faq from "../components/faq";
import Hero from "../components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "../components/projects";
import Search from "../components/search";
import { Category } from "@/types/category";
import Link from "next/link";

export default function ({
  page,
  categories,
  projects,
  projectsCount,
}: {
  page: Page;
  categories: Category[];
  projects: Project[];
  projectsCount: number;
}) {
  return (
    <div>
      {page.hero && <Hero hero={page.hero} count={projectsCount} />}
      <Search />
      <div className="container mx-auto px-4 pt-6 pb-2">
        <nav className="flex justify-center space-x-6">
        {categories &&
          categories.map((category: Category) => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                className="px-4 py-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                {category.title}
              </Link>
            );
        })}
        </nav>
      </div>
      <Projects projects={projects} />
      {page.faq && <Faq section={page.faq} />}
    </div>
  );
}
