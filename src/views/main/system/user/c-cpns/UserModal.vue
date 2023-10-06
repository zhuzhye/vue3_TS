<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password" v-if="isNewRef">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in entirRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
              <template v-for="item in entirDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import userMainStore from "@/store/main/main";
import useSystemStore from "@/store/main/system";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
// 1.定义内部属性
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
});

const isNewRef = ref(true);
const editData = ref();

// 2.获取roles/departsments数据
const mainStore = userMainStore();
const { entirDepartments, entirRoles } = storeToRefs(mainStore);

// 3.设定定义dialogVisible的方法
const dialogVisible = ref(false);
function setModalVisble(isNew: boolean = true, itemData?: any) {
  if (!isNew && itemData) {
    isNewRef.value = isNew;
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
  dialogVisible.value = true;
}

// 4.点击确认逻辑
const systemStore = useSystemStore();
function handleConfirm() {
  if (!isNewRef.value && editData.value) {
    console.log(formData, "formData");
    systemStore.editUserDataAction(editData.value.id, formData);
  } else {
    systemStore.newUserDataAction(formData);
  }
  dialogVisible.value = false;
}
defineExpose({
  setModalVisble
});
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
