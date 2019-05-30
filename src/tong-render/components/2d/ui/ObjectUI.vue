<script>
import Object2D from '../Object2D'
import WindowTest from '../../../core/ui/WindowTest'
export default {
    name: 'ObjectUi',
    mixins: [Object2D],
    inject: ['global'],
    props: {

    },
    methods: {
        awake ({scene2D}) {
            scene2D.load.json('window_config','static/ui/jsons/WindowTest.json')
            scene2D.load.json('button_config', 'static/ui/jsons/ButtonBlue.json')
            scene2D.load.multiatlas('window_atlas', 'static/ui/atlases/WindowTest_images.json','static/ui/atlases/')
        },
        start ({scene2D}) {
            // console.log (scene2D)
            let clip = scene2D.add.ui_component(
                this.global.game2d.cache.json.get('window_config'),
                ['window_atlas']
            )
            let window = new WindowTest(scene2D)
            window.appendClip(clip)
            clip.x=300
            clip.y=50
        }
    }
}
// rexUI
// import Object2D from "../Object2D"
// import Utils from '@/core/utils'
// let isLoadPlugin = false
// export default {
//     name: 'ObjectUi',
//     mixins: [Object2D],
//     props: {
//         type: {
//             type:String,
//             default(){
//                 return 'ObjectUI'
//             }
//         },
//         uiConfig: {
//             type:Object,
//             default(){
//                 return {key: 'rexuiplugin',
//                         url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexuiplugin.min.js',
//                         sceneKey: 'rexUI'
//                     }
//             }
//         }
//     },
//      methods:{
//         awake ({scene2D}) {
//             if (!isLoadPlugin) {
//                 isLoadPlugin = true
//                 scene2D.load.scenePlugin(this.uiConfig)
//             }
//             this.loadArgs.length > 0 && scene2D.load[Utils.lowercaseFirstLetter(this.loadType)](...this.loadArgs)
//         },
//         start ({scene2D}) {
//             if(this.args.length === 0){
//                 return 
//             }
//             let argsRes = []
//             for (let i = 0; i < this.args.length; i++){
//                 argsRes[i]=this.args[i]
//                 if (this.args[i] instanceof Function){
//                     argsRes[i]=this.args[i].call(scene2D)
//                 }
//             }
//             argsRes.length > 0 && (this.curObj = argsRes[0])
//             // argsRes.length > 0 && (this.curObj=scene2D.rexUI.add[Utils.lowercaseFirstLetter(this.type)](...argsRes))
//         }
//     }
// }
</script>
