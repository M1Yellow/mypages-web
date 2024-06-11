<template>
  <!-- 默认加载的 opinion 列表 -->
  <div v-if="isShowDefault && opinions && opinions.length > 0" class="platform_opinion">
    <platform-opinion-item v-for="(opinionItem, idx) in opinions" v-bind:opinionItem="opinionItem"
                           v-bind:idx="idx">
    </platform-opinion-item>
  </div>
  <!-- 点击展开，分页加载的剩余 opinion 列表 -->
  <div v-if="isShowMore && moreOpinions && moreOpinions.length > 0" class="platform_opinion">
    <platform-opinion-item v-for="(opinionItem, idx) in moreOpinions" v-bind:opinionItem="opinionItem"
                           v-bind:idx="idx">
    </platform-opinion-item>
  </div>
  <!-- 是否显示“展开”按钮 -->
  <div v-if="isShowMoreBtn">
    <div v-if="!isShowMore" class="opinion_up_down">
      <i title="展开" >
        <svg-icon iconName="xia2" className="opinion_down" v-on:click="opinionToggle"></svg-icon>
      </i>
    </div>
    <div v-if="isShowMore" class="opinion_up_down">
      <i title="收起" >
        <svg-icon iconName="shang2" className="opinion_up" v-on:click="opinionToggle"></svg-icon>
      </i>
    </div>
  </div>
</template>

<script>
import PlatformOpinionItem from "@/components/PlatformContent/PlatformOpinionItem";
import {getOpinionList} from "@/api/user";

export default {
  name: "PlatformOpinion",
  data() {
    return {
      isShowDefault: true, // 是否显示默认内容，因为观点列表返回的是整页数据，查到数据时，默认数据需要隐藏，收起时，再显示
      isShowMoreBtn: true, // 是否显示展开按钮，点击展开查询结果为空时，即没有更多记录，把展开按钮隐藏
      isShowMore: false, // 是否显示更多内容，用于控制显示展开还是收起
      moreOpinions: null, // 更多观点
    };
  },
  props: ['opinions', 'platformId', 'typeId', 'userOpinionListSize'],
  inject: ['userId'],
  components: {
    PlatformOpinionItem
  },
  methods: {
    opinionToggle(e) {
      //this.isShowMore = !this.isShowMore;
      if (!this.isShowMore) { // 展开，显示更多内容
        if (!this.moreOpinions) {
          this.getMoreOpinions();
        }
        // TODO 这里结果还没返回，就已经执行了判断。导致第一次点击没反应，在请求接口响应的地方也加上判断
        if (this.moreOpinions && this.moreOpinions.length > 0) {
          // 隐藏展开按钮
          //this.isShowMoreBtn = false;
          // 隐藏默认内容
          this.isShowDefault = false;
          // 显示更多内容
          this.isShowMore = true;
        }
      } else { // 收起，即不显示更多内容
        // 显示默认内容
        this.isShowDefault = true;
        // 不显示更多内容
        this.isShowMore = false;
      }
    },
    getMoreOpinions() {
      // 封装参数
      let params = {
        userId: this.userId,
        platformId: this.platformId,
        typeId: this.typeId,
      }

      if (process.env.VUE_APP_ENV !== "prod") {
        console.log(">>>> getMoreOpinions params:", JSON.stringify(params));
      }

      getOpinionList(params).then(res => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(">>>> getMoreOpinions response:", JSON.stringify(res));
        }
        if (res && res.data && res.data.records) {
          this.moreOpinions = res.data.records;

          if (this.moreOpinions && this.moreOpinions.length > 0) {
            // 隐藏展开按钮
            //this.isShowMoreBtn = false;
            // 隐藏默认内容
            this.isShowDefault = false;
            // 显示更多内容
            this.isShowMore = true;
          }

        }
      }).catch(e => {
        if (process.env.VUE_APP_ENV !== "prod") {
          console.log(e);
        }
      });

    },
  }
}
</script>

<style scoped>
.platform_opinion {
  padding: 5px 10px 5px 10px;
}

.opinion_up_down {
  text-align: center;
}

.opinion_up, .opinion_down {
  cursor: pointer;
  /*padding: 5px;*/
  color: #8a8a8a;
  /*transform: rotate(-90deg); /* 逆时针旋转90° */
}

</style>
