import { declarationNames } from "@/mocks/declarationNames";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const ButtonOptions = () => {
  return (
    <ul className="flex gap-2 items-center p-4 border rounded-md flex-grow">
      {declarationNames.map((declarationName) => {
        return (
          <li key={declarationName}>
            <Link
              className={buttonVariants({ variant: "default" })}
              to={`/document/${declarationName}`}
            >
              {declarationName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default ButtonOptions;
