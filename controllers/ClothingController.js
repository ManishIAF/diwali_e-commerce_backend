import Products from "../model/ProductsModel.js"

const Clothing = async(req,res) => {
    try {
        const categoryName = ["Ethnic","Men","Clothing","Sets"]; 
        const clothing = await Products.aggregate([
            {
              $lookup: {
                from: 'categories', // Assuming your categories collection is named 'categories'
                localField: 'categoryIds',
                foreignField: '_id',
                as: 'categories'
              }
            },
            {
              $match: {
                'categories.name': { $in: categoryName }
              }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                images: 1,
                stockQuantity: 1,
                createdAt: 1,
                updatedAt: 1,
                categoryIds: 1
              }
            }
          ]).exec();
        res.status(200).json(clothing)

    } catch (error) {
        console.log(error)
    }
}

const clothingById = async(req,res) => {
    try {
        const id = req.params.id;
        const clothing = await Products.findById(id);
        res.status(200).json(clothing)
    } catch (error) {
        console.log(error)
    }
}
export {Clothing,clothingById}