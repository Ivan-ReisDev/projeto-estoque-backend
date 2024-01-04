const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const serviceControllerPdf = {
    
    createPdf: async (req, res) => {
        try {
            const testePDF = 'Ivan'
            const { pdf } = req.body;
            const filePath = path.join(__dirname, `${testePDF}.pdf`); // Caminho do arquivo

            const doc = new PDFDocument({ size: 'A4' });
            doc.pipe(fs.createWriteStream(filePath));

            doc.fontSize(12);

            doc.fontSize(20).text('Eu amo você Desirée!', 1, 100);

            const description = 'teste';

            doc.text(description, 110, 140);

            doc.end();

            res.download(filePath, `${testePDF}.pdf`, (err) => {
                if (err) {
                    console.error('Erro ao enviar o arquivo', err);
                    res.status(500).json({ msg: 'Erro ao enviar o arquivo.' });
                } else {
                    // Após o download, exclua o arquivo se desejar
                    fs.unlinkSync(filePath);
                }
            });
        } catch (error) {
            console.error('Erro ao registrar', error);
            res.status(500).json({ msg: 'Erro ao cadastrar categoria.' });
        }
    },
};

module.exports = serviceControllerPdf;