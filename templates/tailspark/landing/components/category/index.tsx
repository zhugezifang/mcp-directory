import { Category } from "@/types/category";
import Crumb from "./crumb";
import Link from "next/link";
import { Project } from "@/types/project";
import Projects from "../projects";
import Markdown from "@/components/markdown";

export default function ({
  category,
  projects,
}: {
  category: Category;
  projects: Project[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
      <Crumb category={category} />
      <div className="mt-16 text-center">
        <h1 className="text-4xl text-primary font-bold mb-2">
        {category.projects_count || 0} + {category.title}
        </h1>
        <p className="text-lg text-gray-500 mt-4">
          {category.description}
        </p>
      </div>

      <div className="w-full text-center">
        {projects && <Projects projects={projects} />}
      </div>
      <div className="mx-auto leading-loose pt-4 pb-8 px-8">
        <Markdown content={category.sumamry} />
      </div>
    </div>
  );
}
