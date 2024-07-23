import { amplifyClient } from "./utils/amplify";

interface MetaInfo {
    metaTitle: string;
    metaDescription: string;
    seoKeywords: string[];
    urlSlug: string;
}

function validateAndCleanMetaInfo(metaInfo: MetaInfo): MetaInfo {
    return {
        metaTitle: metaInfo.metaTitle || "Untitled",
        metaDescription: metaInfo.metaDescription || "No description available",
        seoKeywords: metaInfo.seoKeywords.length > 0 ? metaInfo.seoKeywords : ["no keywords"],
        urlSlug: metaInfo.urlSlug || "no-slug-available"
    };
}

function calculateSEOScore(metaInfo: MetaInfo): number {
    let score = 0;
    if (metaInfo.metaTitle.length >= 50 && metaInfo.metaTitle.length <= 60) score += 25;
    if (metaInfo.metaDescription.length >= 140 && metaInfo.metaDescription.length <= 160) score += 25;
    if (metaInfo.seoKeywords.length >= 5 && metaInfo.seoKeywords.length <= 8) score += 25;
    if (metaInfo.urlSlug.length >= 3 && metaInfo.urlSlug.length <= 50) score += 25;
    return score;
}


export async function generateMeta(formData: FormData): Promise<MetaInfo & { seoScore: number }> {
    const blogTitle = formData.get("blogTitle")?.toString() || "";

    const response = await amplifyClient.queries.askBedrock({
        blogTitle: blogTitle,
    });

    console.log('Raw response:', response);

    if (!response.data?.body) {
        throw new Error("No response from Bedrock");
    }

    const parsedBody = JSON.parse(response?.data?.body);
    const content = parsedBody.completion;

    const parsedMetaInfo = parseMetaInfo(content);
    const seoScore = calculateSEOScore(parsedMetaInfo);

    return { ...validateAndCleanMetaInfo(parsedMetaInfo), seoScore }
}

function parseMetaInfo(content: string): MetaInfo {
    const lines = content.split('\n');
    let metaInfo: MetaInfo = {
        metaTitle: '',
        metaDescription: '',
        seoKeywords: [],
        urlSlug: ''
    };
    let currentSection = '';

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('# ') || trimmedLine.startsWith('## ')) {
            if (trimmedLine.toLowerCase().includes('meta title')) {
                currentSection = 'metaTitle';
            } else if (trimmedLine.toLowerCase().includes('meta description')) {
                currentSection = 'metaDescription';
            } else if (trimmedLine.toLowerCase().includes('url slug')) {
                currentSection = 'urlSlug';
            } else if (trimmedLine.toLowerCase().includes('keywords')) {
                currentSection = 'seoKeywords';
            }
        } else if (trimmedLine && currentSection) {
            switch (currentSection) {
                case 'metaTitle':
                    metaInfo.metaTitle = metaInfo.metaTitle || trimmedLine;
                    break;
                case 'metaDescription':
                    metaInfo.metaDescription = metaInfo.metaDescription || trimmedLine;
                    break;
                case 'urlSlug':
                    metaInfo.urlSlug = metaInfo.urlSlug || trimmedLine;
                    break;
                case 'seoKeywords':
                    if (trimmedLine.startsWith('-')) {
                        metaInfo.seoKeywords.push(trimmedLine.substring(1).trim());
                    } else {
                        metaInfo.seoKeywords = trimmedLine.split(',').map(k => k.trim());
                    }
                    break;
            }
        }
    }

    // Fallback for title if not found
    if (!metaInfo.metaTitle) {
        const titleLine = lines.find(line => line.startsWith('# '));
        if (titleLine) {
            metaInfo.metaTitle = titleLine.substring(1).trim();
        }
    }

    return metaInfo;
}