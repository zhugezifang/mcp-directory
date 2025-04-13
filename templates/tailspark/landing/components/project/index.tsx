import { BiCategory } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { Category } from "@/types/category";
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
              
            </div>
            <div className="mb-8 mt-8 h-px w-full bg-black"></div>
            
          </div>
          {project.img_url && (
            <div className="flex flex-col items-center gap-4 p-4">
            <Preview project={project} />
            </div>
          )}


          <div className="flex items-center justify-center py-4">
              <a href={project.url} target="_blank" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                  下载文件
              </a>
          </div>

        </div>
      </div>

      {project.summary && (
        <div className="w-full md:max-w-7xl mx-auto px-8 py-4 mt-16 text-left border border-gray-200 rounded-lg">
          <Markdown content={project.summary || ""} />
        </div>
      )}

      <div className="w-full text-center">
        <p className="mx-auto font-bold text-3xl mt-16 mb-4">View More</p>
        {more_projects && <Projects projects={more_projects} />}
      </div>
    </div>
  );
};
