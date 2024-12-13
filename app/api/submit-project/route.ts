import { ProjectStatus, findProjectByName } from "@/models/project";
import { respData, respErr } from "@/utils/resp";

import { Project } from "@/types/project";
import { genUuid } from "@/utils";
import { getIsoTimestr } from "@/utils/time";
import { saveProject } from "@/services/project";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    let project: Project = await req.json();

    const parsedProject = parseProject(project);
    if (!parsedProject) {
      return respErr("invalid project");
    }

    const savedProject = await saveProject(parsedProject);
    if (!savedProject) {
      return respErr("save project failed");
    }

    return respData(savedProject);
  } catch (e) {
    console.log("submit project failed", e);
    return respErr("submit project failed");
  }
}

export function parseProject(project: Project): Project | undefined {
  try {
    if (!project || !project.url) {
      return;
    }

    if (!project.url.startsWith("https://github.com")) {
      return;
    }

    if (!project.name) {
      const urlParts = project.url.split("/");
      project.name = urlParts[urlParts.length - 1];
      if (!project.name) {
        return;
      }
    }

    if (!project.author_name) {
      const urlParts = project.url.split("/");
      if (urlParts.length > 2) {
        project.author_name = urlParts[urlParts.length - 2];
      }
    }

    if (!project.title) {
      project.title = project.name
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    const created_at = getIsoTimestr();

    project.uuid = genUuid();
    project.created_at = created_at;
    project.updated_at = created_at;
    project.status = ProjectStatus.Created;
    project.target = "_self";
    project.is_featured = true;
    project.sort = 1;

    return project;
  } catch (e) {
    console.log("parse project failed", e);
    return;
  }
}
