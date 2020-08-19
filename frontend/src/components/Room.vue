<template>
  <div class="out">
    <div class="roomlistname">방 목록</div>
    <textarea name="" id="" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
export default {
  methods: {},
  created() {
    this.$socket.on("roomlist", (data) => {
      this.textarea += data.message + "\n";
    });
  },
};
</script>

<style>
.out {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 38vw;
}
.roomlistname {
  background-color: black;
  color: white;
  font-size: 25px;
  border: 0;
  padding: 0;
  width: fit-content;
  padding: 10px;
}
</style>
