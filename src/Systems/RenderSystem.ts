import Konva from "konva";
import { System } from "./System";
import { Entity } from "../Entities/Entity";
import { PositionComponent } from "../Components/PositionComponent";
import { RenderableComponent } from "../Components/RenderableComponent";
import { StyleComponent } from "../Components/StyleComponent";
import { WorkComponent } from "../Components/WorkComponent";

export class RenderSystem implements System {
  layer: Konva.Layer;
  shapeCache: Map<string, Konva.Shape | Konva.Group>;

  constructor(layer: Konva.Layer) {
    this.layer = layer;
    this.shapeCache = new Map();
  }

  queryPredicate = (entity: Entity) => {
    return (
      entity.componentTypes.includes("Renderable") &&
      entity.componentTypes.includes("Position") &&
      entity.componentTypes.includes("Style")
    );
  };

  run = (entity: Entity) => {
    const renderableComponent = entity.getComponent<RenderableComponent>(
      "Renderable"
    );
    const shape = renderableComponent.shape;

    const positionComponent = entity.getComponent<PositionComponent>(
      "Position"
    );

    const styleComponent = entity.getComponent<StyleComponent>("Style");

    const workComponent = entity.getComponent<WorkComponent>("Work");

    if (this.shapeCache.has(entity.id)) {
      const shape = this.shapeCache.get(entity.id);
      if (workComponent) {
        // @ts-ignore
        shape?.processTotalText.text(
          "Doing:" + workComponent.workInProcess.toString()
        );
        // @ts-ignore
        shape?.todoTotalText.text("Todo: " + workComponent.todo.toString());
      }
      shape?.x(positionComponent.x);
      shape?.y(positionComponent.y);
      shape?.width(styleComponent.width);
      shape?.height(styleComponent.height);
      if (shape && "fill" in shape) {
        shape?.fill(styleComponent.fill);
      }
    } else {
      const shapeInstance = new shape({
        id: entity.id,
        x: positionComponent.x,
        y: positionComponent.y,
        fill: styleComponent.fill,
        width: styleComponent.width,
        height: styleComponent.height,
        draggable: false,
        processNumber: entity.id,
        inProcessTotal: 0
      });
      this.layer.add(shapeInstance);
      this.shapeCache.set(entity.id, shapeInstance);
    }
  };
}
