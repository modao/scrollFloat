## 综述

当前版本：1.1
作者：莫痕<yongxin.myx@alibaba-inc.com>
scrollFloat是一个处理页面滚动时元素需要在页面的特定范围内悬停效果的gallery组件，可以用于任何当页面中元素在某一段滚动范围内需要悬停的场景中。
该组件支持包括IE6在内的所有主流浏览器（由于IE6的性能问题，IE6下面元素会有抖动现象，这是一个缺憾）使用方便。支持kissy1.3.0+。
注意：该组件只能用于使用absolute绝对定位的元素！！！

## 快速使用示例
### 初始化组件

    S.use('gallery/scrollFloat/1.1/index', function (S, ScrollFloat) {
         var scrollFloat = new ScrollFloat();
    });

### 使用示例
    S.use('gallery/scrollFloat/1.1/index', function (S, ScrollFloat) {
        var scrollFloat = new ScrollFloat();
        scrollFloat.smoothWheelScroll(1.5);
        scrollFloat.smoothKeydownScroll(1.5);
        scrollFloat.scrollHover('#J_move1', {
            start_scroll: 200,
            end_scroll: 600
        });
    }

## Demo
* demo：[http://gallery.kissyui.com/scrollFloat/1.1/demo/index.html](http://gallery.kissyui.com/scrollFloat/1.1/demo/index.html)


## API说明

smoothWheelScroll(speed)
该方法为鼠标的滚轮事件添加平滑处理，一般在滚动视觉动画中均需要先做该平滑处理。
需要传入一个滚动速度的参数，其取值要求在1到3之间（包含1和3），取值最好为1、1.5、2、2.5和3。取值越大滚动速度越快。

smoothKeydownScroll (speed)
该方法为键盘的上下按键添加平滑处理，一般在滚动视觉动画中均需要先做该平滑处理。
需要传入一个滚动速度的参数，其取值要求在1到3之间（包含1和3），取值最好为1、1.5、2、2.5和3。取值越大滚动速度越快。

scrollHover(elem, config)：为页面上某元素指定在某scroll范围内固定在页面上。
其参数为：
1、elem：需要做滚动悬停处理的元素选择器。
2、config：悬停处理的配置对象，其中包含两个参数start_scroll与end_scroll，其中start_scroll为开始悬停的scroll位置，end_scroll为终止悬停的scroll位置。
