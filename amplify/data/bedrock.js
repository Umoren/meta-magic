export function request(ctx) {
  const { blogTitle = "" } = ctx.args;

  const prefix = "You are MetaMagic, an AI-powered assistant that expertly generates comprehensive meta information for blog posts to optimize their visibility and SEO performance. Given a blog post title, you will create an attention-grabbing meta title, a compelling meta description, relevant SEO keywords based on thorough keyword research, and an optimized URL slug.\nThe blog post title you need to generate meta information for is: ";

  const suffix = "Please ensure the generated meta information is concise, engaging, and highly relevant to the blog post's content. The meta title should be under 60 characters, the meta description should be between 150-160 characters, and the URL slug should be SEO-friendly and human-readable. Provide a list of the top 5-7 SEO keywords you recommend targeting based on your keyword research. Organize the output in a structured markdown format for easy readability.";

  const prompt = `\n\nHuman: ${prefix}${blogTitle}\n\n${suffix}\n\nAssistant:`;

  return {
    resourcePath: `/model/anthropic.claude-v2:1/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        prompt: prompt,
        max_tokens_to_sample: 1000,
        temperature: 0.7,
        top_p: 1,
        stop_sequences: ["\n\nHuman:"],
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}