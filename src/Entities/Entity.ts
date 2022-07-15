export class Entity {
  id: string;
  components: Map<string, any> = new Map();
  componentTypes: string[] = [];

  constructor(id: string) {
    this.id = id;
  }

  addComponent = <ComponentType>(
    componentType: string,
    component: ComponentType
  ): void => {
    // TODO: maybe check if component type already set?
    this.componentTypes.push(componentType);
    this.components.set(componentType, component);
  };

  getComponent = <ComponentType>(componentType: string): ComponentType => {
    return this.components.get(componentType);
  };

  removeComponent = (componentType: string): void => {
    // TODO
  };
}
