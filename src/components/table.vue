<template>
  <div class="operate">
    <el-button type="primary" v-if="tableIndex === '1-1'" @click="dialogForm"
      >添加商品</el-button
    >
  </div>
  <!-- 表格内容 -->
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="calc(100vh - 100px)"
    >
      <el-table-column
        label="图片"
        style="padding-left: 20px"
        width="200px"
      >
        <template #default="scope">
          <n-image style="width: 100px; height: 100px;" :src="scope.row.url1" />
        </template>
      </el-table-column>
      <el-table-column prop="date" label="名称" width="180"> </el-table-column>
      <el-table-column prop="address" label="菜品描述" width="260">
      </el-table-column>
      <el-table-column prop="name" label="价格" width="180"> </el-table-column>
      <el-table-column prop="Classification" label="分类"> </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="开关"
        v-if="tableIndex === '2-1'"
      >
        <template #default="scope">
          <el-button
            type="primary"
            :caiId="scope.row.id"
            @click="closure"
            :disabled="false"
            >关闭</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- form表单 -->
  <el-dialog title="添加商品" v-model="dialogFormVisible">
    <el-form :model="form">
      <el-form-item>
        <div class="imgUpload">
          <n-upload
            style="width:450px"
            @finish="handleFinish"
            :action="form.actionUpload"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px;">
                <n-icon size="48" :depth="1">
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
        </div> </el-form-item
      ><el-form-item label="折扣" :label-width="formLabelWidth">
        <div style="width: 25%;">
          <n-input-number v-model:value="money" :min="0"> </n-input-number>
        </div>
      </el-form-item>
      <el-form-item label="折扣价" :label-width="formLabelWidth">
        <div style="width: 25%;">
          <n-input-number v-model:value="Discountmoney" :min="0">
            <template #prefix>￥</template>
          </n-input-number>
        </div>
      </el-form-item>
      <div style="width: 40%;">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-dialog
            width="35%"
            title="添加分类"
            v-model="classData.innerVisible"
            append-to-body
          >
            <el-input
              v-model="classData.AddOptions"
              placeholder="请输入内容"
            ></el-input>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="classData.innerVisible = false"
                  >取 消</el-button
                >
                <el-button type="primary" @click="change">确 定</el-button>
              </span>
            </template>
          </el-dialog>
          <div style="display:flex">
            <div>
              <el-select
                v-model="classData.classification"
                filterable
                default-first-option
                placeholder="请选择分类"
                style="width: 200px"
              >
                <el-option
                  v-for="item in classData.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 20px;">
              <el-button @click="classData.innerVisible = true"
                >添加分类</el-button
              >
            </div>
          </div>
        </el-form-item>
      </div>
      <div style="width: 40%;">
        <el-form-item label="分类" :label-width="formLabelWidth">
          <div>
            <el-radio-group
              v-model="form.resource"
              v-for="type in optionsType"
              :key="type"
            >
              <el-radio :label="type"></el-radio>
            </el-radio-group>
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
import { ElMessage } from "element-plus";
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
  setup(props: any) {
    // 定义proxy
    // @ts-ignore
    const { proxy } = getCurrentInstance();
    // 获取商家Id
    const shopId = sessionStorage.getItem("shopId");

    // 表格内图片
    const urls = ref([
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
    ]);
    const srcList = ref([
      "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
      "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
    ]);
    // 定义表格内容类型
    // interface table {
    //   src: string;
    //   date: string;
    //   name: string;
    //   address: string;
    //   Classification: string;
    // }
    // 表格内容
    let tableData = reactive([
      {
        id: 0,
        url1:
          "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
        date: "名字",
        name: "价格",
        address: "详情",
        Classification: "分类",
      },
    ]);
    // 获取店铺商品信息
    proxy.$axios
      .post("/api/shop/checkfoodtype", { id: shopId })
      .then((res: any) => {
        // console.log(res.data)
        res.data.data.forEach((i: any) => {
          // console.log(i);
          // tableData = []
          // url.value.push(i.url);
          tableData.push({
            id: i.id,
            url1: i.url,
            date: i.name,
            name: "￥" + i.money,
            address: i.cail,
            Classification: i.tname,
          });
        });
      });
    // console.log(tableData);

    // 关闭库存
    const closure = (e: any) => {
      console.log(e);
    };

    const tableIndex: object = proxy.$attrs.tableIndex;
    // console.log(tableIndex);
    watch(tableIndex, (oldVal, newVal) => {
      // console.log(oldVal);
      // console.log(newVal);
    }); // 监测表格的index值

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
        resource: string;
      };
      formLabelWidth: string;
    }
    // state form表单内容
    const state = reactive<user>({
      dialogFormVisible: false,
      form: {
        name: "", // 商品名字
        describe: "", // 商品原料
        delivery: false,
        price: "",
        Classification: "", // 分类
        actionUpload: "/api/attachment/upload", // 图片
        resource: "", // 商家大类
      },
      formLabelWidth: "120px",
    });

    // 原价
    const value = ref(0);
    // 折扣
    const money = ref(0);
    // 折扣价
    const Discountmoney = ref(0);
    // 选择分类
    let valueData = 0;

    const classData = reactive({
      options: [
        {
          value: "素菜",
          label: "素菜",
        },
        {
          value: "荤菜",
          label: "荤菜",
        },
      ],
      classification: [],
      AddOptions: "",
      innerVisible: false,
    });

    let arr2: Array<string> = [
      // {
      // value: "",
      // label: "",
      // },
    ];

    // 请求分类
    const GetClass = () => {
      // classData.options = [];
      proxy.$axios
        .post("/api/shop/SeeFoodType", { id: shopId })
        .then((res: any) => {
          // console.log(res.data.data);
          const foodType = res.data.data;
          const foodType2 = classData.options;
          const arr: Array<string> = [];
          for (const i in foodType) {
            arr.push(foodType[i].name);
          }
          arr2 = Array.from(new Set(arr));
          classData.options = [];
          arr2.forEach((i) => {
            classData.options.push({
              value: i,
              label: i,
            });
          });
        });
    };

    let optionsType: Array<string> = [];
    proxy.$axios.post("/api/shop/seeStore", { id: shopId }).then((res: any) => {
      // console.log(res.data);
      res.data.data.forEach((i: any) => {
        // console.log(i);
        optionsType.push(i.name);
        // console.log(optionsType);
      });
    });

    // 添加商品
    const dialogForm = () => {
      state.dialogFormVisible = true;
      proxy.GetClass();
    };
    // 添加分类
    const change = () => {
      classData.innerVisible = false;
      if (classData.AddOptions != "") {
        proxy.$axios
          .post("/api/shop/AddFoodType", {
            id: shopId,
            name: classData.AddOptions,
          })
          .then((res: any) => {
            // console.log(res);
            if (res.data.code == 200) {
            }
          });
      }

      // classData.AddOptions = "";
    };

    let strArr: string = "";
    // @ts-ignore
    const handleFinish = ({ file, event }) => {
      let str = event.target.response.split(/"/);
      console.log(str[9]);
      strArr = str[9];
    };

    // 提交商品
    const determine = () => {
      // console.log(state.form)

      if (
        state.form.name != "" &&
        state.form.describe != "" &&
        classData.classification != [] &&
        value.value != 0 &&
        Discountmoney.value != 0 &&
        money.value != 0 &&
        state.form.resource != ""
      ) {
        proxy.$axios
          .post("/api/shop/AddFood", {
            name: state.form.name,
            shopid: shopId,
            cail: state.form.describe,
            value: classData.classification,
            money: value.value,
            discount: money.value,
            discount_fee: Discountmoney.value,
            url: strArr,
            NameType: state.form.resource,
          })
          .then((res: any) => {
            if (res.data.code == 200) {
              state.dialogFormVisible = false;
              ElMessage({
                message: "添加成功",
                type: "success",
              });
            } else {
              ElMessage({
                message: "请检查网络通信",
                type: "error",
              });
            }
          });
      } else {
        ElMessage({
          // showClose: true,
          message: "请填写完整的商品信息",
          type: "error",
        });
      }
    };

    return {
      tableData,
      urls,
      srcList,
      tableIndex,
      ...toRefs(state),
      value,
      determine,
      classData,
      change,
      GetClass,
      dialogForm,
      Discountmoney,
      money,
      handleFinish,
      valueData,
      optionsType,
      closure,
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
.imgUpload {
  display: flex;
  justify-content: center;
}
</style>
