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
                    <el-switch v-model="formData.delivery" ></el-switch>
                    <span>蜂鸟专送</span>
                    <el-switch v-model="formData.delivery" ></el-switch>
                    <span>新开店铺</span>
                    <el-switch v-model="formData.delivery" ></el-switch>
                    <span>连锁店铺</span>                    
                    <el-switch v-model="formData.delivery" ></el-switch>
                </el-form-item>
                <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="formData.type">
                    <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                    <el-checkbox label="地推活动" name="type"></el-checkbox>
                    <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="formData.resource">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="formData.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
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
      }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>