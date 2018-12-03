import * as PIXI from "pixi.js";
import * as l1 from "l1";

export default ({ id, getX, y }) => {
  l1.addBehavior({
    id,
    onInit: ({ data }) => {
      data.instance = new PIXI.Graphics();
      data.instance
        .beginFill(0x000000)
        .drawRect(0, y, 32, 32)
        .endFill();
      l1.add(data.instance, { id });
    },
    onUpdate: ({ data, counter }) => {
      data.instance.x = getX(counter);
    }
  });
};
