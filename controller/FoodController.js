import Food from "../model/FoodModel.js";


//Get all food
export const getFood = async(req, res) => {
    try {
        const response = await Food.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}

//Insert Food to katalog databse
export const insertFood = async(req, res) => {
    try {
        await Food.create(req.body);
        res.status(201).json({msg: "Inserting food success!"});
    } catch (error) {
        console.log(error.msg);
    }
}

export const updateFood = async(req,res) => {
    try {
        await Food.update(req.body, {
            where: {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Update food success"});
    } catch (error) {
        console.log(error.msg);
    }
}

export const deleteFood = async(req,res) => {
    try {
        await Food.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Delete food Success!"});
    } catch (error) {
        console.log(error.msg);
    }
}

//Get food by category (makanan / minuman), with restaurant id
export const getFoodByCategory = async (req, res) => {
  try {
    const { id, category } = req.params;

    const response = await Food.findAll({
      where: {
        restaurant_id: id,
        categories: category, // pastikan nilainya "makanan" atau "minuman"
      },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Failed to fetch food by category" });
  }
};

//Get Food by Restaurant
export const getFoodByRestaurant = async(req, res) => {
    try {
        const response = await Food.findAll({
            where: {
                restaurant_id : req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}
