# Three-Journey

Three.js learning project.

Files before 03 (included) are not bundled. <br />
Files after are bundled in 04-webpack.

Change the file you want to see by changing the path in webpack.common.js

```
module.exports = {
  entry: path.resolve(__dirname, "../src/08-fullscreen-and-resizing/script.js"), // <--- here
  // ...
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "../src/08-fullscreen-and-resizing/index.html" // <--- here
      ),
      minify: true,
    }),
    new MiniCSSExtractPlugin(),
  ],
  module: {
    // ...
  },
};
```

Then start the project with `npm start`.<br />
