import { useState } from 'react';

const EMBED_URL = 'https://nuriadelucas.github.io/roi-calculator/';

const SNIPPET = `<iframe
  src="${EMBED_URL}"
  width="100%"
  height="720"
  style="border:none; border-radius:8px; display:block;"
  title="ROI Calculator"
></iframe>`;

function EmbedModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(SNIPPET).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Embed this Calculator</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p className="embed-description">
          Copy the code below and paste it into any webpage. The calculator will be fully
          interactive and responsive.
        </p>

        <pre className="embed-code">{SNIPPET}</pre>

        <div className="embed-actions">
          <a
            className="embed-preview-link"
            href={EMBED_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open live app ↗
          </a>
          <button
            className={`btn-copy ${copied ? 'btn-copy-success' : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmbedModal;
