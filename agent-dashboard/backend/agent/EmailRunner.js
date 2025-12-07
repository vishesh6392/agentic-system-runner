const runGroq  = require("../geminiModel");

// EMAIL TEMPLATES BASED ON SUBTYPE
const EmailTemplates = {
  formal: (task) => `
Write a professional and formal email based on the following details:

${task.details}

Your email must include:
- A clear subject line
- Formal greeting
- 1–2 short paragraphs
- Polite closing
- Sender name placeholder
`,

  casual: (task) => `
Write a casual, friendly email based on the following details:

${task.details}

Your email must:
- Use an informal tone
- Be polite and human
- Keep 3–6 lines
- End with a friendly closing
`,

  apology: (task) => `
Write a polite apology email.

Context:
${task.details}

Your email must include:
- Apology in the subject
- Acknowledge the mistake
- Take responsibility
- Offer correction or improvement
- Polite closing
`,

  leave_request: (task) => `
Write a formal leave request email.

Details:
${task.details}

Email must include:
- Subject (Leave Request for ___ days)
- Greeting
- Reason for leave
- Leave dates
- Last working day (if applicable)
- Closing
`,

  cold_email: (task) => `
Write a compelling cold email for the following purpose:

${task.details}

Your email should include:
- Strong subject line
- Brief introduction
- Clear value or request
- Call to action
- Professional closing
`,

  interview_followup: (task) => `
Write a polite interview follow-up email.

Details:
${task.details}

Include:
- Gratitude
- Mention interview date/role
- Ask for update politely
- Close professionally
`,

  offer_acceptance: (task) => `
Write a job offer acceptance email.

Details:
${task.details}

Include:
- Subject line
- Expression of gratitude
- Clear acceptance statement
- Joining date (if applicable)
- Professional closing
`,

  default: (task) => `
Write a formal professional email based on these details:

${task.details}

Include:
- Subject
- Greeting
- Body (2–3 paragraphs)
- Closing
- Sender name placeholder
`
};

async function EmailRunner(task) {
  const subType = task.subType || "default";

  const buildPrompt = EmailTemplates[subType] || EmailTemplates.default;

  const prompt = buildPrompt(task);
  console.log(prompt)
  const response = await runGroq(prompt);
  console.log (response)
  return response;
}

module.exports = EmailRunner;
