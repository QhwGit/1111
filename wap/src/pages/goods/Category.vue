<template>
  <Layout ref="load" class="goods-category">
    <HeadSearch />
    <CategoryView top="46" :bottom="ofBottom">
      <div slot="nav" class="nav">
        <div
          class="item"
          v-for="(item,index) in items"
          :key="index"
          :class="activeKey == index ? 'active' : ''"
          @click="activeKey = index"
        >
          <span class="nav-item-text">{{item.short_name || item.category_name}}</span>
        </div>
      </div>
      <div slot="content" class="content">
        <div class="item" v-for="(item,index) in content" :key="index">
          <div class="item-head">
            <span
              class="e-handle"
              @click="toList(item.category_id,item.short_name || item.category_name)"
            >{{item.short_name || item.category_name}}</span>
          </div>
          <div class="item-main">
            <div class="item-child" v-for="(child,index) in item.third_category" :key="index">
              <div
                class="item-box e-handle"
                @click="toList(child.category_id,child.short_name || child.category_name)"
              >
                <div class="iamges">
                  <img v-lazy="child.category_pic" :key="child.category_pic" pic-type="square" />
                </div>
                <div class="name">{{child.short_name || child.category_name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CategoryView>
  </Layout>
</template>

<script>
import sfc from "@/utils/create";
import CategoryView from "@/components/CategoryView";
import { GET_GOODSCATEGORY } from "@/api/goods";
import HeadSearch from "@/components/HeadSearch";
export default sfc({
  name: "goods-category",
  data() {
    return {
      activeKey: 0,
      items: []
    };
  },
  computed: {
    ofBottom() {
      return this.$store.state.tabbar.isShowTabbar ? 50 : 0;
    },
    content() {
      return this.items[this.activeKey]
        ? this.items[this.activeKey].second_category
        : [];
    }
  },
  activated() {
    this.loadData();
  },
  methods: {
    loadData() {
      const $this = this;
      GET_GOODSCATEGORY()
        .then(({ data }) => {
          $this.items = data;
          $this.$refs.load.success();
        })
        .catch(() => {
          $this.$refs.load.fail();
        });
    },
    toList(id, name) {
      this.$router.push({
        path: "/goods/list",
        query: {
          category_id: id,
          text: name
        }
      });
    }
  },
  components: {
    HeadSearch,
    CategoryView
  }
});
</script>

<style scoped>
.nav .item {
  color: #323232;
  display: flex;
  align-items: center;
  height: 46px;
  justify-content: center;
  position: relative;
}

.nav .item.active .nav-item-text::before {
  content: "";
  position: absolute;
  display: block;
  width: 2px;
  height: 16px;
  background: #ff454e;
  left: 0;
  top: 50%;
  margin-top: -8px;
}

.nav .item.active {
  color: #ff454e;
  background: #fff;
}

.content {
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
}

.content .item {
  margin: 4px 4px 20px;
}

.content .item .item-head {
  color: #58595b;
  font-weight: 800;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 5px;
}

.content .item .item-head span {
  padding: 6px 10px;
}

.content .item .item-main {
  overflow: hidden;
}

.content .item .item-main .item-child {
  width: 33.333334%;
  float: left;
  text-align: center;
}

.content .item .item-main .item-child .item-box {
  margin: 4px;
}

.content .item .item-main .item-child .iamges {
  height: 0;
  width: 100%;
  padding: 50% 0;
  overflow: hidden;
  background: #f9f9f9;
}

.content .item .item-main .item-child .iamges img {
  display: block;
  width: 100%;
  margin-top: -50%;
  background-color: #fff;
  border: none;
}

.content .item .item-main .item-child .name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 6px 4px 8px;
}
</style>
