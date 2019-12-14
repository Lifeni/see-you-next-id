<template>
    <div id="app">
        <div id="header">
            下个 ID 见
            <!-- <span class="dev">开发版</span> -->
            <button class="menu" @click="showSideBar()" :class="{'menu-open':showSideBarFlag}"></button>
            <span class="login-info" v-show="isLogin==0">未登录</span>
            <span class="login-info" v-show="isLogin==1">#{{userId}}</span>
            <span class="login-info" v-show="isLogin==-1">已注销</span>
        </div>
        <div id="content">
            <div id="left">
                <div id="NavBar">
                    <router-link class="features" to="/talk" id="features-talk">💬 发言</router-link>
                    <router-link class="features" to="/timeline" id="features-timeline">🕗 时间线</router-link>
                    <router-link class="features" to="/hot" id="features-hot">🔥 热门</router-link>
                </div>
                <router-view name="MainContent"></router-view>
            </div>
            <div id="right" v-show="screenWidth>768||showSideBarFlag">
                <router-view name="SideBar"></router-view>
            </div>
        </div>
        <div id="footer">
            <span class="footer-text">本网站仅供演示。</span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "App",
    data() {
        return {
            screenWidth: document.body.clientWidth,
            showSideBarFlag: 0
        };
    },
    methods: {
        getInfo() {
            this.$http({
                // $http 在 main.js 文件里用实例属性进行替换
                url: "https://api.lifeni.top/info",
                method: "get"
            })
                .then(response => {
                    this.$store.state.info = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        showSideBar() {
            this.showSideBarFlag = !this.showSideBarFlag;
        }
    },
    computed: mapState(["isLogin", "userId"]),
    mounted() {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        };
    },
    beforeMount() {
        this.getInfo();
    }
};
</script>

<style>
* {
    box-sizing: border-box;
    transition: all 0.4s;
}

body {
    margin: 0;
    overflow-y: scroll;
    font-family: 'Noto Serif SC','思源宋体 CN','Source Han Serif SC',sans-serif;
    font-style: normal;
    font-weight: 400;
}

button {
    font-family: 'Noto Serif SC','思源宋体 CN','Source Han Serif SC',sans-serif;
}

button:hover {
    background-color: rgba(224, 224, 224, 1);
}

#app {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(245, 245, 245, 1);
}

#header {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: black;
    box-shadow: 0 0 16px rgba(224, 224, 224, 1);
    background-color: white;
    font-size: 20px;

    font-weight: bold;
}

.dev {
    width: 52px;
    height: 24px;
    margin: 8px;
    padding: 4px 8px;
    border-radius: 2px;
    background-color: rgba(245, 245, 245, 1);
    font-size: 12px;

    font-weight: normal;
    text-align: center;
}

.menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    display: none;
    border: none;
    background-color: transparent;
    background-image: url("../static/menu.svg");
    background-position: center;
    background-size: 24px;
    background-repeat: no-repeat;
}

.menu-open {
    background-image: url("../static/close.svg");
}

.menu:hover {
    background-color: rgba(189, 189, 189, 1);
}

.login-info {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
    height: 64px;
    padding: 16px 24px;
    display: none;
    font-size: 16px;

}

#content {
    position: relative;
    width: 95%;
    height: auto;
    max-width: 800px;
    margin: 12px;
    padding: 0 0 64px 0;
    display: flex;
    flex-direction: row;
}

#left {
    position: relative;
    width: 72%;
    height: 100%;
    margin: 0 6px;
}

#NavBar {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 40px;
    margin: 12px 0;
    padding: 0 12px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
    overflow: auto hidden;
    white-space: nowrap;
}

.features {
    height: 48px;
    margin: 0 auto;
    padding: 4px 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border: none;
    border-radius: 0;
    text-align: center;
    font-size: 16px;

    font-weight: bold;
    color: black;
    background-color: white;
    cursor: pointer;
    text-decoration: none;
}

.features:hover {
    background-color: rgba(245, 245, 245, 1);
}

.router-link-active#features-talk {
    background-image: linear-gradient(
        60deg,
        rgba(165, 214, 167, 1),
        rgba(129, 199, 132, 1) 40%,
        rgba(102, 187, 106, 1) 70%
    );
}

.router-link-active#features-timeline {
    background-image: linear-gradient(
        60deg,
        rgba(129, 212, 250, 1),
        rgba(79, 195, 247, 1) 40%,
        rgba(41, 182, 246, 1) 70%
    );
}

.router-link-active#features-hot {
    background-image: linear-gradient(
        60deg,
        rgba(239, 154, 154, 1),
        rgba(229, 115, 115, 1) 40%,
        rgba(239, 83, 80, 1) 70%
    );
}

.router-link-active {
    padding: 4px 24px;
    animation: opacity-show 0.4s;
}

#right {
    position: relative;
    width: 28%;
    height: 100%;
    margin: 0 6px;
}

#footer {
    position: absolute;
    bottom: 16px;
    left: 0;
    width: 100%;
    height: auto;
    display: flex;
    padding: 16px 36px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: rgba(189, 189, 189, 1);
    font-size: 14px;

}

.footer-text {
    margin: 2px;
    text-decoration: none;
    color: rgba(119, 136, 153);
}

.blur {
    filter: blur(5px);
}

@keyframes opacity-show {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (max-width: 768px) {
    #content {
        width: 96%;
        flex-direction: column-reverse;
        padding: 0 0 84px 0;
    }

    #left {
        width: 96%;
    }

    #NavBar {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #right {
        width: 96%;
    }

    .menu,
    .login-info {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
