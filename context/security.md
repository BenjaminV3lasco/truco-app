# Seguridad mínima

La aplicación actual no tiene cuentas, backend ni datos sensibles. No necesita autenticación, roles o auditoría. Aun así, conviene mantener estas reglas básicas.

## Repositorio

- No versionar `.env`, claves, tokens ni credenciales.
- No incorporar servicios externos sin documentar qué datos reciben.
- Revisar licencias y procedencia de imágenes, audio y tipografías.

## Interfaz

- Tratar los nombres y apodos como entrada no confiable.
- Escapar contenido antes de insertarlo como HTML.
- Evitar `eval` y ejecución dinámica de código.
- Si se agrega persistencia, validar los datos recuperados antes de usarlos.

## Si el alcance crece

Si se agregan cuentas, una API pública, sincronización o datos personales, reemplazar este documento por un modelo de seguridad acorde: autenticación, autorización del lado del servidor, protección de sesiones, rate limiting, backups y política de privacidad.

