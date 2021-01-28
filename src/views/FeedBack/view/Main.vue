<template>
  <div class="feedback">
    <!-- head -->
    <Tab-navigation></Tab-navigation>
    <!-- content -->
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请填写标题" ></el-input>
        </el-form-item>
        <el-form-item label="内容" >
          <el-input type="textarea"  v-model="form.content" placeholder="请填写反馈内容..." ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
const Navigation = () => import("@/components/tab/navigation.vue");
export default {
  components: {
    "Tab-navigation": Navigation,
  },
  name: "feedback",
  data() {
    return {
      msg: "反馈留言",
      form: {
          title: '',
          content: ''
        }
    };
  },
  methods: {
    onSubmit() {
      const params = this.form
      this.$Request
        .requestPost(params, this.$api.feedback.add)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "success",
            center: true,
          });
          this.form.title = ''
          this.form.content = ''
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Controller(name, type) {
      switch (name) {
        case "home":
          this.$router.push("/");
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="less">
@color-border:rgba(204,204,204,0.6);
@color-bg: #ffffff;
@color-text-black: #333333;
@color-text-gray: #cccccc;
.content {
  margin-top: 200px;
  padding:0 15vw;
}

</style>
