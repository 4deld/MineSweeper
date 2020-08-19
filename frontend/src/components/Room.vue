<template>
  <div class="out">
    <div class="roomlistname">Room List</div>
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
  background: white;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px;
  letter-spacing: 1px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  min-width: 140px;
  margin-top: 8px;
  color: #8b8c8d;
  cursor: pointer;
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 20px;
}
</style>
