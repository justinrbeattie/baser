module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-import": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
      "postcss-nested": {},
      "postcss-custom-media": {},
      "css-has-pseudo": {},
    },
  },
};
