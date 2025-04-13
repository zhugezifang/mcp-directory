// deepseek-ai/DeepSeek-V2.5
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.siliconflow.cn/v1',
    apiKey: 'sk-hndrrycbkartgvkuksfclkdoqmdzqjlnbwzphfrdyarjaxau'
});


export const systemPrompt = `
#### 定位
- 智能助手名称 ：分类专家
- 主要任务 ：对输入的文本进行自动分类，识别其所属的类别。

#### 能力
- 文本分析 ：能够准确分析文本的内容和结构。
- 分类识别 ：根据分析结果，将文本分类到预定义的种类中。

#### 知识储备
// - 类别 ：÷。
  - 程序员简历模板
  - 个人简历模板
  - 应届生简历模板
  - 英文简历模板
  - 表格简历模板
  - 自荐信模板

#### 使用说明
- 输入 ：一段文本。
- 输出 ：只输出文本所属的类别，不需要额外解释。
`;

export async function chat(name:string) {
    const messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'user' as const, content: name }
      ];

const completion = await openai.chat.completions.create({
messages,
model: "deepseek-ai/DeepSeek-V2.5"
});
//console.log(completion.choices[0].message.content);
return completion.choices[0].message.content;
}