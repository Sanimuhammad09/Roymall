import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({ 
  title = 'Roymall Scents | Luxury Niche Fragrances & Designer Perfumes in Nigeria', 
  description = 'Discover the finest collection of luxury, designer, and niche fragrances at Roymall Scents. Authentic perfumes with nationwide delivery in Nigeria.',
  keywords = 'roymallscents.com.ng, ROYMALL, Salihu Abdulmalik CEO ROYMALL, Roymall scents, luxury perfumes, designer fragrances, niche perfumes Nigeria',
  image = 'https://www.roymallscents.com.ng/logo.jpg',
  url = 'https://www.roymallscents.com.ng',
  type = 'website'
}: SEOProps) {
  const fullTitle = title === 'Roymall Scents | Luxury Niche Fragrances & Designer Perfumes in Nigeria' ? title : `${title} | Roymall Scents`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Facebook / OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@roymallscents" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
