<template>
    <div class="modal-bg">
        <div class="box">
            <slot>
            </slot>
        </div>
    </div>
</template>
<style lang="scss">
.modal-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    .box {
        width: 80%;
        min-height: 150px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        justify-content: center;
    }
}
</style>
