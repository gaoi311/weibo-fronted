<template>
    <div>
        <Divider/>
        <ul class="bubble_footer_ul">
            <li>
                <Icon type="md-people"/>
                <router-link to="/about" style="color: #000">关于我们</router-link>
            </li>
            <li><span><Icon type="logo-github"/></span><a href="https://github.com/gaoi311/weibo_fronted"
                                                          style="color: #000">GitHub</a></li>
            <li>
                <Icon type="ios-link"/>
                <a href="https://www.ustc.edu.cn/" style="color: #000">中国科大</a></li>
        </ul>
        <Divider/>
        <p class="bubble_footer_p">Copyright © 2021 IAT·USTC 微博</p>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .bubble_footer_ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }

    .bubble_footer_ul li {
        list-style: none;
        text-align: center;
        font-size: 20px;
        line-height: 10px;
        width: 10%;
        margin: 0 10px;
    }

    .bubble_footer_p {
        text-align: center;
    }
</style>