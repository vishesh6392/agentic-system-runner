export const subTypeMap = {
  summarize: [
    { value: "short", label: "Short Summary" },
    { value: "detailed", label: "Detailed Summary" },
    { value: "bullet_points", label: "Bullet Points" },
    { value: "for_kids", label: "Kid-Friendly" },
    { value: "technical", label: "Technical Summary" },
    { value: "key_takeaways", label: "Key Takeaways" },
    { value: "tl_dr", label: "TL;DR" },
  ],

  email: [
    { value: "formal", label: "Formal Email" },
    { value: "casual", label: "Casual Email" },
    { value: "apology", label: "Apology Email" },
    { value: "leave_request", label: "Leave Request Email" },
    { value: "cold_email", label: "Cold Email" },
  ],

  blog: [
    { value: "intro", label: "Introduction Paragraph" },
    { value: "outline", label: "Blog Outline" },
    { value: "seo", label: "SEO Optimized Article" },
    { value: "long_form", label: "Long Form Blog" },
  ],

  code: [
    { value: "explain", label: "Explain Code" },
    { value: "rewrite", label: "Rewrite Code" },
    { value: "optimize", label: "Optimize Code" },
    { value: "comment", label: "Add Comments" },
  ],

  resume: [
    { value: "improve", label: "Improve Resume Line" },
    { value: "ats", label: "ATS-Optimized Bullet" },
    { value: "achievement", label: "Make Achievements Stronger" },
  ],

  extract: [
    { value: "keywords", label: "Extract Keywords" },
    { value: "entities", label: "Extract Entities (NER)" },
    { value: "dates", label: "Extract Dates" },
    { value: "summary_data", label: "Extract Key Info" },
  ]
};
