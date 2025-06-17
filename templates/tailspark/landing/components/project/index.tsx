import { BiCategory } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { Category } from "@/types/category";
import DownLoad from "@/components/download";
import Crumb from "./crumb";
import Markdown from "@/components/markdown";
import Preview from "./preview";
import { Project } from "@/types/project";
import Projects from "../projects";
import Stars from "../stars";
import moment from "moment";

export default ({
  category,
  project,
  more_projects,
}: {
  category?: Category;
  project: Project;
  more_projects?: Project[];
}) => {
  const tagsArr = project.tags ? project.tags.split(",") : [];

  return (
    <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
      <Crumb category={category} project={project} />

      <div className="mx-auto w-full max-w-7xl py-8 md:py-8 lg:py-8">
        <div className="mt-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-4xl font-bold md:text-6xl">{project.name}</h1>

            <div className="flex items-center gap-2 mt-4">
              {project.description}
            </div>
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            
          </div>
          {project.img_url && (
            <div className="flex flex-col items-center gap-4 p-4">
            <Preview project={project} />
            </div>
          )}


          <DownLoad imageUrl={project.url as string} fileName={project.name as string}/>

        </div>
      </div>

      {project.summary && (
        <div className="w-full md:max-w-7xl mx-auto px-8 py-4 mt-16 text-left border border-gray-200 rounded-lg">
          <Markdown content={project.summary || ""} />
        </div>
      )}

      <div className="w-full text-center">
        <p className="mx-auto font-bold text-3xl mt-16 mb-4">更多简历模板</p>
        {more_projects && <Projects projects={more_projects} />}
      </div>
    </div>
  );
};
