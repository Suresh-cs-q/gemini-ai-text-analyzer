import React from 'react';
import styles from './About.module.css';

function About() {
  return (
    <main className={styles.aboutContainer}>
      <section className={styles.heroSection}>
        <h1>About Our AI Platform</h1>
        <p className={styles.subtitle}>
          Leveraging cutting-edge AI technology to provide intelligent text analysis
        </p>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.missionBox}>
          <h2>Our Mission</h2>
          <p>
            We strive to make artificial intelligence accessible to everyone. Our platform
            utilizes Google's advanced Gemini AI to provide intelligent insights and
            analysis, helping users better understand and work with their content.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Advanced Analysis</h3>
            <p>
              Powered by Google's Gemini AI model for accurate and insightful text analysis
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Real-time Processing</h3>
            <p>
              Get instant results with our high-performance processing capabilities
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>User-Friendly</h3>
            <p>
              Simple and intuitive interface designed for users of all experience levels
            </p>
          </div>

          <div className={styles.featureCard}>
            <h3>Secure & Private</h3>
            <p>
              Your data security and privacy are our top priorities
            </p>
          </div>
        </div>

        <div className={styles.teamSection}>
          <h2>Our Team</h2>
          <p>
            We are a dedicated team of AI enthusiasts, developers, and designers working
            together to bring you the best possible experience in AI-powered text analysis.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;