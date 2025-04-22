"use client";

import { Project } from "@/types/project";
import ProjectItem from "./qipuItem";

export default ({
  projects,
  loading,
}: {
  projects: Project[];
  loading?: boolean;
}) => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"> 
            {projects.map((item: Project, idx: number) => {
              return (
                <div key={idx}>
                  <ProjectItem project={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto text-center">Loading data...</div>
        )}
      </div>
    </section>
  );
};
