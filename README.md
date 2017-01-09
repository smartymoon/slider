# slider
模仿imooc课程实现slider

![_20170106222859](https://cloud.githubusercontent.com/assets/12489528/21720902/b168ef24-d460-11e6-9857-d82ed1153b3d.png)

这是一个网页中常用的轮播图插件，特点有
* 原生Javascript书写，不依赖第三方库
* 可以在同一个页面中使用多个该轮播插件
* 轮播图的宽高随意设定
* 无限循环

### 存在问题

* 偶而出现空白页

### TODO
*  适配移动端
### 使用方法

1. 在html文档引入相关文件

```
  <link rel="stylesheet" href="smartySlider.css">
	<link rel="stylesheet" href="./css/font-awesome.min.css">
	<script src="smartySlider.js"></script>
```
2. 在文档中需要的位置插入以下标签

```
	<div class="slider-container">
		<ul class="slider-list" style="left:0px">
			<li class="slider-item"><a href=""><img src="./images/banner_1.png" alt=""></a></li>
			<li class="slider-item"><a href=""><img src="./images/banner_2.png" alt=""></a></li>
			<li class="slider-item"><a href=""><img src="./images/banner_3.png" alt=""></a></li>
			<li class="slider-item"><a href=""><img src="./images/banner_4.png" alt=""></a></li>
		</ul>
	</div>
```
