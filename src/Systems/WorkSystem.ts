import { System } from "./System";
import { Entity } from "../Entities/Entity";
import { WorkComponent } from "../Components/WorkComponent";

export class WorkSystem implements System {
  ticks = 0;

  queryPredicate = (entity: Entity) => {
    return entity.components.has("Work");
  };

  run = (entity: Entity) => {
    const workComponent = entity.getComponent<WorkComponent>("Work");

    if (workComponent.todo > 0 && (this.ticks + 30) % 60 === 0) {
      workComponent.todo--;
      workComponent.workInProcess++;
    }

    if (workComponent.workInProcess > 0 && this.ticks % 60 === 0) {
      if (workComponent.done) {
        const nextWorkComponent = workComponent.done.getComponent<
          WorkComponent
        >("Work");
        workComponent.workInProcess--;
        nextWorkComponent.todo++;
      }
    }
  };

  setTicks = (tick: number) => {
    this.ticks = tick;
  };
}
