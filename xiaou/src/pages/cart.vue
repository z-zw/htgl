<template>
  <div>
     <div class="wrap" id="app" v-cloak>
        <header>
            <!-- arrow -->
            <div class="arrow">
                
            </div>
            <div class="text">
                购物车
            </div>
            <!-- 设置 -->
            <div class="set">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
        <div class="car-goods " v-for="(item,index) in shoplist " :key="item.id">
            <div class="icons">
                <input type="checkbox" v-model="item.checked">
            </div>
            <img :src="item.img" alt="">
            <div class=" first ">
                <p class="one">{{item.name}}</p>
                <p class="two">规格：50g</p>
                <p class="three">&yen;{{(item.num*item.price).toFixed(2)}}</p>
            </div>
            <div class="right">
                <span class="one" @click="jian(index)">-</span>
                <span class="two">{{item.num}}</span>
                <span class="three" @click="add(index)">+</span>
            </div>
        </div>

        <div class="car-goods car-three">
            <div class="left-one">
                <div class="icons">
                    <input type="checkbox" v-model="allChecked" @change="allcheck">
                </div>
                <span>全选</span>
            </div>
            <div class="center-one">
                <p>
                    <span class="text-one">总计：</span><span class="text-two">{{allPrice.toFixed(2)}}</span>
                </p>
                <p class="text-three">不含运费，已优惠&yen;0.00</p>
            </div>
            <div class="right-one">
                去结算({{allNum+"件"}})
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
       allChecked: false,
                shoplist: [{
                        id: "11",
                        name: "双面使用榻",
                        img: "https://img.alicdn.com/imgextra/i3/1914575403/TB2Y1CoqQ9WBuNjSspeXXaz5VXa_!!1914575403-0-beehive-scenes.jpg_360x360xzq90.jpg_.webp",
                        price: 20.00,
                        num: 2,
                        checked: false
                    },
                    {
                        id: "22",
                        name: "YSL",
                        img: "https://img.alicdn.com/imgextra/i1/2869961377/O1CN011M2hr0zicuS08Hz_!!2869961377-0-beehive-scenes.jpg_360x360xzq90.jpg_.webp",
                        price: 199.90,
                        num: 1,
                        checked: false
                    },
                    {
                        id: "33",
                        name: "书包",
                        img: "https://img.alicdn.com/bao/uploaded/TB28TQ1nrBmpuFjSZFAXXaQ0pXa_!!2996832334.png_360x360xzq90.jpg_.webp",
                        price: 99.99,
                        num: 1,
                        checked: false
                    },
                    {
                        id: "44",
                        name: "紫砂壶",
                        img: "https://gma.alicdn.com/bao/uploaded/i1/105572165/O1CN01FjUckR1Rrc2VySFfp_!!0-saturn_solar.jpg_400x400.jpg_.webp",
                        price: 300,
                        num: 1,
                        checked: false
                    }
                ]
    };
  },
  computed: {
                allPrice() {
                    var sum = 0;
                    var arr = this.shoplist.filter(item => item.checked);
                    arr.forEach(item => {
                        sum += item.price * item.num
                    })
                    return sum;
                },
                allNum(){
                    var sum = 0;
                    var arr = this.shoplist.filter(item => item.checked);
                    arr.forEach(item => {
                        sum += item.num
                    })
                    return sum;
                }
            },
            watch: {
                shoplist: {
                    handler() {
                        this.allChecked = this.shoplist.every(item => item.checked);
                    },
                    deep: true
                }
            },
            methods: {
                add(i) {
                    var json = this.shoplist[i];
                    json.num++;
                    json.num = Math.min(json.num, 5);
                    this.$set(this.shoplist, i, json)
                },
                jian(i) {
                    this.shoplist[i].num--;
                    this.shoplist[i].num = Math.max(this.shoplist[i].num, 1);
                },
                allcheck(){
                    this.shoplist.forEach((item,index)=>{
                        item.checked = this.allChecked
                    })
                }
            }
};
</script>
<style scoped>
@import "../assets/css/shoppingcar.css";
[v-cloak] {
  display: none;
}
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  background-color: #fff;
  -webkit-appearance: none;
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  outline: none;
}

input[type="checkbox"]:checked {
  border: 1px solid rgb(250, 82, 82);
  background: url('../assets/images/gw_03.jpg') no-repeat center;
}
.car-three{
    width: 100%;
    position: fixed;
    bottom: 1.1rem;
}
</style>