import { ScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

export function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="testimonials-bg">
        <div className="testimonials-gradient"></div>
      </div>

      <div className="container">
        <ScrollReveal className="section-header">
          <span className="section-badge">Early Access</span>
          <h2 className="section-title">
            Chesly is in
            <br />
            <span className="text-gradient">active development</span>
          </h2>
          <p className="section-description">
            We’re building Chesly right now. If you want to help shape the product,
            join our early access and be first to try the unified inbox.
          </p>
        </ScrollReveal>

        <ScrollReveal className="testimonials-carousel-wrapper" delay={200}>
          <div className="early-access-card card">
            <h3 className="early-access-title">Be one of the first testers</h3>
            <p className="early-access-description">
              Get updates as we roll out new features and integrations.
              Early users will directly influence what we build next.
            </p>
            <a href="#pricing" className="btn btn-primary btn-lg">
              Join Early Access
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

