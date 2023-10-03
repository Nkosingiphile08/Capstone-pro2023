const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { predictHypertension } = require('./predictor'); // Import your prediction function

// Middleware to parse JSON requests
app.use(bodyParser.json());

// POST route for making predictions
app.post('/api/predict', (req, res) => {
  // Get input data from the request body
  const {
    Genetic_Pedigree_Coefficient,
    Age,
    Height,
    Weight,
    Sex,
    Smoking,
    Physical_activity,
    salt_content_in_the_diet,
    alcohol_consumption_per_day,
    stress_levels,
    Chronic_kidney_disease,
  } = req.body;

  // Trained DTC model to make predictions
  const prediction = predictHypertension(
    Genetic_Pedigree_Coefficient,
    Age,
    Height,
    Weight,
    Sex,
    Smoking,
    Physical_activity,
    salt_content_in_the_diet,
    alcohol_consumption_per_day,
    stress_levels,
    Chronic_kidney_disease
  );

  // Return the prediction result as JSON
  res.json({ prediction });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
