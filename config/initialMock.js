const mongoose = require("mongoose");
require("dotenv").config({ path: "./../.env" });

const Salad = require("../models/Salad");
const stripe = require("stripe")(process.env.STRIPE_WH_SIGNING_SECRET);

const salads = [
  {
    name: "Ensalada Cesar",
    prices: [
      {
        size: "Personal",
        price: 150,
        description: "Pollo, lechuga, crotones, anchoas, queso parmesano",
      },
    ],
    img: [
      "",
    ],
    currency: "mxn",
    description: "Incluye 1/2 litro de agua fresa",
    slug: "cesar",
  },
  {
    name: "Ensalada marroqui",
    prices: [
      {
        size: "Personal",
        price: 100,
        description: "Pimiento, cebolla, apio, menta, perejil, limón",
      },
     
    ],
    img: [
      "",
    ],
    currency: "mxn",
    description: "Ideal para acompañar tu platillo",
    slug: "marroqui",
  },
];

const generateSalads = async (salads) => {
  salads.map((e) => {
    const insertSalads = async ({
      name,
      currency,
      prices,
      img,
      description,
      slug,
    }) => {
      // STRIPE
      console.log(insertSalads);

      // A. PRODUCTO
      // CREAR EL PRODUCTO EN STRIPE
      try {
        const product = await stripe.products.create({
          name,
          description,
          images: [...img],
          metadata: {
            productDescription: description,
            slug,
          },
        });

        // B. PRECIO
        // CREAR LOS PRECIOS PARA EL PRODUCTO EN STRIPE
        const stripePrices = await Promise.all(
          prices.map(async (e) => {
            return await stripe.prices.create({
              unit_amount: e.price,
              currency: currency,
              product: product.id,
              nickname: e.size,
              metadata: {
                size: e.size,
                priceDescription: e.description,
              },
            });
          })
        );

        // 2. MODIFICACIÓN EN BASE DE DATOS
        const saladPrices = stripePrices.map((e) => {
          return {
            id: e.id,
            size: e.metadata.size,
            priceDescription: e.metadata.priceDescription,
            price: e.unit_amount,
          };
        });

        await Salad.create({
          idProd: product.id,
          name: product.name,
          prices: [...saladPrices],
          img,
          currency,
          description: product.description,
          slug,
        });

        return true;
      } catch (error) {
        console.log(error);
      }
    };

    insertSalads(e);
    return;
  });
};

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.URL_BD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.db.dropDatabase();
    await generateSalads(salads);
    console.log("Ensaladas creadas correctamente");

    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();