
    
<template>
	<div class="img-list">
		<div @click="onClickFile($event,item)" class="img-content" :item="item.id" :data-file-id="item.id"  :class="currItemId===item.id?'click':''" v-for="(item,key) in fileList" :key="key">
			<el-badge v-if="item.status!==3" is-dot type="danger" class="status-badge"/>
			<component :item="item" :is="'tong-'+item.type.toLowerCase()" ></component>
			<div v-if="item.status===2 && item.progress !== 0" class="img-content img-progress">
				<el-progress :width="80" :height="80" type="circle" :percentage="item.progress" :status="proStatus(item)"></el-progress>
			</div>
		</div>
		<div class="img-upload">
			<el-upload class="uploader" 
			  ref="upload"
			  list-type="picture"
			  :show-file-list="false"
			  :action="actions.url"
			  :data="actions.data"
			  :auto-upload="false"
			  :on-change="uploadOnChange"
			  :on-success="uploadOnSuccess"
			  :on-error="uploadOnError"
			  :on-progress="uploadOnProgress">
			  <el-button  slot="trigger" ref="selectFile" size='mini' type="success" class="asset_upload_btn" icon="el-icon-plus" ></el-button>
			</el-upload>
		</div>
		<!-- <el-dialog title="" :visible.sync="isEnlargeImage" size="medium" :modal-append-to-body="false" top="8%" width="60%">
			<img @click="isEnlargeImage = false" style="width:100% " :src="enlargeImage">
		</el-dialog> -->
	</div>
</template>

<script>
export default{
	name: 'file-list',
	props:{
		fileList:{
			type:Array,
			default(){
				return []
			}
		},
		actions:{
			type:Object,
			default(){
				return {
					url:'',
					data:{}
				}
			}
		}
	},
	data(){
		return {
			isEnlargeImage: false,//放大图片
			enlargeImage: '',//放大图片地址
			currItemId:-1,
			uploadCallback:{
				failed:null,
				success:null,
				progress:null
			}
		}
	},
	
	methods: {
		proStatus(item){//上传状态
			if(item.status===3){
				return 'success'
			}else if(item.status===-1){
				return 'exception'
			}else{
				return 'text'
			}
		},
		onClickFile(eve,data){
			let currEle= eve.currentTarget
			this.currItemId=data.id
			this.$emit('click',eve,data,currEle)
		},
		uploadOnProgress(e,file){//开始上传
			
			this.uploadCallback.progress && this.uploadCallback.progress(e,file)
		},
		uploadOnChange(file){
			if(file.status == 'ready'){
				
				this.$emit('import',file,this.uploadCallback)
			}else if(file.status == 'fail'){
				this.$message.error("导入错误，请重试！")
			}
		},
		uploadOnSuccess(e,file){//上传附件
			
			this.$message.success("上传成功")
			this.uploadCallback.success && this.uploadCallback.success(e,file)
			
		},
		uploadOnError(e,file){
			//this.pass = false 
			this.uploadCallback.failed && this.uploadCallback.failed(e,file)
		 }
		//,
		// handleFileEnlarge(_url){//放大图片
		// 	if(_url){
		// 		this.enlargeImage = _url 
		// 		this.isEnlargeImage = !this.isEnlargeImage 
		// 	}
		// }
	}
}
</script>

<style lang='stylus' scoped>
contentWidth=100px
contentHeight=130px
imageWidth=100%
imageHeight=95px
layerHeight=100px
eyesMagin=layerHeight/2
layerIconSize=1em
*
	box-sizing border-box
.img-list
	overflow hidden
	width 100%
	>>> .img-content
		float left
		text-align left
		position relative
		display inline-block
		width contentWidth 
		height contentHeight 
		padding 5px 
		margin 5px 20px 20px 0 
		border 0px solid #d1dbe5 
		border-radius 4px 
		transition all .3s 
		box-shadow 0 0px 0px 0 rgba(0,0,0,.12), 0 0 0px 0 rgba(0,0,0,.04) 
		img
			display block 
			width imageWidth 
			height imageHeight 
			margin 0 auto 
			border-radius 4px 
		.label
			font-size:10px
			position absolute
			width 100% 
			left: 0
			text-align center  
			text-overflow ellipsis 
			overflow hidden 
			height 20px 
			line-height 20px
			margin-top 3px
		.status-badge
			position absolute
			left 10px
			top 1px
		&:hover
			.label
				border-radius 12px
				color #fff
				background-color #ccc
		&.click
			.label
				border-radius 12px
				color #fff
				background-color #6fc1ff
	>>> .img-upload
		float left 
		width contentWidth 
		height contentHeight 
		display table 
		text-align center 
		.asset_upload_btn
			display none
	>>> .uploader
		width 100% 
		display table-cell 
		vertical-align middle 
	>>> .img-progress
		text-align center 
		position absolute
		top 0px
		left 0px
</style>