import { WorkConnectionSystem } from "./WorkConnectionSystem";
import { Entity } from "../Entities/Entity";
import { WorkComponent } from "../Components/WorkComponent";
import { StyleComponent } from "../Components/StyleComponent";
import { PositionComponent } from "../Components/PositionComponent";
import { DraggableComponent } from "../Components/DraggableComponent";

describe("The work connection system", () => {
  it("selects entities with work, style and position components", () => {
    const workConnectionSystem = new WorkConnectionSystem([]);

    const one = new Entity("one");
    const two = new Entity("two");

    one.addComponent("Position", new PositionComponent(1, 1));
    one.addComponent("Style", new StyleComponent("purple", 100, 100));
    one.addComponent("Work", new WorkComponent());

    two.addComponent("Position", new PositionComponent(2, 2));
    const entities = [one, two];

    // When we run the query
    const result = entities.filter(workConnectionSystem.queryPredicate);

    // The expected entities are returned
    expect(result).toEqual([one]);
  });

  it("connects entities that intersect", () => {
    const one = new Entity("one");
    const two = new Entity("two");

    const workOneComponent = new WorkComponent();
    const positionTwoComponent = new PositionComponent(2, 2);

    one.addComponent("Position", new PositionComponent(1, 1));
    one.addComponent("Style", new StyleComponent("purple", 100, 100));
    one.addComponent("Work", workOneComponent);
    one.addComponent("Draggable", new DraggableComponent());

    two.addComponent("Position", positionTwoComponent);
    two.addComponent("Style", new StyleComponent("purple", 100, 100));
    two.addComponent("Work", new WorkComponent());
    two.addComponent("Draggable", new DraggableComponent());

    const workConnectionSystem = new WorkConnectionSystem([one, two]);

    expect(workOneComponent.done).toBeNull();

    workConnectionSystem.run(one);

    expect(workOneComponent.done).toBe(two);
    expect(positionTwoComponent.x).toBe(1 + 100 + 1);
    expect(positionTwoComponent.y).toBe(1);
  });

  it("should not run when dragging is not completed", () => {
    const one = new Entity("one");
    const two = new Entity("two");

    const workOneComponent = new WorkComponent();
    const positionTwoComponent = new PositionComponent(2, 2);

    one.addComponent("Position", new PositionComponent(1, 1));
    one.addComponent("Style", new StyleComponent("purple", 100, 100));
    one.addComponent("Work", workOneComponent);
    one.addComponent("Draggable", new DraggableComponent());

    two.addComponent("Position", positionTwoComponent);
    two.addComponent("Style", new StyleComponent("purple", 100, 100));
    two.addComponent("Work", new WorkComponent());
    const draggable = new DraggableComponent();
    draggable.isDragging = true;
    two.addComponent("Draggable", draggable);

    const workConnectionSystem = new WorkConnectionSystem([one, two]);

    expect(workConnectionSystem.shouldRun()).toBeFalsy();
  });
});
