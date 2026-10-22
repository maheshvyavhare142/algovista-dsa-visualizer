import catchAsyncError from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import generateContent, { generateImage, generateMultipleImages } from "../services/geminiService.js";

const buildPrompt = ({
  title,
  difficulty,
  description,
  concepts,
  visualizationFocus,
  customInput,
}) => {
  const focusList = Array.isArray(visualizationFocus)
    ? visualizationFocus.join(", ")
    : "";
  const conceptList = Array.isArray(concepts) ? concepts.join(", ") : "";
  const customInputBlock = customInput && customInput.trim()
    ? `

USER-PROVIDED CUSTOM INPUT (REQUIRED): The user wants to see the solution and visualization for this specific input. Use this exact input for your timeline, visualizationData elements, and any example values. Do NOT use a generic or sample input—use the following:
---
${customInput.trim()}
---
`
    : "";
  return `
You are helping students understand data structures and algorithms. Generate a complete, optimal solution code for the problem and return a JSON payload that can be used to build visualizations.

Problem Title: ${title}
Difficulty: ${difficulty}
Key Concepts: ${conceptList || "N/A"}

Description:
${description || "N/A"}
${customInputBlock}

IMPORTANT: Generate a complete, well-written solution code in C++ (NOT Python, NOT Java, NOT JavaScript, ONLY C++) that solves this problem optimally. Do NOT use any user-submitted code. Create your own solution from scratch.

The solutionCode field MUST contain valid C++ code only. Use modern C++ syntax (C++11 or later). Include proper function/class structure, variable names, and comments where helpful. Include necessary headers (e.g., #include <iostream>, #include <vector>, etc.).

Respond with ONLY valid JSON (no markdown) having the following shape:
{
  "solutionCode": "Complete C++ solution code for the problem. MUST be valid C++ code. Include proper function/class structure, necessary headers, variable names, and comments where helpful.",
  "summary": "Plain language summary of what the code does and how it solves the problem.",
  "timeComplexity": {
    "notation": "e.g. O(n log n)",
    "rationale": "A short explanation for the complexity."
  },
  "spaceComplexity": {
    "notation": "e.g. O(n)",
    "rationale": "A short explanation for the complexity."
  },
  "visualization": {
    "loopFocus": "Name of the primary loop / recursion focus (for charts).",
    "timeline": [
      {
        "step": 1,
        "title": "Step title tied to ${focusList || "the algorithm"}",
        "narration": "Explain what happens in this iteration / recursive frame.",
        "state": [
          {
            "label": "Variable or pointer name",
            "value": "Numeric value if possible, otherwise short text description",
            "type": "index | count | value | flag"
          }
        ],
        "highlight": [
          "What to visually emphasize (e.g. nums[i], current node)"
        ]
      }
    ],
    "metrics": [
      {
        "label": "Metric name (e.g. Comparisons)",
        "value": 0
      }
    ],
    "recommendedVisuals": [
      "Short recommendation for how to visualize the process."
    ],
    "visualizationData": {
      "type": "array | graph | tree | flowchart | linkedlist",
      "elements": [
        {
          "id": "element_id",
          "label": "Element label",
          "value": "Element value",
          "position": { "x": 0, "y": 0 },
          "connections": ["other_element_id"],
          "color": "#hexcolor",
          "metadata": {}
        }
      ],
      "description": "Detailed description of how to render this visualization, including layout, colors, and animations."
    },
    "note": "CRITICAL: You MUST provide COMPLETE visualization data with EVERY SINGLE element needed to render the FULL visualization. Analyze the problem type and include ALL relevant data structures dynamically:\n\nGENERAL RULES FOR ALL PROBLEM TYPES:\n1. Include the PRIMARY data structure (array, linked list, tree, graph, etc.) with ALL elements\n2. Include ALL auxiliary data structures used in the algorithm:\n   - QUEUE/STACK: If the algorithm uses a queue or stack (including recursion call stack), include ALL elements currently in it\n   - RESULT/OUTPUT: Include the result showing the current or final state (boolean, number, array, etc.)\n   - VARIABLES/STATE: Include all algorithm variables (currentNode, leftHeight, rightHeight, isBalanced, sum, max, min, etc.)\n   - POINTERS/INDICES: Include all pointers (slow, fast, current, prev, head, tail, left, right, i, j, start, end, etc.)\n   - HASHMAP/SET: If used, include key-value pairs or set elements\n   - TEMPORARY DATA: Include any temporary data structures or computed values\n\n3. Use metadata flags to distinguish element types:\n   - metadata.isQueue: For queue elements\n   - metadata.isStack: For stack elements (including recursion frames)\n   - metadata.isResult: For result/output elements (final answer, boolean, number, etc.)\n   - metadata.isPointer: For pointer variables\n   - metadata.isVariable: For algorithm variables (height, sum, isBalanced, etc.)\n   - metadata.isLabel: For section labels (\"QUEUE\", \"RESULT\", \"VARIABLES\", \"STACK\", etc.)\n   - metadata.isHashMap: For hashmap entries\n   - metadata.isSet: For set elements\n\n4. POSITION COORDINATES: Every element MUST have explicit x and y coordinates. Use full canvas space (x: 0-800, y: 0-500):\n   - Primary structure: Top/middle area (y: 50-300)\n   - Queue/Stack: Bottom left area (x: 50-400, y: 350-450)\n   - Variables/State: Left side area (x: 50-200, y: 300-450) or near relevant nodes\n   - Result: Bottom right area (x: 500-750, y: 350-450)\n   - Pointers: Near the nodes they reference (y: 100-200)\n\n5. CONNECTIONS: Every node with next/child/parent/edge MUST list target node id in connections array.\n\nEXAMPLES BY PROBLEM TYPE:\n\nA) BINARY TREE PROBLEMS:\n   A1) Level Order Traversal (BFS):\n       - All tree nodes with parent-child connections\n       - Queue elements showing nodes to process\n       - Result list showing traversal order\n       - Example: {\"id\": \"node3\", \"value\": 3, \"position\": {\"x\": 400, \"y\": 50}, \"connections\": [\"node9\", \"node20\"], \"color\": \"#66b2ff\"}\n       - Example: {\"id\": \"queue_3\", \"value\": 3, \"position\": {\"x\": 150, \"y\": 400}, \"metadata\": {\"isQueue\": true}, \"color\": \"#ffaa00\"}\n       - Example: {\"id\": \"result_3\", \"value\": 3, \"position\": {\"x\": 550, \"y\": 400}, \"metadata\": {\"isResult\": true}, \"color\": \"#00ff88\"}\n   \n   A2) Balanced Binary Tree (DFS/Recursion):\n       - All tree nodes with parent-child connections\n       - Stack elements showing recursion frames (nodes being processed)\n       - Variables showing current state: currentNode, leftHeight, rightHeight, isBalanced\n       - Result showing final boolean answer\n       - Example: {\"id\": \"node1\", \"value\": 1, \"position\": {\"x\": 400, \"y\": 50}, \"connections\": [\"node2_left\", \"node2_right\"], \"color\": \"#66b2ff\"}\n       - Example: {\"id\": \"stack_node1\", \"value\": 1, \"position\": {\"x\": 150, \"y\": 400}, \"metadata\": {\"isStack\": true}, \"color\": \"#ff64c8\"}\n       - Example: {\"id\": \"var_currentNode\", \"value\": 1, \"label\": \"currentNode\", \"position\": {\"x\": 100, \"y\": 350}, \"metadata\": {\"isVariable\": true}, \"color\": \"#66b2ff\"}\n       - Example: {\"id\": \"var_leftHeight\", \"value\": 2, \"label\": \"leftHeight\", \"position\": {\"x\": 100, \"y\": 380}, \"metadata\": {\"isVariable\": true}, \"color\": \"#66b2ff\"}\n       - Example: {\"id\": \"var_rightHeight\", \"value\": 1, \"label\": \"rightHeight\", \"position\": {\"x\": 100, \"y\": 410}, \"metadata\": {\"isVariable\": true}, \"color\": \"#66b2ff\"}\n       - Example: {\"id\": \"result_balanced\", \"value\": \"true\", \"label\": \"isBalanced\", \"position\": {\"x\": 600, \"y\": 400}, \"metadata\": {\"isResult\": true}, \"color\": \"#00ff88\"}\n\nB) LINKED LIST PROBLEMS (Reverse, Merge, Cycle Detection, etc.):\n   - All list nodes with next connections\n   - All pointers (slow, fast, prev, current, etc.)\n   - Result list if applicable\n   - Example: {\"id\": \"node1\", \"value\": 1, \"position\": {\"x\": 100, \"y\": 200}, \"connections\": [\"node2\"], \"color\": \"#66b2ff\"}\n   - Example: {\"id\": \"slow\", \"value\": 1, \"label\": \"slow\", \"position\": {\"x\": 100, \"y\": 150}, \"connections\": [\"node1\"], \"metadata\": {\"isPointer\": true}, \"color\": \"#00ff00\"}\n\nC) ARRAY PROBLEMS (Two Sum, Sliding Window, etc.):\n   - All array elements with indices\n   - Pointers/indices (left, right, i, j, etc.)\n   - Result array if applicable\n   - Hashmap if used for lookups\n   - Example: {\"id\": \"arr_0\", \"value\": 2, \"position\": {\"x\": 100, \"y\": 200}, \"label\": \"0\", \"color\": \"#66b2ff\"}\n   - Example: {\"id\": \"left\", \"value\": 0, \"label\": \"left\", \"position\": {\"x\": 100, \"y\": 150}, \"metadata\": {\"isPointer\": true}, \"color\": \"#ff0000\"}\n   - Example: {\"id\": \"map_2\", \"value\": \"2:0\", \"position\": {\"x\": 500, \"y\": 400}, \"metadata\": {\"isHashMap\": true}, \"color\": \"#ffaa00\"}\n\nD) GRAPH PROBLEMS (BFS, DFS, Shortest Path, etc.):\n   - All vertices/nodes\n   - All edges with connections\n   - Queue/Stack for traversal\n   - Visited set or distance array\n   - Example: {\"id\": \"vertexA\", \"value\": \"A\", \"position\": {\"x\": 200, \"y\": 100}, \"connections\": [\"vertexB\", \"vertexC\"], \"color\": \"#66b2ff\"}\n   - Example: {\"id\": \"visited_A\", \"value\": \"A\", \"position\": {\"x\": 100, \"y\": 400}, \"metadata\": {\"isSet\": true}, \"color\": \"#00ff88\"}\n\nE) STRING PROBLEMS (Longest Substring, Palindrome, etc.):\n   - String characters as array elements\n   - Pointers/indices (left, right, start, end)\n   - Result string or length\n   - Hashmap for character frequency if used\n   - Example: {\"id\": \"char_0\", \"value\": \"a\", \"position\": {\"x\": 100, \"y\": 200}, \"label\": \"0\", \"color\": \"#66b2ff\"}\n\nF) DYNAMIC PROGRAMMING:\n   - Input array/matrix\n   - DP table/matrix with computed values\n   - Pointers showing current position\n   - Example: {\"id\": \"dp_0_0\", \"value\": 1, \"position\": {\"x\": 100, \"y\": 200}, \"label\": \"[0][0]\", \"color\": \"#66b2ff\"}\n\n6. DO NOT provide partial data. DO NOT skip elements. DO NOT omit auxiliary data structures. The visualization must show the COMPLETE algorithm state including:\n   - The input data structure\n   - All intermediate data structures (queue, stack, hashmap, set, etc.)\n   - All variables and their current values (height, sum, isBalanced, etc.)\n   - All pointers/variables\n   - The output/result (final answer)\n\n7. For RECURSIVE algorithms (like Balanced Binary Tree, Tree Height, etc.):\n   - Include the STACK showing recursion frames (nodes being processed)\n   - Include all VARIABLES (currentNode, leftHeight, rightHeight, isBalanced, etc.)\n   - Include the RESULT showing the final answer\n   - Show the complete state at each step\n\n8. For each problem, analyze what data structures and variables are used and include ALL of them in the visualization."
  },
  "insights": [
    "Important tip or pitfall to highlight.",
    "Another insight if relevant."
  ]
}

If you cannot solve the problem, return:
{
  "solutionCode": "// Unable to generate solution",
  "summary": "Unable to generate solution for this problem.",
  "timeComplexity": { "notation": "N/A", "rationale": "N/A" },
  "spaceComplexity": { "notation": "N/A", "rationale": "N/A" },
  "visualization": {
    "loopFocus": "N/A",
    "timeline": [],
    "metrics": [],
    "recommendedVisuals": [],
    "visualizationData": { "type": "none", "elements": [], "description": "" }
  },
  "insights": []
}
  `;
};

const buildImagePrompt = ({
  title,
  difficulty,
  description,
  concepts,
  solutionCode,
  summary,
  customInput,
  imageType = "all", // "dataStructure", "algorithmFlow", "stepByStep", or "all"
}) => {
  const conceptList = Array.isArray(concepts) ? concepts.join(", ") : "";
  const customInputLine = customInput && customInput.trim()
    ? `\nUser's custom input for this visualization: ${customInput.trim()}\n`
    : "";
  
  // Define different prompts for different image types
  const imageTypePrompts = {
    dataStructure: `Generate IMAGE 1 of 3: A complete, detailed visualization of the DATA STRUCTURE and INITIAL STATE used in this algorithm.

Problem Title: ${title}
Difficulty: ${difficulty}
Key Concepts: ${conceptList || "N/A"}

Problem Description:
${description || "N/A"}

Solution Summary:
${summary || "N/A"}${customInputLine}

Solution Code:
${solutionCode || "N/A"}

FOCUS FOR THIS IMAGE: Complete Data Structure Visualization with Initial State
- Show the COMPLETE input data structure (array, tree, graph, linked list, etc.) with ALL elements clearly labeled
- Display each element with its value and index/position
- Show ALL pointers (left, right, slow, fast, i, j, start, end, etc.) with their initial positions
- Include all auxiliary data structures if used (queue, stack, hashmap, set, etc.) with their initial state
- Use color-coding: different colors for different types of elements (input array, pointers, auxiliary structures)
- Add clear labels and section headers (e.g., "INPUT ARRAY", "POINTERS", "QUEUE", "RESULT")
- Show the initial state before any algorithm processing begins
- Ensure the ENTIRE structure is visible - no cropping or partial views
- Make it look professional with rounded rectangles, clear typography, and organized layout`,

    algorithmFlow: `Generate IMAGE 2 of 3: A DETAILED LOOP-BY-LOOP visualization showing EVERY ITERATION of the algorithm with full explanations.

Problem Title: ${title}
Difficulty: ${difficulty}
Key Concepts: ${conceptList || "N/A"}

Problem Description:
${description || "N/A"}

Solution Summary:
${summary || "N/A"}${customInputLine}

Solution Code:
${solutionCode || "N/A"}

CRITICAL: This image MUST show the COMPLETE LOOP EXECUTION with detailed annotations for EACH iteration/step.

FOCUS FOR THIS IMAGE: Detailed Loop Execution with Full Explanations
- Show MULTIPLE PASSES/ITERATIONS of the algorithm (like "Pass 1", "Pass 2", "Pass 3", etc.)
- For EACH iteration, show:
  * The current state of the data structure
  * Which elements are being compared/processed (highlight them)
  * The comparison result (e.g., "Compare 5 & 1: Swap" or "Compare 5 & 4: No Swap")
  * Any swaps or transformations that occur
  * Updated state after the operation
- Use visual indicators:
  * RED ARROWS between elements to show comparisons
  * LOCK ICONS next to elements that are in their final sorted/processed position
  * DASHED LINES to separate sorted/processed sections from unsorted/unprocessed sections
  * COLOR CODING to highlight active elements, sorted elements, and unsorted elements
- Show step-by-step progression:
  * Label each step clearly (e.g., "Step 1: Compare 5 & 1: Swap")
  * Show the state BEFORE and AFTER each operation
  * Display intermediate states between passes
- Include a LEGEND explaining:
  * What the arrows mean (comparisons)
  * What the lock icons mean (sorted/final position)
  * What the dashed line means (sorted vs unsorted boundary)
  * Color coding meanings
- For sorting algorithms: Show each pass clearly with comparisons, swaps, and final positions
- For traversal algorithms: Show each step with current position, visited nodes, and path taken
- For two-pointer algorithms: Show both pointers, their values, and what they're pointing to
- Make it look like a professional infographic with clear sections, labels, and visual hierarchy
- Ensure EVERY loop iteration is shown with full explanation - do not skip any steps`,

    stepByStep: `Generate IMAGE 3 of 3: The FINAL SORTED/PROCESSED result and a summary visualization.

Problem Title: ${title}
Difficulty: ${difficulty}
Key Concepts: ${conceptList || "N/A"}

Problem Description:
${description || "N/A"}

Solution Summary:
${summary || "N/A"}${customInputLine}

Solution Code:
${solutionCode || "N/A"}

FOCUS FOR THIS IMAGE: Final Result and Summary
- Show the FINAL SORTED/PROCESSED data structure with all elements in their correct positions
- Display the complete result array/list/tree with all elements clearly labeled
- Show that ALL elements are now in their final positions (use lock icons for all elements)
- Include a summary showing:
  * Initial state → Final state
  * Total number of passes/iterations completed
  * Key transformations that occurred
- If applicable, show the algorithm's efficiency (e.g., "Sorted in 3 passes")
- Make it clear that the algorithm has completed successfully
- Use visual indicators to show completion (all lock icons, final state highlighted)
- Include any final output or result that the algorithm produces`,

    all: `Generate 3 extremely detailed, comprehensive, and high-quality visual diagrams explaining the algorithm for this problem. Each image must be complete, professional, and educational. Generate ALL 3 images in your response.

Problem Title: ${title}
Difficulty: ${difficulty}
Key Concepts: ${conceptList || "N/A"}

Problem Description:
${description || "N/A"}

Solution Summary:
${summary || "N/A"}${customInputLine}

Solution Code:
${solutionCode || "N/A"}

YOU MUST GENERATE 3 SEPARATE IMAGES:

IMAGE 1 - Complete Data Structure Visualization:
- Show the COMPLETE input data structure (array, tree, graph, linked list, etc.) with ALL elements
- Label every node, element, index, and connection clearly
- Include all auxiliary data structures if used (queue, stack, hashmap, set, etc.)
- Show all pointers, variables, and their current values
- Display the structure in a clear, organized layout

IMAGE 2 - Algorithm Flow and Execution:
- Show how the algorithm processes and transforms the data
- Display the step-by-step flow with arrows and indicators
- Show the current state of all variables and data structures during execution
- Highlight the active/current element being processed
- Include flow diagrams showing the algorithm's logic

IMAGE 3 - Step-by-Step Detailed View:
- Show a detailed view of a specific iteration, recursive call, or algorithm step
- Display the call stack if recursion is used
- Show function parameters, local variables, and return values
- Highlight what happens in this specific step
- Include detailed annotations explaining each operation

CRITICAL REQUIREMENTS FOR ALL IMAGES - MUST BE EXTREMELY DETAILED:

1. COMPLETE VISUALIZATION - NO PARTIAL IMAGES:
   - Generate a FULL, COMPLETE diagram showing the entire algorithm state
   - Include EVERY SINGLE element - do not crop, truncate, or show partial views
   - The entire visualization must fit in one complete image

2. DETAILED DATA STRUCTURES - SHOW EVERYTHING:
   - Primary data structure (array, tree, graph, linked list, etc.) with ALL elements clearly labeled
   - Each element must have its value, index/position, and connections visible
   - All auxiliary structures (queue, stack, hashmap, set, etc.) if used - show ALL elements
   - Include ALL pointers with clear arrows showing their connections
   - Show ALL variables with their current values
   - Display the result/output of the algorithm prominently

3. COMPREHENSIVE LABELS AND ANNOTATIONS:
   - Label every node, element, pointer, and variable clearly
   - Add descriptive text explaining what each component represents
   - Include step numbers or iteration markers if applicable
   - Add color-coding with a legend explaining what each color means
   - Show indices, positions, and relationships explicitly

4. STEP-BY-STEP DETAILS:
   - If the algorithm has multiple steps, show the current state clearly
   - Highlight the active/current element being processed
   - Show the progression or flow of the algorithm
   - Include arrows or flow indicators showing direction of processing

5. PROFESSIONAL DIAGRAM STYLE:
   - Use high contrast colors for excellent readability
   - Use clear, readable fonts for all text and labels
   - Ensure proper spacing between elements
   - Use consistent styling throughout
   - Make it visually appealing and easy to understand

6. ALGORITHM-SPECIFIC DETAILS:
   - For TREE problems: Show the complete tree structure with all nodes, parent-child relationships, and any traversal paths
   - For ARRAY problems: Show all array elements with indices, pointers (left, right, i, j, etc.), and any auxiliary data structures
   - For GRAPH problems: Show all vertices, edges, and traversal state (visited nodes, queue/stack contents)
   - For LINKED LIST problems: Show all nodes with next pointers, and any additional pointers (slow, fast, prev, etc.)
   - For RECURSIVE algorithms: Show the call stack, current function parameters, and return values
   - For DYNAMIC PROGRAMMING: Show the DP table/matrix with computed values and the current position

7. ADDITIONAL DETAILS TO INCLUDE:
   - Show the input data clearly labeled
   - Display intermediate states if relevant
   - Show the final result/output prominently
   - Include any temporary variables or helper data structures
   - Add explanatory text boxes or callouts for complex operations
   - Show the algorithm's time/space complexity visually if possible

8. QUALITY REQUIREMENTS:
   - High resolution and clarity
   - Professional appearance suitable for educational materials
   - All text must be legible
   - All elements must be clearly distinguishable
   - The entire diagram must be visible in one complete image

Each image should be an extremely detailed, comprehensive visual explanation that helps students fully understand how the algorithm works. Every single element, relationship, and state must be clearly visible and labeled. Make each image as detailed and informative as possible.

IMPORTANT: Generate ALL 3 images. Return each image as base64-encoded data.`
  };

  // Return the appropriate prompt based on imageType
  if (imageType === "all") {
    return imageTypePrompts.all;
  }
  return imageTypePrompts[imageType] || imageTypePrompts.all;
};

const extractJson = (text) => {
  if (!text) return null;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch (error) {
    // attempt to find JSON between braces
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start !== -1 && end !== -1 && end > start) {
      const candidate = trimmed.slice(start, end + 1);
      try {
        return JSON.parse(candidate);
      } catch (innerError) {
        return null;
      }
    }
    return null;
  }
};

export const explainCode = catchAsyncError(async (req, res, next) => {
  const { title, difficulty, description, concepts, visualizationFocus, customInput } =
    req.body || {};
  if (!title || !difficulty) {
    return next(
      new ErrorHandler(
        "title and difficulty are required to request an explanation",
        400,
      ),
    );
  }
  if (!process.env.GOOGLE_GEMINI_KEY) {
    return next(
      new ErrorHandler(
        "GOOGLE_GEMINI_KEY is not configured on the server",
        500,
      ),
    );
  }

  const prompt = buildPrompt({
    title,
    difficulty,
    description,
    concepts,
    visualizationFocus,
    customInput,
  });

  // Make both calls sequentially with proper error handling
  let rawText = "";
  let imageData = null;
  let explanationError = null;
  let imageError = null;

  try {
    // Step 1: Generate explanation first
    try {
      console.log("Starting explanation generation...");
      rawText = await generateContent(prompt);
      console.log("Explanation generated successfully");
    } catch (error) {
      explanationError = error;
    }

    // Handle explanation errors
    if (explanationError) {
      console.error("Gemini explanation request failed", explanationError);
      
      // Handle specific API key errors
      if (explanationError.message?.includes("API_KEY_LEAKED")) {
        return next(
          new ErrorHandler(
            "Your Google Gemini API key has been flagged as leaked. Please generate a new API key from https://aistudio.google.com/apikey and update your .env file with the new GOOGLE_GEMINI_KEY.",
            403
          )
        );
      }
      
      if (explanationError.message?.includes("API_KEY_MISSING")) {
        return next(
          new ErrorHandler(
            "Google Gemini API key is not configured. Please set GOOGLE_GEMINI_KEY in your .env file.",
            500
          )
        );
      }
      
      // Handle other Gemini API errors
      if (explanationError.status === 403 || explanationError.message?.includes("403")) {
        return next(
          new ErrorHandler(
            "Access denied. Please check your Google Gemini API key. If it was flagged as leaked, generate a new one from https://aistudio.google.com/apikey",
            403
          )
        );
      }
      
      return next(new ErrorHandler("Failed to generate explanation. Please try again later.", 502));
    }

    // Parse explanation to get solution code and summary for image generation
    const parsed = extractJson(rawText);
    const solutionCode = parsed?.solutionCode || "";
    const summary = parsed?.summary || "";

    // Step 2: Generate images only if explanation was successful
    if (solutionCode && summary) {
      try {
        console.log("Starting image generation...");
        // Build prompts for 3 different images
        const imagePrompts = [
          buildImagePrompt({
            title,
            difficulty,
            description,
            concepts,
            solutionCode,
            summary,
            customInput,
            imageType: "dataStructure",
          }),
          buildImagePrompt({
            title,
            difficulty,
            description,
            concepts,
            solutionCode,
            summary,
            customInput,
            imageType: "algorithmFlow",
          }),
          buildImagePrompt({
            title,
            difficulty,
            description,
            concepts,
            solutionCode,
            summary,
            customInput,
            imageType: "stepByStep",
          }),
        ];
        
        // Generate all images with timeout protection
        const images = await Promise.race([
          generateMultipleImages(imagePrompts),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Image generation timeout")), 120000) // 2 minute timeout
          )
        ]);
        
        if (images && images.length > 0) {
          // Convert each image to data URL format for frontend
          imageData = images.map((img) => ({
            imageDataUrl: `data:${img.mimeType || "image/png"};base64,${img.imageBase64}`,
            mimeType: img.mimeType || "image/png",
            description: img.description || `Image ${img.index + 1}`,
            index: img.index,
            model: "gemini-3-pro-image",
          }));
        }
      } catch (error) {
        console.error("Image generation failed (non-critical):", error.message);
        imageError = error;
        // Don't fail the entire request if image generation fails
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return next(new ErrorHandler("An unexpected error occurred. Please try again later.", 500));
  }

  const parsed = extractJson(rawText);
  const data =
    parsed ||
    {
      solutionCode: "// Unable to generate solution",
      summary: rawText?.trim() || "Explanation unavailable.",
      timeComplexity: {
        notation: "N/A",
        rationale: "Unable to parse Gemini response.",
      },
      spaceComplexity: {
        notation: "N/A",
        rationale: "Unable to parse Gemini response.",
      },
      visualization: {
        loopFocus: "N/A",
        timeline: [],
        metrics: [],
        recommendedVisuals: [],
        visualizationData: { type: "none", elements: [], description: "" },
      },
      insights: [],
    };

  // Add image data to response
  const response = {
    success: true,
    data,
    raw: rawText,
  };

  if (imageData && Array.isArray(imageData) && imageData.length > 0) {
    // Multiple images - return as array
    response.imageData = imageData;
    console.log(`Response includes ${imageData.length} generated images`);
  } else if (imageData && !Array.isArray(imageData)) {
    // Backward compatibility: single image (convert to array)
    response.imageData = [{
      imageDataUrl: imageData.imageDataUrl,
      mimeType: imageData.mimeType || "image/png",
      description: "Algorithm Visualization",
      index: 0,
      model: "gemini-3-pro-image",
    }];
  } else if (imageError) {
    // Log but don't fail the request
    console.warn("Image generation was not available:", imageError.message);
  } else {
    console.log("No images generated, but explanation is available");
  }

  console.log("Successfully completed explain request");
  res.status(200).json(response);
});


