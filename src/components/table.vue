<template>
  <div class="operate">
    <el-button
      type="primary"
      v-if="tableIndex === '1-1'"
      @click="dialogFormVisible = true"
      >添加商品</el-button
    >
  </div>
  <!-- 表格内容 -->
  <el-table :data="tableData" style="width: 100%" height="calc(100vh - 100px)">
    <el-table-column label="图片" style="padding-left: 20px" width="200px">
      <template #default="scope">
        <el-image
          style="width: 100px; height: 100px;"
          :src="url"
          :preview-src-list="srcList"
        >
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="名称" width="180"> </el-table-column>
    <el-table-column prop="name" label="价格" width="180"> </el-table-column>
    <el-table-column prop="address" label="商品描述" width="460px">
    </el-table-column>
    <el-table-column prop="Classification" label="分类"> </el-table-column>
  </el-table>

  <!-- form表单 -->
  <el-dialog title="添加商品" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item :label-width="formLabelWidth">
        
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  ref,
  watch,
  toRefs,
} from "vue";

export default defineComponent({
  setup(props, ctx) {
    // 表格内图片
    const url = ref(
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    );
    const srcList = ref([
      "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
    ]);
    // 表格内容
    const tableData = [
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "主食",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "小菜",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "面食",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
      {
        date: "猪排饭",
        name: "￥18.02",
        address: "猪肉，米饭，蔬菜",
        Classification: "汤",
      },
    ];
      // 定义proxy
    const porxy = getCurrentInstance();
    // @ts-ignore
    const tableIndex: object = porxy.attrs.tableIndex;
    console.log(tableIndex);
    watch(tableIndex, (oldVal, newVal) => {
      console.log(oldVal);
      console.log(newVal);
    });  // 获取监测表格的index值

    // 定义data
    const data = reactive({});

    // state form表单内容
    const state = reactive({
      dialogFormVisible: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    });

    return {
      tableData,
      url,
      srcList,
      tableIndex,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.operate {
  width: 100%;
  height: 40px;
  background: #fff;
  text-align: end;
  .el-button {
    margin-right: 30px;
  }
}
</style>
