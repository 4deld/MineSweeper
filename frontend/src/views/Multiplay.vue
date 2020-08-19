<template>
  <!-- <div v-if="username()">
  </div>-->
  <div class="homelayout">
    <div class="left">
      <button class="leftbottom btnx" @click="Single()">싱글플레이</button>
      <div class="btnx" id="makeroom" @click="MakeRoom()">
        방 만들기
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

export default {
  components: {
    Chat,
    Room,
  },
  computed: {},
  watch: {},
  methods: {
    Single() {
      this.$router.push("/");
    },
    MakeRoom() {
      this.$socket.emit("MakeRoom", {});
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
