<template>
    <div id="PostList">
        <div class="post-tips" v-show="!postTipsClosed">
            📌 以下为 24 小时内的热门内容。
            <button class="post-tips-close" @click="postTipsClosed = 1">知道了</button>
        </div>
        <div class="post" v-for="(post, index) in posts" :key="post.id">
            <div class="title">[示例] {{post.title}}</div>
            <div class="post-node">{{post.node}}</div>
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
                v-show="post.emoji[emoji.id]"
            >
                {{emoji.code}}×
                <span class="emoji-count">{{post.emoji[emoji.id]}}</span>
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
                    <div class="reply-id">#{{parseInt(reply.id) + 1}}</div>
                    <div class="reply-author">匿名用户#{{reply.author}}</div>
                    <div class="reply-date">{{reply.date}}</div>
                    <div class="reply-content">{{reply.content}}</div>
                </div>
                <div class="reply-text">
                    <form
                        action="https:api.lifeni.top/reply"
                        method="post"
                        target="temp-iframe"
                        @submit="submitReply(index)"
                    >
                        <textarea
                            name="reply"
                            class="input-box"
                            cols="50"
                            rows="2"
                            required
                            placeholder="你的回应："
                        ></textarea>
                        <div class="reply-tips">请友善发言，不合适的言论将会被删除。</div>
                        <button class="send-reply" type="submit">回应{{sendInfo[index]}}</button>
                    </form>
                    <iframe src="/" frameborder="0" name="temp-iframe" style="display:none;"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "PostList",
    data() {
        return {
            posts: [],
            showReplyFlag: [],
            showAddEmojiFlag: [],
            postTipsClosed: 0,
            sendInfo: []
        };
    },
    methods: {
        getPost() {
            this.$http({
                // $http 在 main.js 文件里用实例属性进行替换
                url: "https://api.lifeni.top/post",
                method: "get",
                params: {
                    node: "hot"
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

            this.$set(
                this.posts[postId].emoji,
                emojiId,
                this.posts[postId].emoji[emojiId] + temp
            );
            this.$el.children[postId + 1]
                .getElementsByClassName("emoji")
                [emojiId].classList.toggle("emoji-selected");
        },
        submitReply(index) {
            this.$set(this.sendInfo, index, "成功");
        }
    },
    computed: mapState(["info"]),
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
