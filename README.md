# TECHIN510_TattooGenerator

## Project Overview
Tattoo Generator is a web-based application that allows users to generate personalized tattoo designs by uploading an image or entering a short prompt. The platform uses generative AI to create visually compelling, high-resolution tattoo options that users can preview and download. This tool is ideal for anyone exploring tattoo ideas, seeking inspiration, or visualizing a tattoo concept based on mood boards, aesthetic references, or personal style.

## Target Users & Needs
Users: 
- Individuals exploring tattoo ideas (first-timers or repeat clients).
- Tattoo enthusiasts seeking inspiration.
- Tattoo artists looking for design prompts or to share flash sheets.

Need:
- An easy-to-use tool to generate tattoo designs based on personal keywords, themes, or styles (e.g., traditional, minimalist, abstract).
- A preview system to visualize tattoos in different placements (e.g., forearm, ankle).
- Ability to save, download, or share designs for future reference or to take to a tattoo artist.
- Optional inspiration browsing from a community gallery or trending ideas.

## Project Objectives
- To design and develop a web application that generates custom tattoo designs based on user preferences, keywords, and style choices.
- To provide a visually rich and interactive interface for users to preview, download, or save tattoo designs.
- To enable inspiration through browsing, personalization, and optional sharing.
- To explore generative AI or design algorithms for dynamic tattoo creation.

## Core Features
In Scope:
1. Concrete Tattoo Generation
- Use an API to generate one concrete tattoo design per input.
- Allow users to download. 
2. Tattoo Gallery
- Allow users to browse for ideas, like and save. Eventually building a community
- Under different categories.
3. Find Nearby Tattoo Stores
- Find nearby tattoo stores based on location identified. 

Nice to Have:
1. Multiple Tattoo Variants from One prompt
- Increase the number of tattoos generated per upload (e.g. 3–5 variations).
- Give users more options to choose from.
- Extra adjustment and finetuning
2. Style-Based Categorization
- Classify generated tattoos into recognizable styles (e.g. minimal, tribal, neo-traditional, fine line).
- Users can toggle between styles before generating, or filter results after generation.
3. User Login
4. Booking system

## Expected outcome
- A fully functional web app where users can input preferences and receive personalized tattoo design suggestions.
- Users can interact with generated designs, preview placements, and save or share them.
- A user-friendly, aesthetic platform that sparks creativity and enhances the tattoo planning experience.

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/TECHIN510_TattooGenerator.git
   cd TECHIN510_TattooGenerator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory and another in the `server/` directory if needed.
   - Add your API keys and secrets (e.g., OpenAI, Google Maps) as environment variables:
     ```env
     OPENAI_API_KEY=your_openai_key
     GOOGLE_MAPS_API_KEY=your_google_maps_key
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application:**
   - Open your browser and go to `http://localhost:3000` (or the port specified in your terminal) to use the app.

## Contact information of the team
- Product Manager/ Client: Laura Tan, xtan0611@uw.edu
- Developer: Hannah Xiao, hx2313@uw.edu

<<<<<<< HEAD
## Progress Update (as of May 16)
Developed three functional tabs:
- Text Input: Users can type in their tattoo ideas and select preferred styles.
- Photo Upload: Users can upload images for inspiration.
- Gallery: A brand-new feature that allows users to browse a curated tattoo gallery with artist names and like counts.
- Implemented interactive UI elements with clean navigation and dynamic visual feedback.
- Designed consistent layout and styling across all pages for a smoother user experience.
=======
>>>>>>> d1754f4 (final)

