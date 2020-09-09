export class Registry {
  private registry: Map<string, any>;

  constructor() {
    this.registry = new Map();
  }

  register(Component) {
    this.registry.set(Component.componentInfo.name.toLowerCase(), Component);
  }

  get(name) {
    return this.registry.get(name.toLowerCase());
  }

  getAll() {
    return Array.from(this.registry.values());
  }
}
