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
1. Image Upload as Input:
- Users can upload a reference picture as tattoo inspiration.
- Encouraged to upload clear, non-abstract images to help guide the generation.
2. Concrete Tattoo Generation
- Use an API (most likely Midjourney) to generate one concrete tattoo design per input.
- Leverage a pre-trained model or fine-tuned model for generating tattoo-style artwork.
3. Tattoo Preview & Download
- Allow users to preview the generated tattoo on-screen.
- Provide options to download the tattoo image for personal use or printing.

Nice to Have:
1. Multiple Tattoo Variants from One prompt
- Increase the number of tattoos generated per upload (e.g. 3–5 variations).
- Give users more options to choose from.
2. Style-Based Categorization
- Classify generated tattoos into recognizable styles (e.g. minimal, tribal, neo-traditional, fine line).
- Users can toggle between styles before generating, or filter results after generation.

## Expected outcome
- A fully functional web app where users can input preferences and receive personalized tattoo design suggestions.
- Users can interact with generated designs, preview placements, and save or share them.
- A user-friendly, aesthetic platform that sparks creativity and enhances the tattoo planning experience.

## Timeline
Week 1: Planning & Research
Finalize feature scope and technical requirements.
Research suitable GenAI APIs.
Sketch out UI wireframes and user flow.

Week 2: Backend Setup & API Integration
Set up a backend environment.
Implement image upload and validation.
Connect to image generation API and test with prompts.

Week 3: Frontend Development
Build basic frontend for uploading images, displaying previews, and downloading tattoos.

Week 4: Improve Generation Quality
Refine prompt templates for consistent tattoo aesthetics.
Add upload handling for bad inputs or edge cases.

Week 5: Nice-to-Have Features (Time Permitting)
Enable multiple tattoo variations.
Add basic style categorization or filters.

Week 6: Testing, Optimization, & Polish
End-to-end testing of user flow.
Optimize performance and finalize UI.

Week 7–8: Beta Testing & Iteration (Optional)
Share with test users for feedback.
Polish UX and address bugs.

## Contact information of the team
- Product Manager/ Client: Laura Tan, xtan0611@uw.edu
- Developer: Hannah Xiao, hx2313@uw.edu

## Progress Update (as of May 16)
Developed three functional tabs:
- Text Input: Users can type in their tattoo ideas and select preferred styles.
- Photo Upload: Users can upload images for inspiration.
- Gallery: A brand-new feature that allows users to browse a curated tattoo gallery with artist names and like counts.
- Implemented interactive UI elements with clean navigation and dynamic visual feedback.
- Designed consistent layout and styling across all pages for a smoother user experience.

