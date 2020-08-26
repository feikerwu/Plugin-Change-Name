"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var PluginChangeName = /** @class */ (function () {
    function PluginChangeName(options) {
        this.options = __assign(__assign({}, PluginChangeName.defaultOptions), options);
    }
    PluginChangeName.prototype.apply = function (compiler) {
        var format = this.options.format;
        // 修改静态资源名
        compiler.hooks.emit.tap('PluginChangeName', function (compilation) {
            var assets = compilation.assets, modules = compilation.modules, chunks = compilation.chunks;
            var newAssets = {};
            newAssets = Object.keys(assets).reduce(function (acc, key) {
                acc[format(key)] = assets[key];
                return acc;
            }, {});
            compilation.assets = newAssets;
            chunks.forEach(function (chunk) {
                chunk.files = chunk.files.map(format);
            });
            modules.forEach(function (mod) {
                console.log(module);
                // let modAssets = mod.assets.map(format);
                // mod.assets = modAssets;
            });
        });
    };
    PluginChangeName.defaultOptions = {
        format: function (filename) { return filename; }
    };
    return PluginChangeName;
}());
exports["default"] = PluginChangeName;
// 遇到的问题是: 所有资源的文件名都会变更，但是有个问题是有些模块引入的文件还是改动前的，比如demo中svg文件
// 复现路径
// 1. tsc -w src/index.ts
// 2. cd demo && npm i
// 3. npm run build
// 4. serve dist/
