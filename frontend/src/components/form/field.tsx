import { createContext, FC, useContext } from "react"
import { partD } from "./parts/partD"

export type Document = Map<string, string>

export const DocumentContext = createContext<Document>(new Map)
export const DocumentUpdaterContext = createContext<(doc: Document) => void>(() => { })
export const DocumentErrors = createContext<Errors>(new Map)

export const useDocumentKey = (key: string): [string | undefined, Error[], (value: string) => void] => {
    const doc = useContext(DocumentContext)
    const setter = useContext(DocumentUpdaterContext)
    const errors = useContext(DocumentErrors)

    const errs = errors.get(key) ?? []
    return [doc.get(key), errs, (value: string) => {
        const newDoc = new Map(doc)
        newDoc.set(key, value)
        setter(newDoc)
    }]
}


export type Error = {
    msg: string,
}
export type Errors = Map<string, Error[]>
export type FieldDecl = {
    key: string
    xpath: string
    label: string
    isHidden: (document: Document) => boolean
    isRequired: (document: Document) => boolean
    component: FC<{ documentKey: string }>
}


export const makeTextField = () => {
    return ({ documentKey }: { documentKey: string }) => {
        const [value, errors, setValue] = useDocumentKey(documentKey)

        // TODO(teawithsand): mark as error if errors.length > 0

        return <input type="text" value={value ?? ""} onChange={(e) => {
            setValue(e.target.value)
        }} />
    }
}

export const makeOptionsField = (validOptions: Record<string, string>) => {
    return ({ documentKey }: { documentKey: string }) => {
        const [value, errors, setValue] = useDocumentKey(documentKey)

        // TODO(teawithsand): mark as error if errors.length > 0
        // TODO(teawithsand): make it a dropdown

        return <input type="text" value={value ?? ""} onChange={(e) => {
            setValue(e.target.value)
        }} />
    }
}


export const Fields: FieldDecl[] = [
    // TODO(teawithsand): data dokonania czynnosci
    // TODO(teawithsand): urzad
    {
        key: "cel",
        xpath: "/tns:Deklaracja/tns:Naglowek/tns:CelZlozenia/@poz",
        label: "Cel złożenia",
        isHidden: () => false,
        isRequired: () => true,
        component: makeOptionsField({
            "1": "złożenie deklaracji",
            "2": "korekta deklaracji"
        }),
    },
    {
        key: "uzasadnienie",
        xpath: "TODO",
        label: "Uzasadnienie przyczyn korekty deklaracji ORD-ZU",
        isHidden: (document) => document.get("cel") === "2",
        isRequired: () => false,
        component: makeTextField(),
    },
    {
        key: "podmiot-skladajacy-rodzaj",
        xpath: "TODO",
        label: "Podmiot składający deklarację",
        isRequired: () => true,
        isHidden: () => false,
        component: makeOptionsField({
            "1": "Podmiot zobowiązany solidarnie do zapłaty podatku",
            "2": "Strona umowy zamiany",
            "3": "Wspólnik spółki cywilnej",
            "4": "Inny podmiot",
            "5": "Podmiot, o którym mowa w art. 9 pkt 10 lit. b ustawy (pożyczkobiorca)"
        }),
    },
    {
        key: "podatnik-rodzaj",
        xpath: "TODO",
        label: "Rodzaj podatnika",
        isRequired: () => true,
        isHidden: () => false,
        component: makeOptionsField({
            "1": "Osoba fizyczna",
            "2": "Podatnik niebędący osobą fizyczną",
        }),
    },
    {
        key: "identyfikator-podatkowy",
        xpath: "TODO",
        label: "Identyfikator podatkowy",
        isRequired: () => true,
        isHidden: (doc) => doc.get("podatnik-rodzaj") !== "1",
        component: makeOptionsField({
            "1": "PESEL",
            "2": "NIP",
        }),
    },
    {
        key: "podatnik-nip",
        xpath: "TODO",
        label: "NIP",
        isRequired: () => true,
        isHidden: (doc) => (
            (
                doc.get("podatnik-rodzaj") === "1" &&
                doc.get("identyfikator-podatkowy") === "2"
            ) || doc.get("podatnik-rodzaj") === "2"
        ),
        component: makeTextField(),
    },
]

export const Validators: ((document: Document) => Errors)[] = [
    (doc) => {
        const res = new Map
        if (doc.get("podatnik-rodzaj") === "2" && doc.get("podmiot-skladajacy-rodzaj") === "5") {
            res.set("podmiot-skladajacy-rodzaj", "Podatnik musi być osobą fizyczną gdy wybrana jest ta opcja")
        }
        return res
    }
]