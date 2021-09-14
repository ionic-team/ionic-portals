import nodeResolve from '@rollup/plugin-node-resolve';
const banner =
  '/*! Ionic Portals: https://ionic.io/portals - Commercial License */';
export default {
  input: 'build/index.js',
  output: [
    {
      file: 'dist/plugin.js',
      format: 'iife',
      name: 'ionicPortals',
      banner,
      globals: {
        '@capacitor/core': 'ionicExports',
      },
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/index.js',
      format: 'esm',
      banner,
      preferConst: true,
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      banner,
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  external: ['@capacitor/core'],
  plugins: [nodeResolve()],
};
