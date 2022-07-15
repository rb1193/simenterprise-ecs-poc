import Konva from "konva";
import { DraggableComponent } from "../Components/DraggableComponent";
import { PositionComponent } from "../Components/PositionComponent";
import { StyleComponent } from "../Components/StyleComponent";
import { Entity } from "../Entities/Entity";
import { System } from "./System";

export class DragInputSystem implements System {
  pointerPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor(stage: Konva.Stage, entities: Entity[]) {
    const clickWithin = (
      entity: Entity,
      pointerPosition: { x: number; y: number }
    ) => {
      const entityPosition = entity.getComponent<PositionComponent>("Position");
      const entityStyle = entity.getComponent<StyleComponent>("Style");

      return (
        pointerPosition.x >= entityPosition.x &&
        pointerPosition.x <= entityPosition.x + entityStyle.width &&
        pointerPosition.y >= entityPosition.y &&
        pointerPosition.y <= entityPosition.y + entityStyle.height
      );
    };

    stage.on("pointerdown", () => {
      // Detect if click was inside entity based on position and style components
      entities.forEach((entity) => {
        if (clickWithin(entity, stage.getRelativePointerPosition())) {
          const draggable = entity.getComponent<DraggableComponent>(
            "Draggable"
          );
          draggable.isDragging = true;
        }
      });
    });

    stage.on("pointerup", () => {
      entities.forEach((entity) => {
        if (clickWithin(entity, stage.getRelativePointerPosition())) {
          const draggable = entity.getComponent<DraggableComponent>(
            "Draggable"
          );
          draggable.isDragging = false;
        }
      });
    });

    stage.on("pointermove", () => {
      this.pointerPosition = stage.getRelativePointerPosition();
    });
  }

  queryPredicate = (entity: Entity) => entity.components.has("Draggable");
  run = (entity: Entity) => {
    const draggable = entity.getComponent<DraggableComponent>("Draggable");

    if (draggable.isDragging === true) {
      const positionComponent = entity.getComponent<PositionComponent>(
        "Position"
      );
      const styleComponent = entity.getComponent<StyleComponent>("Style");
      positionComponent.x = this.pointerPosition.x - styleComponent.width / 2;
      positionComponent.y = this.pointerPosition.y - styleComponent.height / 2;
    }
  };
}
