import { Entity } from "../Entities/Entity";

export interface System {
  queryPredicate: (entity: Entity) => boolean;

  run: (entity: Entity) => void;
}
