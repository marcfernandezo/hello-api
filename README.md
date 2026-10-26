# lsg-daw2-hello-api

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

## Endpoints

### Restaurants

| Método | Ruta                      | Descripción                                              |
| ------ | ------------------------- | -------------------------------------------------------- |
| GET    | `/restaurants`            | Lista. Filtros opcionales: `?cuisine=` y `?city=`        |
| GET    | `/restaurants/:ID`        | Detalle                                                  |
| GET    | `/restaurants/:ID/menus`  | Menús de ese restaurante                                 |
| POST   | `/restaurants`            | Crea. Obligatorios: `name`, `cuisine`, `address`, `city` |
| PUT    | `/restaurants/:ID`        | Actualiza los campos enviados                            |
| DELETE | `/restaurants/:ID`        | Borra el restaurante y sus menús                         |

Campos: `name`, `cuisine`, `address`, `city`, `phone`, `priceRange`, `rating` (0-5), `openingHours`.

### Menus

| Método | Ruta            | Descripción                                                              |
| ------ | --------------- | ------------------------------------------------------------------------ |
| GET    | `/menus`        | Lista. Filtro opcional: `?restaurantId=`                                 |
| GET    | `/menus/:ID`    | Detalle                                                                  |
| POST   | `/menus`        | Crea. Obligatorios: `restaurantId`, `name`, `price`, `dishes`            |
| PUT    | `/menus/:ID`    | Actualiza los campos enviados                                            |
| DELETE | `/menus/:ID`    | Borra                                                                    |

Campos: `restaurantId`, `name`, `description`, `price`, `currency` (por defecto `EUR`),
`availability`, `dishes` (lista no vacía de `{ category, name }`).

Ejemplo:

```bash
curl -X POST http://localhost:3000/menus \
  -H "Content-Type: application/json" \
  -d '{"restaurantId":1,"name":"Menú vegetariano","price":15,"dishes":[{"category":"Principal","name":"Verduras a la brasa"}]}'
```

Errores: `404 { "message": ... }` si el recurso no existe y `400 { "message": ... }` si los datos no son válidos.
