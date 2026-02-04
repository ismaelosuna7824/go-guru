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
    const siteUrl = 'https://goguru.dev';
    const defaultDescription = 'Aprende Go (Golang) en español con tutoriales interactivos, ejemplos de código en vivo y ejercicios prácticos. La mejor plataforma para aprender programación en Go desde cero.';
    const defaultImage = `${siteUrl}/og-image.png`;

    // Construct full title with Spanish keywords
    const fullTitle = title
        ? `${title} en Go | ${siteTitle}`
        : `${siteTitle} - Aprende Go (Golang) en Español | Tutoriales Interactivos`;
    const metaDescription = description || defaultDescription;
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);
    const ogImage = image || defaultImage;

    // Generate keywords based on topic with Spanish focus
    const generateKeywords = () => {
        if (keywords) return keywords;

        const baseKeywords = [
            'Go', 'Golang', 'tutorial', 'programación', 'aprender Go',
            'Go en español', 'Golang español', 'tutorial Go español',
            'aprender Golang', 'curso Go gratis', 'programación Go español',
            'Go desde cero', 'ejemplos Go', 'código Go', 'aprender a programar',
            'lenguaje Go', 'desarrollo Go', 'backend Go'
        ];

        if (topic) {
            // Add topic-specific keywords in Spanish
            const topicKeywords = [
                topic.title,
                `${topic.title} en Go`,
                `${topic.title} Golang`,
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
            // General website + Course structured data for homepage
            return [
                {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": siteTitle,
                    "alternateName": "GoGuru",
                    "description": defaultDescription,
                    "url": siteUrl,
                    "inLanguage": "es",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": `${siteUrl}/search?q={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                },
                {
                    "@context": "https://schema.org",
                    "@type": "Course",
                    "name": "Curso de Go (Golang) en Español",
                    "description": "Aprende Go desde cero con tutoriales interactivos, ejemplos de código en vivo y ejercicios prácticos. Curso completo y gratuito en español.",
                    "provider": {
                        "@type": "Organization",
                        "name": siteTitle,
                        "url": siteUrl
                    },
                    "educationalLevel": "Beginner to Advanced",
                    "inLanguage": "es",
                    "isAccessibleForFree": true,
                    "teaches": [
                        "Programación en Go",
                        "Desarrollo backend con Go",
                        "Concurrencia en Go",
                        "Desarrollo web con Go"
                    ],
                    "about": {
                        "@type": "ComputerLanguage",
                        "name": "Go",
                        "alternateName": "Golang",
                        "url": "https://go.dev"
                    }
                }
            ];
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
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:site" content="@goguru_es" />
            <meta name="twitter:image" content={ogImage} />

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
