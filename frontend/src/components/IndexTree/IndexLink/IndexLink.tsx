import React from 'react';

export interface IndexLinkProps {
  href: string;
  title: string;
  children?: React.ReactNode;
}

const scrollToSection = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const IndexLink: React.FC<IndexLinkProps> = ({ title, children }) => {
  return (
    <div>
      <button onClick={() => scrollToSection(title)}className="block py-1 px-2 hover:bg-gray-100 rounded">
        {title}
      </button>
      {children}
    </div>
  );
};

export default IndexLink;
