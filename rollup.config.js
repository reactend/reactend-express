import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  external: ['react', 'react-dom', 'prop-types', 'styled-components'],
  plugins: [
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              esmodules: true,
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-transform-react-jsx'],
    }),
    commonjs(),
  ],
};
