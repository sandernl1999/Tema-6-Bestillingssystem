# Børres burgers

## Lenker til de ulike skjermene:

1. Logg inn og landing-page: https://next-firebase-project.web.app/auth/register 
2. Kjøkken-skjerm: https://next-firebase-project.web.app/order/
3. Hente-skjerm: https://next-firebase-project.web.app/order/display 

## Før du starter:
## Installer siste versjoner av `node js & firebase`

## Installer Børres burgers-takeaway

Følg disse stegene:

Install npm packages:
```
npm install
```

Build:
```
npm run build
```

Deploy to Firebase hosting:
```
npm run deploy
```

## Implementering

1. For å hoste NEXTJS apps på Firebase, så trenger vi en server så her er det lagd en cloud function som fungerer som en server
2. Bygd logginn, registrering, ny ordre, Kjøkken & ordre og henteside/skjerm med NextJS
3. Lagret all data i Firestore
4. Brukt Firebase Authetnication
5. Lagret bruker detailer som Users document i Firestore
6. Lagret ordre som orders document i Firestore
7. Lagret ordre items som order-items document i Firestore


