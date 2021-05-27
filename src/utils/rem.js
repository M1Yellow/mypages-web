import GlobalConstant from "@/constant/GlobalConstant";

(function () {
    // 基准大小
    const defaultSize = 16; // 32
    const baseSize = 16; // 32
    function setRem() {
        // 当前页面宽度相对于原始页面宽度的缩放比例，可根据自己需要修改。
        const scale = document.documentElement.clientWidth / GlobalConstant.MAIN_CONTENT_WIDTH; // 375 750 800
        if (process.env.VUE_APP_ENV !== "prod") {
            console.log(">>>> clientWidth:", document.documentElement.clientWidth);
            console.log(">>>> scale:", scale);
        }

        // 设置页面根节点字体大小
        if (GlobalConstant.isShowH5()) {
            //document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
            document.documentElement.style.fontSize = baseSize * GlobalConstant.FINAL_ADJUST_SCALE + "px";
        } else {
            document.documentElement.style.fontSize = defaultSize + "px";
        }
    }

    // window.addEventListener('resize', setRem);
    window.onresize = function () {
        setRem();
    };
    // 一进入页面就触发自适应
    setRem();

})();
