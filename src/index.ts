import { Compiler } from 'webpack';

interface Options {
  format?: (filename: string) => string;
}

class PluginChangeName {
  static defaultOptions: Options = {
    format: filename => filename,
  };

  private options: Options;

  constructor(options: Options) {
    this.options = {
      ...PluginChangeName.defaultOptions,
      ...options,
    };
  }

  apply(compiler: Compiler) {
    const { format } = this.options;

    // 修改静态资源名
    compiler.hooks.emit.tap('PluginChangeName', compilation => {
      let { assets, modules, chunks } = compilation;
      let newAssets = {};
      newAssets = Object.keys(assets).reduce((acc, key) => {
        acc[format(key)] = assets[key];
        return acc;
      }, {});

      compilation.assets = newAssets;

      chunks.forEach(chunk => {
        chunk.files = chunk.files.map(format);
      });

      modules.forEach(mod => {
        console.log(module);
        // let modAssets = mod.assets.map(format);
        // mod.assets = modAssets;
      });
    });
  }
}

export default PluginChangeName;

// 遇到的问题是: 所有资源的文件名都会变更，但是有个问题是有些模块引入的文件还是改动前的，比如demo中svg文件

// 复现路径
// 1. tsc -w src/index.ts
// 2. cd demo && npm i
// 3. npm run build
// 4. serve dist/
