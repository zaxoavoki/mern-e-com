const Rating = require("../../models/Rating");

class RatingRepository {
  async create(rating) {
    return await Rating.create(rating);
  }

  async deleteAll() {
    return await Rating.deleteMany();
  }
}

module.exports = new RatingRepository();
