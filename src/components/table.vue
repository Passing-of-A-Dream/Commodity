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
    <el-table-column prop="address" label="商品描述" width="460px">
    </el-table-column>
    <el-table-column prop="name" label="价格" width="180"> </el-table-column>
    <el-table-column prop="Classification" label="分类"> </el-table-column>
  </el-table>

  <!-- form表单 -->
  <el-dialog title="添加商品" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item>
        <div class="imgUpload">
          <n-upload style="width:450px" :action="form.actionUpload">
            <n-upload-dragger>
              <div style="margin-bottom: 12px;">
                <n-icon size="48" :depth="3">
                  <archive-icon />
                </n-icon>
              </div>
              <n-text style="font-size: 16px;"
                >点击或者拖动文件到该区域来上传</n-text
              >
              <n-p depth="3" style="margin: 8px 0 0 0;"
                >请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码</n-p
              >
            </n-upload-dragger>
          </n-upload>
        </div>
      </el-form-item>
      <div style="width: 50%">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
      </div>
      <div style="width: 80%">
        <el-form-item label="商品描述(原料)" :label-width="formLabelWidth">
          <el-input
            v-model="form.describe"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item label="价格" :label-width="formLabelWidth">
        <div style="width: 25%;">
          <n-input-number v-model:value="value" :min="0">
            <template #prefix>￥</template>
          </n-input-number>
        </div>
      </el-form-item>
      <div style="width: 40%;">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-dialog
            width="35%"
            title="添加分类"
            v-model="innerVisible"
            append-to-body
          >
            <el-input v-model="AddOptions" placeholder="请输入内容"></el-input>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" @click="change">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <div style="display:flex">
            <div>
              <el-select
                v-model="classification"
                filterable
                default-first-option
                placeholder="请选择分类"
                style="width: 200px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px;">
              <el-button @click="innerVisible = true">添加分类</el-button>
            </div>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
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

// import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'

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
    // console.log(tableIndex);
    watch(tableIndex, (oldVal, newVal) => {
      // console.log(oldVal);
      // console.log(newVal);
    }); // 获取监测表格的index值

    // 定义state表单的类型
    interface user {
      dialogFormVisible: boolean;
      form: {
        name: string;
        describe: string;
        delivery: boolean;
        price: string;
        Classification: string;
        actionUpload: string;
      };
      formLabelWidth: string;
    }
    // state form表单内容
    const state = reactive<user>({
      dialogFormVisible: false,
      form: {
        name: "",  // 商品名字
        describe: "",  // 商品原料
        delivery: false,  
        price: "",
        Classification: "",  // 分类
        actionUpload: "",  // 图片
      },
      formLabelWidth: "120px",
    });
    
    const data = reactive({})

    let shopId = sessionStorage.getItem('shopId')
    // console.log(shopId);

    let value = ref(0);
    // console.log(value.value);

    let determine = () => {
      state.dialogFormVisible = false;
    };

    return {
      tableData,
      url,
      srcList,
      tableIndex,
      ...toRefs(state),
      value,
      determine,
    };
  },
  data() {
    return {
      options: [
        {
          value: "分类1",
          label: "分类1",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      classification: [],
      AddOptions: "",
      innerVisible: false,
    };
  },
  methods: {
    change() {
      this.innerVisible = false,
      this.options.push({ value: this.AddOptions, label: this.AddOptions });
      console.log(this.options.length);
      console.log(this.classification);
      this.AddOptions = "";
    },
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
.imgUpload {
  display: flex;
  justify-content: center;
}
</style>
