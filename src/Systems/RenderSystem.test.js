import { PositionComponent } from "../Components/PositionComponent";
import { StyleComponent } from "../Components/StyleComponent";
import { RenderableComponent } from "../Components/RenderableComponent";
import { Entity } from "../Entities/Entity";
import { RenderSystem } from "./RenderSystem";

describe("The render system", () => {
  it("selects entities including position, renderable, and style components", () => {
    // Given we have a render system where some entities should be selected
    const renderSystem = new RenderSystem(jest.fn());

    const one = new Entity("one");
    const two = new Entity("two");

    one.addComponent("Position", new PositionComponent(1, 1));
    one.addComponent("Style", new StyleComponent("purple", 100, 100));
    one.addComponent("Renderable", new RenderableComponent(jest.fn()));

    two.addComponent("Position", new PositionComponent(2, 2));
    const entities = [one, two];

    // When we run the query
    const result = entities.filter(renderSystem.queryPredicate);

    // The expected entities are returned
    expect(result).toEqual([one]);
  });

  it("adds renderable entities to the layer", () => {
    let shapeResult;

    const layerStub = {
      add: (shape) => {
        shapeResult = shape;
      }
    };

    class ShapeStub {
      constructor({ id, x, y, fill }) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.fill = fill;
      }
    }

    const renderSystem = new RenderSystem(layerStub);

    const one = new Entity("one");

    one.addComponent("Position", new PositionComponent(1, 1));
    one.addComponent("Style", new StyleComponent("purple", 100, 100));
    one.addComponent("Renderable", new RenderableComponent(ShapeStub));

    renderSystem.run(one);

    expect(shapeResult.id).toEqual("one");
    expect(shapeResult.x).toEqual(1);
    expect(shapeResult.y).toEqual(1);
    expect(shapeResult.fill).toEqual("purple");
  });
});
