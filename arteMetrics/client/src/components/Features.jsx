import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import queryScreenShot from '../assets/24hrQuery.png';
import graphQLLogo from '../assets/graphQL400x400.png';
import apolloLogo from '../assets/apollo400x400.png';
import tracingDataScreenshot from '../assets/tracingDataPrelim.png';

const Features = () => {
  return (
    <section className="homesection" id="features">
      <h2>An Apollo GraphQL Performance Monitoring Tool</h2>
      <figure>
        <img className="logo" src={apolloLogo} />
        <img className="logo" src={graphQLLogo} />
        <ScrollAnimation animateIn="fadeInRight">
          <figcaption>
            arteMetrics is a free to use, open-source developer tool for the
            monitoring of your apollo server implementation. arteMetrics is an
            easy to use NPM package that is injected into the apollo server
            instantiation and grabs data that developers can then visualize on
            our web application.
          </figcaption>
        </ScrollAnimation>
      </figure>

      <figure>
        <ScrollAnimation animateIn="fadeInLeft">
          <figcaption>
            arteMetrics provides 24 hour live monitoring of query statistics and
            history as well as trace data for the corresponding traces to the
            developer.
          </figcaption>
        </ScrollAnimation>
        <img id="featureQueryScreenShot" src={queryScreenShot} alt="" />
      </figure>

      <figure>
        <img id="tracingDataScreenshot" src={tracingDataScreenshot} alt="" />
        <ScrollAnimation animateIn="fadeInRight">
          <figcaption>
            Currently, arteMetrics only provides our users with tracing data but
            the team is working hard to add other performance metrics to our
            featureset and are also working to add support for tracing as well
            as Gateway monitoring in Apollo Federation.
          </figcaption>
        </ScrollAnimation>
      </figure>
    </section>
  );
};

export default Features;
