
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/read/read","pages/detail/detail","pages/classify/classify","pages/setting/setting","pages/search/search"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","backgroundColor":"#EEEEEE","fontSize":"15","list":[{"pagePath":"pages/index/index","iconPath":"static/icon/_home.png","selectedIconPath":"static/icon/home.png","text":"首页"},{"pagePath":"pages/classify/classify","iconPath":"static/icon/_img.png","selectedIconPath":"static/icon/img.png","text":"分类"},{"pagePath":"pages/setting/setting","iconPath":"static/icon/_videocamera.png","selectedIconPath":"static/icon/videocamera.png","text":"设置"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-novel","compilerVersion":"2.9.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#4cd964","navigationBarShadow":{"colorType":"grey"},"titleNView":{"titleText":"首页","buttons":[{"type":"none","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/read/read","meta":{},"window":{"navigationBarBackgroundColor":"#4cd964","navigationBarTitleText":"首页","navigationBarShadow":{"colorType":"grey"},"titleNView":{"titleText":"阅读","buttons":[{"type":"none","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarBackgroundColor":"#4cd964","navigationBarTitleText":"详情","navigationBarShadow":{"colorType":"grey"},"titleNView":{"titleText":"详情","buttons":[{"type":"none","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/classify/classify","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#4cd964","navigationBarTitleText":"分类","navigationBarShadow":{"colorType":"grey"},"titleNView":{"titleText":"分类","buttons":[{"type":"none","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/setting/setting","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#4cd964","navigationBarTitleText":"个人中心","navigationBarShadow":{"colorType":"grey"},"titleNView":{"titleText":"个人中心","buttons":[{"type":"none","fontSrc":"/static/iconfont/iconfont.ttf","text":""}]}}},{"path":"/pages/search/search","meta":{},"window":{"titleNView":{"searchInput":{"autoFocus":true,"placeholder":"请输入搜索参数","backgroundColor":"#ffffff"}}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
