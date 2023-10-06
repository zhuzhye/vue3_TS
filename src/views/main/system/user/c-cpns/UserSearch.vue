<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form size="large" label-width="80px" :model="searchForm" ref="formRef">
      <el-row :gutter="70">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入查询的用户名" v-model="searchForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input placeholder="请输入查询的真实姓名" v-model="searchForm.realname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input placeholder="请输入查询的电话号码" v-model="searchForm.cellphone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select placeholder="请选择状态" style="width: 100%" v-model="searchForm.enable">
              <el-option label="启用" :value="1" />
              <el-option label="关闭" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="日期" prop="createAt">
            <el-date-picker
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleRestClick(formRef)">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleSearch"> 查询 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const emit = defineEmits(["queryClick", "resetClick"]);

const formRef = ref<FormInstance>();
const searchForm = reactive({
  name: "",
  realname: "",
  cellphone: "",
  enable: 1,
  createAt: ""
});

function handleRestClick(formEl: FormInstance | undefined) {
  // 1.form中的数据全部重置
  formEl?.resetFields();
  // 2.发送网络请求
  emit("resetClick");
}

function handleSearch() {
  emit("queryClick", searchForm);
}
</script>

<style lang="less" scoped>
.search {
  background: white;
  padding: 20px;

  .el-form-item {
    padding: 15px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
