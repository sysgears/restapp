
declare namespace Excel4Node {
  export const BorderStyle: {
    dashDot: number;
    dashDotDot: number;
    dashed: number;
    dotted: number;
    double: number;
    hair: number;
    medium: number;
    mediumDashDot: number;
    mediumDashDotDot: number;
    mediumDashed: number;
    none: number;
    opts: string[];
    slantDashDot: number;
    thick: number;
    thin: number;
    validate: Function;
  };
  export const CellComment: any;
  export const HorizontalAlignment: {
    center: number;
    centerContinuous: number;
    distributed: number;
    fill: number;
    general: number;
    justify: number;
    left: number;
    opts: string[];
    right: number;
    validate: Function;
  };
  export const Orientation: {
    default: number;
    landscape: number;
    portrait: number;
    validate: Function;
  };
  export const PageOrder: {
    downThenOver: number;
    overThenDown: number;
    validate: Function;
  };
  export const Pane: {
    bottomLeft: number;
    bottomRight: number;
    topLeft: number;
    topRight: number;
    validate: Function;
  };
  export const PaneState: {
    frozen: number;
    frozenSplit: number;
    split: number;
    validate: Function;
  };
  export const PaperSize: {
    A2_PAPER: number;
    A3_EXTRA_PAPER: number;
    A3_EXTRA_TRANSVERSE_PAPER: number;
    A3_PAPER: number;
    A3_TRANSVERSE_PAPER: number;
    A4_EXTRA_PAPER: number;
    A4_PAPER: number;
    A4_PLUS_PAPER: number;
    A4_SMALL_PAPER: number;
    A4_TRANSVERSE_PAPER: number;
    A5_EXTRA_PAPER: number;
    A5_PAPER: number;
    A5_TRANSVERSE_PAPER: number;
    B4_ENVELOPE: number;
    B4_PAPER: number;
    B5_ENVELOPE: number;
    B5_PAPER: number;
    B6_ENVELOPE: number;
    C3_ENVELOPE: number;
    C4_ENVELOPE: number;
    C5_ENVELOPE: number;
    C65_ENVELOPE: number;
    C6_ENVELOPE: number;
    C_PAPER: number;
    DL_PAPER: number;
    D_PAPER: number;
    EXECUTIVE_PAPER: number;
    E_PAPER: number;
    FOLIO_PAPER: number;
    GERMAN_LEGAL_FANFOLD: number;
    GERMAN_STANDARD_FANFOLD: number;
    INVITE_ENVELOPE: number;
    ISO_B4: number;
    ISO_B5_EXTRA_PAPER: number;
    ITALY_ENVELOPE: number;
    JAPANESE_DOUBLE_POSTCARD: number;
    JIS_B5_TRANSVERSE_PAPER: number;
    LEDGER_PAPER: number;
    LEGAL_EXTRA_PAPER: number;
    LEGAL_PAPER: number;
    LETTER_EXTRA_PAPER: number;
    LETTER_EXTRA_TRANSVERSE_PAPER: number;
    LETTER_PAPER: number;
    LETTER_PLUS_PAPER: number;
    LETTER_SMALL_PAPER: number;
    LETTER_TRANSVERSE_PAPER: number;
    MONARCH_ENVELOPE: number;
    NOTE_PAPER: number;
    NUMBER_10_ENVELOPE: number;
    NUMBER_11_ENVELOPE: number;
    NUMBER_12_ENVELOPE: number;
    NUMBER_14_ENVELOPE: number;
    NUMBER_9_ENVELOPE: number;
    QUARTO_PAPER: number;
    SIX_THREE_QUARTERS_ENVELOPE: number;
    STANDARD_PAPER_10_BY_11_IN: number;
    STANDARD_PAPER_10_BY_14_IN: number;
    STANDARD_PAPER_11_BY_17_IN: number;
    STANDARD_PAPER_15_BY_11_IN: number;
    STANDARD_PAPER_9_BY_11_IN: number;
    STATEMENT_PAPER: number;
    SUPER_A_SUPER_A_A4_PAPER: number;
    SUPER_B_SUPER_B_A3_PAPER: number;
    TABLOID_EXTRA_PAPER: number;
    TABLOID_PAPER: number;
    US_STANDARD_FANFOLD: number;
    opts: string[];
    validate: Function;
  };
  export const PatternType: {
    darkDown: number;
    darkGray: number;
    darkGrid: number;
    darkHorizontal: number;
    darkTrellis: number;
    darkUp: number;
    darkVerical: number;
    gray0625: number;
    gray125: number;
    lightDown: number;
    lightGray: number;
    lightGrid: number;
    lightHorizontal: number;
    lightTrellis: number;
    lightUp: number;
    lightVertical: number;
    mediumGray: number;
    none: number;
    opts: string[];
    solid: number;
    validate: Function;
  };
  export const PositiveUniversalMeasure: {
    validate: Function;
  };
  export const PresetColorVal: {
    aqua: string;
    black: string;
    blue: string;
    "blue-gray": string;
    "bright green": string;
    brown: string;
    "dark blue": string;
    "dark green": string;
    "dark red": string;
    "dark teal": string;
    "dark yellow": string;
    getColor: Function;
    gold: string;
    "gray-25": string;
    "gray-40": string;
    "gray-50": string;
    "gray-80": string;
    green: string;
    indigo: string;
    lavender: string;
    "light blue": string;
    "light green": string;
    "light orange": string;
    "light turquoise": string;
    "light yellow": string;
    lime: string;
    "olive green": string;
    opts: string[];
    orange: string;
    "pale blue": string;
    pink: string;
    plum: string;
    red: string;
    rose: string;
    "sea green": string;
    "sky blue": string;
    tan: string;
    teal: string;
    turquoise: string;
    validate: Function;
    violet: string;
    white: string;
    yellow: string;
  };
  export const PrintError: {
    NA: number;
    blank: number;
    dash: number;
    displayed: number;
    validate: Function;
  };
  export const VerticalAlignment: {
    bottom: number;
    center: number;
    distributed: number;
    justify: number;
    opts: string[];
    top: number;
    validate: Function;
  };
  export class Workbook {
    constructor(...args: any[]);
    logger: any;
    opts: any;
    author: any;
    sheets: any;
    sharedStrings: any;
    sharedStringLookup: any;
    styles: any;
    stylesLookup: any;
    dxfCollection: any;
    mediaCollection: any;
    definedNameCollection: any;
    styleData: any;
    styleDataLookup: any;
    addWorksheet(name: any, opts: any): any;
    createStyle(opts: any): any;
    getStringIndex(val: any): any;
    setSelectedTab(id: any): void;
    write(fileName: any, handler: any): void;
    writeToBuffer(): any;
  }
  export function getExcelAlpha(colNum: any): any;
  export function getExcelCellRef(rowNum: any, colNum: any): any;
  export function getExcelRowCol(str: any): any;
  export function getExcelTS(date: any): any;
  
}

declare module 'excel4node' {
  export = Excel4Node
}

//packages without types
declare module 'pdfmake';