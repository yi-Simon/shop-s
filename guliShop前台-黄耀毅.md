1.项目准备：

    开发环境：脚手架 npm install -g @vue/cli
    创建项目 npm create project
    运行项目：npm run serve
    额外配置：
    局部禁用某个错误提示 eslint-disable no-unused-vars
    全局禁用某些错误提示 package.json>eslintConfig
    "rules": {"no-unused-vars":"off"}
    开发阶段禁用 eslint：vue.config.js
    module.exports = {lintOnSave: false}
    配置别名@提示: jsconfig.json
    {
    "compilerOptions": {
    "baseUrl": "./",
    "paths": {
    "@/_": ["src/_"]
    }
    },
    "exclude": ["node_modules", "dist"]
    }
    main.js 配置
    导入 vue，关闭开发提示，创建 vue 实例

2.远端仓库：

    本地仓库： git init / git clone
    git add . | git add -A
    git commit -m "descript"
    git push/pull
    github:创建仓库关联本地仓库

3.确定页面结构：

    上中下结构，Header 和 Footer 是固定的非路由组件
    路由组件 Home,Search,Login,Register

4.在 App.vue 中导入组件并注册

    把对应的 html、css 代码和图片提取到对应的组件中
    公共图片提取到 assets 文件夹
    引入 reset.css

5.创建路由模块

    安装 vue-router 插件
    配置路由,路由分模块 注册路由 App 添加路由视图

6.使用声明式导航替换 a 链接

    使用编程式导航跳让 button 跳转

7.注册和登录页面不渲染 Footer 组件,在路由中配置 meta

    根据 meta 判读在非注册登录页面显示 Footer

8.路由传参：

    指定 params 参数可选 在路由接收时加上'?'
    params 参数不能单独搭配 path
    params 为空 搭配 undefined 防止报错
    props 三种情况

9.报错 Navigation

    在路由中重写路由原型的 push/replace
    如果参数中没有配置成功和失败的回调函数,添加 catch

10.Home 组件

    拆分 Home 部分的子组件，提取 htlm、css 和图片
    测试后台 api 接口：postman

11.安装并封装 axios,在 axios 对象添加拦截器,添加进度条 nprogress

    NProgress.configure({ showSpinner: false }) 不要转圈
    配置和用法参考 github
    请求错误，可选是否进一步处理 reject/pending

12.创建请求函数模块 api,导入 axios 实例,封装请求函数

    请求三级分类列表的数据,调用请求函数测试是否拿到数据
    跨域问题：配置代理 proxy

13.管理数据:安装 vuex,组件数据模块化

    actions 的异步方法调用请求函数,将返回的数据调用 mutations 保存到 state
    组件获取数据：组件分发 actions 方法发送请求,通过计算属性读取数据(2 种方式)

14.三级分类列表:

    遍历数据渲染到页面上,调整列表的 css 样式

15.分类列表二、三级的显示和隐藏,替换掉 css 方法

    鼠标在商品分类标题时列表不隐藏：使用 div 包裹,将事件添加到 div 上
    鼠标移入移出：通过标记确定鼠标所在列表项,并显示对应的分级

16.节流,使用 lodash 的节流函数

引入 lodash/throttle,对鼠标移入分类列表事件进行节流配置
moveIn:throttle(fun,delay)
'trailing':false 事件结束之后不延迟调用

17.跳转到搜索路由 参数通过 query 传递

    声明式导航本质是组件对象，过多使用导致效率变慢
    编程式导航+事件委派优化

18.自定义属性传递参数

    自定义属性 id,name data-attr
    读取:event.target.dataset
    将数据格式化为 query 对象

19.优化请求

    优化发送 ajax 请求的位置，避免重复发送
    复用组件在 App 中发送请求

20.搜索页面隐藏和显示一级分类列表

    根据路由默认只显示首页的一级分类
    搜索页鼠标进入商品分类标题显示一级分类
     添加过渡

21.合并搜索关键字 params 和分类名 query

    发送前判断路由中的参数，合并到路径再进行发送

22.模拟 banner 和 floor 数据，安装 mockjs，使用 mock 模拟接口，返回模拟数据

    创建向 mock 接口发送请求的 api 函数 入口文件引入 mock 模拟服务器
    使用 vuex 管理数据
    actions-async mutations state
    组件 dispatch actions 的请求函数
    组件获取数据
    ...mapState({})
    ...mapGetters(['date'])

23.轮播图片

    安装 swiper@5 导入 js 和 css
    swiper 必须在页面构建完成后才生效
    获取 dom：ref
    watch：{
    data：{
    vm.\$nextTick(new Swiper(ref,{
    autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,//操作后不停止自动播放
    }
    }))
    }
    imediate:true //数据先获取到的情况，立即执行一次来启动
    }
    将轮播组件提取成公共组件
    floor 组件拿到的轮播图片在请求数据的内层，需要挖出来

24.search、searchSelector

    api 请求函数 vuex 状态管理 配置跳转路由
    在 search 组件设置请求参数对象，进行初始化请求
    mouted 分发请求 computed 获取数据
    获取数据时判断是否拿到返回数据，处理数据延迟的报错
    动态渲染数据

25.搜索页面

    beforeMount 取出路由中的数据对请求参数对象进行更新
      this.$route.query/params 解构覆盖searchParams
      delete报错：vue的delete覆盖了js删除方法
    mounted 发送异步请求。获取数据
    重新输入关键字或点击商品类别不再发送请求
      使用 watch 监听路由参数的变化，调用更新、发送
    点击品牌，添加/替换品牌

26.动态显示与删除搜索条件(面包屑)

    动态渲染路由中的搜索条件和选择的品牌、属性信息
    移除搜索关键字使用全局总线通知Header清空关键字
    品牌，搜索页面向selector组件绑定自定义事件，子级向父级响应	品牌信息，父级更新数据 	发送搜索请求
    属性，搜索页面向selector组件绑定自定义事件，子级向父级响应	属性信息，父级更新数据 	发送搜索请求 
    点击 x 按钮，把searchParams中的对应数据清除并重新发送请求（$router.replace、调用请求方法）

27.上一页按钮从搜索页跳回首页

    修改路由，从首页跳转到搜索页使用 push，在搜索页内使用 replace

28.商品列表排序

    标记排序方式和升降序 
      计算orderType和orderFlag
    根据排序方式显示对应的样式 iconfont 的使用
      下载iconfont，引入到html中使用
    点击排序项 根据传入的排序选项决定切换类型还是升降
    将新的排序方式更新到请求参数，发送请求

29.分页

    公共组件 Pagination 注册
    父组件传递数据 当前页 每页显示数量 商品总数 连续页数
    内部计算：总页数 连续页的始末页数
    正常情况：始末页与当前页间隔相同
    边界情况：取越界的部分补偿另一边的差值
    动态显示分页按钮 条件渲染按钮
    遍历渲染连续页 v-for(优先级更高)遍历到末尾 v-if 决定开始页
    优化：使用计算属性计算按钮数组取代if
    选中按钮 active
    点击页码 传递对应的参数响应修改当前页码的方法
      prosp数据不改变：数据名的问题
    数据改变，更新搜索条件，重新发送请求
    搜索条件更新，将页码改为 1

30.商品详情

    配置路由 api 请求函数 vuex
      路由跳转携带商品的id
    滚动位置异常  在router中配置 滚动行为
      
    使用 getters 获取详细的数据
    对获取数据进行处理防止数据延迟报错

31.点击小图片，挂上响应的类，通知大图切换

```
从skuInfo获取图片数据
渲染数据
点击小图，通知大图切换显示对应的大图
  将同样的数据传递给大图，小图切换时响应图片序号给大图进行切换
```

32.小图轮播 分组轮播 swiper

```
使用slides grid的
  slidesPerView 同时显示图片数
  slidesPerGroup 滚动组数量
添加前后滚动按钮
```

33.放大镜

    在空 div 内添加鼠标滑动事件
      获取鼠标位置offsetX,蒙版宽高offsetWidth
    鼠标坐标-1/2 蒙版宽高 = 蒙版定位位置
    边界修正

34.商品属性选择

    类：被选中的属性 点击事件-排他切换
      传入属性对象给点击事件作为参数，点击回调对被点击的属性的对象排他，选中被点击项
    商品数量增减按钮，输入商品数量 最小值限定

35.添加到购物车

    路由 api
    跳转时保存 商品信息(skuInfo) 到 sessionStorage，携带商品数量 query 参数
      push({name:'',query:{}})
    渲染数据
    添加成功页面跳转到购物车和返回商品详情
      < to="/detail?skuId=${skuInfo.id}`">

36.购物车

    api vuex 路由
    添加临时token
      工具文件定义工具函数
      在 axios 拦截器中添加 uuid 并保存一份到 state
      uuid 先在缓存中读取，没有则创建
      临时 id 添加在请求头中
      	config.headers.userTempId

37.动态渲染购物车

    修改 css 对齐列表 宽度占比：15 35 10 17 10 13
    获取数据
    统计 单商品总价，所有商品总价，选中商品总数
    单选框
    点击选框发送请求改变选中状态
    全选框
    使用 get set
    点击全选框，异步分发全选 actions，如果商品选中状态
    与全选框不一致 ，发送请求改变这个商品的选中状态


38.删除购物车商品

    api 分发删除请求
    删除选中商品，根据数据的选中状态集中发送删除请求 Promise.all

39.商品数量

    加减按钮传入对应的参数，发送请求进行加减
    输入数量 使用差值计算将数据改为输入的数量
    商品最小数量 1

40.注册组件

    api 路由 跳转 vuex
    收集数据发送注册请求
    账号 验证码 密码 确认密码
    验证码接口，原来的完整路径有误，使用代理路径
    首页、注册、登录的跳转

41.登录组件

    路由 api vuex
    收集登录数据发送请求
    跳转 不使用 form 提交 阻止 button 默认行为
    自动登录 将用户信息保存到 localStorage,
    header 组件的登录-登录成功部分切换

42.退出登录

    把用户信息删除 点击事件通知 state&localStorage

43.购物车的结算按钮，跳转创建订单页面

    创建订单组件 api router store
    组件发送请求获取数据，动态渲染页面内容
    收货地址的切换 排他

44.提交订单

    点击提交按钮，先发送提交订单的异步请求，获取订单编号
    收集订单数据信息
    在组件中发送请求：把 api 模块挂在 vue 原型上
    将订单编号添加到路径的 query 参数，跳转到支付页面

45.支付页面

    根据路由中的 query 参数获取订单编号，发送请求获取支付信息
    点击支付按钮的交互
    支付弹框 element-ui message messageBox
    安装、配置文件 局部引用
    将弹窗对象挂在 vue 原型上
    使用 qrcode 显示支付信息中的二维码图片
    使用定时器查询支付状态 支付成功后清除定时器，并自动跳转支付成功页面
    点击取消、确定按钮，弹出对应的警告框，取消按钮清除定时器


46.支付成功页面的路由跳转

47.用户中心组件

    二级路由组件 myorder 和 grouporder 默认 myorder
    子组件会创建-销毁，所以在子组件发送请求数据 api
    渲染数据 根据订单商品数合并单元格 template 包裹表格不影响页面
    element-ui 分页器

48.路由守卫

    全局前置路由守卫:在路由器中配置 订单、支付、用户中心
    将跳转到这些页面的路由根据是否登录判断跳转的页面，
    未登录的携带目标路径跳转到登录页面，已登录的跳转到目标页面
    路由独享守卫 在路由中配置
    未登录跳转到登录，购物车跳转订单，订单跳转支付，支付跳转成功
    组件内组件 在组件中配置
    路由中有 skunum 和缓存中有 skuinfo 才能跳转到添加购物车成功页面

49.懒加载

    图片:未加载到目标图片时，先显示 loading 图片
    npm install vue-lazyboad
    配置 use Vuelazyload
    路由:路由被访问时才加载相应组件
    使用动态 import 语法 const Home = ()=> import('@/page/Home')

50.表单验证

    npm install -S vee-validate@2.2.15
    引入并使用插件
    配置
    对所有表单进行验证
    验证输入信息
    自定义配置文件 引入 main
    import zh_CN from 'vee-validate/dist/locale/zh_CN' 提示信息映射成中文
    自定义验证信息验证协议勾选
