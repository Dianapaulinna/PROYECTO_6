
const Salad = require("../models/Salad");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.create = async (req, res) => {
  const { name, currency, prices, img, description, slug } = req.body;

  console.log(req.body);

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

    console.log("saladPrices", saladPrices);

    const newSalad = await Salad.create({
      idProd: product.id,
      name: product.name,
      prices: [...saladPrices],
      img,
      currency,
      description: product.description,
      slug,
    });

    // DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
    res.json({
      msg: "Ensalada creada con éxito",
      data: newSalad,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hubo un error creando la ensalada",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const salads = await Salad.find({});

    res.json({
      msg: "Ensaladas obtenidas con éxito.",
      data: salads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Hubo un error obteniendo los datos",
    });
  }
};

exports.readOne = async (req, res) => {
  const { slug } = req.params;

  try {
    const salad = await Salad.findOne({ slug });

    if (salad === null) {
      return res.status(400).json({
        msg: "Ensalada no encontrada.",
      });
    }

    res.json({
      msg: "Ensalada obtenida con éxito.",
      data: salad,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "hubo un error obteniendo los datos.",
      error: error,
    });
  }
};