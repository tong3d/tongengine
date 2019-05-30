import AssetsType from './AssetsType'
class AssetsUtils{
    static RenameFile(id,data,name){
        let that = this 
        return that.$prompt("请输入新名称：","提示：",{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue:name || ''
        }).then(({ value }) => {
            if(!value){
                return false 
            }
            //可添加ajax
            let childs= data.children
            let traversalDatas=(dataChild)=>{
                for(let i=0;i<dataChild.length;i++){
                    if(dataChild[i].id===id){
                        dataChild[i].label=value
                        break
                    }
                    dataChild[i].children && dataChild[i].children.length>0 && traversalDatas(dataChild[i].children)
                }
            }
            traversalDatas(childs)
            that.$message.success("操作成功")
        }).catch(() => {})

    }
    static DeleteFile(id,data){
        let that=this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let childs= data.children
            let traversalDatas=(dataChild)=>{
                for(let i=0;i<dataChild.length;i++){
                    if(dataChild[i].id===id){
                        dataChild.splice(i,1)
                        break
                    }
                    dataChild[i].children && dataChild[i].children.length>0 && traversalDatas(dataChild[i].children)
                }
            }
            traversalDatas(childs)
            that.$message.success("操作成功")
          }).catch(() => {
                     
          });
    }
   
    static generateUUID(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
    }

    //新增文件
    static AddFile(fileName,parant,fileType){
        let that = this 
        return that.$prompt("请输入新建的文件名：","提示：",{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue:fileName
        }).then(({ value }) => {
            if(!value){
                return false 
            }
            let currType=fileType || 'folder'
            parant.nodeCom.tree.append({type:currType,label:value},parant.node)
            that.$message.success("操作成功")
        }).catch(() => {})
    }
    //导入文件
    static ImportFile(data,file){
        let fileType=file.raw.type
        let fileTypes=fileType.split('/')
        let label=file.name.substring(0,file.name.lastIndexOf('.'))
        let fileData={type:fileTypes[0],label:label,url:file.url}
        fileData.status=1
        data.children.push(fileData)
        return fileData
    }

    static ToFirstUpperCase(str){
        return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
    }
}
export default AssetsUtils