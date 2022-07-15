import { Entity } from "../Entities/Entity";

export class WorkComponent {
  todo = 0;
  done: Entity | null = null;
  workInProcess = 0;
}
