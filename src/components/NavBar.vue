<template>
    <div id="NavBar">
        <button class="node current-node">🕗 时间线</button>
        <button class="node">🔥 热门</button>
        <button class="talk">💬 发言</button>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {};
    }
};
</script>

<style scoped>
#NavBar {
    position: relative;
    width: 100%;
    height: 40px;
    margin: 12px 0;
    padding: 0 8px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
}

.node {
    height: 40px;
    margin: 0 4px;
    padding: 4px 12px;
    border: none;
    border-radius: 0;
    text-align: center;
    font-size: 16px;
    font-family: 'Noto Serif SC', serif;
    color: black;
    background-color: white;
    transition: all 0.4s;
    cursor: pointer;
}

.node:hover {
    background-color: rgba(238, 238, 238, 1);
}

.current-node {
    color: white;
    background-color: black !important;
}

.talk {
    position: absolute;
    top: 0;
    right: 8px;
    height: 40px;
    margin: 0 4px;
    padding: 4px 12px;
    border: none;
    border-radius: 0;
    text-align: center;
    font-size: 16px;
    font-family: 'Noto Serif SC', serif;
    color: black;
    background-color: white;
    transition: all 0.4s;
    cursor: pointer;
}

.talk:hover {
    background-color: rgba(238, 238, 238, 1);
}
</style>
