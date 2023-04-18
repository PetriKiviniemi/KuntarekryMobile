# Kuntarekry Mobile app

A Mobile application implementation of https://www.kuntarekry.fi  
This application was built as a prototype for a potential mobile application for Kuntarekry.

## Developing & Building

Here's how to install and run this application.

First download Expo Go from the Play Store or App Store on your mobile device.  
Then Execute following commands in your terminal of choice:  

```shell
git clone https://github.com/PetriKiviniemi/KuntarekryMobile.git
cd KuntarekryMobile/
npm i expo-cli
npm install
npx expo start
```  
  
Commands explained:  
1. Git clone the repository to your machine  
2. Navigate into the downloaded folder  
3. Install expo-cli
4. Install other necessary dependencies  
5. Start the app in Expo Go
  
Make sure your mobile devices is in the same network as the device (e.g. PC) you're launching the expo instance from.  
If you have trouble connecting to the app due to issues with firewall or unable to access the same network,  
you can try ```npx expo start --tunnel``` instead.  
Scan the QR code with your phone's camera and the app will launch within Expo Go on your mobile device.

### Running tests
  
Run all tests with ```npm test``` .

## Ominaisuudet
   
Sovellus jakautuu viiteen päävälilehteen: hakuun, profiiliin, suosikkeihin, infoon, ja uutisiin.

### Haku

Hakuvälilehti on myös sovelluksen pääsivu. Se sisältää hakupalkin, hakuhistorian ja kehitykseen käytettäviä painikkeita.

#### Hakujen tekeminen

Hakupalkkiin voi kirjoittaa hakutermejä. Siihen voi myös syöttää automaattisesti geolokaation painamalla syöttökentän oikessa reunassa olevaa tähtäinkuvaketta.

Haun alla on "Tarkenna hakua" -painike, josta hakuun voi lisätä suodattimia. Jos suodattimia on käytössä, näkyy painikkeen vasemmassa reunassa rasti ruudussa tästä merkkinä.

Kun toivotut hakutermit ja suodattimet on syötetty, voidaan haku suorittaa painamalla "Hae"-painiketta. Tällöin siirrytään hakutulosnäkymään. Jos mitään termejä tai suodattimia ei ole käytössä, näyttää hakutulosnäkymä kaikki API:n sisältämät työpaikkailmoitukset.

Hakutulosnäkymässä näkyy hakua vastanneista työpaikkailmoituksista perustiedot. Hakutulosten oikeassa ylänurkassa olevaa sydänpainiketta painamalla, voi hakutuloksen lisätä suosikkeihin tai poistaaa sieltä. Hakutulosta painamalla pääsee katsomaan ilmoituksen kaikkia tietoja.

#### Hakuhistoria

Hakuhistoriaan "Olit kiinnostunut näistä" -otsikon alle ilmestyy käyttäjän viisi viimeksi tekemää hakua. Käyttäjä voi haun tehtyään suorittaa painaa hakuhistoriapainikkeita ja suorittaa saman haun uudestaan. Hakuhistoria sisältää ainoastaan tekstihakuja, ei suodattimia.

#### Kehityspainikkeet

Kehityspainikkeet siäsältävät sovelluksen kehittämisen kannalta hyödyllisiä toimintoja.

"Hakutulosproto" -painike siirtää hakutulosnäkymään, missä on vakiohakutulokset. Ensimmäisessä näistä hakutuloksista, on kaikki työpaikkailmoitusten mahdolliset kentät täytettynä, eli siis maksimitiedot. Toisessa tuloksessa taas on ainoastaan pakolliset kentät täytettynä.

"Onboardingiin" -painikken kautta pääsee kokeilemaan onboardingia. Prototyyppivaiheesta siirryttäessä lopulliseen sovellukseen, tulisi onboarding-sivu näkymään ensimmäisenä käyttäjän avattua sovelluksen ensimmäistä kertaa. Onboarding kyselee käyttäjän nimen ja sijainnin sekä minkälaisista työpaikoista hän on kiinnostunut ja tekee haun käyttäjän syötteiden pohjalta.

"Poista KAIKKI AsyncStoragesta" -painikkeen avulla voi helposti tyhjentää paikallismuistin.

### Profiili

Profiilisivulla käyttäjä voi kirjautua ja syöttää omat tietonsa. Tässä prototyypissä kirjautumista ei tarvitse tehdä, vaan tietoja pääsee syöttämään vain painamalla "Kirjaudu" -painiketta.

Profiiliin voi syöttää käyttäjän perustiedot sekä tiedot tutkinnoista ja työhistoriasta.

### Suosikit

Suosikit-sivulla näkyy käyttäjän suosikkeihin tallentamat työpaikkailmoitukset.

Sivu myös suosittelee käyttäjälle muita työpaikkoja tämän hakuhistorian perusteella.

### Info

Infosivu antaa tietoa Kuntarekrystä sekä sovelluksesta. Sivulta löytyy myös vastauksia käyttäjää mahdollisesti huolestuttaviin tietoturvakysymyksiin tietojen tallennukseen ja sijainnin tarkasteluun liittyen.

### Uutiset

Uutisvälilehti sisältää nukkeuutisotsikoita. Välilehdellä ei ole toiminnallisuutta.
  
## Configuration
  
The only configuration the application needs, is pointing it toward the correct API url. A template for the file used to store the url can be found as the "apiurl_template.js" file which needs to be renamed to apiurl.js after it has been configured properly.
  
## Links
   
Original site this application is based on: https://www.kuntarekry.fi/
   

