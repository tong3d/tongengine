<script>
import { Image } from "element-ui"
export default {
    mixins: [Image],
    mounted() {
        this.$el.removeAttribute('class')
    }
}
</script>
