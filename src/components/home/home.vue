<template>
    <el-container class="wrap">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside width="200px" class="aside">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>     
</template>

<script>
export default {};
</script>

<style>
.header {
    background-color:#B3C0D1;
}
.aside {
    background-color: #D3DCE6;
}
.main {
    background-color: #E9EEF3;
}
.wrap {
    height: 100%;
}
</style>
