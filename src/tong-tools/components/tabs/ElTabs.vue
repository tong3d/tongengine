<script>
import { Tabs } from "element-ui"
export default {
    mixins: [Tabs],
    methods: {
        handleTabRemove(pane, ev) {
            if (pane.disabled) return;
            ev.stopPropagation();
            this.$emit('edit', ev, pane.name, 'remove');
            this.$emit('tab-remove', ev, pane.name);
        },
        handleTabAdd(ev) {
            this.$emit('edit', ev, null, 'add');
            this.$emit('tab-add', ev);
        }
    }
}
</script>