<script>
import Object2D from './Object2D'
import * as Phaser from 'phaser'
export default {
    name: 'Texture2d',
    mixins: [Object2D],
    props: {
        type: {
            type:String,
            default(){
                return 'Image'
            }
        },
        args: {
            type:Array,
            default(){
                return [0,0,this.uuid]
            }
        }
    }
}
</script>
