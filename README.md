# TeniusAI

Aby zainstalować niezbędne są:
1. Środowisko z linuxem
2. Docker
3. node.js oraz NPM (najłatwiej użyć [NVM](https://github.com/nvm-sh/nvm))
4. python3 oraz pip (najłatwierj użyć `sudo apt-get install python3 python3-pip`) na dystybucjach bazujących na debianie.

Aby uruchomić program należy wykonać skrypt `init.sh`, który zbuduje frontend.

Po nim należy wykonać `docker-compose up --build`, która to komenda włączy aplikację na porcie 8888. Zatem dostępna będzie ona pod adresem [localhost:8888](http://localhost:8888)