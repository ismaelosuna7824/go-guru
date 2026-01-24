import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    topic = null // New prop for topic-specific structured data
}) {
    const siteTitle = 'Go Guru';
    const siteUrl = 'https://goguru.com'; // TODO: Update with your production URL
    const defaultDescription = 'Aprende Go (Golang) con tutoriales interactivos, ejemplos en vivo y batallas de código real time.';

    // Construct full title
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Tutoriales Interactivos de Go`;
    const metaDescription = description || defaultDescription;
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);

    // Generate keywords based on topic
    const generateKeywords = () => {
        if (keywords) return keywords;

        const baseKeywords = ['Go', 'Golang', 'tutorial', 'programación', 'aprender Go'];

        if (topic) {
            // Add topic-specific keywords
            const topicKeywords = [
                topic.title,
                topic.category,
                ...(topic.title.split(' ').filter(word => word.length > 3))
            ];
            return [...baseKeywords, ...topicKeywords].join(', ');
        }

        return baseKeywords.join(', ');
    };

    // Generate structured data for educational content (Schema.org)
    const generateStructuredData = () => {
        if (!topic) {
            // General website structured data
            return {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": siteTitle,
                "description": defaultDescription,
                "url": siteUrl,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${siteUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            };
        }

        // Topic-specific structured data for educational content
        return {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": topic.title,
            "description": topic.description || metaDescription,
            "learningResourceType": "Tutorial",
            "educationalLevel": "Beginner to Advanced",
            "programmingLanguage": {
                "@type": "ComputerLanguage",
                "name": "Go",
                "alternateName": "Golang",
                "url": "https://go.dev"
            },
            "author": {
                "@type": "Organization",
                "name": siteTitle
            },
            "provider": {
                "@type": "Organization",
                "name": siteTitle,
                "url": siteUrl
            },
            "inLanguage": "es",
            "keywords": generateKeywords(),
            "about": {
                "@type": "Thing",
                "name": topic.category,
                "description": `Tutorial sobre ${topic.title} en Go`
            },
            // Add TechArticle for code examples
            ...(topic.code && {
                "hasPart": {
                    "@type": "TechArticle",
                    "headline": `Ejemplo de código: ${topic.title}`,
                    "programmingLanguage": "Go"
                }
            })
        };
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={generateKeywords()} />
            <meta name="author" content={siteTitle} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Language and Regional */}
            <meta name="language" content="Spanish" />
            <meta httpEquiv="content-language" content="es" />

            {/* Robots */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="es_ES" />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:site" content="@goguru" /> {/* TODO: Update with your Twitter handle */}
            {image && <meta name="twitter:image" content={image} />}

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(generateStructuredData())}
            </script>

            {/* Additional topic-specific breadcrumb if topic exists */}
            {topic && (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": siteUrl
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": topic.category,
                                "item": `${siteUrl}#${topic.category}`
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": topic.title,
                                "item": canonicalUrl
                            }
                        ]
                    })}
                </script>
            )}
        </Helmet>
    );
}
