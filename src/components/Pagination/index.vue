<template>
  <div class="pagination">
    <button :disabled="pageNum<=1" @click="$emit('changePage',1)">首页</button>
    <button :disabled="pageNum<=1" @click="$emit('changePage',pageNum-1)">上一页</button>
    <button v-if="startEnd.start>1">...</button>
    <button
      :class="{active:pageNum===item}"
      v-for="(item, index) in pageList"
      :key="index"
      @click="$emit('changePage',item)"
    >{{item}}</button>
    <button v-if="startEnd.end<totalPage">...</button>
    <button :disabled="pageNum>=totalPage" @click="$emit('changePage',pageNum+1)">下一页</button>
    <button :disabled="pageNum >= totalPage" @click="$emit('changePage',totalPage)">尾页</button>
    <button>共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: { type: Number, default: 0 },
    pageNum: { type: Number, default: 1 },
    PageSize: { type: Number, default: 4 },
    continueNum: { type: Number, default: 5 },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.PageSize);
    },
    startEnd() {
      let start;
      let end;
      let diff;
      start = this.pageNum - Math.floor(this.continueNum / 2);
      end = this.pageNum + Math.floor(this.continueNum / 2);
      if (this.totalPage <= this.PageSize) {
        start = 1;
        end = this.totalPage;
      } else if (this.pageNum <= Math.ceil(this.continueNum / 2)) {
        diff = 1 - start;
        start += diff;
        end += diff;
      } else if (end > this.totalPage) {
        diff = end - this.totalPage;
        start -= diff;
        end -= diff;
      }
      return { start, end };
    },
    pageList() {
      let { start, end } = this.startEnd;
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  margin-left: 50%;
  transform: translate(-50%);
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
