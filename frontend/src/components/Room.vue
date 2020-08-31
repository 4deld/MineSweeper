<template>
  <div class="out">
    <div class="roomlistname">Room List</div>
    <RoomList
      :RoomList="RoomList"
      @click="ClickThis(idx)"
      class="room_item"
      v-for="(RoomList,idx) in data"
      :key="idx"
    ></RoomList>
  </div>
</template>

<script>
import RoomList from "../components/RoomList.vue";
export default {
  components: {
    RoomList,
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    ClickThis(index) {
      this.$socket.client.emit("JoinRoom", {
        index: index,
      });
      this.$store.state.MadeRoom = true;
    },
  },
  created() {
    this.$socket.client.on("MadeRoom", (data) => {
      console.log(data);
      this.data.push({
        room_name: data.room_name,
        room_pw: data.room_pw,
        room_description: data.room_description,
      });
    });
  },
  watch: {
    data() {},
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
.roomlistname,
.room_item {
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
  border: 1px solid #dddedf;
  text-transform: uppercase;
  transition: 0.1s all;
  font-size: 20px;
}
</style>
