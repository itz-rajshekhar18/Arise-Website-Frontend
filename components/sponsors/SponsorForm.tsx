"use client";

import { FormEvent, useState } from "react";

export function SponsorForm() {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="sponsor-enroll" id="enroll">
      <div className="enroll-intro">
        <span>03 // Initiate_Protocol</span>
        <h2>Enrol as a partner.</h2>
        <p>
          Submit your organizational details to begin the vetting process. Our
          strategic partnerships team will respond within 48 business hours
          with the full technical brief.
        </p>
        <div className="enroll-contact">
          <div><span>Direct channel</span><a href="mailto:partnerships@arisefest.in">partnerships@arisefest.in</a></div>
          <div><span>Festival headquarters</span><strong>Polaris School of Technology<br />Bengaluru, Karnataka</strong></div>
        </div>
      </div>

      {submitted ? (
        <div className="sponsor-success" aria-live="polite">
          <div className="sponsor-success-signal"><i /><span>✓</span></div>
          <p>Enrollment packet received</p>
          <h3>Alliance request transmitted.</h3>
          <span>REFERENCE // ARS-SP-2604</span>
          <p>
            Our partnerships desk will verify your details and open a direct
            channel within 48 business hours.
          </p>
          <button className="button button--ghost" type="button" onClick={() => setSubmitted(false)}>
            Submit another organization
          </button>
        </div>
      ) : (
        <form className="sponsor-form" onSubmit={handleSubmit}>
          <div className="sponsor-field-grid">
            <label><span>Company name *</span><input required name="company" placeholder="ORGANIZATION NAME" /></label>
            <label><span>Contact person *</span><input required name="contact" placeholder="FULL NAME" autoComplete="name" /></label>
            <label><span>Corporate email *</span><input required type="email" name="email" placeholder="NAME@COMPANY.COM" autoComplete="email" /></label>
            <label>
              <span>Industry *</span>
              <select required name="industry" defaultValue="">
                <option value="" disabled>Select sector</option>
                <option>Technology & SaaS</option>
                <option>Gaming & Entertainment</option>
                <option>Consumer Electronics</option>
                <option>Education</option>
                <option>Finance & Fintech</option>
                <option>Media & Culture</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              <span>Preferred tier</span>
              <select name="tier" defaultValue="Technology">
                <option>Title</option>
                <option>Arena</option>
                <option>Technology</option>
                <option>Community</option>
                <option>Not decided</option>
              </select>
            </label>
            <label><span>Estimated budget</span><input name="budget" placeholder="₹5,00,000+" /></label>
            <label className="sponsor-field-wide">
              <span>Strategic goals *</span>
              <textarea required name="goals" placeholder="Describe what your brand wants to achieve through this partnership..." />
            </label>
            <label className="sponsor-upload sponsor-field-wide">
              <span>Attach company deck (PDF)</span>
              <input
                type="file"
                accept=".pdf"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
              <div><b>↑</b><strong>{fileName || "Click to upload company deck"}</strong><small>PDF // MAX 10MB</small></div>
            </label>
          </div>
          <label className="sponsor-consent">
            <input required type="checkbox" />
            <span>I confirm that I am authorized to submit this partnership enquiry.</span>
          </label>
          <button className="button button--primary" type="submit">
            Submit enrollment data <span>↗</span>
          </button>
        </form>
      )}
    </section>
  );
}
