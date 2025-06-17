import { findProjectByUuid, getRandomProjects } from "@/models/project";

import Single from "@/templates/tailspark/landing/pages/single";
import { findCategoryByName } from "@/models/category";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;
  const project = await findProjectByUuid(uuid);

  return {
    title: `${project?.name || "-"} | ${pagejson?.metadata?.title}`,
    description: `${project?.description}`,

    /*description: `${project?.name || "-"}: ${
      project?.description || "-"
    }`,*/
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/resume/${uuid}`,
    },
  };
}

export default async function ({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await params;

  console.log(uuid);

  const project = await findProjectByUuid(uuid);
  console.log(project);
  if (!project || !project.uuid) {
    return <div>Project not found</div>;
  }

  const category = await findCategoryByName(project.category || "");

  const more_projects = await getRandomProjects(1, 10);

  return (
    <Single
      project={project}
      more_projects={more_projects}
      category={category}
    />
  );
}
