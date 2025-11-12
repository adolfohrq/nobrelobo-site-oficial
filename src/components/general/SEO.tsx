import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({
  title = 'Nobre Lobo - Agência de Marketing Digital',
  description = 'Transforme sua presença digital com a Nobre Lobo. Especialistas em Design Gráfico, Social Media, SEO, Tráfego Pago e Desenvolvimento Web. Resultados reais para o seu negócio.',
  keywords = 'marketing digital, design gráfico, social media, SEO, tráfego pago, desenvolvimento web, agência de marketing, branding, identidade visual',
  image = '/og-image.jpg',
  url = 'https://nobrelobo.com.br',
  type = 'website'
}) => {
  // Título completo com nome da marca
  const fullTitle = title.includes('Nobre Lobo') ? title : `${title} | Nobre Lobo`;

  return (
    <Helmet>
      {/* Meta tags básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Nobre Lobo" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Outras meta tags importantes */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Portuguese" />
      <meta name="author" content="Nobre Lobo - Agência de Marketing Digital" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
