import React from "react";

export interface IndexLinkProps {
  title: string;
  value?: string | null;
  children?: React.ReactNode;
  isLeaf: boolean;
}

const scrollToSection = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const IndexLink: React.FC<IndexLinkProps> = ({
  title,
  children,
  value,
  isLeaf,
}) => {
  return (
    <div>
      <button
        onClick={() => scrollToSection(title)}
        className={[
          !isLeaf ? "hidden" : "",
          "block py-1 px-2 hover:bg-gray-100 rounded w-full",
        ].join(" ")}
      >
        <h3 className="text-left grid grid-cols-2 justify-between text-ellipsis overflow-hidden break-words">
          {value ? (
            <>
              <span className="mr-2">{title}</span> <b>{value}</b>
            </>
          ) : (
            <span className={isLeaf ? "text-red-500 font-semibold" : ""}>
              {title}
            </span>
          )}
        </h3>
      </button>
      {children}
    </div>
  );
};

export default IndexLink;
