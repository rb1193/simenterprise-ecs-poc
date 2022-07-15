import { WorkSystem } from "./WorkSystem";
import { Entity } from "../Entities/Entity";
import { WorkComponent } from "../Components/WorkComponent";
import { PositionComponent } from "../Components/PositionComponent";

describe("The work system", () => {
  it("selects entities with a work component", () => {
    //Given we have an entity with a work component and an entity without a work component
    const workSystem = new WorkSystem();

    const one = new Entity("one");
    const two = new Entity("two");

    one.addComponent("Work", new WorkComponent());

    two.addComponent("Position", new PositionComponent(2, 2));
    const entities = [one, two];
    //When we run the query
    const result = entities.filter(workSystem.queryPredicate);
    //Then the expected entities are returned
    expect(result).toEqual([one]);
  });

  it("updates the work state for each entity on tick", () => {
    //Given we have two entities with work components
    const workSystem = new WorkSystem();

    const one = new Entity("one");
    const two = new Entity("two");

    const workComponentOne = new WorkComponent();
    workComponentOne.todo = 1;

    one.addComponent("Work", workComponentOne);
    two.addComponent("Work", new WorkComponent());

    workComponentOne.done = two;

    //When we pass through 30 ticks
    workSystem.setTicks(30);
    workSystem.run(one);

    //Then the work is transferred from the todo to work
    expect(workComponentOne.todo).toEqual(0);
    expect(workComponentOne.workInProcess).toEqual(1);

    workSystem.run(two);

    workSystem.setTicks(60);
    workSystem.run(one);
  });
});
