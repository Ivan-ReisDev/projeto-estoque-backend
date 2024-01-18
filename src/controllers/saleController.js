const { Sale } = require('../Models/sale')


const serviceControllerSales = {
    
    registerCategory: async (req, res) => {
        try {
            const { sale } = req.body;

            const newSale = {
                sale: sale,
            }



            const registerNewCategory = await Sale.create(newSale)

            if (!registerNewCategory) {
                return res.status(422).json({ error: 'Erro ao registrar venda.' })
            }

            res.status(201).json({ msg: 'Venda realizada com sucesso.' })

        } catch (error) {
            console.error('Erro ao registrar', error);
            res.status(500).json({ msg: 'Erro ao registrar venda.' })
        }
    },

    // getAllCategory: async (req, res) => {
    //     try { 
    //         const category = await Category.find().sort({category:1});
    //         res.json(category)

    //     } catch (error) {
    //         console.error('Categoria não encontrada', error);
    //         res.status(500).json({ msg: 'Categoria não encontrada' })
    //     }

    // },

    // updateCategory: async (req, res) => {
    //     try {
    //         const categoryId = req.params.categoryId;
    //         const { category } = req.body;
    //         const updateCategory = await Category.findById(categoryId)
    //         if (!updateCategory) {
    //             res.status(404).json({ msg: 'Categoria não encontrada.' });
    //         }

    //         updateCategory.category = category

    //         await updateCategory.save()

    //         res.status(200).json({ msg: 'Categoria atualizada com sucessor.' });

    //     } catch (error) {
    //         console.error('Não foi possível atualizar a categoria', error);
    //         res.status(500).json({ msg: 'Não foi possível atualizar a categoria' })
    //     }

    // },

    // deleteCategory: async (req, res) => {
    //     try {
    //         const categoryId = req.params.categoryId;
    //         const deleteCategory = await Category.findByIdAndDelete(categoryId)
    //         if (!deleteCategory) {
    //             res.status(404).json({ msg: 'Produto não encontrado' });

    //         }

    //         res.status(200).json({ msg: 'Produto deletado com sucesso.' });

    //     } catch (error) {
    //         console.error('Não foi possível deletar o produto', error);
    //         res.status(500).json({ msg: 'Não foi possível deletar o produto' })
    //     }

    // },


}

module.exports = serviceControllerSales