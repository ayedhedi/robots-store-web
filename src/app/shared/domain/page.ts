import {Robot} from "./robot";

export class Page {
  content: Robot[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: string;
  first: boolean;
  numberOfElements: number;
}
