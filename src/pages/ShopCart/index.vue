<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(item, index) in goodsList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked===1"
              @click="changeChecked(index)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="mins(index)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              class="itxt"
              @change="change(item,$event.target.value*1)"
            />
            <a href="javascript:void(0)" class="plus" @click="plus(index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuNum*item.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteGood(item.skuId)">删除</a>
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="selectAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="delCheCked">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{checkedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{total}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteCart } from "@/api";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      this.$store.dispatch("getCartList");
    },
    async changeChecked(index) {
      await this.$store.dispatch("getCheckCart", {
        skuId: this.goodsList[index].skuId,
        isCheCked: this.goodsList[index].isChecked ? 0 : 1,
      });
      this.getCartList();
    },
    async plus(index) {
      await this.$store.dispatch("updataCart", {
        skuId: this.goodsList[index].skuId,
        skuNum: 1,
      });
      this.getCartList();
    },
    async mins(index) {
      if (this.goodsList[index].skuNum > 1) {
        await this.$store.dispatch("updataCart", {
          skuId: this.goodsList[index].skuId,
          skuNum: -1,
        });
        this.getCartList();
      }
    },
    async change(item, value) {
      value = value - item.skuNum;
      if (value + item.skuNum < 1) {
        value = 1 - item.skuNum;
      }
      await this.$store.dispatch("updataCart", {
        skuId: item.skuId,
        skuNum: value,
      });
      this.getCartList();
    },
    async deleteGood(id) {
      await this.$store.dispatch("delCart", id);
      this.getCartList();
    },
    async delCheCked() {
      let delArr = [];
      this.goodsList.forEach((item) => {
        if (item.isChecked) {
          delArr.push(item.skuId);
        }
      });
      await this.$store.dispatch("delMultiple", delArr);
      this.getCartList();
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    checkedNum() {
      return this.goodsList.reduce((pre, item, index) => {
        if (item.isChecked === 1) {
          return (pre += item.skuNum);
        }
        return pre;
      }, 0);
    },
    total() {
      return this.goodsList.reduce((pre, item, index) => {
        if (item.isChecked === 1) {
          pre += item.skuNum * item.cartPrice;
        }
        return pre;
      }, 0);
    },
    selectAll: {
      get() {
        return (
          this.goodsList.every((item) => item.isChecked === 1) &&
          this.goodsList.length > 0
        );
      },
      async set(val) {
        await this.$store.dispatch("checkAllCart", val ? 1 : 0);

        this.getCartList();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3 {
        width: 10%;
      }
      .cart-th4 {
        width: 17%;
      }
      .cart-th5 {
        width: 10%;
      }
      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>