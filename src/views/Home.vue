<template>
  <el-container>
    <el-header
      ><div @click="getlogin" class="management">商品管理</div></el-header
    >
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :uniqueOpened="true"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template #title>
                  <i
                    class="ahh iconshiwu-1"
                    style="font-size: 20px; padding-right: 10px"
                  ></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="wtf">添加商品</el-menu-item>
                  <!-- <el-menu-item index="1-2" @click="wtf">编辑商品</el-menu-item> -->
                </el-menu-item-group>
                <!-- <el-menu-item-group>
                  <el-menu-item
                    ><i class="ahh iconjia" style="font-size: 22px"></i
                  ></el-menu-item>
                </el-menu-item-group> -->
              </el-submenu>
              <el-submenu index="2">
                <template #title>
                  <i
                    class="ahh iconicon_Stock"
                    style="font-size: 18px; padding-right: 10px"
                  ></i>
                  <span>商品库存</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="wtf">库存开关</el-menu-item>
                  <el-menu-item index="2-2" @click="wtf">分类2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <!-- <el-tabs
          v-model="editableTabsValue"
          type="card"
          editable
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
            {{ item.content }}
          </el-tab-pane>
        </el-tabs> -->
        <commodityTable
          v-if="data.index === '1-1'"
          :tableIndex="data.index"
        ></commodityTable>
        <commodityTable
          v-if="data.index === '2-1'"
          :tableIndex="data.index"
        ></commodityTable>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import commodityTable from "@/components/table.vue";

export default defineComponent({
  name: "Home",
  components: { commodityTable },
  setup(props, ctx) {
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    const route = useRouter();
    onMounted(()=> {
      // console.log(route);
    })
    

    const getlogin = () => {
      route.push("/login");
    };
    const handleOpen = (key: any, keyPath: any) => {
      // console.log(key, keyPath);
    };
    const handleClose = (key: any, keyPath: any) => {
      // console.log(key, keyPath);
    };
    const wtf = (index: any) => {
      // console.log(index.index);
      data.index = index.index;
    };
    let data = reactive({
      index: "1-1",
    });

    proxy.$axios.post("/api/index/Show_Food").then((res: any) => {
      // console.log(res);
    });

    return {
      getlogin,
      handleOpen,
      handleClose,
      wtf,
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.el-header,
.management {
  background: rgba($color: #29b8db, $alpha: 0.5);
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  // color: #333;
  text-align: center;
  height: calc(100vh - 60px);
  overflow: hidden;
  .el-menu {
    height: calc(100vh - 60px);
  }
  .tac {
    width: 400px;
    .el-col-12 {
      max-width: 100%;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: calc(100vh - 60px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
