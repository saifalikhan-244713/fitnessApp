import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/calculatorStyles.module.css";

const Calculator = () => {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState(0);
  const [calculated, setCalculated] = useState(false);
  const [tdee, setTdee] = useState(0);
  const [carbIntake, setCarbIntake] = useState(0);
  const [sugarIntake, setSugarIntake] = useState(0);
  const [proteinIntake, setProteinIntake] = useState(0);
  const [fiberIntake, setFiberIntake] = useState(0);
  const [calorieIntake, setCalorieIntake] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fiberValue = calculateFiberIntake();
    setFiberIntake(fiberValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tdee]);

  const calculateBMR = () => {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return bmr;
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    return bmr * activityLevel;
  };

  const calculateCarbIntake = () => {
    const tdee = calculateTDEE();
    const carbPercentage = gender === "male" ? 50 : 55;
    const carbCalories = (carbPercentage / 100) * tdee;
    return carbCalories / 4;
  };

  const calculateSugarIntake = () => {
    const tdee = calculateTDEE();
    const sugarPercentage = 10;
    const maxSugarCalories = (sugarPercentage / 100) * tdee;
    return maxSugarCalories / 4;
  };

  const calculateProteinIntake = () => {
    const proteinGramsPerKg = 0.8;
    const proteinGrams = weight * proteinGramsPerKg;
    return proteinGrams;
  };

  const calculateFiberIntake = () => {
    const recommendedFiberIntake = gender === "male" ? 38 : 25;
    const adjustedFiberIntake = recommendedFiberIntake * (tdee / 2000);
    return adjustedFiberIntake;
  };

  const calculateCalorieIntake = () => {
    const tdee = calculateTDEE();
    let calorieIntake;
    const goal = "weight_loss"; // Assuming you have a way to set the goal

    switch (goal) {
      case "weight_loss":
        calorieIntake = tdee - 500; // Aim for a deficit of 500 calories per day
        break;
      case "weight_maintenance":
        calorieIntake = tdee;
        break;
      case "weight_gain":
        calorieIntake = tdee + 500; // Aim for a surplus of 500 calories per day
        break;
      default:
        calorieIntake = tdee;
    }

    return calorieIntake;
  };

  const handleSubmit = () => {
    const recommendedFiberIntake = gender === "male" ? 38 : 25;
    const tdeeValue = calculateTDEE();
    const carbIntakeValue = calculateCarbIntake();
    const sugarIntakeValue = calculateSugarIntake();
    const proteinIntakeValue = calculateProteinIntake();
    const calorieIntakeValue = calculateCalorieIntake();
    const fiberIntakeValue = recommendedFiberIntake * (tdeeValue / 2000);

    setTdee(tdeeValue);
    setCarbIntake(carbIntakeValue);
    setSugarIntake(sugarIntakeValue);
    setProteinIntake(proteinIntakeValue);
    setFiberIntake(fiberIntakeValue);
    setCalorieIntake(calorieIntakeValue);
    setCalculated(true);
    const email = location.state?.email;

    console.log("email sent from calc", email);
    navigate("/home", {
      state: {
        proteinIntake: proteinIntakeValue,
        carbIntake: carbIntakeValue,
        sugarIntake: sugarIntakeValue,
        fiberIntake: fiberIntakeValue,
        tdee: tdeeValue,
        email: email,
      },
    });
  };

  return (
    <>
      <div className={styles.calculatorParent}>

        <form className={styles.detailsForm} onSubmit={handleSubmit}>
        <h2>Please enter your details</h2>

          <input
            type="number"
            value={weight}
            placeholder="Weight (Kgs)"
            onChange={(e) => setWeight(parseFloat(e.target.value))}
          />
          <input
            type="number"
            value={height}
            placeholder="Height (cm)"
            onChange={(e) => setHeight(parseFloat(e.target.value))}
          />
          <input
            type="number"
            value={age}
            placeholder="Age"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
          >
            <option value={0}>Your Activity Level</option>
            <option value={1.2}>Sedentary</option>
            <option value={1.375}>Lightly Active</option>
            <option value={1.55}>Moderately Active</option>
            <option value={1.725}>Very Active</option>
            <option value={1.9}>Extra Active</option>
          </select>
          <button type="submit" className={styles.proceedButton}>Calculate</button>
          {calculated && (
            <div>
              <h3>Results:</h3>
              <p>
                Total Daily Energy Expenditure (TDEE): {tdee.toFixed(2)}{" "}
                kcal/day
              </p>
              <p>Carbohydrate Intake: {carbIntake.toFixed(2)} grams/day</p>
              <p>Maximum Sugar Intake: {sugarIntake.toFixed(2)} grams/day</p>
              <p>Protein Intake: {proteinIntake.toFixed(2)} grams/day</p>
              <p>Fiber Intake: {fiberIntake.toFixed(2)} grams/day</p>
              <p>Calorie Intake: {calorieIntake.toFixed(2)} kcal/day</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Calculator;
