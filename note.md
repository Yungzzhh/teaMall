###::v-deep
问题：插件使用的时候存在阴影
解决思路： 利用::v-deep样式穿透
在不需要获取dom节点下改变样式

```css
::v-deep .ly-tabbar{
	box-shadow:none;
	border-bottom:none;
}
```

###Card.vue小圆点问题
用了h1没用span
是因为一开始用了h1，而h1是用来定义标题的，是块级元素
span是文本容器，内联元素

### 图片引入问题？
用相对路径不要用绝对路径



### mvc与mvvm模式的区别：
mvc：
M(Model 模型) V(View 视图) C(Controller)控制器
MVC模式允许在不改变视图的情况下改变视图对用户输入的响应方式，
用户对View的操作交给Controller处理，在Controller中响应View的事件，再调用Model的接口对数据处理
Model发生变化就通知相关视图更新
mvvm：
Model、View、ViewModel
View通过模板语法将数据渲染锦Dom元素
ViewModel对Model更新时通过数据绑定更新到View层
通过数据的双向绑定可以让View层变化时，Model层也跟着发生变化
区别：Mvvm模式实现了View和Model的自动同步，而不需要我们去手动操作dom元素
mvc中，大量的dom操作使页面渲染性能降低，加载速度变慢，影响用户体验

### vue中的ref
获取dom

```template
<div ref="aaa"></div>
```
```script
this.$ref.aaa
```

### 写接口的时候出现了404和500
在index文件中

```js
router.get('/api/home', function (req, res, next) {  
  res.send({
    code:0,
    a:1
  });
})
```
##### '/api/home' 这里的/前面多加了.
出现了404错误
##### 在vue.config.js中localhost写错
出现500错误

### 有时候在下拉的时候出现白屏
插件BetterScroll要滚的话就要先计算section下的div高度，如果里面没有数据渲染，我们就无法得知div的高度
应该先渲染dom，再加载插件才对

### 搜索功能

#### 做搜索功能的时候，不知道怎么才能正常的跳转页面(路由配置)

查阅相关后，选择先在与Home、Cart等页面建立Search.vue，写上占位符(router-view)，再新建文件夹Search，index写搜索页面，list写搜索出来的结果...
路由方面，与Home等/search,他的其中一个子路由重定向为index页面，当我点击搜索时，触发this.$router.push({
  name:;list
,...}),从而进入页面，点击 **<** 时，this.$router.back()

#### 搜索头部输入框在不修改内容的时候重复点击搜索按钮，会出现报错
可以判断当前路径是否发生改变，如果没有则return出去

#### 第二次搜索的时候不起作用
给Search-list中添加一个监听属性，当路由发生改变的时候，重新请求数据
this.$route.query.key 

渲染搜索结果
前端：建立axios请求接口，并发送关键词，
后端：查询数据库,返回数据

forEach遍历一个数组的时候，
```js
let arr = [
    {name:'yung'},
    {name:'laing'},
    {name:'zhutou '},
]

arr.forEach((v,i) =>{
    console.log(i,v);
})
//0 { name: 'yung' }
// 1 { name: 'laing' }
// 2 { name: 'zhutou' }
```


搜索商品排序

#### 高亮箭头部分
currentIndex控制3个选项(综合、价格、销量)的高亮
status控制箭头样式是否为红，给销量和价格的status为0，当上箭头的status为1时高亮，status为2时，下箭头为高亮,
我们先存储点击时获取的index值，然后存储点击的选项
再重置status为0，通过判断index是否等于存储的index(必然相等)，来改变当前箭头的状态，

这里我们用到computed，computed依赖data里面的变量，如果变量发生改变，computed就会重新计算
数据的排序
在数据库中asc代表升序，desc代表降序
前端：拿到当前状态需要升序处理，并返回给后端除了key以外，还要有key:asc/desc
这里用了...this.orderBy对象解构
后端：  查询数据库，并返回数据对象



## 后端连接不知道是不是图片路径的问题
解决：下载一个集成环境wampserver



### 列表模块：

滑动插件要多加一个div包裹,因为滑动是两个板块间的运动，而不是一个大的板块和多个ul运动
Math.abs() 取绝对值

#### better-scroll的参数和方法
 * probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件

 * better-scroll默认取消click事件
	
	解决：
		new BetterScroll(this.$refs.left,{
			click:true
		});

  * better-scroll默认取消scroll事件

  解决：
	probeType：默认为0
	建议修改成：2|3

### 详情页模块： 

点击之后无法跳转
	解决：
		new BetterScroll(this.$refs.left,{
			click:true
		});

## 后端接口问题

### 查询数据库

```js
let sql = ...;//sql查询语句
connection.query(sql,function(error,results){
		res.send({
			code:0,
			data:results
		})
    // connection.end();
	})//将查询到的内容返回出去
```

### 直接把数据传去前端

```js
res.send({
 code:0,
 data:[
     {...},
     {...}
 ]
})
```

#### 优化问题

懒加载v-lazy

keep-alive

async、await

路由懒加载

数据库问题：
1、图片的路径问题
注意路径的标点符号
2、新增的数据无法获取
Field 'id' doesn't have a default value
id没有默认值，需要在设计表的时候设置id主动递增


页面不缓存，
```html
<keep-alive>
	<router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
```
在路由里添加meta：{ keepAlive: false }


购物车问题：
1、全选按钮在刷新页面的时候，会自动不全选或全选
·	原因：每次进入购物车都会发送请求，然后把购物车的数据中的id值push到select中，导致不全等或全等，
	解决：state.selectList = state.list.map(v => { return v.id; })
	利用map 返回新的数组
2、往购物车中添加重复的商品时，会创建一个新的goods_id同样的商品会出现2个或多个li
	原因：没有对goods_id进行查询
	解决：获取goods_id，如果没有该商品，就正常的进行添加，如果有该商品，就获取商品的数量每次添加该商品的时候对数据库中的商品进行数量的重置（商品数量加一）
3、在添加多个商品并进行删除后，返回首页会报错500
	原因：客户端发出一次请求，服务器给出两次及以上响应,
	在删除购物车数据的时候，使用了for循环
	```    
	for(let i=0;i<arrId.length;i++){
        connection.query(`delete from goods_cart where id = ${arrId[i]}`,function(error,results){
            res.send({
                data:{
                    code:200,
                    success:true,
                    msg:'删除成功'
                }
            })
        })
    }
	```
	导致多次的响应请求
	解决：应先处理好sql语句，再进行查询
	```
	let arrId = req.body.arrId;

	arrId = arrId.map(id=> `id = ${id}` )
	let delSql = `delete from goods_cart where ${arrId.join(' or ')}`
    
    connection.query(delSql,function(error,results){ ... }
	```

订单支付原理
1、点击去结算
	1.1生成一个订单，发送请求
	1.2后端生成订单，记录状态值为1，然后返回给前端一个订单号
	1.3跳转到提交订单的页面
未支付状态：1

2、点击提交订单
2.1发送请求
把订单号传给后端，后端进行订单状态的改变 ==》待支付，记录状态值为2
如果有数据返回就进行下一步
再发送一个请求：要去支付
后端返回一个URL（进入支付的页面）

3、支付成功或失败
后端支付成功会跳转一个页面

4、进入页面
前端在这个页面中请求一次，拿到后端给前端的数据 
数据（支付成功or失败）
根据订单状态进行判断


订单状态

未支付：1
待支付：2
支付成功：3
支付失败：0