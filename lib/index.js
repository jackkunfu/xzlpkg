import Repeat from './packages/Repeat.vue';

const _components = [Repeat];

_components.forEach((comp) => {
  comp.install = (app) => {
    app.component(comp.name, comp);
  };
});

export { Repeat };
export default {
  install: (app) => {
    _components.forEach((comp) => {
      app.component(comp.name, comp);
    });
  }
}
