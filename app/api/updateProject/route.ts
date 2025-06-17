export const runtime = 'edge';

import {
    getRandomProjectsIsNullWithDescription,updateProjectInfos
  } from "@/models/project";
import { Project } from "@/types/project";
import { chat } from "@/utils/siliconflow";

export async function GET(request: Request) {
  
  //const list= updateMsgInfo();
  const list = updateProjectCategory();
  return new Response(JSON.stringify(list), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
  });
  
}

async function updateProjectCategory(){

    const list:Project[] = await getRandomProjectsIsNullWithDescription(1,10) || [];
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        console.log(element.uuid);
        if (element.uuid !== undefined) {
            const result = await chat(element.name as string);
            console.log(result);
            await updateProjectInfos(element.uuid, result as string);
        }
    }
    return list;
}