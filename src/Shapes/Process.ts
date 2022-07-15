import Konva from "konva";

export class Process extends Konva.Group {
  processTotalText: Konva.Text;
  todoTotalText: Konva.Text;
  constructor({
    processNumber,
    inProcessTotal,
    height,
    width,
    fill,
    ...rest
  }: Konva.GroupConfig) {
    super(rest);

    const process = new Konva.Rect({
      width,
      height,
      fill
    });

    const processLabel = new Konva.Text({
      x: 2,
      y: 10,
      fontFamily: "serif",
      text: processNumber.toString(),
      fill: "black",
      fontSize: 24
    });

    this.processTotalText = new Konva.Text({
      x: 5,
      y: 70,
      fontFamily: "serif",
      text: "Doing: " + inProcessTotal.toString(),
      fill: "white",
      fontSize: 16
    });

    this.todoTotalText = new Konva.Text({
      x: 5,
      y: 50,
      fontFamily: "serif",
      text: "Todo: " + inProcessTotal.toString(),
      fill: "white",
      fontSize: 16
    });

    // const processPointer = new Konva.Arrow({
    //   points: [100, 50, 150, 50],
    //   fill: "black",
    //   stroke: "black"
    // });

    const processGroup = new Konva.Group({
      x: 0,
      y: 0
    });

    processGroup
      .add(process)
      .add(processLabel)
      .add(this.todoTotalText)
      .add(this.processTotalText);
    //.add(processPointer);

    //@ts-ignore
    this.add(processGroup);
  }
}
