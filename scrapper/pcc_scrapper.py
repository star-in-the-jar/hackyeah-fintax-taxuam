import requests
from bs4 import BeautifulSoup
import json
import os

if not os.path.exists("scraped_data"):
    os.makedirs("scraped_data")

urls = {
    "kupno_auta": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-kupna-samochodu/",
    "pozyczka": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-pozyczki/",
    "inne_czynnosci": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-pcc-od-innych-czynnosci/",
    "spadki": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-sd-od-spadkow-i-zapisow/",
    "darowizny": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-sd-od-darowizny/",
    "inny_majatek": "https://www.podatki.gov.pl/pcc-sd/rozliczenie-podatku-sd-od-innego-sposobu-nabycia-majatku/"
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
        
        file_name = f"pcc_data_{name}_html.json"
        file_path = os.path.join("scraped_data", file_name)
        
        with open(file_path, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        
        print(f"Sukces: zapisano dane do pliku {file_name}")
        
    except Exception as e:
        print(f"Błąd podczas pobierania danych dla {name}: {e}")