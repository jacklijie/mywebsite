<template>
    <modal>
        <div class="alert-box">
            <span v-text="text"></span>
            <button @click="hideAlert">确定</button>
        </div>
    </modal>
</template>
<script>
import modal from "../modal";

export default {
    name: 'valert',
    data() {
        return {};
    },
    props: ['text'],
    components: {
        modal
    },
    methods: {
        hideAlert() {
            this.$store.commit("ALERT_STATE", {
                showAlert: false
            });
        }
    }
}
</script>
<style lang="scss">
.alert-box {
    align-self: center;
    span {
        display: block;
    }
    button {
        background-color: #ccc;
        border: 1px solid #ddd;
        width: 50px;
        height: 25px;
        margin-top: 20px;
    }
}
</style>
