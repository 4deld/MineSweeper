<template>
  <!-- <div v-if="username()">
  </div> -->
  <div class="homelayout">
    <div class="left">
      <button class="lefttop btnx">방 만들기</button>
      <button class="leftbottom btnx" @click="Single()">싱글플레이</button>
    </div>
    <div class="center">CENTER</div>
    <div class="right">
      <Chat />
    </div>
  </div>
</template>

<script>
import Chat from "../components/Chat";

export default {
  components: {
    Chat,
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
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 25vw;
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
</style>
