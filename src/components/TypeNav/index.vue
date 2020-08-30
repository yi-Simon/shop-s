<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leave">
        <h2 class="all" @mouseenter="showNav">全部商品分类</h2>
        <transition name="fade">
        
        
        <div class="sort" @click="toSearch" v-show="isShow">
          <div class="all-sort-list2">
            <div
              class="item bo"
              v-for="(category1,index) in categoryList"
              :class="{active:currentIndex===index}"
              :key="category1.categoryId"
            >
              <h3 @mouseenter="enter(index)">
                <a
                  href="javascript:;"
                  :data-category1id="category1.categoryId"
                  :data-categoryname="category1.categoryName"
                >{{category1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="(category2) in category1.categoryChild"
                    :key="category2.categoryId"
                  >
                    <dt>
                      <a
                        href="javascript:;"
                        :data-category2id="category2.categoryId"
                        :data-categoryname="category2.categoryName"
                      >{{category2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em
                        v-for="(category3) in category2.categoryChild"
                        :key="category3.categoryId"
                      >
                        <a
                          href="javascript:;"
                          :data-category3id="category3.categoryId"
                          :data-categoryname="category3.categoryName"
                        >{{category3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow:true
    };
  },
  methods: {
    enter: throttle(
      function (index) {
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),
    leave() {
      this.currentIndex = -1;
      if(this.$route.path !== '/home'){
        this.isShow = false
      }
    },
    toSearch(event) {
      let {category1id,category2id,category3id,categoryname} = event.target.dataset
      if(categoryname){
        const location = {
          name:'search',
        }
        if(category1id){
          location.query = {
            categoryName:categoryname,
            category1Id:category1id
          }
        }else if(category2id){
          location.query = {
            categoryName:categoryname,
            category2Id:category2id
          }
        }else{
          location.query = {
            categoryName:categoryname,
            category3Id:category3id
          }
        }

        let {params} = this.$route
        if(params){
          location.params = params
        }

        this.$router.push(location)
      }
    },
    hideNav(){
      if(this.$route.path !== '/home'){
        this.isShow = false
      }
    },
    showNav(){
      this.isShow = true
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  mounted(){
    this.hideNav()
  }
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.fade-enter{
        opacity: 0;
        height: 0;
      }

      &.fade-enter-active{
        transition: all 1s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 600px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
              background-color: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
