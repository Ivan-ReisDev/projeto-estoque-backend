const { Products } = require('../Models/products')


const serviceControllerProducts = {
    registerProducts: async (req, res) => {
        try {
            const { nameUser, idUser, formData } = req.body;

            const { nameProducts, description, category, link, codeSKU, mark, stock, price, localization } = formData;

            // const nameProduct = await Products.findOne({ nameProducts })

            // if (nameProduct) {
            //     return res.status(422).json({ error: 'Produto já cadastrado' })
            // }
            // if (!category || !price || !stock || !nameProducts) {
            //     return res.status(422).json({ error: 'Preencha todos os campos' })
            // }

            const newProduct = {
                idUser: idUser,
                nameUser: nameUser,
                nameProducts: nameProducts.toUpperCase(),
                description: description.toUpperCase(),
                category: category.toUpperCase(),
                link: link,
                codeSKU: codeSKU.toUpperCase(),
                mark: mark.toUpperCase(),
                stock: stock,
                price: price,
                localization: localization.toUpperCase(),
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
            const products = await Products.find().sort({nameProducts:1});
            res.json(products)

        } catch (error) {
            console.error('Produto não encontrado', error);
            res.status(500).json({ msg: 'Produto não encontrado' })
        }

    },

    removeProduct: async (req, res) => {
        try {
            const productsId = req.params.productsId;
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
            updateProducts.nameProducts = nameProducts.toUpperCase();
            updateProducts.description = description.toUpperCase();
            updateProducts.category = category.toUpperCase();
            updateProducts.link = link;
            updateProducts.codeSKU = codeSKU.toUpperCase();
            updateProducts.mark = mark.toUpperCase();
            updateProducts.stock = stock;
            updateProducts.price = price;
            updateProducts.localization = localization.toUpperCase();

            await updateProducts.save()

            res.status(200).json({ msg: 'Produto atualizado com sucesso.' });

        } catch (error) {
            console.error('Não foi possível atualizar o produto', error);
            res.status(500).json({ msg: 'Não foi possível atualizar o produto' })
        }

    },


}

module.exports = serviceControllerProducts