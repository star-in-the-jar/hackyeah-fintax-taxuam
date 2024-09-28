export type FieldData = VariantOnly | Element

interface VariantOnly extends GeneralField {
    variants?: Record<number, FieldData>;
}

interface Element extends GeneralField {
    xPath: string;
    name: string;
    children?: FieldData[];
}

interface GeneralField {
    legend: string;
}