<script>
import DisplayObject from '../DisplayObject'
import * as Phaser from 'phaser'
import Utils from '../../core/utils'
export default {
    name: 'Object2d',
    mixins: [DisplayObject],
    props: {
        uuid: {
            type:String,
            default(){
                return new Phaser.Math.RandomDataGenerator().uuid()
            }
        },
        // gameobject type
        type: {
            type:String,
            default(){
                return 'Object2D'
            }
        },
        // load assets type,default = gameobject type
        loadType: {
            type:String,
            default(){
                return this.type
            }
        },
        // add gameobject args
        args: {
            type:Array,
            default(){
                return []
            }
        },
        // load assets args
        loadArgs: {
            type:Array,
            default(){
                return [this.uuid, this.baseUrl]
            }
        }
    },
    data () {
        let defaultVal = {
            alpha: 1,
            //width: NaN,
           // height: NaN,
            name: 'Object2D',
            active: true,
            originX:0.5,
            originY:0.5,
            scaleX: 1,
            scaleY: 1,
            x: 0,
            y: 0,
            z: 0,
            angle: 0,
            flipY: false,
            flipY: false
        }
        let listeners=[]
        let curObj = this.obj
        
        return { 
            curObj,
            default:defaultVal,
            listeners,
           //exceptObjWatchs:{'width':'_width','height':'_height'}
        }
    },
    methods:{
        awake ({scene2D}){
            if(this.loadType==='Object2D') return
            this.loadArgs.length > 0 && scene2D.load[Utils.lowercaseFirstLetter(this.loadType)](...this.loadArgs)
        },
        start ({scene2D}){
            if(this.type==='Object2D') return
            this.args.length > 0 && (this.curObj=scene2D.add[Utils.lowercaseFirstLetter(this.type)](...this.args))
        },
        onAttachEve(){
            if(!this.curObj){
                return
            }
            for(let key in this.listeners){
                let name =this.listeners[key]
                let upperName=name.substring(0,1).toUpperCase()+name.substring(1)
                this.curObj.on(name,(eve)=>{
                    if(this[`on${upperName}`]){
                        this[`on${upperName}`](eve)
                    }
                    this.$emit(name,eve)
                })
            }
        },
        onAddObj(){
            // if(this.parentObj && this.curObj){
            //     this.parentObj.addChild(this.curObj)
            // }
        },
        onRemoveObj(){
            // if (this.parentObj && this.curObj) {
            //     this.parentObj.removeChild(this.curObj)
            // }
        }
    }
}
</script>
