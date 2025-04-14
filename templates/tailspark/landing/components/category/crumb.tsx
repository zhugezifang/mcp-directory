import { Category } from "@/types/category";
import { FiHome } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Project } from "@/types/project";

export default ({ category }: { category: Category }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <a className="text-gray-400 hover:text-gray-500" href="/">
              <FiHome />
              <span className="sr-only">主页</span>
            </a>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <MdKeyboardArrowRight />
            <a
              className="ml-2 text-md font-medium text-gray-500 hover:text-primary"
              aria-current="page"
              href={"/categories"}
            >
              分类
            </a>
          </div>
        </li>

        <li>
          <div className="flex items-center">
            <MdKeyboardArrowRight />
            <a
              className="ml-2 text-md font-medium text-primary"
              aria-current="page"
              //   href={`/category/${category.name}`}
            >
              {category.title}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};
