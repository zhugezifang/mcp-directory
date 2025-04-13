import { Category } from "@/types/category";
import Crumb from "./crumb";
import Link from "next/link";
import { Project } from "@/types/project";
import Projects from "../projects";

export default function ({
  categories,
  projects,
}: {
  categories: Category[];
  projects: Project[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
      <Crumb />
      <div className="mt-16 text-center">
        <h1 className="text-4xl text-primary font-bold mb-2">
          简历模板分类
        </h1>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {categories &&
          categories.map((category: Category) => {
            return (
              <Link
                key={category.name}
                href={`/category/${category.name}`}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg">{category.title}</span>
                  <span className="text-primary">
                    {category.projects_count}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>

      <div className="w-full text-center">
        <h2 className="mx-auto font-bold text-3xl mt-16 mb-4">
          精选简历模板
        </h2>
        {projects && <Projects projects={projects} />}
      </div>
    </div>
  );
}
