<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <page-title>{{module.name}}</page-title>
    <search-list>
      <v-row>
        <v-col cols="3" style="padding: 0px !important;">
          <v-autocomplete
            v-model="name"
            clearable
            @click:clear="clearSelect"
            :items="nameItems"
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="filter label"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </search-list>
    <v-data-table
      fixed-header
      :headers="headers"
      :items="desserts"
      :height="screenheight - 350"
      class="elevation-1 mx-3 mt-4"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
              <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="addRecord">{{module.addItem}}</v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary" dense>
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="save" depressed>
                    <v-icon left>mdi-content-save</v-icon>
                    save
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-card style="padding: 30px 100px;">
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-text-field :rules="textRules"
                                        required
                                        v-model="editedItem.name"
                                        label="name*(必填)"
                                        hide-details
                                        class="mt-4"></v-text-field>
                          <v-text-field v-model="editedItem.age"
                                        :rules="textRules"
                                        required
                                        hide-details
                                        label="age*(必填)"
                                        class="mt-4"></v-text-field>
                          <v-select v-model="editedItem.sex"
                                    :rules="textRules"
                                    required
                                    hide-details
                                    clearable
                                    :items="sexItems"
                                    label="sex*(必填)"
                                    class="mt-4"></v-select>
                        </v-form>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!--数据列-->
      <template v-slot:item.name="{ item }">
        <span style="text-align: center;">{{ resolveBlank(item.name) }}</span>
      </template>
      <template v-slot:item.age="{ item }">
        <span style="text-align: center;">{{ resolveBlank(item.age) }}</span>
      </template>
      <template v-slot:item.sex="{ item }">
        <span style="text-align: center;">{{ resolveBlank(item.sex) }}</span>
      </template>
      <!--修改、删除操作-->
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="primary">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
      <!--没有数据显示-->
      <template v-slot:no-data>
        暂无数据显示!
      </template>
    </v-data-table>
    <v-snackbar
      v-model="snackbarObj.snackbar"
      top
      :color="snackbarObj.snackbarSuccess ? '' : 'error'"
      style="margin-top: 50px;"
      :timeout="3000"
    >
      {{ snackbarObj.snackbarText }}
    </v-snackbar>
  </div>
</template>
<script>
  import PageTitle from '@/components/page-title/index.vue';
  import SearchList from '@/components/search-list/index.vue';
  import snackbarMixin from '@/mixins/snackbar';

  export default {
    name: 'TableCrud',
    components: {
      SearchList,
      PageTitle,
    },
    mixins: [snackbarMixin],
    data() {
      return {
        // 模块名称集合
        module: {
          name: 'title',
          addItem: 'add Item',
          addTitle: 'new Item',
          editTitle: 'edit Item',
        },
        // 提示框
        snackbarObj: {
          snackbar: false,
          snackbarText: '',
          snackbarSuccess: false,
        },
        // 筛选条件
        name: '',
        nameItems: [],
        // 校验表单
        valid: true,
        textRules: [
          v => !!v || '这是必填项，请输入内容!',
        ],
        // dataTable变量
        headers: [],
        desserts: [],
        dataList: [],
        editedItem: {
          name: '',
          age: '',
          sex: '',
          id: '',
        },
        // 添加、修改内容模态框
        dialog: false,
        sexItems: [
          {
            text: 'male',
            value: 'male',
          },
          {
            text: 'female',
            value: 'female',
          },
        ],
        // 添加、修改标志
        editedIndex: -1,
        // 获取屏幕高度
        screenheight: document.body.clientHeight,
      };
    },
    mounted() {
      this.setHeaderAndDefaultItem();
      this.getAllRecord();
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? this.module.addTitle : this.module.editTitle;
      },
      filterData() {
        return [
          {
            name: 'name',
            value: this.name,
          },
        ];
      },
    },
    watch: {
      name(val) {
        if (val !== undefined) {
          this.filterCheck();
        }
      },
    },
    methods: {
      filterCheck() {
        const arr = this.filterData.filter(data => data.value !== '' && data.value !== undefined);
        let result = this.dataList;
        arr.forEach((condit) => {
          result = result.filter(re => re[condit.name] === condit.value);
        });
        this.desserts = result;
      },
      setHeaderAndDefaultItem() {
        this.headers = [
          { text: 'name', value: 'name', align: 'center' },
          { text: 'age', value: 'age', align: 'center' },
          {
            text: 'sex', value: 'sex', sortable: false, align: 'center',
          },
          {
            text: 'action', value: 'action', sortable: false, align: 'center',
          },
        ];
      },
      async getAllRecord() {
        const data = [{
          name: 'Amy',
          age: '18',
          sex: 'female',
        }, {
          name: 'Danny',
          age: '21',
          sex: 'male',
        }];
        this.dataList = data;
        this.filterCheck();
        this.nameItems = data.map(item => ({
          text: item.name,
          value: item.name,
        }));
        this.screenheight = document.body.clientHeight;
        window.onresize = () => {
          this.screenheight = document.body.clientHeight;
        };
      },
      async deleteItem(item) {
        // eslint-disable-next-line no-restricted-globals
        const value = confirm('是否删除该记录?');
        if (value) {
          try {
            // 异步请求
            const data = true;
            if (data) {
              this.getAllRecord();
              this.snackbarObj = this.successToolTips('删除成功!');
            }
          } catch (e) {
            this.snackbarObj = this.failedToolTips('删除失败!');
          }
        }
      },
      async editItem(item) {
        // eslint-disable-next-line no-param-reassign
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.editedItem.relation = [];
        this.dialog = true;
      },
      clearSelect() {
        this.name = '';
        this.getAllRecord();
        this.filterCheck();
      },
      addRecord() {
        this.editedIndex = -1;
        this.editedItem = {
          name: '',
          age: '',
          sex: '',
          id: '',
        };
      },
      async save() {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            // 校验通过，修改操作
            try {
              const params = {
                name: this.editedItem.name,
                age: this.editedItem.age,
                sex: this.editedItem.sex,
                id: this.editedItem.id,
              };
              console.log(params);
              // 请求接口
              const data = true;
              if (data) {
                // 重新请求列表数据
                this.getAllRecord();
                this.snackbarObj = this.successToolTips('修改成功!');
                this.close();
              }
            } catch (e) {
              this.snackbarObj = this.failedToolTips('修改失败!');
              this.close();
            }
          } else {
            // 校验通过，添加操作
            try {
              const params = {
                name: this.editedItem.name,
                age: this.editedItem.age,
                sex: this.editedItem.sex,
              };
              console.log(params);
              //  请求接口
              const data = true;
              if (data) {
                // 重新请求列表数据
                this.getAllRecord();
                this.snackbarObj = this.successToolTips('保存成功!');
                this.close();
              }
            } catch (e) {
              this.snackbarObj = this.failedToolTips('保存失败!');
              this.close();
            }
          }
        } else {
          this.snackbarObj = this.normalToolTips();
        }
      },
      close() {
        this.dialog = false;
      },
      resolveBlank(data) {
        if (data === null || data === undefined || data === '') {
          return '--';
        }
        return data;
      },
    },
  };
</script>
