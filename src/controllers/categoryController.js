const { Category } = require('../Models/category')


const serviceControllerCategory = {
    createCategory: async (req, res) => {
        try {
            const { formData } = req.body;

            const { category } = formData;

            const newCategory = {
                category: category
            }

            const createNewCategory = await Category.create(newCategory)

            if(createNewCategory) {
                return res.status(422).json({ error: 'Categoria já cadastrada.' })
            }

            if (!createNewCategory) {
                return res.status(422).json({ error: 'Erro ao criar categoria tente novamente mais tarde.' })
            }

            res.status(201).json({ msg: 'Categoria cadastrado com sucesso.' })

        } catch (error) {
            console.error('Erro ao registrar', error);
            res.status(500).json({ msg: 'Erro ao cadastrar categoria.' })
        }
    },


}

module.exports = serviceControllerCategory