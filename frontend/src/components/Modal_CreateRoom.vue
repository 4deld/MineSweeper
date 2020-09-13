<template>
  <modal
    name="demo-login"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="650"
    :classes="['error-modal', hasBugs && 'has-bugs']"
    :adaptive="true"
    @before-open="beforeOpen"
    @before-close="beforeClose"
  >
    <div class="box">
      <div class="box-part" id="bp-left">
        <div class="partition" id="partition-register">
          <div class="partition-title">CREATE ROOM</div>
          <div class="partition-form">
            <form autocomplete="false">
              <div class="autocomplete-fix">
                <input disabled type="password" />
              </div>

              <input
                id="n-RoomName"
                type="text"
                placeholder="Room Name"
                autocomplete="off"
                v-model="room_name"
              />
              <input
                id="n-Max"
                type="text"
                placeholder="Max(Default: 2)"
                autocomplete="off"
                v-model="room_max"
              />
              <input
                id="n-PW"
                type="password"
                placeholder="PW(Option)"
                autocomplete="off"
                v-model="room_pw"
              />
              <br />
              <div class="radio">
                <div style="text-align:center;">MODE</div>
                <br />
                <label>
                  <input type="radio" name="mode" value="Time Attack - 9²" v-model="room_mode" />
                  Time Attack - 9²
                </label>
                <label>
                  <input
                    type="radio"
                    id="choicetimeattack16"
                    name="mode"
                    value="Time Attack - 16²"
                    v-model="room_mode"
                  />
                  Time Attack - 16²
                </label>
                <label>
                  <input
                    type="radio"
                    id="choicetimeattack30"
                    name="mode"
                    value="Time Attack - 16x30"
                    v-model="room_mode"
                  />
                  Time Attack - 16x30
                </label>
                <!-- <label>
                  <input type="radio" id="choice2" name="mode" value="b1" v-model="room_mode" />
                  BETA
                </label>
                <label>
                  <input type="radio" id="choice3" name="mode" value="b2" v-model="room_mode" />
                  BETA
                </label>-->
              </div>
              <br />
              <input
                id="n-Description"
                type="text"
                autocomplete="off"
                placeholder="Description(Option)"
                v-model="room_description"
              />
            </form>

            <div style="margin-top: 22px"></div>

            <div class="button-set">
              <button id="goto-signin-btn" @click="confirm">Confirm</button>
            </div>

            <div class="error-modal-content">
              <sub
                :style="{ opacity: (!hasBugs || room_name) ? 0 : 1 }"
                style="font-size:22px"
              >Room Name needs to be filled</sub>
              <br />
              <sub
                :style="{ opacity: (!hasBugs ||room_mode) ? 0 : 1 }"
                style="font-size:22px"
              >Mode needs to be checked</sub>
            </div>
          </div>
        </div>
      </div>
      <div class="box-part" id="bp-right">
        <div class="box-messages"></div>
      </div>
    </div>
  </modal>
</template>


<script>
const MODAL_WIDTH = 656;

export default {
  name: "DemoLoginModal",
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      message: "",
      hasBugs: false,
      room_name: "",
      room_max: "",
      room_pw: "",
      room_description: "",
      room_mode: "",
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    beforeOpen() {
      this.bugRoom = "";
      this.bugMode = "";
    },
    confirm() {
      if (this.room_name == "" || this.room_mode == "") {
        this.hasBugs = true;
        return;
      } else {
        this.$socket.client.emit("MadeRoom", {
          room_name: this.room_name,
          room_max: this.room_max,
          room_pw: this.room_pw,
          room_mode: this.room_mode,
          room_description: this.room_description,
        });

        this.room_name = "";
        this.room_max = "";
        this.room_pw = "";
        this.room_mode = "";
        this.room_description = "";

        this.$store.state.MadeRoom = true;

        //this.$modal.hide("demo-login");
      }
    },
    beforeClose(event) {
      this.room_name = "";
      this.room_max = "";
      this.room_pw = "";
      this.room_description = "";
      this.room_mode = "";
      this.hasBugs = false;
    },
  },
};
</script>
<style lang="scss">
$background_color: #404142;

.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: 750px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;

  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 50%;

    &#bp-right {
      background: url("/static/panorama.jpg") no-repeat top left;
      border-left: 1px solid #eee;
    }
  }

  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }

  .partition {
    width: 100%;
    height: 100%;

    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 30px;
      font-weight: 300;
    }

    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }

  input[type="password"],
  input[type="text"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 22px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
  }

  button {
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
    &:hover {
      border-color: black;
      color: black;
    }
  }

  .large-btn {
    width: 100%;
    background: white;

    span {
      font-weight: 600;
    }
    &:hover {
      color: white !important;
    }
  }

  .button-set {
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
  }

  #register-btn,
  #signin-btn {
    margin-left: 8px;
  }

  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}

.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}

.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
.error-modal {
  transition: box-shadow 1s;

  &.has-bugs {
    box-shadow: 0 24px 80px -2px rgba(255, 0, 0, 0.4) !important;
  }
}

.error-modal-content {
  padding: 10px;
  text-align: center;

  .bugs-label {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 2px;
    padding: 10px;
  }

  button {
    width: 180px;
  }

  sub {
    color: #ec625f;
    transition: opacity 0.25s;
  }
}
.radio {
  height: 100px;
  font-size: 24px;
  display: flex;
  flex-direction: column;
}
.radio input {
  width: 20px;
  margin: 5px;
}
</style>
