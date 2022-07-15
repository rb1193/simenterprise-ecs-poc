import { DragInputSystem } from "./DragInputSystem";
import { Entity } from "../Entities/Entity";
import { DraggableComponent } from "../Components/DraggableComponent";
import { PositionComponent } from "../Components/PositionComponent";
import { StyleComponent } from "../Components/StyleComponent";

describe("The drag input system", () => {
  it("selects draggable entities", () => {
    const one = new Entity();
    const two = new Entity();

    one.addComponent("Draggable", new DraggableComponent());

    const entities = [one, two];
    const dragInputSystem = new DragInputSystem({ on: jest.fn() });
    const result = entities.filter(dragInputSystem.queryPredicate);

    expect(result).toEqual([one]);
  });

  it("positions draggable entities based on the cursor position", () => {
    const newPosition = {
      x: 200,
      y: 200
    };

    class StageStub {
      getRelativePointerPosition() {
        return newPosition;
      }
      onPointerdownHandler() {}
      onPointerupHandler() {}
      onPointermoveHandler() {}
      on(eventName, callback) {
        switch (eventName) {
          case "pointerdown":
            this.onPointerdownHandler = callback;
            break;
          case "pointerup":
            this.onPointerupHandler = callback;
            break;
          case "pointermove":
            this.onPointermoveHandler = callback;
            break;

          default:
            break;
        }
        this.onDragEndHandler = callback;
      }
    }

    const entity = new Entity("test");
    entity.addComponent("Draggable", new DraggableComponent());
    const position = new PositionComponent(10, 10);
    entity.addComponent("Position", position);
    const width = 200;
    const height = 200;
    const style = new StyleComponent("red", width, height);
    entity.addComponent("Style", style);

    const stage = new StageStub();

    const dragInputSystem = new DragInputSystem(stage, [entity]);

    stage.onPointerdownHandler({
      target: {
        id: () => entity.id
      }
    });

    stage.onPointermoveHandler({
      clientX: newPosition.x,
      clientY: newPosition.y
    });

    dragInputSystem.run(entity);

    stage.onPointerupHandler({
      target: {
        id: () => entity.id
      }
    });

    expect(position.x).toEqual(newPosition.x - width / 2);
    expect(position.y).toEqual(newPosition.y - height / 2);
  });
});
