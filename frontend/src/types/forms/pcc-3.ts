import { FieldData } from "./general"

const pcc3: FieldData = {
    name: 'tns:Deklaracja',
    xPath: '/tns:Deklaracja',
    children: [
        {
            name: 'tns:KodFormularza',
            xPath: '/tns:Deklaracja/tns:Naglowek/tns:KodFormularza',
        },
        {
            name: 'tns:CelZlozenia',
            xPath: '/tns:Deklaracja/tns:Naglowek/tns:CelZlozenia',
        },
        {
            name: 'tns:Data',
            xPath: '/tns:Deklaracja/tns:Naglowek/tns:Data'
        },
        {
            legend: 'Dane podatnika dokonującego zapłaty lub zwolnionego z podatku na podstawie art. 9 pkt 10 lit. b ustawy',
            name: 'tns:OsobaFizyczna',
            xPath: '/tns:Deklaracja/tns:Podmiot1/tns:OsobaFizyczna'
        }
    ]
}

type Pcc3 = typeof pcc3