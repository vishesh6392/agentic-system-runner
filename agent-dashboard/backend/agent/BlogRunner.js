const runGroq  = require("../geminiModel");

const BlogTemplates = {
  intro: (task) => `
Write an engaging introduction paragraph for a blog.

Topic:
${task.details}

Your introduction must:
- Hook the reader
- Clearly introduce the topic
- Be easy to read
- Be 4–6 lines long
`,

  outline: (task) => `
Generate a complete blog outline.

Topic:
${task.details}

Include:
- Title suggestion
- 5–10 section headings
- Bullet points under each section
- Keep it SEO-friendly
`,

  seo: (task) => `
Write a full SEO-optimized article.

Topic:
${task.details}

Requirements:
- Catchy title with keywords
- 5–8 subheadings
- Rich keywords
- Simple, human tone
- 600–1000 words
- Add conclusion at the end
`,

  long_form: (task) => `
Write a detailed long-form blog article.

Topic:
${task.details}

Requirements:
- 1000–1500 words
- Professional but readable tone
- Use story + data + examples
- Add strong introduction and conclusion
- SEO headings (H2, H3)
`,

  default: (task) => `
Write a clean, readable blog article.

Topic:
${task.details}
`
};



async function BlogRunner(task) {
  const subType = task.subType || "default";

  const buildPrompt = BlogTemplates[subType] || BlogTemplates.default;

  const prompt = buildPrompt(task);
  const response = await runGroq(prompt);

  return response;
}

module.exports = BlogRunner;
