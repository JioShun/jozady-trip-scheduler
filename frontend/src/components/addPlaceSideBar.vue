<template>
    <div class="sidebar">
        <div class="sidebar__header"></div>
        <div class="sidebar__content"></div>
    </div>
</template>

<script setup></script>

<style scoped>
.sidebar {
    width: 100%;
    height: 100%;
    background-color: #f4f4f9;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar__header {
    padding: 20px;
    background-color: #ffed9d;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sidebar__content {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
}
</style>
