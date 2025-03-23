
import {GoogleGenerativeAI} from '@google/generative-ai'
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const GenerateScript = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a two different scripts for 30 seconds video on Topic :{topic} \n-Do not add Scene description \n-do not add anything in Braces , just return the plain story in text\n-Give the response in JSON format and follow the schema\n{\nscripts:[   \n{content:''\n},\n]\n}"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"(Upbeat, trendy music playing)\\n\\n**(Visual: Fast-paced montage of diverse people engaging in [topic] - e.g., if [topic] is online learning, show people on laptops in cafes, libraries, parks, etc.)**\\n\\n**(Voiceover - energetic and friendly):** Feeling stuck? Want to level up your skills?\\n\\n**(Visual: Text overlay - \\\"Learn [Topic] Your Way!\\\")**\\n\\n**(Voiceover):** [Topic] is the future, and it's easier to learn than you think. Access expert-led courses anytime, anywhere.\\n\\n**(Visual: Quick shots of different devices displaying the learning platform's interface.)**\\n\\n**(Voiceover):** Join our community of learners. Start your [topic] journey today! \\n\\n**(Visual: Screen displays website address and a call to action - \\\"Learn More!\\\" or \\\"Sign Up Now!\\\")**\\n\\n**(Music fades out with a final, impactful sound effect.)**\"\n    },\n    {\n      \"content\": \"(Gentle, inspiring music playing)\\n\\n**(Visual: Start with a close-up shot of someone thoughtfully working on a [topic]-related project, e.g., coding on a laptop if [topic] is coding.)**\\n\\n**(Voiceover - calm and reassuring):** Discover the power of [topic]. Unlock new opportunities and transform your passion into a career.\\n\\n**(Visual: Transition to a shot of a mentor helping a student, emphasizing collaboration and support.)**\\n\\n**(Voiceover):** Our personalized approach makes learning [topic] accessible for everyone. Get expert guidance and build real-world skills.\\n\\n**(Visual: Show successful graduates or learners showcasing their [topic]-related projects or achievements.)**\\n\\n**(Voiceover):** Invest in yourself. Invest in [topic]. \\n\\n**(Visual: Website address and a call to action - \\\"Start Learning Today!\\\" with a warm, inviting background.)**\\n\\n**(Music fades slowly, leaving a feeling of hope and potential.)**\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  export  const GenerateImageScript = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Image prompt of {style} style with all details for each scene for 30 seconds video :script :In the year 1776, a group of brave colonists declared their independence. They fought for freedom against a powerful empire. Their courage and determination inspired a nation. The signing of the Declaration marked a ne\n-Just Give specifing image prompt depends on the story line\n-do not give camera angle image prompt\n-Follow the Following schema and return JSON data (Max 4-5 Images)\n[\n{  \nimagePrompt:'',\nsceneContent:'<Script Content>'\n}\n]\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I am sorry, I cannot generate images directly. This capability is only enabled for the \"Gemini 2.0 Flash Experimental\" model when the selected output format is \"Images and text\". However, I can provide you with the image prompts based on your script and desired style in a JSON format.\n\n```json\n[\n{\n\"imagePrompt\": \"A gathering of men in 1770s colonial attire inside a grand, wood-paneled room. Quill pens scratch on parchment at a large table. Candles illuminate the scene, casting dramatic shadows. The atmosphere is serious and determined. Style: Realistic oil painting, Rembrandt lighting.\",\n\"sceneContent\": \"In the year 1776, a group of brave colonists declared their independence.\"\n},\n{\n\"imagePrompt\": \"A fierce battle scene with colonial soldiers in blue coats facing off against British redcoats amidst smoke and cannon fire. A tattered American flag waves in the background. Expressions of determination and courage on the faces of the colonists. Style: Dynamic, gritty war photography, high contrast.\",\n\"sceneContent\": \"They fought for freedom against a powerful empire.\"\n},\n{\n\"imagePrompt\": \"A close-up on the weathered hands of a colonial soldier holding a musket. His face shows fatigue and resolve. The backdrop is a field with tents and other soldiers in the distance. Style: Intimate portrait, focusing on emotion and texture, historical realism.\",\n\"sceneContent\": \"Their courage and determination inspired a nation.\"\n},\n{\n\"imagePrompt\": \"The signing of the Declaration of Independence. Prominent figures like Jefferson, Adams, and Franklin are gathered around a table as the Declaration is presented. Sunlight streams through the windows illuminating the historic moment. Style: Classic historical painting, emphasizing grandeur and significance, vibrant colors.\",\n\"sceneContent\": \"The signing of the Declaration marked a ne...\"\n}\n]\n```\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Generate Image prompt of {style} style with all details for each scene for 30 seconds video :script :In the year 1776, a group of brave colonists declared their independence. They fought for freedom against a powerful empire. Their courage and determination inspired a nation. The signing of the Declaration marked a ne\n-Just Give specifying image prompt depends on the story line\n-Do not give any text or explanation outside of JSON format \n-do not give camera angle image prompt\n-Follow the Following schema and return JSON data (Max 4-5 Images)\n[\n{  \nimagePrompt:'',\nsceneContent:'<Script Content>'\n}\n]\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n{\n\"imagePrompt\": \"Colonial men in Philadelphia, 1776. Intense debate, quill pens, candlelight. Style: Dramatic historical painting, chiaroscuro.\",\n\"sceneContent\": \"In the year 1776, a group of brave colonists declared their independence.\"\n},\n{\n\"imagePrompt\": \"Revolutionary War battle scene. Colonists vs. British, smoke, cannons, American flag. Style: Gritty, realistic war photography.\",\n\"sceneContent\": \"They fought for freedom against a powerful empire.\"\n},\n{\n\"imagePrompt\": \"Close-up: Colonial soldier's face, determined, musket in hand, battlefield background. Style: Intimate portrait, historical realism.\",\n\"sceneContent\": \"Their courage and determination inspired a nation.\"\n},\n{\n\"imagePrompt\": \"Signing of the Declaration of Independence. Jefferson, Adams, Franklin. Sunlight. Style: Grand historical painting, vibrant colors.\",\n\"sceneContent\": \"The signing of the Declaration marked a ne...\"\n}\n]\n```\n"},
          ],
        },
      ],
    });
  
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  