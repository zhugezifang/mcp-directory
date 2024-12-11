import { findProjectByName, updateProject } from "@/models/project";
import { respData, respErr } from "@/utils/resp";

import { getIsoTimestr } from "@/utils";
import { readUrl } from "@/services/reader/jina";
import { summarizeProject } from "@/services/project";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    let { name, content_url, avatar_url } = await req.json();
    if (!name) {
      return respErr("name is required");
    }

    const project = await findProjectByName(name);
    if (!project || !project.uuid || !project.url) {
      return respErr("invalid project");
    }

    if (!content_url) {
      content_url = project.url;
    }

    if (content_url.startsWith("https://github.com")) {
      const githubUrl = new URL(content_url);
      const [owner, repo] = githubUrl.pathname.slice(1).split("/");
      content_url = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
    }

    if (avatar_url) {
      project.avatar_url = avatar_url;
    }

    console.log("project", project, content_url);

    const projectUpdatedAt = project.updated_at;

    if (!project.content && content_url) {
      const post = await readUrl(content_url);
      console.log("post", post);
      if (post && post.content) {
        project.content = post.content;
        project.updated_at = getIsoTimestr();
      }
    }

    if (!project.summary && project.content) {
      const summarizedProject = await summarizeProject(project);
      project.category = summarizedProject.category;
      project.tags = Array.isArray(summarizedProject.tags)
        ? summarizedProject.tags.join(",")
        : summarizedProject.tags;
      project.summary = summarizedProject.summary;
      project.target = "_self";
      project.updated_at = getIsoTimestr();
    }

    if (projectUpdatedAt !== project.updated_at) {
      await updateProject(project.uuid, project);
    }

    return respData(project);
  } catch (e) {
    console.log("summarize project failed: ", e);
    return respErr("summarize project failed");
  }
}
