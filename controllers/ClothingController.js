import Products from "../model/ProductsModel.js"

const Clothing = async(req,res) => {
    try {
        console.log('req.query : ',req.query)
        console.log('req.query : ',req.params)
        const {categoryName=[]} = req.query;
        console.log('categaryName : ',categoryName)
        //Men Clothing
        // const categoryName = ["Ethnic", "Men", "Clothing", "Sets", "Sherwani"];
        // const categoryName = ["Ethnic", "Men", "Clothing", "Pajama"];
        // const categoryName = ["Ethnic", "Men", "Clothing", "Sets","Ethnic Sets"];

        // Women Clothing

        // const categoryName = ['Clothing','Ethnic','Women',"Girl",'Saree'];
        // const categoryName = ['Clothing','Ethnic','Women',"Girl",'Kurta&Kurtis'];
        // const categoryName = ['Clothing','Ethnic','Women',"Girl",'Lehnga Choli'];

        const clothing = await Products.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryIds',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $addFields: {
                    categoryNames: { $map: { input: "$categories", as: "category", in: "$$category.name" } }
                }
            },
            {
                $match: {
                    $expr: {
                        $setIsSubset: [categoryName?.length>0?categoryName:[], "$categoryNames"]
                    }
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