const state = {
    data: {
        isOutterDrag:false,
        actions:{
          //上传的链接
          url:'http://jsonplaceholder.typicode.com/posts/',
          //上传的数据
          data:{}
        },
        children:[
            {
                isOpen:true,
                label: 'Root',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    type:'js',
                    label: '三级 1-1-1'
                    }, {
                    type:'txt',
                    label: '三级 1-1-2'
                    }, {
                
                label: '一级 2',
                children: [{
                    allowDrag:false,
                    type:'json',
                    label: '二级 2-1'
                }, 
                {
                    type:'glsl',
                    label: '二级 2-2'
                }]
                }, {
                    label: '一级 3',
                    isOpen:true,
                    children: [{
                        label: '二级 3-1'
                    }, 
                    {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }, {
                            label: '三级 3-2-2'
                        }, {
                            label: '三级 3-2-3'
                        }]
                    }]
                }
                ]
            }]
        }]
    }
}
const getters = {
    hierarchies(state) {
        return state.data
    }
}
const actions = {

}
const mutations = {

}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}