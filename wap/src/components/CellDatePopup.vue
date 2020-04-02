<template>
  <div>
    <van-field :label="label"
               readonly
               :placeholder="placeholder"
               :value="value | date"
               :class="required?'van-cell--required':''"
               @click="isShow = true" />
    <div>
      <van-popup v-model="isShow"
                 position="bottom">
        <van-datetime-picker v-model="formatValue"
                             title="选择日期"
                             type="date"
                             :min-date="new Date(1900,0,1)"
                             :max-date="formatMaxDate"
                             @confirm="onConfirmDate"
                             @cancel="isShow = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { DatetimePicker } from "vant";
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: "请选择日期"
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, String]
    },
    minDate: {
      type: [Number, String]
    },
    maxDate: {
      type: [Number, String]
    }
  },
  filters: {
    date: function(time) {
      console.log(time);
      var d = new Date(time * 1000);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      console.log(year + "." + month + "." + day);
      return year + "." + month + "." + day;
    }
  },
  computed: {
    formatValue: {
      get() {
        const timeStamp = this.value
          ? this.value
          : Math.round(new Date() / 1000);
        return this.formatTimeStamp(timeStamp);
      },
      set(e) {}
    },
    formatMinDate() {
      return this.formatTimeStamp(this.minDate);
    },
    formatMaxDate() {
      return this.formatTimeStamp(this.maxDate);
    }
  },
  methods: {
    formatTimeStamp(timeStamp) {
      if (!timeStamp) return undefined;
      let time =
        (timeStamp + "").length === 10
          ? new Date(parseInt(timeStamp) * 1000)
          : new Date(parseInt(timeStamp));
      return new Date(time);
    },
    onConfirmDate(value) {
      const $this = this;
      $this.$emit("confirm", Math.round(value / 1000));
      $this.isShow = false;
    }
  },
  components: {
    [DatetimePicker.name]: DatetimePicker
  }
};
</script>
<style scoped>
</style>
