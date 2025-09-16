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
      <div className="bg-white rounded-lg border border-solid border-[#7e7e7e] p-2 shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="relative">
                    <img src={project.avatar_url} loading="lazy"
                    alt={project.name} className="w-full object-cover"/> 
                    <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 text-xs rounded-bl-lg before:content-['免费']">
                      
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mt-4">{project.name}</h2> 
                </div>
      </div>
    </Link>
  );
};
