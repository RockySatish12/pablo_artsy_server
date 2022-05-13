const Models = require('./models');

exports.addPayment = (artistId, paymentAmount) => {

    let artist

    Models.Payment.findOne({
        where:{
            artistId:artistId
        }
    })
    .then(payment => {
        if(payment){
            const tax = (10/100)*paymentAmount;
            const receivableAmount = (paymentAmount - tax);
            payment.received_amount += paymentAmount;
            payment.taxAmount += tax;
            payment.receivableAmount += receivableAmount;
            payment.save();
        }else{
            const tax = (10/100)*paymentAmount;
            const receivableAmount = (paymentAmount - tax);
            Models.Payment.create({
                received_amount: paymentAmount,
                taxAmount: tax,
                receivableAmount: receivableAmount,
                artistId: artistId
            })
            .then(success => {
                console.log("Payment added ========================>")
            }).catch(error => {
                console.log("Payment failed ========================>" + error)
            })
        }
    })
    .catch(error => {
        console.log("Failed to add payment" + error);
    })

}