/**
 * vuex-mutations
 * 在login模块里调用方法，在action里传输，在mutations里存储，最后navheader进行读取
 */

export default{
    saveUserName(state,username)
    {
        state.username = username;
    },
    saveIsAdmin(state,is_admin)
    {
        state.is_admin = is_admin;
    }
}