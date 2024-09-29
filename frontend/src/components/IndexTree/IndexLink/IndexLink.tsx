import React from 'react';

export interface IndexLinkProps {
  title: string;
  value?: string | null
  children?: React.ReactNode;
}

const scrollToSection = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const IndexLink: React.FC<IndexLinkProps> = ({ title, children, value }) => {
  return (
    <div>
      <button onClick={() => scrollToSection(title)} className="block py-1 px-2 hover:bg-gray-100 rounded w-full">
        <h3 className='text-left flex justify-between'>{value ? <><span>{title}</span> <b>{value}</b></> : <span>{title}</span>}</h3>
      </button>
      {children}
    </div>
  );
};

export default IndexLink;
