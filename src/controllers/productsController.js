const { Products } = require('../Models/products')
const { Category } = require('../Models/category')


const serviceControllerProducts = {

    registerProducts: async (req, res) => {
        try {
            const { nameUser, idUser, formData } = req.body;

            const { nameProducts, description, category, link, codeSKU, mark, stock, price, localization } = formData;

            const nameProduct = await Products.findOne({ nameProducts });

            if(!category) {
                return res.status(422).json({ msg: 'Categoria inexistente.' })
            }

            if (nameProduct) {
                return res.status(422).json({ error: 'Produto já cadastrado' })
            }
            if (!category || !price || !stock || !nameProducts) {
                return res.status(422).json({ error: 'Preencha todos os campos' })
            }

            const newProduct = {
                idUser: idUser,
                nameUser: nameUser.toLowerCase(),
                nameProducts: nameProducts.toLowerCase(),
                description: description.toLowerCase(),
                category: category.toLowerCase(),
                link: link.toLowerCase(),
                codeSKU: codeSKU,
                mark: mark.toLowerCase(),
                stock: stock,
                price: price,
                localization: localization.toLowerCase(),
            }

            const createProducts = await Products.create(newProduct)

            if (!createProducts) {
                return res.status(422).json({ error: 'Houve um erro, tente novamente mais tarde' })
            }

            res.status(201).json({ msg: 'Produto cadastrado com sucesso.' })

        } catch (error) {
            console.error('Erro ao registrar', error);
            res.status(500).json({ msg: 'Erro ao cadastrar produto' })
        }
    },


    getAllProducts: async (req, res) => {
        try {
            
            const products = await Products.find().sort({ nameProducts: 1 });
            res.json(products)

        } catch (error) {
            console.error('Produto não encontrado', error);
            res.status(500).json({ msg: 'Produto não encontrado' })
        }

    },

    searchProducts: async (req, res) => {
        try {
            const  nameProducts  = req.query.nameProducts;
            console.log(nameProducts)
            const products = await Products.find().sort({ nameProducts: 1 });
            const resProduct = nameProducts.toLowerCase()
                ? products.filter(product => product.nameProducts.includes(nameProducts.toLowerCase())) 
                : products;
            return res.json(resProduct);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    removeProduct: async (req, res) => {
        try {
            const productsId = req.params.productsId;
            console.log(req.params)
            const deleteProducts = await Products.findByIdAndDelete(productsId)
            if (!deleteProducts) {
                res.status(404).json({ msg: 'Produto não encontrado' });

            }

            res.status(200).json({ msg: 'Produto deletado com sucesso.' });

        } catch (error) {
            console.error('Não foi possível deletar o produto', error);
            res.status(500).json({ msg: 'Não foi possível deletar o produto' })
        }

    },


    putProduct: async (req, res) => {
        try {
            const productsId = req.params.productsId;
            const deleteProducts = await Products.findByIdAndDelete(productsId)
            if (!deleteProducts) {
                res.status(404).json({ msg: 'Produto não encontrado' });

            }

            res.status(200).json({ msg: 'Produto deletado com sucesso.' })

        } catch (error) {
            console.error('Não foi possível deletar o produto', error);
            res.status(500).json({ msg: 'Não foi possível deletar o produto' })
        }

    },

    updateProducts: async (req, res) => {
        try {
            const productsId = req.params.productsId;
            const { nameProducts, description, category, link, codeSKU, mark, stock, price, localization } = req.body;
            const updateProducts = await Products.findById(productsId)
            if (!updateProducts) {
                res.status(404).json({ msg: 'Produto não encontrado' });

            }
            updateProducts.nameProducts = nameProducts.toLowerCase();
            updateProducts.description = description.toLowerCase();
            updateProducts.category = category.toLowerCase();
            updateProducts.link = link;
            updateProducts.codeSKU = codeSKU.toLowerCase();
            updateProducts.mark = mark.toLowerCase();
            updateProducts.stock = stock;
            updateProducts.price = price;
            updateProducts.localization = localization.toLowerCase();

            await updateProducts.save()

            res.status(200).json({ msg: 'Produto atualizado com sucesso.' });

        } catch (error) {
            console.error('Não foi possível atualizar o produto', error);
            res.status(500).json({ msg: 'Não foi possível atualizar o produto' })
        }

    },


}

module.exports = serviceControllerProducts