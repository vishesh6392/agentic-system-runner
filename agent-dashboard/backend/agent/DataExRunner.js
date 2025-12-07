const runGroq  = require("../geminiModel");


const ExtractTemplates = {
  keywords: (task) => `
Extract the main keywords from the following text:

${task.details}

Output format:
- Bullet list of keywords
`,

  entities: (task) => `
Extract named entities (NER) from the text below.

Text:
${task.details}

Output categories:
- Names
- Organizations
- Locations
- Dates
- Other known entities
`,

  dates: (task) => `
Extract all important dates from the text below:

${task.details}

Output as:
- List of dates with context
`,

  summary_data: (task) => `
Extract key information from the following text:

${task.details}

Extract:
- Names
- Important values
- Summary of events
- Key points
`,

  default: (task) => `
Extract key details from the following text:

${task.details}
`
};


async function DataExRunner(task) {
  const subType = task.subType || "default";

  const buildPrompt = ExtractTemplates[subType] || ExtractTemplates.default;

  const prompt = buildPrompt(task);
  const response = await runGroq(prompt);
  return response;
}

module.exports = DataExRunner;
