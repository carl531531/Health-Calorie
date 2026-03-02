import { FoodItem } from '../types';

/**
 * Service to interact with Qwen-VL-Plus for food recognition.
 * Note: Since we are in a frontend environment, we'll use a proxy or direct call if allowed.
 * For this demo, we'll simulate the response structure but provide a real integration pattern.
 */
export async function recognizeFood(base64Image: string): Promise<{
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
} | null> {
  const apiKey = process.env.QWEN_API_KEY;
  
  if (!apiKey) {
    console.warn("QWEN_API_KEY not found in environment. Simulating recognition...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      name: "Recognized Dish",
      calories: 350,
      protein: 20,
      carbs: 45,
      fat: 12
    };
  }

  try {
    // This is the standard pattern for Alibaba Bailian API
    // URL: https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-SSE': 'disable'
      },
      body: JSON.stringify({
        model: 'qwen-vl-plus',
        input: {
          messages: [
            {
              role: 'user',
              content: [
                { image: `data:image/jpeg;base64,${base64Image}` },
                { text: 'Identify the food in this image and provide its estimated nutritional value (calories, protein, carbs, fat) per serving. Return ONLY a JSON object with keys: name, calories, protein, carbs, fat.' }
              ]
            }
          ]
        },
        parameters: {
          result_format: 'message'
        }
      })
    });

    const data = await response.json();
    const content = data.output.choices[0].message.content[0].text;
    
    // Extract JSON from the text response
    const jsonMatch = content.match(/\{.*\}/s);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error("Error recognizing food:", error);
    return null;
  }
}
