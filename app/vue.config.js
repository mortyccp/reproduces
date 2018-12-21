module.exports = {
  chainWebpack: config => {
    config.plugin("fork-ts-checker").tap(args =>
      args.map(arg => ({
        ...arg,
        tslintAutoFix: true
      }))
    );
  }
};
