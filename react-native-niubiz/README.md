# Nombre del Proyecto

Integracion Niubiz React Native Expo Bare Workflow

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Para empezar, necesitas tener instalado:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- **Java 17**: Necesario para el entorno de desarrollo de Android. Descargar desde [Oracle Java](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) o usar OpenJDK.
- **Android Studio**: Para el desarrollo de Android y manejo de emuladores. Descargar desde [Android Studio](https://developer.android.com/studio).

### Configuración del Proyecto

1. **Configurar el SDK de Android**:
   En `local.properties`, especifica la ruta al SDK de Android. Este archivo no suele incluirse en el control de versiones, así que créalo o modifícalo localmente.

   ```properties
   sdk.dir=/ruta/a/tu/sdk-de-android

   ```

2. **Clonar el repositorio**:

   ```bash
   git clone []
   cd UbicacionProyecto
   npm install
   ```

## Ejecución

- Para ejecutar la aplicación en un emulador o dispositivo Android o IOS:

  ```bash
  npx expo run:android
  npx expo run:ios
  ```

- Convertir a Swift: (https://stackoverflow.com/questions/48167949/how-to-convert-ios-react-native-template-to-swift)
- Video demostracion: (https://www.youtube.com/watch?v=DREQwNb99l0)

## Documentación

- Documentación Niubiz: https://desarrolladores.niubiz.com.pe/docs/pago-web
