import {Robot} from "./robot";


export class RobotFactory {

  static build(json: any): Robot {
    let robot = new Robot();
    robot.id = json.id;
    robot.name = json.name;
    return robot;
  }
}
