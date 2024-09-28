import os
import json
from bs4 import BeautifulSoup

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

current_dir = os.path.dirname(__file__)
input_folder = os.path.join(current_dir, "scraped_data")
output_folder = os.path.join(current_dir, "after_cleaning_data_txt")

if not os.path.exists(output_folder):
    os.makedirs(output_folder)

def clean_html_and_save_as_txt(json_file, key):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    cleaned_text = []
    for content in data.values():
        for paragraph in content:
            soup = BeautifulSoup(paragraph, 'html.parser')
            for a in soup.find_all('a'):
                a.decompose()
            text_p = " ".join([p.get_text(separator=' ', strip=True) for p in soup.find_all('p')])
            text_li = " ".join([li.get_text(separator=' ', strip=True) for li in soup.find_all('li')])
            cleaned_paragraph = f"{text_p} {text_li}".strip()
            if cleaned_paragraph:
                cleaned_text.append(cleaned_paragraph)

    output_file = os.path.join(output_folder, f"{key}_cleaned.txt")
    with open(output_file, 'w', encoding='utf-8') as out_file:
        out_file.write("\n\n".join(cleaned_text))

    print(f"Sukces: zapisano dane po obróbce do pliku {output_file}")

for key in urls.keys():
    json_file = os.path.join(input_folder, f"data_{key}_html.json")
    if os.path.exists(json_file):
        clean_html_and_save_as_txt(json_file, key)
    else:
        print(f"Plik {json_file} nie istnieje. Pomijanie...")
