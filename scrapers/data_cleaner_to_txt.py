import os
import json
from bs4 import BeautifulSoup

current_dir = os.path.dirname(__file__)
input_file = os.path.join(current_dir, "scraped_data/data_pcc_inne_czynnosci_html.json")

def clean_html_and_save_as_txt(json_file):
    output_folder = os.path.join(current_dir, "after_cleaning_data_txt")
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    for key, paragraphs in data.items():
        cleaned_text = []

        for paragraph in paragraphs:
            soup = BeautifulSoup(paragraph, 'html.parser')
            
            for a in soup.find_all('a'):
                a.decompose()
            
            cleaned_paragraph = soup.get_text(separator=' ', strip=True)
            cleaned_text.append(cleaned_paragraph)

        output_file = os.path.join(output_folder, f"{key}_cleaned.txt")
        with open(output_file, 'w', encoding='utf-8') as out_file:
            out_file.write("\n\n".join(cleaned_text))

        print(f"Sukces: zapisano dane po obróbce do pliku {output_file}")

clean_html_and_save_as_txt(input_file)
