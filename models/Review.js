const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Add a title for the review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Add a rating between 1 and 10']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// One review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Calculate avg rating
ReviewSchema.statics.getAverageRating = async function(bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// Invoke getAverageCost after save
ReviewSchema.post('save', async function() {
  await this.constructor.getAverageRating(this.bootcamp);
});

// Invoke getAverageCost before remove
ReviewSchema.post('remove', async function() {
  await this.constructor.getAverageRating(this.bootcamp);
});

module.exports = mongoose.model('Review', ReviewSchema);