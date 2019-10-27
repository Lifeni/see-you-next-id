<template>
    <div id="SideBar">
        <div class="user">
            <div class="welcome">欢迎回来，</div>
            <div class="user-name">{{username}}</div>
        </div>
        <div class="info">
            下个 ID 见！一个论坛项目。有关这个项目的更多信息可以去
            <a
                href="https://github.com/Lifeni/see-you-next-id"
                class="link"
                target="_blank"
            >🔗 Github</a> 查看。
        </div>
    </div>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {
            username: "没错是你卡了"
        };
    }
};
</script>

<style scoped>
#SideBar {
    position: relative;
    width: 100%;
    height: auto;
}

.user {
    width: 100%;
    height: auto;
    margin: 12px 0;
    padding: 12px 16px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
}

.welcome {
    margin: 4px 0;
    font-size: 14px;
    font-family: 'Noto Serif SC', serif;
}

.user-name {
    width: 100%;
    margin: 4px 0;
    font-size: 24px;
    font-family: 'Noto Serif SC', serif;
    overflow-wrap: break-word;
}

.info {
    width: 100%;
    height: auto;
    margin: 12px 0;
    padding: 16px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
    font-size: 16px;
    font-family: 'Noto Serif SC', serif;
}

.link {
    color: black;
    border-bottom: 1px solid transparent;
    text-decoration: none;
}

.link:hover {
    border-bottom: 1px solid black;
}
</style>