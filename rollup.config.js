import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export const globals = {
  react: 'react',
  'react-dom': 'reactDom',
  ramda: 'ramda',
  immutable: 'immutable',
  'prop-types': 'propTypes',
  invariant: 'invariant',
};

export default (name, pkg) => {
  const output = (file, format) => ({
    file: file,
    format: format,
    name: name,
    exports: 'named',
    globals: globals,
  });

  return [
    {
      input: 'src/index.js',
      output: output(pkg.browser, 'umd'),
      external: Object.keys(globals),
      plugins: [
        babel({
          exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs(),
      ],
    },
    {
      input: 'src/index.js',
      output: [output(pkg.main, 'cjs'), output(pkg.module, 'es')],
      external: Object.keys(globals),
      plugins: [
        babel({
          exclude: ['node_modules/**'],
        }),
      ],
    },
  ];
};
