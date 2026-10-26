export const menus = [
    // 1 - La Taverna del Born
    {
        id: 1,
        restaurantId: 1,
        name: "Menú del día",
        description: "Menú de cocina catalana tradicional con bebida incluida.",
        price: 16.5,
        currency: "EUR",
        availability: "Lunes a viernes, mediodía",
        dishes: [
            { category: "Primero", name: "Escalivada con anchoas" },
            { category: "Segundo", name: "Fricandó de ternera con setas" },
            { category: "Postre", name: "Crema catalana" },
            { category: "Bebida", name: "Agua o vino de la casa" },
        ],
    },
    {
        id: 2,
        restaurantId: 1,
        name: "Menú degustación",
        description: "Recorrido por los clásicos de la casa.",
        price: 42,
        currency: "EUR",
        availability: "Todos los días, noche",
        dishes: [
            { category: "Entrante", name: "Croquetas de jamón ibérico" },
            { category: "Entrante", name: "Pa amb tomàquet con embutidos" },
            { category: "Principal", name: "Arroz de marisco" },
            { category: "Postre", name: "Mel i mató" },
        ],
    },

    // 2 - Sakura Sushi Bar
    {
        id: 3,
        restaurantId: 2,
        name: "Menú sushi variado",
        description: "Selección del chef con nigiri y maki.",
        price: 24.9,
        currency: "EUR",
        availability: "Todos los días",
        dishes: [
            { category: "Entrante", name: "Sopa miso" },
            { category: "Principal", name: "Surtido de nigiri (8 piezas)" },
            { category: "Principal", name: "California maki (6 piezas)" },
            { category: "Postre", name: "Mochi de té verde" },
        ],
    },
    {
        id: 4,
        restaurantId: 2,
        name: "Menú ramen",
        description: "Ramen con entrante y té.",
        price: 14.9,
        currency: "EUR",
        availability: "Lunes a viernes, mediodía",
        dishes: [
            { category: "Entrante", name: "Gyozas de cerdo (4 uds.)" },
            { category: "Principal", name: "Tonkotsu ramen" },
            { category: "Bebida", name: "Té verde" },
        ],
    },

    // 3 - Trattoria Il Girasole
    {
        id: 5,
        restaurantId: 3,
        name: "Menú pasta",
        description: "Pasta fresca elaborada a diario.",
        price: 15.9,
        currency: "EUR",
        availability: "Lunes a viernes, mediodía",
        dishes: [
            { category: "Entrante", name: "Ensalada caprese" },
            { category: "Principal", name: "Tagliatelle al ragù" },
            { category: "Postre", name: "Tiramisú" },
            { category: "Bebida", name: "Agua o refresco" },
        ],
    },
    {
        id: 6,
        restaurantId: 3,
        name: "Menú infantil",
        description: "Para menores de 12 años.",
        price: 9.9,
        currency: "EUR",
        availability: "Todos los días",
        dishes: [
            { category: "Principal", name: "Macarrones con tomate" },
            { category: "Principal", name: "Mini pizza margherita" },
            { category: "Postre", name: "Helado" },
        ],
    },

    // 4 - El Rincón Verde
    {
        id: 7,
        restaurantId: 4,
        name: "Menú del día vegano",
        description: "Cocina 100% vegetal de temporada.",
        price: 13.9,
        currency: "EUR",
        availability: "Lunes a viernes, mediodía",
        dishes: [
            { category: "Primero", name: "Crema de calabaza y coco" },
            { category: "Segundo", name: "Hamburguesa de lentejas con boniato" },
            { category: "Postre", name: "Brownie de aguacate" },
            { category: "Bebida", name: "Agua o kombucha" },
        ],
    },
    {
        id: 8,
        restaurantId: 4,
        name: "Menú degustación vegetal",
        description: "Cinco pases de cocina vegetariana creativa.",
        price: 29.9,
        currency: "EUR",
        availability: "Viernes, mediodía",
        dishes: [
            { category: "Entrante", name: "Hummus de remolacha con crudités" },
            { category: "Entrante", name: "Tempura de verduras" },
            { category: "Principal", name: "Risotto de setas" },
            { category: "Principal", name: "Curry de garbanzos y espinacas" },
            { category: "Postre", name: "Tarta de queso vegana" },
        ],
    },
]
