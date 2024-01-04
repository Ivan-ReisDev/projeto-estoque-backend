const fs = require('fs');
const PDFDocument = require('pdfkit');

const serviceControllerPdf = {
    createPdf: async (req, res) => {
        try {
            const { pdf } = req.body;
            const doc = new PDFDocument({size: 'A4'})
            doc.pipe(fs.createWriteStream('teste.pdf'))

            doc.fontSize(12);

            doc.fontSize(20).text('Estou fazendo um teste', 200, 100);

            const description = 'MEU AMOR EU TE AMOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO'

            doc.text(description, 110, 140)

            doc.end()
            res.download(__dirname + 'teste.pdf')


        } catch (error) {
            console.error('Erro ao registrar', error);
            res.status(500).json({ msg: 'Erro ao cadastrar categoria.' })
        }
    },
}

module.exports = serviceControllerPdf