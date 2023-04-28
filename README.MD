prerekvizity:
    install nodejs
	npm install
	npx playwright install (v package.json bude asi priblizne rok a půl stará verze, kostru testu generovala AI se zastaralými informacemi)
	npm install supertest  (v package.json bude asi priblizne rok a půl stará verze, kostru testu generovala AI se zastaralými informacemi)
spusteni:
	npm run test:e2e
	npm run test:api	
    npm run test

připomínky:
přidáno vyplnovani FRANTA UZIVATEL do inputu
pro snadnejsi filtraci na FE testu, přidáno i do API testu - proměnná filter

test na api kontroluje oproti FE testu jmeno přímo na kartě, do nadpisu na stránce se 
možná skládá z first name a last name properties v responsi, ale to jsem neimplementoval

nevhodné, že endpoint https://demo.fidoo.com/api/services/rest/backend/card/card-list vrací misto očekávaných dat v prvni response zamestnanecký status klienta,
pravděpodobně způsobeno eventem z FE po stisku "Karty", protože v API testu nebylo potřeba to ošetřit (ale kompletní traffic jsem nezkoumal)

při manuálním testování s otevřenými devtools a promazanými cookies jsem zaznamenal status code 400 z "language" requestu, nenastávalo však vždy a při automatizaci (možná protože nebyly otevřeny devtools) 
nenastávalo, printscreen přiložen, dále jsem se tím nezabýval

zda a kde deklarovat proměnné pro účel tohoto testu (před použitím, na začátku bloku kódu nebo vůbec pokud jsou použity jen jednou)považuji za detail, je to na dohodě

v FE testu jsem se bohužel nezbavil jednoho tvrdého waitu

pro případ více FE testů by bylo asi vhodnější rozdělit na dva soubory - test a lib, v lib souboru přechody mezi kartami, login a vyhledávání owrapovat metodou, při vyšším počtu testů je modularizace vhodná
při volání funkcí v lib ze souboru test by bylo vhodné případně použít expect.not.to.Throw pro zaznamenání chyby 

použítí jednoho testovacího balíčku pro FE a API (případně i databázové a desktopové testy pracující s více okny nebo zápisem/čtením souboru) považuji za výhodu, pro případ nutnosti komplexnějších testů