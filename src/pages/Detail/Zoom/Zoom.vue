<template>
  <div class="spec-preview">
    <img :src="showImg.imgUrl" />
    <div class="event" @mousemove="move" @mouseenter="enter" @mouseleave="leave"></div>
    <div class="big" ref="big">
      <img :src="showImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      imgIndex: 0,
    };
  },
  props: {
    imgList: {
      type: Array,
    },
  },
  methods: {
    move(e) {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      let maskW = this.$refs.mask.offsetWidth;
      let maskH = this.$refs.mask.offsetHeight;
      let maskX = mouseX - maskW / 2;
      let maskY = mouseY - maskH / 2;

      maskX = maskX < 0 ? 0 : maskX;
      maskY = maskY < 0 ? 0 : maskY;
      maskX =
        maskX > e.target.clientWidth - maskW
          ? e.target.clientWidth - maskW
          : maskX;
      maskY =
        maskY > e.target.clientHeight - maskH
          ? e.target.clientHeight - maskW
          : maskY;

      this.$refs.mask.style.left = maskX + "px";
      this.$refs.mask.style.top = maskY + "px";
      this.$refs.bigImg.style.left = -2 * maskX + "px";
      this.$refs.bigImg.style.top = -2 * maskY + "px";
    },
    enter() {
      this.$refs.big.style.display = "block";
      this.$refs.mask.style.display = "block";
    },
    leave() {
      this.$refs.big.style.display = "none";
      this.$refs.mask.style.display = "none";
    },
    changeImg(index) {
      this.imgIndex = index;
    },
  },
  computed: {
    showImg() {
      if (this.imgList) {
        return this.imgList[this.imgIndex] || {};
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.$bus.$on("changeImg", this.changeImg);
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;
    margin-left: 10px;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>