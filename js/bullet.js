const bullets = [
    "前方高能",
    "原来如此",
    "这么简单",
    "学到了",
    "学费了",
    "666666",
    "111111",
    "workerman",
    "学习了",
    "别走，奋斗到天明",
];

/**
 * @description 根据 bulletConfig 配置在 videoEle 元素最右边生成弹幕，并移动到最左边，弹幕最后消失
 * @param {Object} bulletConfig 弹幕配置
 * @param {Element} videoEle 视频元素
 * @param {boolean} isCreate 是否为新增发送的弹幕，为 true 表示为新增的弹幕
 *
 */


function renderBullet(bulletConfig, videoEle, isCreate = false) {
    const spanEle = document.createElement("SPAN");
    spanEle.classList.add(`bullet${index}`);
    if (isCreate) {
        spanEle.classList.add("create-bullet");
    }
    // TODO：控制弹幕的显示颜色和移动，每隔 bulletConfig.time 时间，弹幕移动的距离  bulletConfig.speed
    // 将弹幕内容添加到 span 元素中
    spanEle.innerHTML = `${bulletConfig.value}`;
    // 显示弹幕
    spanEle.style.display = "block";
    // 获取视频元素的宽⾼
    let { width: vWidth, height: vHeight } = getEleStyle(videoEle);
    spanEle.style.left = vWidth + "px";
    spanEle.style.top = getRandomNum(vHeight) + "px";
    // 将弹幕元素添加到视频元素中
    videoEle.appendChild(spanEle);
    let timer = setInterval(() => {
        spanEle.style.left = parseInt(spanEle.style.left) - bulletConfig.speed + "px";
        if (parseInt(spanEle.style.left) <= -64) {
            if (spanEle) {
                videoEle.removeChild(spanEle);
            }
            clearInterval(timer);
        }
    }, bulletConfig.time);
}

document.querySelector("input").addEventListener("keydown", (e) => {
    // TODO:点击发送按钮，输入框中的文字出现在弹幕中
    // 从输⼊框中获取弹幕内容
    if (e.key === 'ENTER') {
        let val = document.querySelector("input").value;
        // 使⽤ renderBullet() 函数渲染弹幕
        renderBullet(
            {
                ...bulletConfig, // 使⽤扩展运算符合并弹幕配置信息
                isCreate: true, // 设置为创建新的弹幕
                value: val, // 覆盖原来的弹幕内容
            },
            videoEle, // 视频元素
            true // 是否创建新的弹幕
        );
    }
});

function getEleStyle(ele) {
    // 获得元素的width,height,left,right,top,bottom
    return ele.getBoundingClientRect();
}

function getRandomNum(end, start = 0) {
    // 获得随机数，范围是 从start到 end
    return Math.floor(start + Math.random() * (end - start + 1));
}

// 设置 index 是为了弹幕数组循环滚动
let index = 0;
const videoEle = document.querySelector(".bullet");
// 弹幕配置
const bulletConfig = {
    isHide: false, // 是否隐藏
    speed: 5, // 弹幕的移动距离
    time: 50, // 弹幕每隔多少ms移动一次
    value: "", // 弹幕的内容
};
let isPlay = false;
let timer; // 保存定时器
// 监听视频播放事件，当视频播放时，每隔 1000s 加载一条弹幕
isPlay = true;
bulletConfig.value = bullets[index++];
renderBullet(bulletConfig, videoEle);
timer = setInterval(() => {
    bulletConfig.value = bullets[index++];
    renderBullet(bulletConfig, videoEle);
    if (index >= bullets.length) {
        index = 0;
    }
}, 1000);

