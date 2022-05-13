const SendMail = require('./sendMail');

exports.OrderAccepted = (email, artName)=>{
    const msg = `Your order for "${artName}" has been accepted
        \n Please check the app to make payment`
    SendMail.sendMail("Order Accepted", msg, email);
};

exports.OrderDeclined = (email, artName)=>{
    const msg = `Your order for "${artName}" has been rejected`
    SendMail.sendMail("Order Declined", msg, email);
};

exports.OrderCancled = (email, artName, username)=>{
    const msg = `${username}, has cancled hi order for ${artName}`
    SendMail.sendMail("Order Cancled", msg, email);
};

exports.PaymentReceived = (artistEmail, collectorEmail, artName, paymentAmount, collectorName) => {
    const msgArtist = `You have received the paymenet of NPR ${paymentAmount} for "${artName} by ${collectorName}"\n Please send delivery detail to ${collectorEmail} within 24 hrs else your order will be canceled`
    SendMail.sendMail("Payment Received", msgArtist, artistEmail);

    const msgCollector = `You have made an payment of NPR ${paymentAmount} for "${artName}"\n Notify us for unknown tranaction`
    SendMail.sendMail("Payment", msgCollector, collectorEmail);
}

exports.PasswordChanged = (email, username)=>{
    const msg = `${username}, Your password ha been changed successfully`
    SendMail.sendMail("Password Changed", msg, email);
};