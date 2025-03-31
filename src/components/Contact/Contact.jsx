import React, { useState } from 'react';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: 'loading', message: 'Sending message...' });

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <main className={styles.contactContainer}>
      <section className={styles.heroSection}>
        <h1>Let's Connect</h1>
        <p className={styles.subtitle}>
          Feel free to reach out through any of these channels. I'm always open to new opportunities and collaborations.
        </p>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3>Email</h3>
              <p><a href="mailto:Suresh.manghwar@gmail.com">Suresh.manghwar@gmail.com</a></p>
            </div>
            <div className={styles.infoCard}>
              <h3>GitHub</h3>
              <p><a href="https://github.com/Suresh-cs-q" target="_blank" rel="noopener noreferrer">github.com/Suresh-cs-q</a></p>
            </div>
            <div className={styles.infoCard}>
              <h3>LinkedIn</h3>
              <p><a href="https://linkedin.com/in/sureshkumar-cs" target="_blank" rel="noopener noreferrer">linkedin.com/in/sureshkumar-cs</a></p>
            </div>
            <div className={styles.infoCard}>
              <h3>Phone</h3>
              <p><a href="tel:+923131136263">+92-313-1136263</a></p>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this about?"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="5"
              />
            </div>

            <button 
              type="submit" 
              className={`${styles.submitButton} ${submitStatus.type === 'loading' ? styles.loading : ''}`}
              disabled={submitStatus.type === 'loading'}
            >
              {submitStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus.message && (
              <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                {submitStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;