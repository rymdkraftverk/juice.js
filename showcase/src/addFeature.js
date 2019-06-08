import * as PIXI from "pixi.js";
import * as l1 from "l1";

export default ({ id, getX, y }) => {
  // Destroy if it exists
  l1.destroy(id);
  l1.removeBehavior(id);
  
  const instance = new PIXI.Graphics();
  instance
    .clear()
    .beginFill(0xffffff)
    .drawRect(0, y, 32, 32)
    .endFill();
  l1.add(instance, { id });

  l1.addBehavior({
    id,
    onUpdate: ({ counter }) => {
      instance.x = getX(counter);
    }
  });
};
