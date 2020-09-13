<template>
  <div class="homelayout" v-if="!$store.state.MadeRoom">
    <demo-login-modal />
    <div class="left">
      <button class="btnx" @click="Single()">Single Play</button>
      <div style="margin-top: 20px; margin-bottom: 15px;">
        <br />
        <button class="btnx green" @click="$modal.show('demo-login')">Create Room</button>
      </div>
    </div>
    <div class="center">
      <Room />
    </div>
    <div class="right">
      <Chat />
    </div>
  </div>
  <div v-else>
    <MultiPlayGame />
  </div>
</template>

<script>
import Chat from "../components/Chat";
import Room from "../components/Room";
import DemoLoginModal from "../components/Modal_CreateRoom";
import MultiPlayGame from "../components/MultiPlayGame";

export default {
  components: {
    Chat,
    Room,
    DemoLoginModal,
    MultiPlayGame,
  },
  computed: {},
  watch: {},
  methods: {
    Single() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.homelayout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;

  background: #fc00aa;
  background: -webkit-linear-gradient(to right, #fc00aa, #00dbde);
  background: linear-gradient(315deg, #fc00aa, #00dbde);
}
.left {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.right {
  display: flex;
  flex-direction: column;
}
.btnx {
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  min-width: 140px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 20px;
}
.btnx:hover {
  border-color: black;
  color: black;
}
.center {
  width: auto;
}
</style>
