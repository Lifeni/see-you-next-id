<template>
    <div id="PostList">
        <div class="node-bar">
            <button
                class="node"
                v-for="(node, nodeIndex) in info.node"
                :key="node.id"
                :class="{'current-node':currentNode == node.id}"
                @click="showNodeContent(nodeIndex)"
                @mouseover="showNodeDescription(nodeIndex)"
                @mouseout="initNodeDescription()"
            >{{node.name}}</button>
            <div class="description">> {{this.currentNodeDescription}}</div>
        </div>
        <div class="post" v-for="(post, index) in posts" :key="post.id">
            <div class="title">[示例] {{post.title}}</div>
            <div class="post-author">匿名用户#{{post.author}}</div>
            <div class="post-date">{{post.date}}</div>
            <div class="reply-count">{{post.reply.length + " 条回应"}}</div>
            <div class="post-content" v-html="post.content" @click="expandPost(index)"></div>
            <button
                class="show-reply"
                @click="showReply(index)"
            >{{showReplyFlag[index]?'收起':'查看'}}回应</button>
            <button class="get-emoji" @click="showAddEmoji(index)">+ Emoji</button>
            <div
                class="emoji"
                v-for="emoji in info.emoji"
                :key="emoji.id"
                v-show="post.emoji[emoji.id].count"
            >
                {{emoji.code}} ×
                <span class="emoji-count">{{post.emoji[emoji.id].count}}</span>
            </div>
            <div class="emoji-box" v-if="showAddEmojiFlag[index]">
                <button
                    class="add-emoji"
                    v-for="emoji in info.emoji"
                    :key="emoji.id"
                    @click="addEmoji(index,emoji.id)"
                >{{emoji.code}}</button>
            </div>
            <div class="replies" v-if="showReplyFlag[index]">
                <div class="reply" v-for="reply in post.reply" :key="reply.id">
                    <div class="reply-author">匿名用户#{{reply.author}}</div>
                    <div class="reply-date">{{reply.date}}</div>
                    <div class="reply-content">{{reply.content}}</div>
                </div>
                <div class="reply-text">
                    <form>
                        <textarea
                            name="reply"
                            class="input-box"
                            cols="50"
                            rows="2"
                            required
                            placeholder="你的回应："
                            v-model="replyContent[index]"
                        ></textarea>
                        <div class="reply-tips">请友善发言，不合适的言论将会被删除。</div>
                        <button
                            class="send-reply"
                            type="button"
                            @click="submitReply(index,post)"
                        >回应{{sendInfo[index]}}</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="post-default" v-if="!this.posts.length">这里没有内容。</div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { all } from "q";

export default {
    name: "PostList",
    data() {
        return {
            posts: [],
            showReplyFlag: [],
            showAddEmojiFlag: [],
            currentNode: 0,
            currentNodeDescription: "按照时间顺序展示，最新发布的在最上面。",
            sendInfo: [],
            replyContent: []
        };
    },
    methods: {
        getPost() {
            this.$http({
                // $http 在 main.js 文件里用实例属性进行替换
                url: "https://api.lifeni.top/post",
                method: "get",
                params: {
                    node: "all"
                }
            })
                .then(response => {
                    this.posts = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        expandPost(index) {
            this.$el.children[index + 1]
                .getElementsByClassName("post-content")[0]
                .classList.add("expand");
        },
        showReply(index) {
            // 这样写是因为 Vue 在改变数组后不会改变 DOM
            this.$set(this.showReplyFlag, index, !this.showReplyFlag[index]);
        },
        showAddEmoji(index) {
            this.$set(
                this.showAddEmojiFlag,
                index,
                !this.showAddEmojiFlag[index]
            );
        },
        addEmoji(postId, emojiId) {
            let temp = this.$el.children[postId + 1]
                .getElementsByClassName("emoji")
                [emojiId].classList.contains("emoji-selected")
                ? -1
                : 1;

            if (this.isLogin != 1) {
                alert("未登录");
                return;
            }
            this.$http({
                url: "https://api.lifeni.top/emoji",
                method: "post",
                data: {
                    user: this.userId,
                    postId: this.posts[postId].id,
                    emojiId: emojiId,
                    value: temp
                }
            })
                .then(response => {
                    this.posts[postId].emoji[emojiId].count += temp;
                    console.log(temp);

                    this.$el.children[postId + 1]
                        .getElementsByClassName("emoji")
                        [emojiId].classList.toggle("emoji-selected");
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        showNodeContent(index) {
            this.currentNode = index;
            this.showReplyFlag = [];
            this.showAddEmojiFlag = [];
            this.replyContent = [];
            this.sendInfo = [];
            this.$http({
                url: "https://api.lifeni.top/post",
                method: "get",
                params: {
                    node: this.info.node[index].key
                }
            })
                .then(response => {
                    this.posts = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        showNodeDescription(index) {
            this.currentNodeDescription = this.info.node[index].description;
        },
        initNodeDescription() {
            this.currentNodeDescription = this.info.node[
                this.currentNode
            ].description;
        },
        submitReply(index, post) {
            if (this.isLogin != 1) {
                alert("未登录");
                return;
            }
            if (this.replyContent.length < 1) {
                alert("没有内容");
                return;
            }

            this.$http({
                url: "https://api.lifeni.top/reply",
                method: "post",
                data: {
                    user: this.userId,
                    postId: post.id,
                    postName: post.title,
                    content: this.replyContent[index]
                }
            })
                .then(response => {
                    if (response.data == "ok") {
                        this.$set(this.sendInfo, index, "成功");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },
    computed: mapState(["info", "isLogin", "userId"]),
    beforeMount() {
        this.getPost();
    },
    mounted() {
        this.showReplyFlag.fill(0);
        this.showAddEmojiFlag.fill(0);
    }
};
</script>

<style src="../../static/postlist.css"></style>