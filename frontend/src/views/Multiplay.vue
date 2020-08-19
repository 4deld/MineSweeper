<template>
  <!-- <div v-if="username()">
  </div>-->
  <div class="homelayout">
    <demo-login-modal />
    <div class="left">
      <button class="leftbottom btnx" @click="Single()">싱글플레이</button>
      <div class="btnx" id="makeroombtn" @click="CreateRoombtn()">
        방 만들기
      </div>
      <div style="margin-top: 20px; margin-bottom: 15px;">
        <br />
        <button class="btn green" @click="$modal.show('demo-login')">
          Create Room
        </button>
      </div>
    </div>
    <div class="center">
      <Room />
    </div>
    <div class="right">
      <Chat />
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat";
import Room from "../components/Room";
import DemoLoginModal from "../components/Modal_CreateRoom";

export default {
  components: {
    Chat,
    Room,
    DemoLoginModal,
  },
  computed: {},
  watch: {},
  methods: {
    Single() {
      this.$router.push("/");
    },
    CreateRoom() {
      this.$socket.emit("CreateRoom", {});
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
}
.left {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 10vw;
  justify-content: space-between;
  align-content: space-between;
}
.right {
  display: flex;
  flex-direction: column;
}
.btnx {
  background-color: black;
  color: white;
  font-size: 25px;
  border: 0;
  cursor: pointer;
  padding: 0;
  width: fit-content;
  padding: 10px;
}
.center {
  width: auto;
}
</style>
