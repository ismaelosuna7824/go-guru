import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website'
}) {
    const siteTitle = 'Go Guru';
    const defaultDescription = 'Aprende Go (Golang) con tutoriales interactivos, ejemplos en vivo y batallas de código real time.';

    // Construct full title
    const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Tutoriales Interactivos de Go`;
    const metaDescription = description || defaultDescription;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            {url && <meta property="og:url" content={url} />}
            {image && <meta property="og:image" content={image} />}

            {/* Twitter */}
            <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    );
}
