<template>
    <div id="PostList">
        <div class="post-tips" v-show="!postTipsClosed">
            📌 以下为 24 小时内的热门内容。
            <button class="post-tips-close" @click="postTipsClosed = 1">知道了</button>
        </div>
        <div class="post" v-for="(post, index) in posts" :key="post.id">
            <div class="title">[示例] {{post.title}}</div>
            <div class="post-node">{{nodeFormat(post.node)}}</div>
            <div class="post-author">匿名用户#{{post.author}}</div>
            <div class="post-date">{{post.date}}</div>
            <div class="hot-content" v-html="post.content" @click="expandPost(index)"></div>
            <div
                class="emoji"
                v-for="emoji in info.emoji"
                :key="emoji.id"
                v-show="post.emoji[emoji.id].count"
            >
                {{emoji.code}}×
                <span class="emoji-count">{{post.emoji[emoji.id].count}}</span>
            </div>
            <div class="replies">
                <div class="reply" v-for="reply in post.reply" :key="reply.id">
                    <div class="reply-author">匿名用户#{{reply.author}}</div>
                    <div class="reply-date">{{reply.date}}</div>
                    <div class="reply-content">{{reply.content}}</div>
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
            postTipsClosed: 0
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
        nodeFormat(node) {
            const code = {
                tech: "技术",
                idea: "创意",
                share: "分享",
                nearby: "附近",
                notice: "通知",
                qa: "问答"
            };
            return code[node];
        }
    },
    computed: mapState(["info", "isLogin", "userId"]),
    beforeMount() {
        this.getPost();
    },
    mounted() {}
};
</script>

<style src="../../static/postlist.css"></style>
