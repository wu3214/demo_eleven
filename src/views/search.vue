<template>
  <div>
    <el-autocomplete
      class="inline-input"
      v-model="inputValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
      @keyup.native.enter="setIntoStorage"
    ></el-autocomplete>
    <el-button
      circle
      size="small"
      icon="el-icon-search"
      @click="setIntoStorage"
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "userManagement",
  data() {
    return {
      //建议的数组,这里可以看成历史数据的数组，这个数组不能为空，为空的话就会报错
      restaurants: [
        {
          value: "", //必须项
          code: "",
        },
      ],
      inputValue: "",
    };
  },
  created: function () {
    // localStorage.removeItem("srcOrderNo"); //清空缓存
    // localStorage.removeItem("ReverseSort");
  },
  mounted() {},
  methods: {
    querySearch(queryString, cb) {
      //如果有缓存值，那就给历史搜索的数组赋值
      if (JSON.parse(localStorage.getItem("srcOrderNo"))) {
        this.restaurants = JSON.parse(localStorage.getItem("srcOrderNo"));
      }
      var restaurants = this.restaurants;
      //根据输入的值与历史搜索的数组进行匹配
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //点击历史搜索的数据，获取到点击的数据
    handleSelect(item) {
        this.$router.push("/result?q=" + item.value);
      console.log(item);
    },
    //回车，点击事件
    setIntoStorage() {
      if (this.inputValue == "") {
        // 提示用户
        this.$message.warning("请输入内容");
      } else if (JSON.parse(localStorage.getItem("ReverseSort"))) {
        // 判断是否有  缓存值
        var data = JSON.parse(localStorage.getItem("ReverseSort"));
        //如果已经存在输入的值，那这个值的搜索次数加一
        for (var i = 0; i < data.length; i++) {
          if (data[i].value == this.inputValue) {
            data[i].number = Number(data[i].number) + 1;
          }
        }
        function compare(property) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          };
        }
        var datas = data.sort(compare("number")).reverse(); //根据搜索次数进行倒排序
        localStorage.setItem("ReverseSort", JSON.stringify(datas)); //储存到所有历史数据中
        if (datas.length > 5) {
          //限制页面上只显示五条历史数据
          var list = datas.slice(0, 5);
          localStorage.setItem("srcOrderNo", JSON.stringify(list));
        } else {
          localStorage.setItem("srcOrderNo", JSON.stringify(datas));
        }
        //如果历史数据中不存在，则需要进行添加
        for (var i = 0; i < data.length; i++) {
          if (data[i].value == this.inputValue) {
            return;
          }
        }
        //新数据
        data.push({
          value: this.inputValue,
          code: "1",
          number: 1,
        });
        function compare1(property) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
          };
        }
        var datat = data.sort(compare1("number")).reverse();
        localStorage.setItem("ReverseSort", JSON.stringify(datat));
        if (datat.length > 5) {
          var list = datat.slice(0, 5);
          localStorage.setItem("srcOrderNo", JSON.stringify(list));
        } else {
          localStorage.setItem("srcOrderNo", JSON.stringify(datat));
        }
         // 去搜索页 携带数据
        //  console.log('有')
        this.$router.push("/result?q=" + this.inputValue);
        return
      } else {
        // 首次创建
        let str = [{ value: this.inputValue, code: "0", number: 1 }];
        //创建用于存储所有的历史搜索，计算数据输入频率的高低
        localStorage.setItem("ReverseSort", JSON.stringify(str));
        //创建用于存储页面上的历史搜索，根据计算展示搜索频率最高的数据
        localStorage.setItem("srcOrderNo", JSON.stringify(str));
         // 去搜索页 携带数据
        this.$router.push("/result?q=" + this.inputValue);
        return

      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>