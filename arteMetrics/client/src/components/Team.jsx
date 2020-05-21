import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Team = () => {
  const [isCreatorProfiles] = useState([
    {
      name: 'Brian Chiang',
      github: 'https://github.com/ch-brian',
      linkedin: 'https://www.linkedin.com/in/ch-brian/'
    },
    {
      name: 'Saejin Kang',
      github: 'https://github.com/skang1004',
      linkedin: 'https://www.linkedin.com/in/saejinkang1004/'
    },
    {
      name: 'Joseph Renolayan',
      github: 'https://github.com/jodaisu',
      linkedin: 'https://www.linkedin.com/in/jodaisu/'
    },
    {
      name: 'Sean Arseneault',
      github: 'https://github.com/itsmesean',
      linkedin: ''
    },
    {
      name: 'Noah King',
      github: 'https://github.com/code-ark',
      linkedin: 'https://www.linkedin.com/in/noah-king/'
    }
  ]);
  const creatorProfileArray = isCreatorProfiles.map((profile) => {
    return (
      <Profiles
        key={`profile${profile.name}`}
        src={profile.src}
        name={profile.name}
        linkedin={profile.linkedin}
        github={profile.github}
      />
    );
  });
  return (
    <section id="team">
      <h2>Meet the Team</h2>
      <div id="profile-group">{creatorProfileArray}</div>
    </section>
  );
};

const Profiles = ({ src, name, linkedin, github }) => {
  return (
    <React.Fragment>
      <div className="profile">
        <ScrollAnimation animateIn="flipInY">
          <figure>
            <div className="profile-frame">
              <div className="profile-photo"></div>
            </div>
            <figcaption>{name}</figcaption>
          </figure>
        </ScrollAnimation>
        <div className="profile-link">
          <div className="profile-linkedin">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <img
                src="https://image.flaticon.com/icons/svg/37/37019.svg"
                id="linkedIn-photo"
              ></img>
            </a>
          </div>
          <div className="profile-github">
            <a href={github} target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                id="github-photo"
              ></img>
            </a>
          </div>
        </div>
      </div>
      <i className="fas fa-exchange-alt"></i>
    </React.Fragment>
  );
};

export default Team;
