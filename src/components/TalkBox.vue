<template>
    <div id="TalkBox">
        <textarea name="input-title" class="input-box-title" cols="30" rows="1" placeholder="标题"></textarea>
        <textarea
            name="input-content"
            class="input-box-content"
            cols="30"
            rows="3"
            placeholder="内容"
        ></textarea>
        <div class="talk-tips">请友善发言，不合适的言论将会被删除。</div>
        <button class="send-talk">发送</button>
    </div>
</template>

<script>
export default {
    name: "TalkBox",
    data() {
        return {};
    }
};
</script>

<style scoped>
#TalkBox {
    position: relative;
    width: 100%;
    margin: 12px 0;
    padding: 8px 12px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
}

.input-box-title,
.input-box-content {
    width: 100%;
    margin: 4px 0;
    padding: 8px 12px;
    border: 2px solid rgba(245, 245, 245, 1);
    border-radius: 2px;
    background-color: white;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
}


.talk-tips {
    margin: 4px 0;
    padding: 6px 8px;
    display: inline-block;
    font-size: 14px;
    font-family: "Noto Serif SC", serif;
    color: rgba(117, 117, 117, 1);
}

.send-talk {
    position: absolute;
    bottom: 8px;
    right: 12px;
    margin: 4px 0;
    padding: 4px 8px;
    border: none;
    border-radius: 2px;
    background-color: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
    cursor: pointer;
}

</style>