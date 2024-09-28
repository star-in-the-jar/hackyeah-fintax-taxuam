import requests
from bs4 import BeautifulSoup
import json
import os

if not os.path.exists("scraped_data"):
    os.makedirs("scraped_data")

urls = {
    "pcc_kupno_auta": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-kupna-samochodu/",
    "pcc_pozyczka": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-pozyczki/",
    "pcc_inne_czynnosci": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-innych-czynnosci/",
    "sd_spadki": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-sd-od-spadkow-i-zapisow/",
    "sd_darowizny": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-sd-od-darowizny/",
    "sd_inny_majatek": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-sd-od-innego-sposobu-nabycia-majatku/",
    "info_podstawa_opodatkowania": "https://www.podatki.gov.pl/pcc-sd/abc-pcc/przedmiot-opodatkowania-pcc/",
    "info_organy_podatkowe": "https://www.podatki.gov.pl/pcc-sd/abc-pcc/organy-podatkowe-pcc/",
    "info_czynnosci_nieopodatkowane" : "https://www.podatki.gov.pl/pcc-sd/abc-pcc/czynnosci-cywilnoprawne-nieopodatkowane-pcc/",
    "info_obowiazek_podatkowy" : "https://www.podatki.gov.pl/pcc-sd/abc-pcc/obowiazek-podatkowy-pcc/",
    "info_podatnik_i_platnik_pcc" : "https://www.podatki.gov.pl/pcc-sd/abc-pcc/kto-jest-podatnikiem-a-kto-platnikiem-pcc/",
    "info_kto_zwolniony_pcc" : "https://www.podatki.gov.pl/pcc-sd/abc-pcc/zwolnienia-pcc/",
    "info_stawki_podatkowe_sd" : "https://www.podatki.gov.pl/pcc-sd/abc-sd/stawki-podatkowe-sd/",
    "info_obowiazek_podatkowy_w_podatku_sd" : "https://www.podatki.gov.pl/pcc-sd/abc-sd/obowiazek-podatkowy-sd/",
    "info_sd_zwolnienie_dla_rodziny" : "https://www.podatki.gov.pl/pcc-sd/abc-sd/ulgi-i-zwolnienia-sd/zwolnienie-dla-najblizszej-rodziny-sd/",
    "info_sd_ulga_mieszkaniowa" : "https://www.podatki.gov.pl/pcc-sd/abc-sd/ulgi-i-zwolnienia-sd/ulga-mieszkaniowa/",
    "info_sd_zwolniene_nabycie_gospodarstwa_rolnego" : "https://www.podatki.gov.pl/pcc-sd/abc-sd/ulgi-i-zwolnienia-sd/zwolnienie-z-tytulu-nabycia-gospodarstwa-rolnego/"
}

def fetch_paragraphs(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'html.parser')

    paragraphs = [str(paragraph) for paragraph in soup.find_all('p')]
    return paragraphs

for name, url in urls.items():
    try:
        paragraphs = fetch_paragraphs(url)
        
        data = {f"paragraphs_{name}": paragraphs}
        
        file_name = f"data_{name}_html.json"
        file_path = os.path.join("scraped_data", file_name)
        
        with open(file_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        
        print(f"Sukces: zapisano dane do pliku {file_name}")
        
    except Exception as e:
        print(f"Błąd podczas pobierania danych dla {name}: {e}")