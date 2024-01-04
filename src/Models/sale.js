const mongoose = require('mongoose');
const saleSchema = new mongoose.Schema({
    sale: {
        type: String,
        required: true
    },

})


const Sale = mongoose.model('Sale', saleSchema);
module.exports = {
    Sale,
    saleSchema
}
