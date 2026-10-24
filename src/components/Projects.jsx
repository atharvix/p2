import React, { useState } from 'react';
import SplitText from './SplitText';
import { PROJECTS } from '../data/siteData';

function ProjectItem({ project, index }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="proj">
      <figure
        className={`proj-media slot ${imgFailed ? 'empty' : ''}`}
        data-src={project.image}
        style={{ margin: 0 }}
        data-suit="♦"
      >
        {!imgFailed && (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            onLoad={() => {
              window.dispatchEvent(new Event('refresh-triggers'));
            }}
            onError={() => setImgFailed(true)}
          />
        )}
      </figure>
      <div className="proj-text">
        <div className="proj-num">No. {index + 1}</div>
        <h3>
          <SplitText text={project.title} />
        </h3>
        <p className="proj-meta">{project.meta}</p>
        <p>{project.text}</p>
        <ul className="tags">
          {project.tags.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>
        <div className="proj-links">
          <a className="link-u" href={project.live} target="_blank" rel="noopener noreferrer">
            View live
          </a>
          <a className="link-u" href={project.source} target="_blank" rel="noopener noreferrer">
            Read the code
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="sec-head">
          <h2 className="sec-title">
            <SplitText text="Hands we have played" />
          </h2>
          <p className="sec-lede reveal">
            Selected work, from first sketch to production traffic.
          </p>
        </div>
        <div className="projects" id="projects">
          {PROJECTS.map((p, i) => (
            <ProjectItem key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
