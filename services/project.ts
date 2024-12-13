import { findProjectByName, insertProject } from "@/models/project";

import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index.mjs";
import { Project } from "@/types/project";
import { extractProjectPrompt } from "@/services/prompts/extract_project";
import { getOpenAIClient } from "@/services/llms/openai";
import { summarizeProjectPrompt } from "./prompts/summarize_project";

export async function extractProject(content: string): Promise<Project> {
  try {
    const prompt = extractProjectPrompt.replace("{content}", content);
    const openai = getOpenAIClient();

    const params: ChatCompletionCreateParamsNonStreaming = {
      model: process.env.OPENAI_MODEL as string,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    };

    console.log("request llm params: ", openai.baseURL, params);

    const res = await openai.chat.completions.create(params);

    const result = res.choices[0].message.content;

    const project = JSON.parse(result || "{}");
    if (!project.name || !project.title || !project.description) {
      throw new Error("project is invalid");
    }

    return project;
  } catch (e) {
    console.error("extract project failed: ", e);
    throw e;
  }
}

export async function summarizeProject(project: Project): Promise<Project> {
  try {
    const prompt = summarizeProjectPrompt.replace(
      "{project}",
      JSON.stringify(project)
    );
    const openai = getOpenAIClient();

    const params: ChatCompletionCreateParamsNonStreaming = {
      model: process.env.OPENAI_MODEL as string,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    };

    console.log("request llm params: ", openai.baseURL, params);

    const res = await openai.chat.completions.create(params);

    const result = res.choices[0].message.content;

    console.log("summarize project result: ", result);

    const summarizedProject = JSON.parse(result || "{}");
    if (!summarizedProject.summary) {
      throw new Error("summary is invalid");
    }

    return summarizedProject;
  } catch (e) {
    console.error("summarize project failed: ", e);
    throw e;
  }
}

export async function saveProject(
  project: Project
): Promise<Project | undefined> {
  try {
    if (!project.name) {
      throw new Error("invalid project");
    }

    const existProject = await findProjectByName(project.name);
    if (existProject) {
      return existProject;
    }

    await insertProject(project);

    return project;
  } catch (e) {
    console.error("save project failed: ", e);
    throw e;
  }
}
