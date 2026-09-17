# Geovisor SOS

Geovisor web para la publicación y consulta de desarrollos de analítica geoespacial de SOS.

## Objetivo

Centralizar, organizar y facilitar la visualización de los productos derivados de los desarrollos de analítica geoespacial de SOS.

El proyecto funciona como una capa de visualización y publicación desacoplada de los pipelines responsables de generar los análisis y productos geoespaciales.

## Arquitectura

Los proyectos de analítica geoespacial generan artefactos de visualización, principalmente mapas HTML construidos con Folium/Leaflet.

```text
geovisor-sos/
|
|-- index.html
|
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |
|   `-- js/
|       `-- app.js
|
|-- data/
|   `-- mapas.json
|
|-- mapas/
|   `-- cohortes/
|       `-- 2026/
|
`-- README.md
```

Estos artefactos son posteriormente incorporados al Geovisor SOS para su catalogación, versionamiento y publicación.


```text
Pipelines geoespaciales
        |
        v
    Mapas HTML
        |
        v
    Geovisor SOS
        |
        v
    Usuario