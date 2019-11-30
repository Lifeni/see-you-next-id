<template>
    <div id="SideBar">
        <div class="user-login" v-if="isLogin === 0" @click="getId()">
            <button class="login-unknown">💀 使用匿名身份登录</button>
        </div>
        <div class="user-logged" v-if="isLogin === 1">
            <div class="welcome">初次见面</div>
            <div class="user-name">匿名用户#{{userId}}</div>
            <button class="logout" @click="exitId()">关闭账号</button>
        </div>
        <div class="user-logout" v-if="isLogin === -1">
            <div class="logout-tips">你号没了</div>
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
        <div class="love" v-show="0">Made with ❤ in Harbin.</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "SideBar",
    data() {
        return {};
    },
    methods: {
        getId() {
            this.$store.commit("login");
            this.$http({
                url: "https://api.lifeni.top/id",
                method: "get"
            })
                .then(response => {
                    this.$store.commit("setUserId", response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        exitId() {
            this.$store.commit("logout");
        }
    },
    computed: mapState(["isLogin", "userId"])
};
</script>

<style scoped src="../../static/sidebar.css"></style>