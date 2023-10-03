document.addEventListener('DOMContentLoaded', function () {
    Alpine.data('bmiCalculator', () => ({
      Genetic_Pedigree_Coefficient: '',
      Age: '',
      Height: '',
      Weight: '',
      Sex: '',
      Smoking: '',
      Physical_activity: '',
      salt_content_in_the_diet: '',
      alcohol_consumption_per_day: 1,
      stress_levels: '',
      Chronic_kidney_disease: '',
      prediction: '',
  
      calculateBMI() {
        const inputData = {
          Genetic_Pedigree_Coefficient: this.Genetic_Pedigree_Coefficient,
          Age: parseFloat(this.Age),
          Height: parseFloat(this.Height),
          Weight: parseFloat(this.Weight),
          Sex: this.Sex,
          Smoking: this.Smoking,
          Physical_activity: parseFloat(this.Physical_activity),
          salt_content_in_the_diet: this.salt_content_in_the_diet,
          alcohol_consumption_per_day: parseFloat(this.alcohol_consumption_per_day),
          stress_levels: this.stress_levels,
          Chronic_kidney_disease: this.Chronic_kidney_disease,
        };
  
        axios
          .post('http://127.0.0.1:5000/api/predict', inputData)
          .then((response) => {
            this.prediction = response.data.prediction;
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
    }));
  });
  