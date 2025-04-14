import { generateHeader } from './generators/generateHeader';
import { generateTable } from './generators/generateTable';
import { generateData } from './generators/generateData';

export class BaseController {
  public generateHeader = generateHeader;
  public generateTable = generateTable;
  public generateData = generateData;
}
