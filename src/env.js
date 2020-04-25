// 环境文件
// 七名要规范只能用test development production
let baseURL;
switch(process.env.NODE_ENV){//用于获取Nodejs的环境变量的参数信息
    case 'development'://这个不用与代理方式
        baseURL = 'http://101.201.101.186/api';
        break;
    case 'prod':
        baseURL = '';
        break;
}

export default{//用于导出
    baseURL
}