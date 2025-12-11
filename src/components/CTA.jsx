import { ScrollReveal } from '../hooks/useScrollReveal';
import { useDeviceDetect, getDownloadInfo } from '../hooks/useDeviceDetect';
import { AppStoreBadges } from './SmartDownload';
import './CTA.css';
import './SmartDownload.css';

export function CTA() {
  const { os } = useDeviceDetect();
  const downloadInfo = getDownloadInfo(os);

  return (
    <section className="section cta">
      <div className="cta-bg">
        <div className="cta-gradient"></div>
        <div className="cta-grid-pattern"></div>
        <div className="cta-glow cta-glow-1"></div>
        <div className="cta-glow cta-glow-2"></div>
      </div>

      <div className="container">
        <ScrollReveal className="cta-content">
          <span className="section-badge">Get Started Today</span>
          <h2 className="cta-title">
            Ready to reclaim
            <br />
            <span className="text-gradient">your time?</span>
          </h2>
          <p className="cta-description">
            Download Chesly free and unify all your messages today.
            Upgrade to Pro anytime for AI-powered features.
          </p>
          <div className="cta-actions">
            <a href={downloadInfo.url} className="btn btn-primary btn-lg">
              {downloadInfo.icon === 'apple' && (
                <img src="/applelogo.png" alt="Apple" width="20" height="20" style={{ objectFit: 'contain' }} />
              )}
              {downloadInfo.icon === 'windows' && (
                <img src="/windowslogo.png" alt="Windows" width="20" height="20" style={{ objectFit: 'contain' }} />
              )}
              {downloadInfo.icon === 'linux' && (
                <img src="/linuxlogo.png" alt="Linux" width="20" height="20" style={{ objectFit: 'contain' }} />
              )}
              {downloadInfo.icon === 'android' && (
                <img src="/androidlogo.png" alt="Android" width="20" height="20" style={{ objectFit: 'contain' }} />
              )}
              {downloadInfo.icon === 'download' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              )}
              {downloadInfo.label}
            </a>
            <a href="#pricing" className="btn btn-secondary btn-lg">
              View Pro Features
            </a>
          </div>
          <p className="cta-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Free forever • No credit card • Upgrade anytime
          </p>

          <AppStoreBadges className="cta-store-badges" />
        </ScrollReveal>
      </div>
    </section>
  );
}
