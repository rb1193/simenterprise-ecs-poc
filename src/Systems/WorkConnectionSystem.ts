import { IRect } from "konva/lib/types";
import { DraggableComponent } from "../Components/DraggableComponent";
import { PositionComponent } from "../Components/PositionComponent";
import { StyleComponent } from "../Components/StyleComponent";
import { WorkComponent } from "../Components/WorkComponent";
import { Entity } from "../Entities/Entity";
import { System } from "./System";

export class WorkConnectionSystem implements System {
  entities: Entity[];

  constructor(entities: Entity[]) {
    this.entities = entities;
  }

  shouldRun = () => {
    return !this.entities.some((entity) => {
      const draggable = entity.getComponent<DraggableComponent>("Draggable");
      return draggable.isDragging;
    });
  };

  queryPredicate = (entity: Entity) => {
    return (
      entity.components.has("Position") &&
      entity.components.has("Work") &&
      entity.components.has("Style")
    );
  };

  run = (entity: Entity) => {
    const haveIntersection = (r1: IRect, r2: IRect) => {
      return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
      );
    };

    this.entities.forEach((otherEntity) => {
      // do not check intersection with itself
      if (entity === otherEntity) {
        return;
      }

      const entityStyle = entity.getComponent<StyleComponent>("Style");
      const entityPosition = entity.getComponent<PositionComponent>("Position");
      const otherEntityStyle = otherEntity.getComponent<StyleComponent>(
        "Style"
      );
      const otherEntityPosition = otherEntity.getComponent<PositionComponent>(
        "Position"
      );

      const entityRect = {
        x: entityPosition.x,
        y: entityPosition.y,
        width: entityStyle.width,
        height: entityStyle.height
      };

      const otherEntityRect = {
        x: otherEntityPosition.x,
        y: otherEntityPosition.y,
        width: otherEntityStyle.width,
        height: otherEntityStyle.height
      };

      if (haveIntersection(entityRect, otherEntityRect)) {
        const entityWorkComponent = entity.getComponent<WorkComponent>("Work");
        entityWorkComponent.done = otherEntity;

        otherEntityPosition.x = entityPosition.x + entityStyle.width + 1;
        otherEntityPosition.y = entityPosition.y;
      }
    });
  };
}
