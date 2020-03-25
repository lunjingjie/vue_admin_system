<template>
  <div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'Pagination',
    props: {
      currentPage: {
        default: 1,
      },
      pageSize: {
        default: 10,
      },
      total: {
        required: true,
      },
      pageSizes: {
        default: () => [10, 20, 30],
      },
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('update:pageSize', val);
      },
      handleCurrentChange(val) {
        this.$emit('update:currentPage', val);
      },
    },
  };
</script>
