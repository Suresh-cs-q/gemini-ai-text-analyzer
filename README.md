# Gemini AI Text Analyzer

![Gemini AI Text Analyzer](https://img.shields.io/badge/Gemini%20AI-Text%20Analyzer-blue)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, responsive web application that leverages Google's Gemini AI to analyze and provide insights on user-submitted text. This application demonstrates the power of generative AI for text analysis with a clean, accessible user interface.

## 🚀 Project Overview

The Gemini AI Text Analyzer is designed to help users gain deeper insights into their text through advanced AI analysis. Whether you're looking to improve your writing, analyze sentiment, extract key information, or get suggestions for improvement, this tool provides intelligent feedback powered by Google's Gemini 2.0 Flash model.

### Key Features

- **Text Analysis**: Submit any text to receive comprehensive AI-powered analysis
- **Clean Formatting**: Results are properly formatted with headings, bullet points, and paragraphs
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop devices
- **Accessibility**: WCAG-compliant with keyboard navigation and screen reader support
- **Real-time Feedback**: Immediate analysis with visual loading indicators
- **Error Handling**: Robust error handling with user-friendly messages

## 🛠️ Technology Stack

- **Frontend**: React 19, CSS Modules
- **AI Integration**: Google's Gemini AI API (@google/generative-ai)
- **Build Tool**: Vite 6
- **Routing**: React Router 6
- **HTTP Client**: Axios

## 🔧 Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/gemini-ai-text-analyzer.git
   cd gemini-ai-text-analyzer
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Gemini API key
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   > **IMPORTANT**: The `.env` file is included in `.gitignore` and should never be committed to your repository to keep your API key secure.

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📱 User Interface

The application features a clean, intuitive interface with:

- A clear input area for text submission
- An analyze button that triggers the AI processing
- A results section that displays formatted output from the AI
- Visual indicators for loading states and errors
- Responsive design that adapts to any screen size

## 🧠 How It Works

1. The user enters text in the input area
2. Upon clicking "Analyze Text", the application sends the text to Google's Gemini AI API
3. The API processes the text and returns analysis results
4. The application formats and displays the results in a user-friendly manner
5. All markdown formatting is properly converted to HTML for better readability

## 🚀 Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/gemini-ai-text-analyzer.git
   git push -u origin main
   ```

2. Create a new project on Vercel and connect it to your GitHub repository

3. Add your environment variables in the Vercel project settings:
   - Go to your project on Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add the variable `VITE_GEMINI_API_KEY` with your Gemini API key
   - Save and redeploy your application

4. Your application will now be deployed with the API key securely stored in Vercel's environment

## 🔒 Security

- The API key is stored securely using environment variables and not exposed in the source code
- The `.env` file is included in `.gitignore` to prevent accidental exposure of API keys
- No user data is stored or shared beyond what's necessary for the API request
- All communication with the API is done over HTTPS

## 🌐 Accessibility

This application is built with accessibility in mind:

- Semantic HTML structure
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Color contrast that meets WCAG standards
- Responsive design for all devices

## 🛣️ Roadmap

- [ ] Add support for different types of analysis (sentiment, grammar, summarization)
- [ ] Implement user accounts to save analysis history
- [ ] Add export functionality for analysis results
- [ ] Integrate with other AI models for comparison
- [ ] Add multilingual support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Google's Gemini AI team for providing the powerful API
- The React team for the excellent frontend library
- All contributors and testers who helped improve this project
