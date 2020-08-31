<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-title">Chat</div>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-field>
          <label>Message</label>
          <md-textarea v-model="textarea" id="c" disabled v-auto-scroll-bottom></md-textarea>
        </md-field>
        <md-field>
          <label>Your Message</label>
          <md-input v-model="message" v-on:keyup.enter="sendMessage"></md-input>
          <md-button class="md-primary md-raised" @click="sendMessage()">Submit</md-button>
        </md-field>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  //명시적으로 컴포넌트이름 나타내는거  재귀적으로 사용되거나 반복해서 사용될때 꼬이는거 막아주는역할
  name: "Chat",
  created() {
    //서버에서 서버에서 emit 을 통해 클라이언트로 메세지를 전달하였으므로, 클라이언트에서 같은 이벤트명을 사용하여
    //서버로부터 데이터를 받도록 합니다.
    this.$socket.client.on("chat", (data) => {
      this.textarea += data.message + "\n";
    });
  },
  data() {
    return {
      textarea: "",
      message: "",
    };
  },
  methods: {
    //Submit 버튼의 onclick 이벤트가 발생하면  서버로 데이터를 전송하고 현재 입력중인 데이터를 지움
    sendMessage() {
      if (this.message == "");
      else {
        this.$socket.client.emit("chat", {
          message: this.message,
        });
        this.textarea += this.message + "\n";
        this.message = "";
      }
    },
  },
};
</script>

<style>
.md-app {
  height: 100vh;
  width: 35vw;
}
#c {
  height: 1000px;
}
</style>
