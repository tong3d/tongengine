<template>
    <el-container class="resourceContent">
        <el-aside :resizable="true" class="resourceSide">
            <tong-assets-tree @rightContext="onRightContext" ref="tongAssetTree" :resources="resources" @click="onSelectFolder" />
        </el-aside>
        <el-container>
          <el-header height="28px"  class="resourceHeader">
            <el-dropdown placement="bottom-start" @command="onAddCommond">
              <span class="el-dropdown-link">
                <i size='bigs' class="el-icon-plus"></i>
              </span>
              <el-dropdown-menu  class="create_dropdown" slot="dropdown">
                <el-dropdown-item size='mini' command="Js"><i  class="iconfont tong-iconjs" > JavaScript</i></el-dropdown-item>
                <el-dropdown-item command="Glsl"><i class="iconfont tong-icons" > Glsl</i></el-dropdown-item>
                <el-dropdown-item command="Animation"><i class="iconfont tong-iconrunlog" > Animation</i></el-dropdown-item>
                <el-dropdown-item command="Folder"><i class="iconfont tong-iconfolder1" > Folder</i></el-dropdown-item>
                <el-dropdown-item command="Json"><i class="iconfont tong-iconjsongeshihua" > Json</i></el-dropdown-item>
                <el-dropdown-item command="Text"><i class="iconfont tong-iconTEXT" > Text</i></el-dropdown-item>
                <el-dropdown-item command="Import" ><i class="el-icon-more-outline"> Import</i></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <i size='mini' @click="onDeleteFile" class="el-icon-delete delete-assets"></i>
            <el-input size='mini'  class="searchAssetsInfo" v-model="searchAssetInfo" :placeholder="`${$t('Search File')}...`">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-select @change="filterChange" class="selectType" size="mini" v-model="filterValue" placeholder="请选择">
              <el-option
                v-for="item in filterOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <i class="iconfont tong-iconlibrary assets-library"></i>
          </el-header>
          <el-main @contextmenu.native="fileListRightClick">
            <tong-file-list :actions="resources.actions" ref="fileList" @import="onImportFile" @click="onClickFile" :fileList="fileList" />
          </el-main>
        </el-container>
        <tong-popup-menu ref="popupContext" @select="onPopupSelect" :data="popupDatas"></tong-popup-menu>
    </el-container>
</template>
<script>
import AssetsUtils from "../js/AssetsUtils";
export default {
    data() {
      return {
        //默认不进行过滤
        filterValue:'Default',
        //类型过滤的数据
        filterOptions:[{
          value: 'Default',
          label: 'Default'
        },{
          value: 'Js',
          label: 'JavaScript'
        }, {
          value: 'Glsl',
          label: 'Glsl'
        }, {
          value: 'Txt',
          label: 'Text'
        }, {
          value: 'Json',
          label: 'Json'
        }, {
          value: 'Folder',
          label: 'Folder'
        },{
          value: 'Image',
          label: 'Picture'
        }],
        searchAssetInfo:'',
        //当前在<tong-file-list/>面板中显示的文件列表
        fileList:[],
        //当前过滤的类型
        currFilterType:'Default',
        //当前选择的文件夹数据
        selectFolderInfo:null,
        //右击菜单详情
        rightClickFolderInfo:null,
        //当前选择的文件信息
        selectFileId:0,
        rightClickFileId:0,
        dialogImageUrl: '',
        dialogVisible: false,
        scaleValue:0.1,
        fileName:'',
        //右击菜单数据
        popupDatas:{
          color:'#aaa',
          children:[
              {
                label:'新增',
                icon:'el-icon-plus',
                callback:null,
                children:[
                    {
                      label:'JavaScript',
                      icon:'iconfont tong-iconjs'
                    },
                    {
                      label:'Glsl',
                      icon:'iconfont tong-icons'
                    },
                    {
                      label:'Animation',
                      icon:'iconfont tong-iconrunlog'
                    },
                    {
                      label:'Json',
                      icon:'iconfont tong-iconjsongeshihua'
                    },
                    {
                      label:'Text',
                      icon:'iconfont tong-iconTEXT'
                    },
                    {
                      label: 'Folder',
                      icon: 'iconfont tong-iconfolder1'
                    }
                ]}
              ,
              {
                label:'删除',
                icon:'el-icon-delete',
                disabled:false
              },
              {
                label:'修改',
                icon:'el-icon-edit',
                disabled:false,
                children:[]
              },
              {
                label:'导入',
                icon:'el-icon-more-outline',
                disabled:false,
                children:[]
              },
              {
                label:'上传',
                icon:'el-icon-upload',
                disabled:false,
                children:[]
              }
          ]
        }
      }
    },
    props:{
        resources:{
            type:Object,
            default(){
                return {
                  actions:{
                    url:'',
					          data:{}
                  }
                }
            }
        }
    },
    watch:{
      searchAssetInfo(val){
        this.filterChange(this.currFilterType)
      },
      'selectFolderInfo.data.children':{
        deep:true,
        handler(){
          this.fileList=this.selectFolderInfo.data.children
          this.filterChange(this.currFilterType)
        }
      }
    },
    methods: {
      // file list面板右击菜单
      fileListRightClick(eve){
        eve.preventDefault()
        let currEle=eve.path[2]
        if(currEle.className.indexOf('img-content')===-1){
          this.popupDatas.children[1].disabled=true
          this.popupDatas.children[2].disabled=true
          this.popupDatas.children[4].disabled=true
        }else{
          this.popupDatas.children[1].disabled=false
          this.popupDatas.children[2].disabled=false
          this.popupDatas.children[4].disabled=false
          //let currFileId=currEle.getAttribute('data-file-id')
          let fileId=parseInt(currEle.getAttribute('data-file-id'))
          this.rightClickFileId=fileId
        }
        let clientX=eve.clientX
        let clientY=eve.clientY
        this.$refs.popupContext.open(clientX,clientY)
        this.rightClickFolderInfo=this.selectFolderInfo
      },
      // 根据类型添加文件
      addFile(type){
        AssetsUtils.AddFile.call(this,'未命名文件',this.rightClickFolderInfo,type).then(()=>{
              this.$refs.tongAssetTree.clickFromData(this.rightClickFolderInfo.data)
        })
      },
      // 删除文件
      deleteFile(id){
        if(this.id!=0){
          AssetsUtils.DeleteFile.call(this,id,this.resources)
        }
      },
      // 重命名文件
      renameFile(id,name){
        if(this.id!=0){
          AssetsUtils.RenameFile.call(this,id,this.resources,name)
        }
      },
      // 右键菜单弹出选择事件
      onPopupSelect(data,itemCom){
        let selectType=data.label
        switch(selectType){
          case "删除":
            this.deleteFile(this.rightClickFileId)
          break
          case "修改":
            this.renameFile(this.rightClickFileId)
          break
          case "导入":
            this.onSelectFile()
          break
          case "上传":
          break
          default:
            selectType==='JavaScript'?selectType="JS":0
            this.addFile(selectType)
        }
      },
      //tree右击菜单
      onRightContext(eve,data,node,nodeCom){
        //如果是root文件夹就不能对其进行删除修改操作
        if(data.id===1){
          this.popupDatas.children[1].disabled=true
          this.popupDatas.children[2].disabled=true
          this.popupDatas.children[4].disabled=true
        }else{
          this.popupDatas.children[1].disabled=false
          this.popupDatas.children[2].disabled=false
          this.popupDatas.children[4].disabled=false
        }
        let clientX=eve.clientX
        let clientY=eve.clientY
        this.$refs.popupContext.open(clientX,clientY)
        this.rightClickFolderInfo={data,node,nodeCom}
        this.rightClickFileId=data.id
      },
      //导入文件至当前文件夹->面板
      onImportFile(file,uploadCallback){
        let fileData = AssetsUtils.ImportFile.call(this,this.rightClickFolderInfo.data,file)
        //导入后上传
        this.$refs.fileList.$refs.upload.submit()
        uploadCallback.progress=(e,file)=>{
          let progress = Math.floor(e.percent)
          fileData.progress=progress
          fileData.status=2
        }
        //上传成功回调
        uploadCallback.success=(e,file)=>{
          fileData.status=3
          
        }
        //上传失败回调
        uploadCallback.failed=(e,file)=>{
          fileData.status=-1
          
        }
      },
      //点击选择文件后触发
      onClickFile(eve,data,ele){
        this.selectFileId=data.id
      },
      //删除文件asset file(只针对|AssetsFolder|AssetsFile|类型的布局有效)
      onDeleteFile(){
        this.deleteFile(this.selectFileId)
      },
      //根据关键字搜索与指定类型进行文件列表过滤(只针对|AssetsFolder|AssetsFile|类型的布局有效)
      filterChange(itemVal){
        this.currFilterType=itemVal
        this.fileList= this.selectFolderInfo.data.children.filter(item =>
        (itemVal==="Default" && item.label.indexOf(this.searchAssetInfo)!==-1) 
        || (AssetsUtils.ToFirstUpperCase(item.type)===this.currFilterType && item.label.indexOf(this.searchAssetInfo)!==-1) 
        || (AssetsUtils.ToFirstUpperCase(item.type)==='Text' && itemVal==='Txt' && item.label.indexOf(this.searchAssetInfo)!==-1))
      },
      //点击选择指定文件夹(只针对|AssetsFolder|AssetsFile|类型的布局有效)
      onSelectFolder(data,node,nodeCom){
        data.children=data.children || []
        //默认设置右键菜单文件夹为选择文件夹
        this.rightClickFolderInfo=this.selectFolderInfo={data,node,nodeCom}
        this.fileList=data.children
        this.filterChange(this.currFilterType)
      },
      //点击+添加文件时触发
      onAddCommond(command) {
        switch(command){
          case 'Import':
            this.onSelectFile()
            break
          default:
            this.addFile(command)
        }
      },
      onSelectFile(){
			  this.uploadBtn.click()
      },
      handleRemove(file, fileList) {
        
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.fileName=file.name
        this.dialogVisible = true
      }
    },
    mounted(){
      let uploadBtn= document.body.getElementsByClassName('asset_upload_btn')[0]
      this.uploadBtn=uploadBtn
    },
    beforeCreate(){
        const iconUrl='//at.alicdn.com/t/font_1059974_b2uwfq52son.css'
        function isHasIcon(){
            let eles=document.getElementsByTagName('link')
            for(let i=0;i<eles.length;i++){
                if(eles[i].getAttribute('href')===iconUrl){
                    return true
                }
            }
            return false
        }
       if(!isHasIcon()){
            let linkEle= document.createElement('link')
            linkEle.setAttribute('rel','stylesheet')
            linkEle.setAttribute('href',iconUrl)
            linkEle.setAttribute('type','text/css')
            document.head.appendChild(linkEle)
       }
    }
   
}
</script>
<style scoped lang='stylus'>
.resourceContent
  height: 300px
  border: 1px solid #eee
  .delete-assets
    color #5cb6ff
    margin-left 5px
  .selectType
    margin-left 5px
    font-size: 9px;
  .searchAssetsInfo
    margin-left:5px
    width:180px
  .resourceSide
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  .resourceHeader
    height:28px
    border-bottom: thin solid #dcdfe6
  .assets-library
    margin-left 5px
    color #5cb6ff
    font-size 18px
.el-dropdown-link 
    cursor: pointer
    color: #409EFF
    font-size: 16px;
  .el-icon-arrow-down
    font-size: 13px;
  .create_dropdown
    font-size 9px
    .el-dropdown-menu__item,i
      font-size: 13px;
.el-select-dropdown__item
  font-size 12px
</style>

