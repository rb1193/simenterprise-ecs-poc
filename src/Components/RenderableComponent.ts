import Konva from "konva";

export class RenderableComponent {
  shape: new (config: Konva.ShapeConfig | Konva.GroupConfig) =>
    | Konva.Shape
    | Konva.Group;

  constructor(
    shape: new (config: Konva.ShapeConfig | Konva.GroupConfig) =>
      | Konva.Shape
      | Konva.Group
  ) {
    this.shape = shape;
  }
}
