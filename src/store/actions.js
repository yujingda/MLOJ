/**
 * vuex-mutations
 */

export default{
    saveUserName(context,username)
    {
        //context是上下文对象，指mutations
        context.commit('saveUserName',username);
    },
    saveIsAdmin(context,is_admin)
    {
        context.commit('saveIsAdmin',is_admin);
    }
}