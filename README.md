campus-eats/
├── config/
│   └── db.js
├── controllers/
│   ├── homeController.js      (Controller — pages)
│   ├── aboutController.js
│   ├── menuController.js
│   ├── orderController.js
│   └── apiController.js       (Controller — JSON API, new)
├── models/
│   ├── Restaurant.js          (unchanged — reused by both Controllers)
│   ├── MenuItem.js            (unchanged — reused by both Controllers)
│   └── Order.js               (unchanged — reused by both Controllers)
├── routes/
│   ├── index.js               (Routing — page routes)
│   └── api.js                 (Routing — /api/* JSON routes, new)
├── views/
├── public/
