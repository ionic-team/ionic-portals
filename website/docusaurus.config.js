/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Ionic Portals',
  tagline: 'Portals tagline',
  url: 'https://ionic.io',
  trailingSlash: false,
  baseUrl: '/docs/portals/',
  baseUrlIssueBanner: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/auth-connect-icon.svg',
  organizationName: 'ionic-team',
  projectName: 'portals-docs',
  titleDelimiter: '-',
  themeConfig: {
    navbar: {
      title: 'Portals',
      logo: {
        alt: 'Portals Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersionDropdown',
        },
      ],
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    tagManager: {
      trackingID: 'GTM-TKMGCBC',
    },
    prism: {
      theme: { plain: {}, styles: [] },
      additionalLanguages: [
        'shell-session', 'kotlin', 'groovy', 'java', 'swift',
      ],
    },
  },
  plugins: ['@ionic-internal/docusaurus-plugin-tag-manager', 'docusaurus-plugin-sass'],
  themes: ['@ionic-internal/docusaurus-theme'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        pages: false,
        theme: {
          customCss: ['prismjs/themes/prism-tomorrow.css'],
        },
      },
    ],
  ],
};
