import React, { useState, useRef } from 'react';
import styles from './Home.module.css';
import { getAIResponse } from '../../services/ai';

function Home() {
  const [inputText, setInputText] = useState('');
  const [aiOutput, setAiOutput] = useState({ message: 'Enter text and click "Analyze Text" to see results here.', type: 'neutral' });
  const [isLoading, setIsLoading] = useState(false);
  const outputRef = useRef(null);
  
  // Function to scroll to results after analysis
  const scrollToResults = () => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Test function to verify output area styling
  const testOutput = () => {
    setAiOutput({
      message: 'This is a test message to verify the output area is working correctly.',
      type: 'success'
    });
  };

  const handleAnalyzeClick = async () => {
    if (!inputText.trim()) {
      setAiOutput({ 
        message: 'Please enter some text to analyze.',
        type: 'neutral'
      });
      return;
    }

    setIsLoading(true);
    setAiOutput({ message: 'Processing your request...', type: 'neutral' });
    console.log('Starting API request with text:', inputText);

    try {
      console.log('Calling getAIResponse...');
      const result = await getAIResponse(inputText);
      console.log('API response received:', result);
      
      // Ensure we have a valid result
      if (result && result.message) {
        setAiOutput({
          message: result.message,
          type: 'success'
        });
        console.log('Output state updated with:', result.message.substring(0, 50) + '...');
        
        // Always scroll to results after a short delay
        setTimeout(() => {
          scrollToResults();
          // Focus on the output area for screen readers
          if (outputRef.current) {
            const outputContent = outputRef.current.querySelector(`.${styles.outputContent}`);
            if (outputContent) outputContent.focus();
          }
        }, 300);
      } else {
        throw new Error('Invalid response format received from API');
      }
    } catch (error) {
      console.error('Error analyzing text:', error);
      setAiOutput({
        message: error.message || 'An error occurred while processing your request.',
        type: 'error'
      });
      console.log('Error state set:', error.message);
      
      // Always scroll to error message
      setTimeout(() => scrollToResults(), 300);
    } finally {
      setIsLoading(false);
      console.log('Loading state set to false');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAnalyzeClick();
    }
  };

  // Add direct API test
  const testDirectAPI = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB5_Wgo4uNNI_U1liHCNdwKRV_oepByx-k`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: 'Hello, please confirm this API is working' }]
            }]
          })
        }
      );
      
      const data = await response.json();
      console.log('Direct API test response:', data);
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setAiOutput({
          message: 'Direct API test successful: ' + data.candidates[0].content.parts[0].text.substring(0, 100) + '...',
          type: 'success'
        });
      } else {
        setAiOutput({
          message: 'Direct API test returned unexpected format: ' + JSON.stringify(data),
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Direct API test error:', error);
      setAiOutput({
        message: 'Direct API test error: ' + error.message,
        type: 'error'
      });
    }
  };

  return (
    <main className={styles.homeContainer}>
      {/* Skip to content link for accessibility */}
      <a href="#results" className="skip-to-content">Skip to results</a>
      
      <section className={styles.introSection} role="banner">
        <h1>Gemini AI Text Analyzer</h1>
        <p>
          Enter your text below and let Gemini AI analyze it for you.
        </p>
      </section>

      <section className={styles.interactiveSection}>
        <div className={styles.inputArea}>
          <label htmlFor="textInput" className={styles.inputLabel}>
            <span className="sr-only">Enter text for analysis</span>
          </label>
          <textarea
            id="textInput"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type or paste your text here..."
            className={styles.inputField}
            rows="5"
            disabled={isLoading}
            aria-describedby="inputHelp"
          />
          <div id="inputHelp" className={styles.inputHelp}>
            Press the Analyze Text button to process your input with Gemini AI
          </div>
          
          <div className={styles.buttonGroup}>
            <button 
              onClick={handleAnalyzeClick} 
              className={styles.analyzeButton}
              disabled={isLoading || !inputText.trim()}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.loadingSpinner} aria-hidden="true"></span>
                  <span>Analyzing...</span>
                </>
              ) : 'Analyze Text'}
            </button>
            <div className={styles.testButtonsContainer}>
              <button 
                onClick={testOutput}
                className={styles.testButton}
                type="button"
                aria-label="Test UI functionality"
              >
                Test UI
              </button>
              <button 
                onClick={testDirectAPI}
                className={styles.testButton}
                type="button"
                aria-label="Test API connection"
              >
                Test API
              </button>
            </div>
          </div>
        </div>

        <div 
          id="results"
          ref={outputRef}
          className={`${styles.outputArea} ${styles[`result${aiOutput.type.charAt(0).toUpperCase() + aiOutput.type.slice(1)}`]}`}
          aria-live="polite"
          aria-atomic="true"
          role="region"
          aria-label="Analysis results section"
        >
          <h2 className={styles.outputHeading}>Analysis Result</h2>
          <div 
            className={styles.outputContent}
            dangerouslySetInnerHTML={{ 
              __html: aiOutput.message
                .split('\n')
                .map(line => {
                  // Detect and format headings
                  if (line.trim().match(/^\*\*[^*]+\*\*$/) || 
                      line.includes('Corrected Grammar:') ||
                      line.includes('How to get') ||
                      line.includes('To help me find')) {
                    return `<h3>${line.replace(/\*\*/g, '')}</h3>`;
                  }
                  // Format bullet points - clean up any remaining asterisks
                  else if (line.trim().startsWith('•') || line.trim().startsWith('*')) {
                    // Clean up the line and remove any remaining formatting
                    const cleanLine = line
                      .replace(/^\*\s/, '• ')
                      .replace(/\*\*([^*]+)\*\*/g, '$1')
                      .replace(/\*/g, '');
                    return `<p class="bullet">${cleanLine}</p>`;
                  }
                  // Format numbered points - clean up any remaining formatting
                  else if (line.trim().match(/^(\d+)\.\s/)) {
                    // Extract the number and the content
                    const match = line.trim().match(/^(\d+)\.\s(.+)$/);
                    if (match) {
                      const number = match[1];
                      let content = match[2]
                        .replace(/\*\*([^*]+)\*\*/g, '$1')
                        .replace(/\*/g, '');
                      return `<p class="numbered" data-number="${number}.">${content}</p>`;
                    }
                    // Fallback if regex fails
                    const cleanLine = line
                      .replace(/\*\*([^*]+)\*\*/g, '$1')
                      .replace(/\*/g, '');
                    return `<p class="numbered">${cleanLine}</p>`;
                  }
                  // Regular paragraphs
                  else if (line.trim()) {
                    return `<p>${line}</p>`;
                  }
                  // Empty lines become breaks
                  return '<br/>';
                })
                .join('')
            }}
            tabIndex="0"
            aria-label="Analysis result content"
          />
        </div>
      </section>
    </main>
  );
}

export default Home;