<template>
  <Layout ref="load" class="invoice-detail bg-f8">
    <Navbar />
    <div class="wrap">
      <div class="img">
        <img :src="img_path" :onerror="$ERRORPIC.noGoods" />
      </div>
      <van-button
        round
        class="btn-add"
        size="normal"
        type="danger"
        v-if="is_upload == 1"
        :disabled="auth_url ? false : true"
        :url="auth_url"
      >添加至微信卡包</van-button>
    </div>
  </Layout>
</template>

<script>
import sfc from "@/utils/create";
import { GET_IMG, GET_AUTHURL } from "@/api/invoice";
export default sfc({
  name: "invoice-detail",
  data() {
    return {
      params: {},
      img_path: "",

      auth_url: ""
    };
  },
  computed: {
    order_no() {
      return this.$route.query.order_no;
    },
    is_upload() {
      return this.$route.query.is_upload;
    }
  },
  mounted() {
    if (this.$store.state.config.addons.invoice) {
      this.$refs.load.success();
      this.loadData();
    } else {
      this.$refs.load.fail({
        errorText: "未开启发票助手应用",
        showFoot: false
      });
    }
  },
  methods: {
    loadData() {
      const $this = this;
      $this.params.order_no = $this.order_no;
      GET_IMG($this.params).then(({ data }) => {
        if (data.data.substring(0, 4) == "http") {
          $this.img_path = data.data;
        } else {
          $this.img_path = `${$this.$store.state.domain}/${data.data}`;
        }
      });

      let param = {
        order_no: $this.order_no,
        source: $this.$store.state.isWeixin ? "web" : "wap"
      };
      GET_AUTHURL(param).then(({ data }) => {
        $this.auth_url = data.data;
      });
    }
  }
});
</script>

<style scoped>
.wrap {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
  margin: 10px;
  border-radius: 10px;
}
.img {
  width: 90%;
  position: relative;
  padding-bottom: 100%;
  margin-left: 5%;
  margin-top: 20px;
}
.img img {
  width: 100%;
  position: absolute;
  height: 100%;
}
.btn-add {
  margin: 20px auto;
  display: block;
}
</style>