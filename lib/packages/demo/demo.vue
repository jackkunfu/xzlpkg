<script>
  import { h, getCurrentInstance } from 'vue';
  export default {
    name: 'Repeat',
    props: {
      data: {
        type: Object | null,
        default() {
          return null;
        },
      },
    },
    setup(props, setupCtx) {
      console.log('setup   ~~~');
      console.log(props);
      console.log(setupCtx);
      console.log('setup   -----~~~~~');
      let { ctx } = getCurrentInstance();
      console.log('ctx');
      console.log(ctx);
      return () => {
        // if (ctx.data) return h('div');
        return '';
      };
    },
  };
</script>

<style></style>
