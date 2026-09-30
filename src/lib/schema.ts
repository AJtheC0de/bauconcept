import { site } from '../config/site';

export const orgId = `${site.url}/#organisation`;

export const organisationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['GeneralContractor', 'LocalBusiness'],
  '@id': orgId,
  name: site.name,
  url: `${site.url}/`,
  telephone: site.phone.e164,
  email: site.email,
  logo: `${site.url}/icon-512.png`,
  image: `${site.url}/og-image.png`,
  slogan: site.claims.footer,
  foundingDate: String(site.stats.foundingYear),
  numberOfEmployees: { '@type': 'QuantitativeValue', value: site.stats.employees },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: site.address.canton,
    addressCountry: site.address.country,
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: site.serviceArea.region },
    ...site.serviceArea.municipalities.map((name) => ({ '@type': 'City', name })),
  ],
  knowsAbout: ['Tiefbau', 'Strassenbau', 'Aushub', 'Erdarbeiten', 'Werkleitungsbau', 'Kanalisationsbau', 'Belagsarbeiten'],
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const serviceSchema = (s: { title: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.title,
  serviceType: s.title,
  description: s.description,
  url: `${site.url}${s.path}`,
  provider: { '@id': orgId },
  areaServed: { '@type': 'AdministrativeArea', name: site.serviceArea.region },
});
