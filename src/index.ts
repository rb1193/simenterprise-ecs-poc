import "./styles.css";
import Konva from "konva";
import { Entity } from "./Entities/Entity";
import { PositionComponent } from "./Components/PositionComponent";
import { StyleComponent } from "./Components/StyleComponent";
import { RenderableComponent } from "./Components/RenderableComponent";
import { WorkComponent } from "./Components/WorkComponent";
import { RenderSystem } from "./Systems/RenderSystem";
import { DragInputSystem } from "./Systems/DragInputSystem";
import { WorkConnectionSystem } from "./Systems/WorkConnectionSystem";
import { WorkSystem } from "./Systems/WorkSystem";
import { DraggableComponent } from "./Components/DraggableComponent";
import { Process } from "./Shapes/Process";

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: "app",
  width: width,
  height: height
});

var layer = new Konva.Layer();

stage.add(layer);

const entities: Entity[] = [];

stage.on("dblclick dbltap", (e) => {
  const process = new Entity("process_" + (entities.length + 1).toString());

  process.addComponent(
    "Position",
    new PositionComponent(
      stage.getPointerPosition()?.x || 0,
      stage.getPointerPosition()?.y || 0
    )
  );

  process.addComponent("Style", new StyleComponent("purple", 100, 100));

  const workComponent = new WorkComponent();
  if (entities.length === 0) {
    workComponent.todo = 1;
  }

  process.addComponent("Work", workComponent);

  process.addComponent("Renderable", new RenderableComponent(Process));

  process.addComponent("Draggable", new DraggableComponent());

  entities.push(process);
});

const systems = [
  new DragInputSystem(stage, entities),
  new WorkSystem(),
  new WorkConnectionSystem(entities),
  new RenderSystem(layer)
];

let ticks = 0;
const anim = new Konva.Animation((frame) => {
  ticks++;
  if (frame?.frameRate && frame?.frameRate < 45) {
    //console.log("lagging");
  }
  systems.forEach((system) => {
    if ("shouldRun" in system) {
      if (!system.shouldRun()) return;
    }

    if ("setTicks" in system) {
      system.setTicks(ticks);
    }

    const selectedEntities = entities.filter(system.queryPredicate);

    selectedEntities.forEach((entity) => {
      system.run(entity);
    });
  });
}, layer);

anim.start();
