<template>
    <div id="TalkBox">
        <form>
            <span class="select-tips">选择一个节点：</span>
            <select name="node" id="select" class="select-node" v-model="talkNode">
                <option :value="node.key" v-for="node in inputNode" :key="node.id">{{node.name}}</option>
            </select>
            <textarea
                name="title"
                class="input-box-title"
                cols="30"
                rows="1"
                placeholder="标题"
                required
                v-model="talkTitle"
            ></textarea>
            <textarea
                name="content"
                class="input-box-content"
                cols="30"
                rows="6"
                placeholder="内容"
                v-model="talkContent"
            ></textarea>
            <div class="talk-tips">请友善发言，不合适的言论将会被删除。</div>
            <button type="button" class="send-talk" @click="submitTalk()">{{sendInfo}}</button>
        </form>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "TalkBox",
    data() {
        return {
            inputNode: [],
            talkNode: "",
            talkTitle: "",
            talkContent: "",
            sendInfo: "发送"
        };
    },
    methods: {
        getInputNode() {
            setTimeout(() => {
                this.inputNode = this.$store.state.info.node.filter(
                    node => node.id > 0
                );
            }, 500);
        },
        submitTalk() {
            if (this.isLogin != 1) {
                alert("未登录");
                return;
            }
            if (this.sendInfo == "发送成功") {
                alert("请勿重复发送");
                return;
            }
            if (this.talkNode == "") {
                alert("请选择节点");
                return;
            }
            if (this.talkTitle.length < 5) {
                alert("标题应不少于五个字");
                return;
            }

            this.$http({
                url: "https://api.lifeni.top/talk",
                method: "post",
                data: {
                    user: this.userId,
                    node: this.talkNode,
                    title: this.talkTitle,
                    content: this.talkContent
                }
            })
                .then(response => {
                    if (response.data == "ok") {
                        this.sendInfo = "发送成功";
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    computed: mapState(["isLogin", "userId"]),
    mounted() {
        setTimeout(() => {
            this.getInputNode();
        }, 100);
    }
};
</script>

<style>
#TalkBox {
    position: relative;
    width: 100%;
    margin: 12px 0;
    padding: 8px 12px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
    animation: opacity-show 0.4s;
    overflow: hidden;
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
    resize: none;
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

.select-tips {
    margin: 8px 0;
    padding: 6px 8px;
    display: inline-block;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
}

.select-node {
    margin: 4px 0;
    padding: 4px 8px;
    border: 2px solid rgba(245, 245, 245, 1);
    border-radius: 2px;
    background-color: white;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
    animation: opacity-show 0.4s;
}
</style>