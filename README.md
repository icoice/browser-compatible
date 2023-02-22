# browser-compatible

web页面兼容提示, 请结合"browser-compatible.html"使用, "browser-compatible.html"用于提示用户安装可以兼容的浏览器.

## 示例代码

```html
    <script src="./browser-compatible.js"><!-- 请置于页面最顶部 --></script>
    <script>
      // 设置某些浏览器禁止访问
      // browserCompatible.ban(['edge', 'chrome', 'ie'], './browser-compatible.html');

      // 设置支持firefox和chrom浏览器, all为不限制支持版本, 其他浏览器或低于设置版本不支持访问
      browserCompatible.support({
        edge: 112,
        firefox: 'all',
        chrome: 110
      }, './browser-compatible.html');
    </script>
```

## 方法

### ban
禁止浏览器访问, 入参1为禁止列表, 入参2为提示页面的地址
```javacript
browserCompatible.ban(['edge', 'chrome', 'ie'], './browser-compatible.html');
```

### support
声明支持浏览器和浏览器版本, 支持全部版本填写"all", 入参1为支持列表, 入参2为提示页面的地址
```javacript
browserCompatible.support({
  edge: 112,
  firefox: 'all',
  chrome: 110
}, './browser-compatible.html');
```
