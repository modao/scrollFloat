/**
 * @fileoverview 
 * @author mohen<yongxin.myx@alibaba-inc.com>
 * @module scrollFloat
 **/
KISSY.add('gallery/scrollFloat/1.0/index', function (S, Base) {
    var S=KISSY, Event=S.Event, DOM=S.DOM;
    /**
     * 
     * @class ScrollFloat
     * @constructor
     * @extends Base
     */
    function ScrollFloat(comConfig) {
        var self = this;
        //调用父类构造函数
        ScrollFloat.superclass.constructor.call(self, comConfig);
    }
    S.extend(ScrollFloat, Base, /** @lends ScrollFloat.prototype*/{
        /*
        *@smoothWheelScroll方法：为页面添加鼠标的平滑滚动
        *@speed：滚动的速度设置，其值为1——3之间，最好取1、2、3这样的整数或者小数点后一位的数字
        *@Note: 调用方法scrollFloat.smoothWheelScroll(...);
        */
        smoothWheelScroll: function(speed){
            if(!S.isNumber(speed) && (speed>=1 && speed<=3)){
                S.log('smoothScroll方法的参数必须为数字！！！');
                return null;
            }
            var scrollAnim;
            var scrollTimes = 1;
            var _scrollable = /webkit/i.test(navigator.userAgent) || document.compatMode == 'BackCompat' ? document.body : document.documentElement;
            Event.on(document, 'mousewheel', function(ev){
                //平滑滚动
                ev.halt();
                if(scrollAnim){
                    scrollAnim.stop();
                    scrollTimes++;
                    scrollTimes = scrollTimes > speed ? speed : scrollTimes; //限制速度
                }
                scrollAnim = S.Anim(_scrollable,{scrollTop: DOM.scrollTop() - scrollTimes * 100 * ev.deltaY}, 0.5, 'easeOut', function(){
                    scrollAnim = undefined;
                    scrollTimes = 1;
                }).run();
            });
        },
        /*
        *@smoothKeydownScroll方法：为页面添加键盘上下键的平滑滚动
        *@speed：滚动的速度设置，其值为1——3之间，最好取1、2、3这样的整数或者小数点后一位的数字
        *@Note:调用方法 scrollFloat.smoothKeydownScroll(...);
        */
        smoothKeydownScroll: function(speed){
            if(!S.isNumber(speed) && (speed>=1 && speed<=3)){
                S.log('smoothScroll方法的参数必须为数字！！！');
                return null;
            }
            var scrollAnim;
            var scrollTimes = 1;
            var _scrollable = /webkit/i.test(navigator.userAgent) || document.compatMode == 'BackCompat' ? document.body : document.documentElement;

            Event.on(document, 'keydown', function(ev){
                //平滑滚动
                if(ev.which==38){
                    ev.halt();
                    if(scrollAnim){
                        scrollAnim.stop();
                        scrollTimes++;
                        scrollTimes = scrollTimes > speed ? speed : scrollTimes; //限制速度
                    }
                    scrollAnim = S.Anim(_scrollable,{scrollTop: DOM.scrollTop() - scrollTimes * 100}, 0.5, 'easeOut', function(){
                        scrollAnim = undefined;
                        scrollTimes = 1;
                    }).run();
                }

                if(ev.which==40){
                    ev.halt();
                    if(scrollAnim){
                        scrollAnim.stop();
                        scrollTimes++;
                        scrollTimes = scrollTimes > speed ? speed : scrollTimes; //限制速度
                    }
                    scrollAnim = S.Anim(_scrollable,{scrollTop: DOM.scrollTop() + scrollTimes * 100}, 0.5, 'easeOut', function(){
                        scrollAnim = undefined;
                        scrollTimes = 1;
                    }).run();
                }
            });
        },

        /*
        *@scrollHover方法：为页面上某元素指定在某scroll范围内固定在页面上
        *@elem：需要做滚动悬停处理的元素选择器
        *@config：悬停处理的配置对象，其中包含两个参数start_scroll与end_scroll
        *@start_scroll: 开始悬停的scroll位置
        *@end_scroll：终止悬停的scroll位置
        * config={
            start_scroll: 100,
            end_scroll: 1000
        }
        *调用方法：scrollFloat.scrollHover('.elem', {
            start_scroll: 300,
            end_scroll: 800
        });
        */

        scrollHover: function(elem, config){
            var obj_list=['start_scroll', 'end_scroll'], index, input_data, initial_top;
            var AllSets=[];
            if(!S.isString(elem)){
                S.log('elem选择器必须是字符串类型！！！');
                return null;
            }
            if(!S.isObject(config)){
                S.log('config应该是一个对象！！！');
                for(index=0; index<obj_list.length; index++){
                    if(!config.hasOwnProperty(obj_list[index])){
                        S.log('config中必须包含'+obj_list[index]+'!!!');
                        return null;
                    }
                }
            }


            initial_top=parseInt(DOM.css(elem, 'top').substring(0, DOM.css(elem, 'top').indexOf('p')));
            input_data={};
            input_data.elem=elem;
            input_data.initial_top=initial_top;
            input_data.config=config;
            AllSets.push(input_data);

            Event.on(window, 'scroll', function(ev){
                var scrollTop=DOM.scrollTop(window);
                var count;
                for(count=0; count<AllSets.length; count++){
                    if(scrollTop>=0 && scrollTop<AllSets[count].config.start_scroll){
                        DOM.css(AllSets[count].elem, {'position': 'absolute', 'top': AllSets[count].initial_top+'px'});
                    }else if(scrollTop>=AllSets[count].config.start_scroll && scrollTop<AllSets[count].config.end_scroll){
                        if(S.UA.ie && S.UA.ie<7){
                            //对于IE6，添加下面的CSS以使其能够模拟position：fixed的效果
                            DOM.css(AllSets[count].elem, {'position': 'absolute', 'top': (AllSets[count].initial_top-AllSets[count].config.start_scroll+scrollTop)+'px'});
                        }else{
                            DOM.css(AllSets[count].elem, {'position': 'fixed', 'top': (DOM.offset(AllSets[count].elem).top-scrollTop)+'px'});
                        }

                    }else{
                        DOM.css(AllSets[count].elem, {'position': 'absolute', 'top': (AllSets[count].initial_top+(AllSets[count].config.end_scroll-AllSets[count].config.start_scroll))+'px'});
                    }
                }
            });

        }
    });
    return ScrollFloat;
}, {requires:[ 'base']});
