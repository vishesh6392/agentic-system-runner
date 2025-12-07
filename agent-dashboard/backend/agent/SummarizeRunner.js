const runGroq =require('../geminiModel');

const summarizeTemplates = {
  short: (task) => `
Summarize the following text in 1–2 short sentences:

${task.details}
`,

  detailed: (task) => `
Write a long, detailed summary (3–6 paragraphs) with explanations:

${task.details}
`,

  bullet_points: (task) => `
Summarize into clean, clear bullet points:

${task.details}
`,

  kid_Friendly: (task) => `
Explain this text in very simple, kid-friendly language:

${task.details}
`,

  technical: (task) => `
Summarize while keeping all technical terms and high-level details:

${task.details}
`,

  key_takeaways: (task) => `
Extract the 5–10 most important key takeaways from this text:

${task.details}
`,

  default: (task) => `
Summarize the following text clearly:

${task.details}
`
};

async function SummmarizeRunner(task) {
    const subType=task.subType || "default";
     console.log(task.subType);
    const buildPrompt=summarizeTemplates[subType] || summarizeTemplates.default;
    //  console.log(buildPrompt);
    const prompt=buildPrompt(task);
     console.log(prompt);
     const op= await runGroq(prompt);
    return op;
}

module.exports=SummmarizeRunner;