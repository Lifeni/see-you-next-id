<template>
    <div id="app">
        <div id="header">下个 ID 见
            <span class="dev">开发版</span>
        </div>
        <div id="content">
            <div id="left">
                <router-view name="NavBar"></router-view>
                <router-view name="TalkBox"></router-view>
                <router-view name="PostList"></router-view>
            </div>
            <div id="right">
                <router-view name="SideBar"></router-view>
            </div>
        </div>
        <div id="footer">网页内容均复制自 V2EX，仅供演示，如有侵权请告知。</div>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
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
    box-shadow: 0 0 16px rgba(224,224,224 ,1);
    background-color: white;
    font-size: 20px;
    font-family: 'Noto Serif SC', serif;
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
    font-family: 'Noto Serif SC', serif;
    text-align: center;
}

#content {
    position: relative;
    width: 90%;
    height: auto;
    max-width: 800px;
    margin: 12px;
    display: flex;
    flex-direction: row;
}

#left {
    position: relative;
    width: 75%;
    height: 100%;
    margin: 0 6px;
}

#right {
    position: relative;
    width: 25%;
    height: 100%;
    margin: 0 6px;
}

#footer {
    position: relative;
    bottom: 12px;
    left: 0;
    width: 100%;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: rgba(189,189,189 ,1);
    font-size: 14px;
    font-family: 'Noto Serif SC', serif;
}
</style>
