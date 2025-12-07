const runGroq  = require("../geminiModel");


const ResumeTemplates = {
  improve: (task) => `
Improve this resume line:

${task.details}

Make it:
- More action-oriented
- More impactful
- Use measurable achievements if possible
- Professional and crisp
`,

  ats: (task) => `
Rewrite this resume bullet to be ATS-optimized:

${task.details}

Requirements:
- Add keywords
- Use power verbs
- Keep one line
- Focus on accomplishment
`,

  achievement: (task) => `
Convert the following resume line into a strong achievement statement:

${task.details}

Follow:
- Action verb + task + measurable result
- Emphasize impact
- Keep it professional
`,

  default: (task) => `
Rewrite this resume bullet to be more strong and action-driven:

${task.details}
`
};


async function ResumeBulletRunner(task) {
  const subType = task.subType || "default";

  const buildPrompt = ResumeTemplates[subType] || ResumeTemplates.default;

  const prompt = buildPrompt(task);
  const response = await runGroq(prompt);
  return response;
}

module.exports = ResumeBulletRunner;
