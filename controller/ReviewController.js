import Review from "../model/ReviewModel.js";


//Get all review
export const getReview = async(req, res) => {
    try {
        const response = await Review.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}

//Get review by user ID
export const getReviewById = async(req, res) => {
    try {
        const response = await Review.findAll({where: {
            restaurant_id: req.params.id
        }});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}

//Get review by user ID
export const getReviewByUserId = async(req, res) => {
    try {
        const response = await Review.findAll({where: {
            user_id: req.params.id
        }});
        res.status(200).json(response);
    } catch (error) {
        console.log(error.msg)
    }
}

//Insert review to katalog databse
export const insertReview = async(req, res) => {
    const {foodReview, rating, restaurant_id, user_id, username} = req.body;

    try {
        await Review.create({
            foodReview,
            rating,
            restaurant_id,
            username,
            user_id
        });
        res.status(201).json({msg: "Inserting review success!"});
    } catch (error) {
        console.log(error.msg);
    }
}

export const updateReview = async(req,res) => {
    try {
        await Review.update(req.body, {
            where: {
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Update review success"});
    } catch (error) {
        console.log(error.msg);
    }
}

export const deleteReview = async(req,res) => {
    try {
        await Review.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Delete review Success!"});
    } catch (error) {
        console.log(error.msg);
    }
}