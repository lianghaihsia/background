<template>
    <div>
        <el-table
            :data="goodList"
            border
            stripe
            style="width: 100%;margin-left: 20px;padding-right: 20px;"
            >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form ref="form" lable-position="left" inline class="demo-table-expand" >
                        <el-form-item label="店铺名称">
                            <span>效果演示</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>店铺地址</span>
                        </el-form-item>
                        <el-form-item label="店铺介绍">
                            <span>正宗湘菜</span>
                        </el-form-item>
                        <el-form-item label="店铺ID">
                            <span></span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>123456789</span>
                        </el-form-item>
                        <el-form-item label="评分">
                            <span>4.5</span>
                        </el-form-item>
                        <el-form-item label="销量">
                            <span>785</span>
                        </el-form-item>
                        <el-form-item label="分类">
                            <span>湘菜</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
            prop="NAME"
            label="店铺名称"
            width="180"
            >
            </el-table-column>
            <el-table-column
            prop="storeList"
            label="店铺地址"
            width="180">
            </el-table-column>
            <el-table-column
            prop="storeIntro"
            label="店铺介绍">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">添加商铺</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                categorySubId: '2c9f6c94626a435f01626a4a7f590000',
                currentPage:1,
                pageSize:4,   //每页显示数据条数
                total:1,
                tableData: [{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    },{
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    storeName: '2016-05-02',
                    storeList: '王小虎',
                    storeIntro: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                goodList:[]
            }
        },
        mounted(){
            this.getList()
            // this.total = this.tableData.length;
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                 this.currentPage = val;
                console.log("currentPage");
                console.log(`当前页: ${val}`);
                this.getList()
            },
            getList(){

                axios({
                    url: url.getGoodsList,
                    method: 'post',
                    data:{
                    categorySubId : this.categorySubId,
                    pageSize: this.pageSize,
                    page: this.page
                    }
                })
                .then((response)=>{
                    if(response.data.code == 200 && response.data.message && response.data.message.length){
                    this.page++;
                    this.goodList = this.goodList.concat(response.data.message);
                    }else{
                    // 数据请求完成
                    this.finished = true;
                    }
                    this.loading = false;
                })
                .catch(error =>{
                    console.log(error);
                });

            }
        },
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }

    .pagination{
        margin-top: 30px;
        text-align: left;
    }
</style>