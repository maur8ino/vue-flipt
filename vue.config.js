const pkg = require("./package.json");

module.exports = {
  chainWebpack(config) {
    config
      .plugin("define")
      .tap(definitions => {
        definitions[0] = Object.assign(definitions[0], {
          __VERSION__: JSON.stringify(pkg.version),
        });

        return definitions;
      })
      .end()
      .externals(process.env.NODE_ENV === "production" ? { axios: "axios" } : undefined);
  },

  configureWebpack(config) {
    config.plugins.some((plugin, index) => {
      return plugin.options?.filename === "demo.html" ? config.plugins.splice(index, 1) : false;
    });
  },
};
