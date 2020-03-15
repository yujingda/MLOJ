//用于封装storage
//在项目里面要使用es6规范
const STORAGE_KEY = 'mall';
export default{
    //存储值
    setItem(key,value,module_name){
        if(module_name){
            let val = this.getStorage();
            val[key] = value;
            this.setItem(module_name,val);//递归性的吧数据扔回子字段
        }
        let val = this.getStorage();//获取值
        val[key] = value;//存值
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));//重新写入,并从JSON转会字符串
    },
    //获取值，最外面的值不用获取,如果要得到的值包在多层之中，就补参数
    //获取某一模块module下面的属性key
    getItem(key,module_name){
        if(module_name){
            let val = this.getItem(module_name);
            if(val) return val[key];
        }
        return this.getStorage()[key];
    },
    //获取整个数据，浏览器的环境信息
    getStorage(){
        //JSON对于格式的定义很严格，所有key必须用双引号包上
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)||'{}')
    },
    //清空数据
    clear(key,module_name){
        let val = this.getStorage();
        if(module_name){
            if(!module_name)return;
            delete val[module_name][key];
        }
        else{
            delete val[key];
        }
        this.setItem(val);
    }
}