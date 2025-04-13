export const runtime = 'edge';

import {
    getProjectsIsNullCategory,updateProjectCategoryById,getProjectsCount
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

    // 创建一个Map对象来存储数据
    const dataMap = new Map();
    // 使用map方法遍历数组并添加到Map中
    dataMap.set("程序员简历模板", "programmer-resume-template");
    dataMap.set("个人简历模板", "personal-resume-template");
    dataMap.set("应届生简历模板", "graduates-resume-template");
    dataMap.set("英文简历模板", "english-resume-template");
    dataMap.set("表格简历模板", "sheet-resume-template");
    dataMap.set("自荐信模板", "cover-letter-template");

    const count= await getProjectsCount();
    console.log("count:"+count);

    const list:Project[] = await getProjectsIsNullCategory() || [];
    /*for (let index = 0; index < list.length; index++) {
        const element = list[index];
        console.log(element.uuid);
        if (element.uuid !== undefined) {
            const category = await chat(element.name as string);
            console.log(category);
            await updateProjectCategoryById(dataMap.get(category), element.uuid);
        }
    }*/
    return list;
}