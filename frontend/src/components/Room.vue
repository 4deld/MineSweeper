<template>
  <div class="out">
    <div class="topbox">
      <div class="roomitem" id="makeroom" @click="MakeRoom()">방 만들기</div>
      <div class="roomitem">방 목록</div>
    </div>
    <div id="roomlist">{}</div>
  </div>
</template>

<script>
export default {
  methods: {
    MakeRoom() {
      this.$socket.emit("MakeRoom", {});
    }
  },
  created() {
    this.$socket.on("roomlist", data => {
      this.textarea += data.message + "\n";
    });
  }
};
</script>

<style>
.out {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30vw;
}
.roomitem {
  text-align: center;
  width: 100px;
  height: 50px;
}
#makeroom {
  position: absolute;
  left: 30vw;
}
.topbox {
  display: flex;
  justify-content: center;
  align-content: center;
}
#roomlist {
  display: flex;
  flex-direction: column;
}
</style>