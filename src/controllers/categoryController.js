const { Category } = require('../Models/category')


const serviceControllerCategory = {
    createCategory: async (req, res) => {
        try {
            const { formdata } = req.body;
            const { category } = formdata;

            const newCategory = {
                category: category,
            };
    
            const createNewCategory = await Category.create(newCategory);
    
            if (!createNewCategory) {
                return res.status(422).json({ error: 'Erro ao criar categoria. Tente novamente mais tarde.' });
            }
    
            res.status(201).json({ msg: 'Categoria cadastrada com sucesso.' });
    
        } catch (error) {
            console.error('Erro ao registrar', error);
            res.status(500).json({ msg: 'Erro ao cadastrar categoria.' });
        }
    },
    

    getAllCategory: async (req, res) => {
        try { 
            const category = await Category.find().sort({category:1});
            res.json(category)

        } catch (error) {
            console.error('Categoria não encontrada', error);
            res.status(500).json({ msg: 'Categoria não encontrada' })
        }

    },

    updateCategory: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            const { category } = req.body;
            const updateCategory = await Category.findById(categoryId)
            if (!updateCategory) {
                res.status(404).json({ msg: 'Categoria não encontrada.' });
            }

            updateCategory.category = category

            await updateCategory.save()

            res.status(200).json({ msg: 'Categoria atualizada com sucesso.' });

        } catch (error) {
            console.error('Não foi possível atualizar a categoria', error);
            res.status(500).json({ msg: 'Não foi possível atualizar a categoria' })
        }

    },

    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            const deleteCategory = await Category.findByIdAndDelete(categoryId)
            if (!deleteCategory) {
                res.status(404).json({ msg: 'Categoria não encontrada' });

            }

            res.status(200).json({ msg: 'Categoria deletada com sucesso.' });

        } catch (error) {
            console.error('Não foi possível deletar a categoria', error);
            res.status(500).json({ msg: 'Não foi possível deletar categoria' })
        }

    },


}

module.exports = serviceControllerCategory