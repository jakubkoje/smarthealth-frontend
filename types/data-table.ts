type ColumnType = "string" | "number" | "boolean" | "array" | "object";
type InputType = "text" | "number" | "checkbox" | "select" | "list" | "object";

export type DataColumn =
  | {
      name: string;
      dataType: ColumnType;
      inputType: Exclude<InputType, "select" | "object">; // All input types except "select" and "object"
      isHidden?: boolean;
      isEditable?: boolean;
      isAdminOnly?: boolean;
      widthPercentage?: number;
      label?: string;
      defaultValue?: string | number | boolean;
      dontDisplayInScreen?: ("create" | "edit" | "table")[];
    }
  | {
      name: string;
      dataType: "object"; // Specific case for object
      inputType: "object";
      columns: DataColumn[]; // Array of sub-columns
      isHidden?: boolean;
      isEditable?: boolean;
      isAdminOnly?: boolean;
      isDynamic?: false; // We can add new keys to it
      widthPercentage?: number;
      label?: string;
      defaultValue?: string | number | boolean;
      dontDisplayInScreen?: ("create" | "edit" | "table")[];
    }
  | {
      name: string;
      dataType: "object"; // Specific case for object
      inputType: "object";
      isHidden?: boolean;
      isEditable?: boolean;
      isAdminOnly?: boolean;
      isDynamic: true; // We can add new keys to it
      templateColumn: DataColumn;
      widthPercentage?: number;
      label?: string;
      defaultValue?: string | number | boolean;
      dontDisplayInScreen?: ("create" | "edit" | "table")[];
    }
  | {
      name: string;
      dataType: ColumnType;
      inputType: "select"; // Specific case for select
      options: string[]; // Options for select input
      isHidden?: boolean;
      isEditable?: boolean;
      isAdminOnly?: boolean;
      widthPercentage?: number;
      label?: string;
      defaultValue?: string | number | boolean;
      dontDisplayInScreen?: ("create" | "edit" | "table")[];
    };

export interface DataRow {
  id: string;
  patientName: string;
  age: number;
  condition: string;
  status: string;
  lastUpdate: string;
  // New medical fields
  tumorSize?: string;
  necrosisPresent?: boolean;
  angioinvasionPresent?: boolean;
  perineuralInvasionPresent?: boolean;
  resectionMargins?: 'positive' | 'negative';
  lymphNodesStatus?: string;
}

export interface EditorConfColumns {
  event: DataColumn[];
  standard: DataColumn[];
  hider: DataColumn[];
}

export interface EditorConfRows {
  event: DataRow;
  standard: DataRow;
  hider: DataRow;
}
