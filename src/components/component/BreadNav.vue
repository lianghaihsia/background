<template>
  <div class="header">
    <el-breadcrumb separator="/" class="breadcrumb">
		<el-breadcrumb-item :to="{ path: '/manage' }"></el-breadcrumb-item>
		<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
	</el-breadcrumb>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { create } from "domain";

export default {
  data() {
    return {
    };
  },
  watch: {
    $route() {
      console.log(this.$route.meta);
    }
  }
};
</script>

<style scoped>
.header{
  margin-bottom: 20px;
}
.header .el-breadcrumb{
  height: 60px;
  line-height: 60px;
  background-color: #EFF2F7;
  padding-left: 20px;

}
</style>