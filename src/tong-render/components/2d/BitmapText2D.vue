<script>
import Object2D from './Object2D'
import * as Phaser from 'phaser'
export default {
    name: 'BitmapText2d',
    mixins: [Object2D],
    props: {
        type: {
            type:String,
            default(){
                return 'BitmapText'
            }
        },
        loadType: {
            type:String,
            default(){
                return 'BitmapFont'
            }
        },
        loadArgs: {
            type:Array,
            default(){
                return [this.uuid,'./static/fonts/bitmap/azo-fire.png', './static/fonts/bitmap/azo-fire.xml']
            }
        },
        args: {
            type:Array,
            default(){
                return [0, 0,this.uuid,'HelloWorld']
            }
        }
    }
}
</script>
