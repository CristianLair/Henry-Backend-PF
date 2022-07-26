

const review = require('../models/review');

 const createReview = (req, res) => {
    const review = new Review();
    review.username = req.body.username;
    review.rating = req.body.rating;
    review.body = req.body.body;
    review.save()
      .then((result) => {
        Usuario.findOne({ username: review.username }, (err, user) => {
            if (user) {
                // The below two lines will add the newly saved review's 
                // ObjectID to the the User's reviews array field
                user.reviews.push(review);
                user.save();
                res.json({ message: 'Review created!' });
            }
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
};



module.exports = {createReview}