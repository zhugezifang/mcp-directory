import Markdown from "@/components/markdown";
import { MdOutlineHome } from "react-icons/md";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "求职交流群",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/contact`,
    },
  };
}

export default function () {
  const content = `# 求职交流群
## 一、群组定位
### 1.1 核心宗旨
专注于求职信息分享、经验交流与互助的平台，提供最新简历模板，以及求职信息。。
![img](https://img.way2solo.com/photo/zhugezifang/987061af-581b-4033-9100-a6b6b100ac7e.jpeg?imageView2/2/w/1920/q/100 "img")
加微信，备注：求职交流

## 二. 为了营造一个高效、友好、有价值的交流环境，请大家共同遵守以下规则：
### 📌 群宗旨
1. 信息共享： 及时分享可靠的招聘信息（全职/实习）、行业动态、公司资讯等。
2. 经验交流： 交流简历优化、笔试面试经验、求职心得、职场适应等。
3. 互助答疑： 针对求职过程中遇到的问题，群策群力，互相解答。
4. 资源互通： 分享有用的求职网站、工具、学习资料等（请确保无版权风险）。

### 📜 重要群规 (请务必遵守)

1. 严禁广告： 禁止发布与求职无关的商业广告、微商、刷单、网贷、游戏推广等。一经发现，立即移除。
2. 拒绝骚扰： 禁止人身攻击、恶意刷屏、发布不良信息、涉及敏感政治话题等。保持群内氛围和谐友善。
3. 保护隐私： 禁止随意公开他人隐私信息（包括未经同意的简历、联系方式）。分享招聘信息时，请注意保护发布者/公司的隐私（如非公开渠道信息）。
4. 实名交流 (建议)： 建议修改群昵称为 姓名/昵称-目标行业/岗位 (例如：张三-产品经理 或 李四-应届生-金融)，方便交流与互助。
5. 信息甄别： 群内信息请自行甄别真伪，涉及钱财交易、押金等务必谨慎，本群不承担任何责任。
6. 聚焦主题： 请围绕求职相关话题进行讨论，避免过多闲聊占用公共资源。
希望这个群能成为大家求职路上的加油站和信息站！祝愿每一位群友都能早日收获心仪的 Offer！✨
请仔细阅读并遵守以上群规，感谢大家的理解与配合！
  `;
  return (
    <div>
      <a className="text-base-content cursor-pointer" href="/">
        <MdOutlineHome className="text-2xl mx-8 my-8" />
        {/* <img className="w-10 h-10 mx-4 my-4" src="/logo.png" /> */}
      </a>
      <div className="max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8">
        <Markdown content={content} />
      </div>
    </div>
  );
}
