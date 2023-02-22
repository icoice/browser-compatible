/* 浏览器版本拦截 */
(function (g) {
  function getExplore(){
    var browser = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;

    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? browser.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? browser.ie = s[1] : 
    (s = ua.match(/edg\/([\d\.]+)/)) ? browser.edge = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ? browser.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? browser.firefox = s[1] : 
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? browser.opera = s[1] : 
    (s = ua.match(/chrome\/([\d\.]+)/)) ? browser.chrome = s[1] : 
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? browser.safari = s[1] : 0;

    console.log('当前浏览器版本');    

    if (browser.ie) console.log('ie: ' + browser.ie); 
    if (browser.edge) console.log('edge: ' + browser.edge);
    if (browser.firefox) console.log('firefox: ' + browser.firefox); 
    if (browser.chrome) console.log('chrome: ' + browser.chrome); 
    if (browser.opera) console.log('opera: ' + browser.opera); 
    if (browser.safari) console.log('safari: ' + browser.safari);

    return browser;
  }

  function getExploreName(){
    var ua = navigator.userAgent;

    if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) return 'opera';
    if (ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1) return 'ie';
    if (!!window.ActiveXObject || "ActiveXObject" in window) return 'ie >= 11';
    if (ua.indexOf("Edg")  > -1) return 'edge';
    if (ua.indexOf("Edge") > -1) return 'edge';
    if (ua.indexOf("Firefox") > -1) return 'firefox';
    if (ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") === -1) return 'safari';
    if (ua.indexOf("Chrome") > -1 && ua.indexOf("Safari") > -1) return 'chrome';

    return 'unknown';
  }

  var exploreName = getExploreName();
  var exploreVersion = getExplore();
  var version = exploreVersion[exploreName];
  var versionGroup = !version ? [] : version.split('.');

  var bigVer = versionGroup[0] || null;

  function stopPageLoad() {
    if (document.execCommand) document.execCommand('Stop');
    if (g.stop) g.stop();
  }

  function toTips(link, options) {
    var msg = 'Page no compatible!';
    var splitLink = link.split('?');
    var search = [];

    if (splitLink.length > 1) {
      search = search.concat(splitLink[1].split('&'));
    }

    if (options) search = search.concat(options);

    if (link) {
      g.location.href = splitLink[0] + (search.length > 0 ? '?' + search.join('&') : '');
    } else {
      g.alert(msg);
    }
  }

  g.browserCompatible = {
    ban: function(names, link) {
      var linkOptions = [];

      if (names.indexOf(exploreName) >= 0) {
        if (names.length > 0) linkOptions.push('ban-browser='+names.join(','));

        stopPageLoad()
        toTips(link, linkOptions);
      }
    },
    support: function(map, link) {
      var version = map[exploreName];
      var linkOptions = [];
      var support = [];

      if (version === 'all') return true; // 当版本号设置为all的时候

      for (var n in map) {
        support.push(n);
      }

      if (exploreName) linkOptions.push('explore-name='+exploreName);
      if (bigVer) linkOptions.push('current-big-version='+bigVer);
      if (version) linkOptions.push('limit-version='+version);
      if (support.length > 0) linkOptions.push('support-browser='+support.join(','));

      if (!version) {
        stopPageLoad(); // 未找到该浏览器, 拒绝支持

        return toTips(link, linkOptions);
      }

      console.log('兼容版本为: 大版本号', version, '以上');

      if (bigVer < version) {
        stopPageLoad(); // 当浏览器版本号小于设置版本号时

        return toTips(link, linkOptions);
      }
    },
  }
})(window);