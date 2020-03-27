<template>
  <CellInfoGroup :columns="columns" v-if="detail.invoice.type" @onclick="onJump">
    <van-cell slot="head" icon="orders-o" title="发票信息" />
  </CellInfoGroup>
</template>

<script>
import CellInfoGroup from "../CellInfoGroup";
import { formatDate } from "@/utils/util";
export default {
  data() {
    return {};
  },
  props: {
    detail: Object
  },
  mounted() {},
  computed: {
    columns() {
      let arr = [];
      if (this.detail.invoice.type) {
        arr.push({
          title: "发票类型",
          value:
            this.detail.invoice.type == 1 ? "电子普通发票" : "增值税专用发票",
          btnText: this.detail.invoice.is_upload > 0 ? "查看发票" : ""
        });
      }

      if (this.detail.invoice.title) {
        arr.push({
          title: "抬头类型",
          value: this.detail.invoice.title == 1 ? "个人" : "公司"
        });
      }
      arr.push(
        { title: "发票抬头", value: this.detail.invoice.title_name },
        {
          title: this.detail.invoice.title !== 1 ? "税号" : "",
          value:
            this.detail.invoice.title !== 1
              ? this.detail.invoice.taxpayer_no
              : ""
        },
        { title: "发票内容", value: this.detail.invoice.content }
      );
      return arr;
    }
  },
  methods: {
    onJump(index) {
      const $this = this;
      if (index == 0) {
        $this.$router.push({
          name: "invoice-detail",
          query: {
            order_no: $this.detail.order_no,
            is_upload: $this.detail.invoice.is_upload
          }
        });
      }
    }
  },
  components: {
    CellInfoGroup
  }
};
</script>

<style scoped>
.cell-service {
  display: inline-flex;
  align-items: center;
  font-size: 0.8em;
}
</style>
