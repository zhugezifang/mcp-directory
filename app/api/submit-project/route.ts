import {
  extractProject,
  saveProject,
  summarizeProject,
} from "@/services/project";
import { respData, respErr } from "@/utils/resp";

import { ProjectStatus } from "@/models/project";
import { genUuid } from "@/utils";
import { getIsoTimestr } from "@/utils/time";
import { readUrl } from "@/services/reader/jina";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { url, avatar_url } = await req.json();
    if (!url) {
      return respErr("url is required");
    }

    if (!url.startsWith("https://github.com")) {
      return respErr("mcp server url should start with https://github.com");
    }

    const post = await readUrl(url);
    if (!post || !post.content) {
      return respErr("read url failed");
    }

    console.log("post", post);

    const project = await extractProject(post.content);
    console.log("extracted project", project);

    project.content = post.content;

    // const summarizedProject = await summarizeProject(project);
    // console.log("summarized project", summarizedProject);

    const created_at = getIsoTimestr();

    project.uuid = genUuid();
    project.url = post.url;
    project.avatar_url = avatar_url || `${project.url}/favicon.ico`;
    project.created_at = created_at;
    project.updated_at = created_at;
    project.status = ProjectStatus.Created;

    project.author_avatar_url = "";
    project.target = "_self";

    // project.tags = summarizedProject.tags;
    // project.category = summarizedProject.category;
    // project.summary = summarizedProject.summary;
    project.is_featured = true;
    project.sort = 1;

    await saveProject(project);

    return respData(project);
  } catch (e) {
    console.log("submit project failed", e);
    return respErr("submit project failed");
  }
}
