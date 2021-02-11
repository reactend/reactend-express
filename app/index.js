require('@babel/register')({
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
});

require('./app.js');
