import { ProjectStatus, findProjectByName } from "@/models/project";
import { respData, respErr } from "@/utils/resp";

import { Project } from "@/types/project";
import { genUuid } from "@/utils";
import { getIsoTimestr } from "@/utils/time";
import { saveProject } from "@/services/project";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    let { name, title, description, url, avatar_url } = await req.json();
    if (!url) {
      return respErr("url is required");
    }

    if (!url.startsWith("https://github.com")) {
      return respErr("mcp server url should start with https://github.com");
    }

    if (!name) {
      const urlParts = url.split("/");
      name = urlParts[urlParts.length - 1];
      if (!name) {
        return respErr("name is required");
      }
    }

    if (!title) {
      title = name
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (!avatar_url) {
      avatar_url = `${url}/favicon.ico`;
    }

    const existProject = await findProjectByName(name);
    if (existProject) {
      return respData(existProject);
    }

    const project: Project = {
      name,
      title,
      description,
      url,
      avatar_url,
    };

    const created_at = getIsoTimestr();

    project.uuid = genUuid();
    project.created_at = created_at;
    project.updated_at = created_at;
    project.status = ProjectStatus.Created;

    project.author_avatar_url = "";
    project.target = "_self";

    project.is_featured = true;
    project.sort = 1;

    await saveProject(project);

    return respData(project);
  } catch (e) {
    console.log("submit project failed", e);
    return respErr("submit project failed");
  }
}
