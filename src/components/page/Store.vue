<template>
  <div>
    <el-row :gutter="10">
    <el-col :offset="4" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple-light">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="店铺名称" prop="storeName">
                    <el-input v-model="formData.storeName"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="storeAddress">
                    <el-autocomplete
                    v-model="formData.storeAddress"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入地址"
                    style="width: 100%"
                    @select="addressSelect"
                    ></el-autocomplete>
                    <span>当前城市：{{city.name}}</span>
                </el-form-item>
                <el-form-item label="联系电话" prop="storePhone">
                    <el-input v-model="formData.storePhone"></el-input>
                </el-form-item>
                <el-form-item label="店铺简介" prop="storeIntro">
                    <el-input v-model="formData.storeIntro"></el-input>
                </el-form-item>
                <el-form-item label="店铺标语" prop="storeTitle">
                    <el-input v-model="formData.storeTitle"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="type">
                    <el-cascader
                        :options="categoryOptions"
                        v-model="formData.type"
                        @change="changeType"
                        change-on-select
                        style="width:100%"
                        >
                    </el-cascader>
                </el-form-item>
               <el-form-item label="营业时间" style="white-space: nowrap;">
						<el-time-select
							placeholder="起始时间"
							v-model="formData.startTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
						</el-time-select> - 
						<el-time-select
							placeholder="结束时间"
							v-model="formData.endTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
						</el-time-select>
					</el-form-item>  
                <el-form-item label="提供服务" prop="delivery" style="white-space: nowrap;">
                    <span>品牌保证</span>
                    <el-switch v-model="formData.guaranteed" ></el-switch>
                    <span>蜂鸟专送</span>  
                    <el-switch v-model="formData.hummingbird" ></el-switch>
                    <span>新开店铺</span>
                    <el-switch v-model="formData.isNew" ></el-switch>
                    <span>连锁店铺</span>                    
                    <el-switch v-model="formData.chain" ></el-switch>
                </el-form-item>
                <el-form-item  label="起送价格">
                  <el-input-number v-model="formData.startFee" @change="handleChange" :min="1" :max="10" label="起送" style="width: 60%;min-width: 50%"></el-input-number>
                </el-form-item>
                <el-form-item label="配送费">
                   <el-input-number v-model="formData.expressFee" @change="handleChange" :min="1" :max="10" label="配送价格" style="width: 60%;min-width: 50%" ></el-input-number>
                </el-form-item>
                <el-form-item label="所属菜系" prop="type" :min="1" :max="2" style="text-align: left">
                    <el-checkbox-group v-model="formData.cuisine">
                        <el-checkbox  v-for="item in cuisines" :label="item.name" :key="item" name="cuisine">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <!-- <el-form-item label="上传店铺头像">
						<el-upload
						  class="avatar-uploader"
						  :action="baseUrl + '/v1/addimg/shop'"
						  :show-file-list="false"
						  :on-success="handleShopAvatarScucess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item> -->
                <el-form-item label="上传店铺头像">
                    <el-upload
                      class="avatar-uploader"
                     :action="baseUrl + '/v1/addimg/shop'"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">  
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>         
                </el-form-item>
                <el-form-item label="上传营业执照">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="formData.business_license_image" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>         
                </el-form-item>
                <el-form-item label="上传餐饮服务许可证">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="formData.catering_service_license_image" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>         
                </el-form-item>
                <el-form-item label="优惠活动">
                    <el-select v-model="value" placeholder="请选择" @change="changeActive">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="address"
                        label="地址">
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" @click="submitForm('ruleForm')" style="margin-top: 20px;">立即创建</el-button>
                </el-form>
        </div>  
    </el-col>
    </el-row>
  </div>
</template>
<script>
import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'

export default {
  data() {
    return {
      city:[],
      // 商品分类
        categoryOptions:[],
        // 菜系
        cuisines:[{id:1,name:'湘菜'},{id:2,name:'川菜'},{id:3,name:'粤菜'},{id:4,name:'鲁菜'},{id:5,name:'其它'},],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        formData: {
        changeType:'',
        storeName: "",
        storeAddress: "", 
        storePhone: "", 
        storeIntro: "",  
        storeTitle: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        // 营业时间
        startTime:'',
        endTime:'',

        restaurants: [],
        state4: '',
        timeout:  null,
        guaranteed :false,
        hummingbird :false,
        isNew :false,
        chain :false,
        startFee:0,     //起送价格
        expressFee:0,   //配送费
        cuisine: [],    //菜系
        image_path: '',   //店铺招牌
        business_license_image:  '', // 营业执照
        catering_service_license_image: '', //上传餐饮服务许可证
        
      },
      ruleForm: {
        storeName: "",
        storeAddress: "", 
        storePhone: "", 
        storeIntro: "",  
        storeTitle: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",

        restaurants: [],
        state4: '',
        timeout:  null
      },
      rules: {
        storeName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        storeAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        storePhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
    //   表格显示数据
     tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]  
    };
  },
  mounted(){
      this.initData();
  },
  methods: {
    //   初始化数据
    async initData(){
        try {
            // 获取当前城市
            this.city = await cityGuess();
            console.log(this.city);

            // 获取分类
            const categories = await foodCategory();
            console.log(categories);
            categories.forEach(item => {
    		    if (item.sub_categories.length) {
    				const addnew = {
    					value: item.name,
						label: item.name,
						children: []
    					}
    					item.sub_categories.forEach((subitem, index) => {
    						if (index == 0) {
    							return
    						}
    						addnew.children.push({
    							value: subitem.name,
						    	label: subitem.name,
    						})
    					})
    					this.categoryOptions.push(addnew)
    					}
    				})			
        } catch (error) {
            console.log(error);
        }
    },
    changeType(value){
        console.log("value : "+value);
    },
    // 改变起送价
    changeStartFee(){
      console.log("change startFee");
    },
    // 改变配送费
    changeExpressFee(){
      console.log("change expressFee");

    },
    // 选择菜系
    checkCuisine(){
      
    },
    // 临时函数
    handleChange(){},
    //   远程搜索地址
    async querySearchAsync(queryString, cb) {
        if(queryString){
            try {
                const cityList = await searchplace(this.city.id,queryString);
                if(cityList instanceof Array){
                    cityList.map(item=>{
                        item.value = item.address;
                        console.log(item.address);
                        return item;
                    })
                    cb(cityList)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, 
   addressSelect(address){
		this.formData.latitude = address.latitude;
		this.formData.longitude = address.longitude;
		console.log(this.formData.latitude, this.formData.longitude)
	},   
    handleSelect(item){
      console.log(item);
    },
    createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },  
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    //   选择活动类型
    changeActive(){
        this.$prompt('请输入活动内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        //   inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //   inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            if(!value){
                this.$message({
                    type: 'warning ',
                    message: '活动内容不可为空'
                });
            }

             
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>
<style lang="less">
	@import '../../../static/style/mixin';

.button_submit{
		text-align: center;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
