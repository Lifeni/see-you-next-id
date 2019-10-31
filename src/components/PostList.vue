<template>
    <div id="PostList">
        <div class="post" v-for="(post, index) in posts" :key="post.title">
            <div class="title">[示例] {{post.title}}</div>
            <div class="author">{{post.author}}</div>
            <div class="date">{{post.date}}</div>
            <div class="reply-count">{{post.reply_count + " 条回应"}}</div>
            <div class="view-count">{{post.view_count + " 次阅读"}}</div>
            <div class="post-content" v-html="post.content" @click="expandPost(index)"></div>
            <button class="show-reply" @click="showReply(index)">查看回应</button>
            <button class="add-emoji">+ Emoji</button>
            <div
                class="emoji"
                v-for="emoji in post.emoji"
                :key="emoji.count"
            >{{emoji.code}}×{{emoji.count}}</div>
            <div class="replies">
                <div class="reply" v-for="reply in post.reply" :key="reply.id">
                    <div class="reply-id">#{{reply.id}}</div>
                    <div class="reply-author">{{reply.author}}</div>
                    <div class="reply-date">{{reply.date}}</div>
                    <div class="reply-like">♡×{{reply.like}}</div>
                    <div class="reply-content">{{reply.content}}</div>
                </div>
                <div class="reply-text">
                    <textarea name="reply" class="input-box" cols="50" rows="2" placeholder="你的回应："></textarea>
                    <div class="reply-tips">请友善发言，不合适的言论将会被删除。</div>
                    <button class="send-reply">回应</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostList",
    data() {
        return {
            posts: {}
        };
    },
    methods: {
        getData() {
            this.$http({
                // $http 在 main.js 文件里用实例属性进行替换
                url: "/static/test.json",
                method: "get",
                params: {
                    page: 3,
                    limit: 10,
                    mdrender: false
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
            this.$el.children[index]
                .getElementsByClassName("post-content")[0]
                .classList.add("expand");
        },
        showReply(index) {
            this.$el.children[index].getElementsByClassName(
                "replies"
            )[0].style.display = "block";
        }
    },
    beforeMount() {
        this.getData();
    }
};
</script>

<style scoped>
#PostList {
    position: relative;
    width: 100%;
    height: auto;
}

.post {
    width: 100%;
    height: auto;
    margin: 12px 0;
    padding: 16px 18px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(224, 224, 224, 1);
    background-color: white;
}

.title {
    margin: 4px;
    font-size: 20px;
    font-family: "Noto Serif SC", serif;
    font-weight: bold;
}

.author,
.date,
.reply-count,
.view-count {
    margin: 4px;
    display: inline-block;
    font-size: 14px;
    font-family: "Noto Serif SC", serif;
    color: rgba(117, 117, 117, 1);
}

.post-content {
    margin: 8px 4px;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.post-content:hover {
    color: rgba(97, 97, 97, 1);
    cursor: pointer;
}

.expand {
    -webkit-box-orient: unset;
    -webkit-line-clamp: unset;
}

.expand {
    color: black !important;
    cursor: unset !important;
}

.add-emoji,
.show-reply {
    margin: 8px 4px;
    padding: 4px 8px;
    border: none;
    border-radius: 2px;
    background-color: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
    cursor: pointer;
}

.emoji {
    display: inline-block;
    margin: 8px 0;
    padding: 4px 8px;
    border-radius: 2px;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
}

.replies {
    display: none;
}

.reply {
    margin: 8px 4px;
    padding: 8px 12px;
    border-radius: 2px;
    background-color: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
}

.reply-id,
.reply-author,
.reply-date,
.reply-like {
    margin: 4px;
    display: inline-block;
    font-size: 14px;
    font-family: "Noto Serif SC", serif;
    color: rgba(117, 117, 117, 1);
}

.reply-content {
    width: 100%;
    padding: 4px;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
    overflow: hidden;
    white-space: pre-wrap;
}

.reply-text {
    position: relative;
    padding: 0 4px;
}

.input-box {
    width: 100%;
    padding: 8px 12px;
    border: 2px solid rgba(245, 245, 245, 1);
    border-radius: 2px;
    background-color: white;
    font-size: 16px;
    font-family: "Noto Serif SC", serif;
    resize: none;
}

.reply-tips {
    margin: 4px 0;
    padding: 6px 8px;
    display: inline-block;
    font-size: 14px;
    font-family: "Noto Serif SC", serif;
    color: rgba(117, 117, 117, 1);
}

.send-reply {
    position: absolute;
    bottom: 0;
    right: 4px;
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