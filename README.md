## credit-offline-plugin

webpack 插件，用于配合接入离线包

### features
[x] 给静态资源带上appName/appVersion 等离线包meta头
[] 在主文档头部插入一段js，上报当前的离线包版本


### usages

```
{
  plugins: new ChangeNamePlugin({format: name => dosomething(name)})
}
```

