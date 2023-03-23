# browser-compatible

Web应用浏览器兼容提示, 请结合"browser-compatible.html"使用, "browser-compatible.html"用于提示用户安装可以兼容的浏览器。

## 安装
- [browser-compatible.js](http://192.168.24.12/share/browser-compatible/browser-compatible.js)
- [browser-compatible.html](http://192.168.24.12/share/browser-compatible/browser-compatible.html?explore-name=edge&current-big-version=110&limit-version=112&support-browser=edge,firefox,chrome)

```html
    <script src="./browser-compatible.js"><!-- browser-compatible.js需置于页面最顶部 --></script>
    <script>
      // 设置某些浏览器禁止访问
      browserCompatible.ban(['edge', 'chrome', 'ie'], './browser-compatible.html');

      // 设置支持firefox和chrom浏览器, all为不限制支持版本, 其他浏览器或低于设置版本不支持访问
      browserCompatible.support({
        edge: 112,
        firefox: 'all',
        chrome: 110
      }, './browser-compatible.html');
    </script>
```

## 用法
仅禁用浏览器用ban方法, 需要精确到浏览器大版本的请使用support方法。

- <b>ban</b> (browers: Array\<string\>, jumpTo?: string)    
禁止浏览器访问

示例：
```javascript
browserCompatible.ban(['edge', 'chrome', 'ie'], './browser-compatible.html');
```

- <b>support</b> (browers: { [string]: number | 'all' }, jumpTo?: string)    
禁止浏览器或浏览器某版本访问, 支持全部版本则为"all"。

示例：
```javascript
browserCompatible.support({
  edge: 112,
  firefox: 'all',
  chrome: 110
}, './browser-compatible.html');
```

## 浏览器标识
- opera 欧朋浏览器
- ie 微软IE浏览器
- edge 微软Edge浏览器
- firefox 火狐浏览器
- safari 苹果Safari浏览器
- chrome 谷歌浏览器
