<template>
    <div class="mainpage">
        <h1 class="mainTitle">Good Morning.</h1>
    </div>
</template>

<script>
    export default {
        name: 'mainpage'
    }
</script>

<style>
    .mainpage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: -1;
    }

    .mainTitle {
        text-align: center;
        font-family: Arial;
        font-weight: bold;
        font-size: 60px;
        margin-bottom: 0;
    }
</style>