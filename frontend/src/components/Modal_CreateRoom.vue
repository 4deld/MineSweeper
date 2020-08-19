<template>
  <modal
    name="demo-login"
    transition="pop-out"
    :width="modalWidth"
    :focus-trap="true"
    :height="750"
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
              <!-- <div class="autocomplete-fix">
              <input disabled type="password">
            </div> -->

              <input id="n-RoomName" type="text" placeholder="Room Name" />
              <input id="n-Max" type="text" placeholder="Max(Default: 2)" />
              <input id="n-PW" type="text" placeholder="PW(Option)" />
              <input
                id="n-Description"
                type="text"
                placeholder="Description(Option)"
              />
            </form>

            <div style="margin-top: 22px"></div>

            <div class="button-set">
              <button id="goto-signin-btn" @click="signIn">Confirm</button>
              <button id="register-btn" @click="register">Cancel</button>
            </div>

            <!-- <button class="large-btn github-btn">connect with <span>github</span></button>
          <button class="large-btn facebook-btn">connect with <span>facebook</span></button> -->
            <div class="error-modal-content">
              <div class="bugs-label">bugs: {{ bugCount }}</div>
              <button @click="createBug">Create a bug</button>
              <button @click="fixBug">Fix a bug</button>

              <div style="padding: 10px; font-size:22px">
                You will be able to close the window only if you have fixed all
                the bugs :)
              </div>
              <sub :style="{ opacity: hasBugs ? 1 : 0 }" style="font-size:22px">
                {{ bugCount }} bugs to fix
              </sub>
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
      bugCount: 0,
      message: "",
      hasBugs: false,
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    signIn() {
      alert("Sign in");
    },
    register() {
      alert("Register");
    },
    createBug() {
      this.bugCount++;
    },

    fixBug() {
      this.bugCount = Math.max(this.bugCount - 1, 0);
      this.hasBugs = false;
    },

    beforeOpen() {
      this.bugCount = Math.round(Math.random() * 3) + 1;
    },

    beforeClose(event) {
      if (this.bugCount > 0) {
        this.hasBugs = true;
        /*
        Stopping close event execution
        */
        event.cancel();
      }
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
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
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
</style>
