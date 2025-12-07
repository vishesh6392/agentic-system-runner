const runGroq  = require("../geminiModel");

 const CodeTemplates = {
  explain: (task) => `
Explain the following code in simple terms:

${task.details}

Your explanation must:
- Describe what the code does step-by-step
- Explain purpose of each block
- Highlight important variables/functions
- Give overall summary
`,

  rewrite: (task) => `
Rewrite this code with better readability, structure, and naming:

${task.details}

Your rewritten code must:
- Use clean variable names
- Add proper spacing and indentation
- Maintain same functionality
`,

  optimize: (task) => `
Optimize the following code for performance:

${task.details}

Requirements:
- Reduce time complexity if possible
- Improve memory usage
- Remove redundant logic
- Keep same functionality
- Give before/after explanation
`,

  comment: (task) => `
Add detailed comments to the following code:

${task.details}

Requirements:
- Explain purpose of each part
- Add clear comments for functions, loops, conditions
- Keep the code unchanged
`,

  default: (task) => `
Explain and rewrite the following code clearly:

${task.details}
`
};



async function CodeRunner(task) {
  const subType = task.subType || "default";

  const buildPrompt = CodeTemplates[subType] || CodeTemplates.default;

  const prompt = buildPrompt(task);
  const response = await runGroq(prompt);

  return response;
}

module.exports = CodeRunner;
