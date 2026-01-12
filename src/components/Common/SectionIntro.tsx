import React from 'react';

type SectionIntroProps = {
  title: string;
  subtitle: string;
};

const SectionIntro: React.FC<SectionIntroProps> = ({ title, subtitle }) => (
  <div className="section-header">
    <h2 className="section-title">{title}</h2>
    <p className="section-subtitle">{subtitle}</p>
  </div>
);

export default SectionIntro;


