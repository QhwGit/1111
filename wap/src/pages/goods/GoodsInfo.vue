<template>
  <div>
    <Navbar />
    <div>
      <van-card :price="price"
                :title="goods_name"
                :thumb="picture.indexOf('http')!=-1?picture:domain+picture" />
      <van-cell-group>
        <van-field v-model="comment"
                   label="备注"
                   left-icon="records"
                   placeholder="请输入商品备注"
                   :required="true" />
        <van-field v-model="orderNumber"
                   label="订单号"
                   left-icon="records"
                   placeholder="请输入订单号" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="logisticsNumber"
                   label="物流单号"
                   placeholder="请输入物流单号"
                   left-icon="label-o" />
      </van-cell-group>
      <div class="postage">
        <van-icon name="free-postage"
                  class="free" />
        <span class="wuLiu">物流公司：</span><select name=""
                v-model="logistics">
          <option :value="item.co_id"
                  v-for="(item,index) in logisticsArr"
                  :key="index">{{item.company_name}}</option>

        </select>
      </div>
      <van-button type="primary"
                  size="large"
                  style="margin-top:60px;"
                  @click="button">发货</van-button>

    </div>
    <div v-if="channel_data!==''">
      <p class="info">收货信息</p>
      <van-card v-for="(item,index) in channel_data"
                :key="index"
                :title="'收货人：'+item.channel_real_name"
                :desc="'收货电话：'+item.channel_phone"
                :thumb="item.user_headimg.indexOf('http')!=-1?item.user_headimg:domain+item.user_headimg">
        <div slot="tags">
          <p style="padding: 7px 0">扫码时间：{{item.create_time}}</p>
          <p>订单单号：{{item.order_no}}</p>
        </div>
</template>
    </div>
  </div>
</template>
<script>
import {
  GET_GOODSINFO,
  GET_EXPRESSCOMPANY,
  GET_LEADCHANNER,
  GET_ORDERDELIVER
} from "@/api/deliver";
import { getDomain } from "@/utils/util";
export default {
  data() {
    return {
      comment: "",
      orderNumber: "",
      logistics: 210,
      logisticsText: "",
      logisticsNumber: "",
      remark: "",
      goods_name: "",
      picture: "",
      price: "",
      logisticsArr: [],
      // 渠道商信息
      channel_phone: "",
      channel_real_name: "",
      user_headimg: "",
      channel_data: "",
      domain: ""
    };
  },
  mounted() {
    console.log(getDomain());
    this.domain = getDomain();
    // 获取用户信息
    GET_GOODSINFO({ goods_id: this.$route.query.id }).then(res => {
      console.log(res.data);

      this.goods_name = res.data.goods_name;
      this.picture = res.data.picture;
      this.price = res.data.price;
    });
    // 获取快递公司
    GET_EXPRESSCOMPANY().then(res => {
      this.logisticsArr = res.data;
    });
    // 获取渠道商信息
    GET_LEADCHANNER({ code: this.$route.query.code }).then(res => {
      this.channel_data = res.data;
    });
  },
  methods: {
    // 发货
    button() {
      let datas = {
        order_no: this.orderNumber,
        express_company_id: this.logistics,
        express_name: "",
        express_no: this.logisticsNumber,
        memo: this.comment,
        code: this.$route.query.code,
        goods_id: this.$route.query.id
      };
      this.logisticsArr.forEach(e => {
        if (e.co_id == this.logistics) {
          datas.express_name = e.company_name;
        }
      });

      GET_ORDERDELIVER(datas).then(res => {
        this.$Toast(res.message);
        this.$router.push("/mall/index");
      });
    }
  }
};
</script>
<style scoped>
.wuLiu {
  margin-right: 20px;
}
.info {
  text-align: center;
  padding: 10px 0;
  font-size: 20px;
  font-weight: 600;
}
.free {
  display: block;
  margin: 5px 5px 0 0;
}
.postage {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  padding: 10px 15px;
}
</style>