<template>
  <div>
    <el-container>
      <el-header
        width=""
        height="40px"
      >
        <div
          class="logo"
          width="280px"
        >
          <img
            class="hd-logo"
            src="/static/images/logo.png"
            alt=""
          >
        </div>
        <div class="hd-user">
          <div></div>
          <div class="userInfo">
            <el-dropdown class="hd-user-item">
              <span class="el-dropdown-link">
                当前用户<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="hd-user-item">首页</div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="280px">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            router
            
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-picture-outline"></i>
                <span>商铺管理</span>
              </template>
              <el-menu-item index="poster">添加商铺</el-menu-item>
            </el-submenu>
            <el-submenu index=2>
              <template slot="title"><i class="el-icon-goods"></i> <span>商品管理</span> </template>
              <el-menu-item index="/goods">商品管理</el-menu-item>

            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-document"></i>订单管理</template>
              <el-menu-item index="order">订单管理</el-menu-item>
            </el-submenu>
            <!-- 会员管理 -->
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-service"></i>会员管理</template>
              <el-menu-item index="member">会员管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <breadNav></breadNav>
          <transition
            name="move"
            mode="out-in"
          >
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
var pathToRegexp = require("path-to-regexp");
import breadNav from "../component/BreadNav";

export default {
  data() {
    return {
      // 面包屑导航
      levelList: [],
      navBar: [
        {
          id: 1,
          name: "海报管理",
          hasChild: true,
          sub: [{ id: 10, name: "首页海报", link: "/poster" }]
        },
        {
          id: 2,
          name: "商品管理",
          hasChild: false,
          sub: [{ id: 10, name: "全部商品", link: "/poster" }]
        },
        {
          id: 3,
          name: "订单管理",
          hasChild: false,
          sub: [{ id: 10, name: "全部订单", link: "/poster" }]
        }
      ],
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "Order",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "Goods",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2,
      active: 0
    };
  },
  components: {
    breadNav
  },
  computed: {
    defaultActive: function() {
      console.log("2222222");
      console.log(this.$route.path.replace("/", ""));
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // this.changeTabBarActive();
  },
  watch: {},
  methods: {
    handleOpen() {
      console.log("open");
    },
    handleClose() {
      console.log("close");
    }
  }
};
</script>

<style scoped>
.index-main {
  padding: 0 20px;
}
.el-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  width: 280px;
  /* background-color: #545c64; */
}
.hd-logo {
  width: 100px;
  height: 40px;
}
.hd-user {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #444;
}
.hd-user .userInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hd-user .userInfo .hd-user-item {
  padding: 0 22px;
}

.el-main{
  padding: 0 20px 20px 0;
}
</style>