// 滚动导航栏
/* 方法是1.0初始版本，多少存在些问题，后续再逐渐优化，实际工作也是如此，不可能有那么多时间让你一个劲地优化 */

/**
 * 滚动监听
 * ps：基本数据类型为值传递（原始值不改变），封装对象类型为引用传递（原始对象中的值能被改变）
 * @param contents 内容元素数组
 * @param navElem 导航栏元素
 * @param menuItem 导航栏里面的菜单
 */
export function onScroll(contents, navElem, menuItem) {
    // 获取所有锚点元素
    //const navContents = document.querySelectorAll('.content div');
    // 所有锚点元素的 offsetTop，即元素距离浏览器窗口顶部的距离，单位为像素
    const offsetTopArr = []; // 常量本身引用地址不可改变，其中内容可以改变
    contents.forEach(item => {
        offsetTopArr.push(item.offsetTop);
    });
    //console.log(offsetTopArr);
    //console.log("offsetTopArr.length=" + offsetTopArr.length);
    // 获取当前文档流的 scrollTop，+40 是为了提前定位锚点位置
    const scrollTop = document.documentElement.scrollTop + 40 || document.body.scrollTop + 40;
    //console.log("scrollTop=" + scrollTop);
    // 定义当前点亮的导航下标
    let navIndex = 0;
    let count = 0;
    //let nav = document.getElementById('nav');
    for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
            navIndex = n;
            if (navIndex >= 8) count++;
        }
    }
    //当前active菜单赋值
    //this.active = navIndex;
    // 滚动到一定位置 将菜单整体向上移  确保能看的到更多的菜单
    if (navIndex >= 8) {
        // 获取菜单的高度
        //const menuItemHeight = document.querySelector(`.menu li:nth-child(1)`).offsetHeight;
        const menuItemHeight = menuItem.offsetHeight;
        //console.log("menuItemHeight=" + menuItemHeight);
        navElem.style.top = -menuItemHeight * count + 'px';
    } else {
        navElem.style.top = 10 + 'px';
    }

    // 判断滚动条是否到底部
    // 获取滚动条在Y轴上的滚动距离
    //let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 获取可视区域的高度
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // 获取内容的总高度
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if(scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight) {
        navIndex = offsetTopArr.length - 1;
    }

    // 返回当前 active 菜单下标
    return navIndex;
}

/**
 * 跳转到指定元素
 * @param elem 元素
 */
export function scrollTo(elem) {
    // 获取目标的 offsetTop
    // css选择器是从 1 开始计数，index 下标是从 0 开始，所以要 +1
    //const targetOffsetTop = document.querySelector(`.content div:nth-child(${index + 1})`).offsetTop;
    const targetOffsetTop = elem.offsetTop - 10; // margin 的距离不算
    // 获取当前 offsetTop
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
    const STEP = 70;
    // 判断是往下滑还是往上滑
    if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp();
    } else {
        // 往下滑
        smoothDown();
    }

    // 定义往下滑函数
    function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
                scrollTop += STEP;
            } else {
                scrollTop = targetOffsetTop;
            }
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            requestAnimationFrame(smoothDown);
        }
    }

    // 定义往上滑函数
    function smoothUp() {
        if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
                scrollTop -= STEP;
            } else {
                scrollTop = targetOffsetTop;
            }
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            requestAnimationFrame(smoothUp);
        }
    }
}
