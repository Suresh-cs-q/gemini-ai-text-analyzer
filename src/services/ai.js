import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.0-flash';

// Check if API key is available
if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

// Initialize the AI
const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIResponse = async (prompt) => {
  if (!prompt?.trim()) {
    throw new Error('Please provide a valid input text');
  }

  try {
    console.log('Setting up Gemini model with:', MODEL_NAME);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Create a system prompt that instructs the model to format output properly
    const formattedPrompt = `
    You are a text analysis assistant that provides clean, well-formatted responses.
    
    FORMATTING REQUIREMENTS (EXTREMELY IMPORTANT):
    1. DO NOT use any markdown formatting symbols (*, #, -, etc.) in your response
    2. For headings, simply use ALL CAPS without any special characters
    3. For bullet points, use a hyphen followed by a space (- ) at the beginning of the line
    4. Keep paragraphs short and well-spaced
    5. Use simple, clean formatting that works in plain text
    6. NEVER use asterisks (*) or hash symbols (#) in your response
    
    Please analyze the following text and respond according to these formatting guidelines:
    ${prompt}
    `;

    console.log('Sending prompt to Gemini API:', formattedPrompt.substring(0, 50) + '...');
    
    const result = await model.generateContent({
      contents: [{
        parts: [{
          text: formattedPrompt
        }]
      }]
    });

    console.log('Raw result received:', result);
    const response = result.response;
    console.log('Response object:', response);
    let text = response.text();
    console.log('Extracted text:', text.substring(0, 50) + '...');
    
    if (!text) {
      console.error('Empty text received from API');
      throw new Error('Empty response received from AI service');
    }
    
    // Process the response to clean formatting
    text = text
      // Remove markdown headings (# Heading) and replace with plain text
      .replace(/^#+\s+(.+)$/gm, '$1')
      
      // Remove bold/italic markdown but preserve content
      .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
      .replace(/\*(.+?)\*/g, '$1')     // Italic
      .replace(/_(.+?)_/g, '$1')       // Italic with underscore
      
      // Clean up bullet points for consistent formatting
      .replace(/^\s*[\*\-]\s+/gm, '• ') // Convert * and - bullet points to consistent format
      
      // Clean up numbered lists for consistent formatting
      .replace(/^(\s*)(\d+)\.\s+\*\*(.+?)\*\*/gm, '$1$2. $3') // Remove bold from numbered list items
      
      // Remove code blocks but preserve content
      .replace(/```[\s\S]*?```/g, (match) => {
        return match.replace(/```\w*/g, '').replace(/```/g, '').trim();
      })
      
      // Remove inline code formatting but preserve content
      .replace(/`([^`]+)`/g, '$1')
      
      // Add proper spacing between sections
      .replace(/\n{3,}/g, '\n\n')
      
      // Clean up any remaining asterisks that might be used for emphasis
      .replace(/\*\*/g, '')
      
      // Ensure consistent spacing after bullet points
      .replace(/•\s+/g, '• ')
      
      // Ensure consistent spacing after numbered list items
      .replace(/(\d+)\.\s+/g, '$1. ')
      
      // Trim whitespace
      .trim()

    return {
      message: text,
      type: 'success'
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    // Provide more specific error messages
    if (error.message.includes('404')) {
      throw new Error('AI model not available. Please check the model name and API configuration.');
    } else if (error.message.includes('401') || error.message.includes('403')) {
      throw new Error('Authentication failed. Please check your API key.');
    }
    throw new Error(error.message);
  }
};