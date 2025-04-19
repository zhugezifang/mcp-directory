import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Project } from "@/types/project";
import StarIcon from "../../assets/imgs/star.svg";
import Stars from "../stars";
import moment from "moment";

export default ({ project }: { project: Project }) => {
  return (
    <Link
      href={`/resume/${project.uuid}`
      }
      target="_blank"
    >
      <div className="mb-6 gap-6 overflow-hidden rounded-2xl border border-solid border-[#7e7e7e] bg-white p-8 text-center">
        <img               
        src={project.avatar_url}
        alt={project.name} className="w-full h-auto max-h-[336px] object-contain rounded-lg"/>
        <h2 className="text-xl font-semibold mt-4">{project.name}</h2>
      </div>
    </Link>
  );
};
