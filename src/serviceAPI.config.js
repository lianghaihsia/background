const BASEURL = "https://www.easy-mock.com/mock/5bf3c69151173f3d71de3a27/store/";

const LOCALURL = "http://localhost:3000/"
const URL = {
    getShopIndex : BASEURL + 'index', // 商城首页所有信息
    getGoodsInfo : BASEURL + 'getGoodsInfo' ,
    registerUser : LOCALURL+'user/register' ,//用户注册结果
    login : LOCALURL+'user/login',   //用户登录结果
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',   //获取商品详情
    getCategoryList : LOCALURL+'goods/getCategoryList' ,  //获取商品大类
    getCategorySubList : LOCALURL+'goods/getCategorySubList',   //获取商品二级分类
    getGoodsList : LOCALURL+'goods/getGoodsList'  , //获取二级商品列表
    upload : LOCALURL+'upload/uploadImg'   //上传图片
}

module.exports= URL;