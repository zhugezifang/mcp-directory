import { Project } from "@/types/project";

export default function ({ project }: { project: Project }) {
  const imgList = project.img_url.split(";");
  return (

   <>
    {imgList.map((imgUrl, index) => (
      <img
        key={index}
        // Bug 修复：将 String 类型转换为 string 类型
        src={imgUrl}
        alt={project.name}
        loading="lazy"
        className="object-cover"
      />
    ))}
  </>

  );
}
