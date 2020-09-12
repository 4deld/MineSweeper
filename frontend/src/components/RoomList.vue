<template>
  <div @click="$emit('click',$event)" class="roomlistlayout">
    <div class="n">{{RoomList.room_name}}</div>
    <div class="n">{{RoomList.room_pw}}</div>
    <div class="n">{{RoomList.room_mode}}</div>
    <div class="n">{{RoomList.room_description}}</div>
    <div class="n" id="status">1/2</div>
  </div>
</template>


<script>
export default {
  props: {
    RoomList: Object,
  },
};
</script>

<style scoped>
.roomlistlayout {
  cursor: pointer;
}
#status {
  color: green;
}
</style>



