# Proyecto Integracion pasarela de pago Niubiz con react Native (expo bare)

Hola como están, en este proyecto hicimos la integración de **Niubiz** con **react native expo bare**. Este es un ejemplo básico utilizando los datos de prueba indicados en la documentación de **Niubiz**.

![Preview niubiz integracion](/docs/preview.png)

[Niubiz integration](https://desarrolladores.niubiz.com.pe/docs/bot%C3%B3n-de-pago-1#popup2)

Este repo consta de 2 proyectos, una es la simulación de nuestro backend en este caso esta hecho con express js **/dummy-api** y el proyecto que contiene el código de react native **/react-native-niubiz**

## Api

Ingresar con el terminal al la ruta /dummy-api y ejecutar

    npm install

luego iniciar el servidor

    npm run dev

## React Native

ingresar a la ruta /react-native-niubiz

    npm install

Para IOS

    npx pod-install ios

Instalar **eas** para compilar el proyecto,
[Eas build setup](https://docs.expo.dev/build/setup/)
para este paso es importante crear una cuenta en https://expo.dev/signup para poder usar esta librería

    npm install -g eas-cli

la primera vez te va a solicitar autenticación

    eas login

Ejecutar/para configurar para que plataforma va a generar el build

    eas build:configure

General el build(segun sea el caso lo requiera)

    eas build --platform ios/android

Ahora iniciar la aplicación

    npm start

## 👋 Salúdame

Web: [www.arvprincipe.com](https://www.arvprincipe.com) - Mi sitio web<br>
Instagram: [@arvprincipe](https://www.instagram.com/arvprincipe/) - Mi lugar favorito para compartir post y vivenvias<br>
Facebook: [@arvprincipeweb](https://www.facebook.com/arvprincipeweb) - Ver todos mis posts y donde anuncio cosas<br>
Linkedin: [@arvprincipe](https://www.linkedin.com/in/arvprincipe/) - Mi perfil para contactart<br>
