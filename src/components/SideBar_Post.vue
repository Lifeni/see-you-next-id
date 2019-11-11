<template>
    <div id="SideBar">
        <div class="user">
            <!-- <button class="login-github">使用 Github 登录</button> -->
            <button class="login-unknown">💀 使用匿名身份登录</button>
        </div>
        <div class="info">
            <h1>介绍</h1>
            <p>下个 ID 见！这是一个论坛项目。</p>
            <p>
                有关这个项目的更多信息可以去
                <a
                    href="https://github.com/Lifeni/see-you-next-id"
                    class="link"
                    target="_blank"
                >🔗 Github</a> 查看。
            </p>
            <p>本网站仅供演示，目前不会记录或储存任何数据。</p>
        </div>
        <div class="guide">
            <h1>使用指导</h1>
            <p>1. 使用现代浏览器以获得最佳体验。</p>
            <p>2. 切换不同节点浏览相应内容或者进行发言。</p>
            <p>3. 对每条发言进行回应或者使用 Emoji 表态。</p>
            <p>4. 默认每条发言的内容最多显示 3 行，可以点击以查看全部。</p>
        </div>
        <div class="love">Made with ❤ in Harbin.</div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {
            welcome: "初次见面",
            username: "没错是你卡了"
        };
    }
};
</script>

<style scoped src="../../static/sidebar.css"></style>