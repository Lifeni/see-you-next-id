<template>
    <div id="SideBar">
        <div class="info">
            <h1>介绍</h1>
            <p>这是进行发言的地方，发表的言论不能删除和修改，所以请对你自己的言论负责。</p>
            <p>当然，仅供演示。</p>
        </div>
        <div class="guide">
            <h1>使用指导</h1>
            <p>1. 选择要发送的节点。</p>
            <p>2. 输入你的标题。</p>
            <p>3. 输入具体的内容，如果你的事能在标题里讲完，那就不必写内容。</p>
            <p>4. 建议在三行以内写完你的内容，不要问为什么。</p>
        </div>
        <div class="love" v-show="0">Made with ❤ in Harbin.</div>
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
