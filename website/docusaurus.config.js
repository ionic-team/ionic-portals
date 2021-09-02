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
        {
          label: 'Platform',
          position: 'right',
          items: [
            {
              href: 'https://capacitorjs.com/docs',
              label: 'Capacitor',
              target: '_blank',
              rel: null,
              className: 'link--outbound',
            },
            {
              href: 'https://ionicframework.com/docs',
              label: 'Framework',
              target: '_blank',
              rel: null,
              className: 'link--outbound',
            },
            {
              href: 'https://ionic.io/docs/appflow',
              label: 'Appflow',
              target: null,
              rel: null,
            },
            {
              href: 'https://ionic.io/docs/identity-vault',
              label: 'Identity Vault',
              target: null,
              rel: null,
            },
            {
              href: 'https://ionic.io/docs/auth-connect',
              label: 'Auth Connect',
              target: null,
              rel: null,
            },
            {
              href: 'https://ionic.io/docs/secure-storage',
              label: 'Secure Storage',
              target: null,
              rel: null,
            },
            {
              href: 'https://ionic.io/docs/premier-plugins',
              label: 'Premier Plugins',
              target: null,
              rel: null,
            },
            {
              to: 'https://ionic.io/docs/portals',
              label: 'Portals',
              target: null,
              rel: null,
            },
          ],
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
