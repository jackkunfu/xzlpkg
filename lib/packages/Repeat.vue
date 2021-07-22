<script>
  import { h, getCurrentInstance, reactive } from 'vue';
  let Repeat = {
    name: 'Repeat',
    emits: ['del'],
    props: {
      data: {
        type: Object,
        default: null,
      },
      idx: {
        type: Number,
        default: null,
      },
      w: {
        type: Number,
        default: null,
      },
    },
    setup(props, setupCtx) {
      // console.log('props');
      // console.log(props);
      // console.log('setupCtx');
      // console.log(setupCtx);
      let { ctx } = getCurrentInstance();
      // console.log('instance');
      // console.log(instance);

      let data = reactive(ctx.data);
      if (!data.list) data.list = [];
      if (data.lv === undefined) {
        data.lv = 0;
        data.del = false;
      }

      let title = `单击增加子节点${data.del ? '，双击删除' : ''}`;

      let clickTimer = null; // 增加延时避免单击事件影响双击事件的触发
      let clearClickTimer = () => {
        if (clickTimer) {
          clearTimeout(clickTimer);
          clickTimer = null;
        }
      };

      return () => {
        let hname = h(
          'div',
          {
            title,
            style: 'user-select: none;',
            ondblclick: () => {
              // console.log('双击了', data);
              clearClickTimer(); // 如果是双击清除单击的延时执行计时器，避免单击的执行
              if (data.lv === 0) return alert('顶级不能删除');
              if (confirm('确认删除？存在的子集也会清除')) {
                console.log('confirm');
                console.log(props);
                setupCtx.emit('del', props.idx);
              }
            },
            onclick: (e) => {
              // 双击的时候会触发两次，这里处理双击的第二次点击触发的延时清除
              clearClickTimer();

              // setTimeout 延时执行 避免影响双击功能
              clickTimer = setTimeout(() => {
                // e.preventDefault();
                if (!data.name) {
                  let str = prompt('输入节点名称');
                  data.name = str ? str.trim() : '';
                  return;
                }
                data.list.push({
                  lv: data.lv + 1,
                  del: true,
                });
              }, 250);
            },
          },
          data.name || '设置名称'
        );
        let hchilds = [hname];
        let list = data.list || [];
        let len = list.length;
        let hlist = h(
          'div',
          { class: 'list' },
          list.map((el, i) =>
            h(Repeat, {
              data: el,
              idx: i,
              w: 100 / (len == 0 ? 1 : len), // 父级中根据列表长度告知子集 Repeat 组件应该平均占比多少，这里子集组件的 props 中传递过去
              // 子集 Repeat 组件 emit 出来的事件 加上 on 前缀，驼峰形式，定义在子集组件的 属性上 （h 函数的第二个）
              onDel: (i) => {
                console.log(i);
                console.log(props);
                data.list.splice(i, 1);
              },
            })
          )
        );
        if (list.length) hchilds.push(hlist);
        return h(
          'div',
          { class: 'item', style: `width: ${props.w || 100}%` }, // 当前渲染父级的 item 的 width 不能直接用 w ，须取 props 中父级告诉当前子集对象的长度百分比
          hchilds
        );
      };
    },
  };
  export default Repeat;
</script>

<style>
  .item {
    padding: 10px;
    border: 1px solid;
  }
  .item .list {
    display: flex;
    text-align: center;
    align-content: space-around;
  }
</style>
