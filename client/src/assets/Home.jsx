import { useState, useEffect } from "react";
import styles from "../styles/HomeStyles.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  console.log(location.state);
  const { proteinIntake, carbIntake, sugarIntake, tdee, fiberIntake } =
    location.state || {};

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [foodGrams, setFoodGrams] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [foodSelected, setFoodSelected] = useState([]); // Move the declaration inside the component
  const [recipeItems, setRecipeItems] = useState([]);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFiber, setTotalFiber] = useState(0);
  const [exceedCarbIntake, setExceedCarbIntake] = useState(false);
  const [exceedProteinIntake, setExceedProteinIntake] = useState(false);
  const [exceedSugarIntake, setExceedSugarIntake] = useState(false);
  const [exceedTDEE, setExceedTDEE] = useState(false);
  const [exceedFiber, setExceedFiber] = useState(false);

  // Fruits list
  const fruitItems = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 27, name: "Banana Flower" },
    { id: 26, name: "Cranberry" },
    { id: 17, name: "Custard Apple" },
    { id: 23, name: "Dates" },
    { id: 18, name: "Dragon Fruit" },
    { id: 14, name: "Jackfruit" },
    { id: 20, name: "Jamun" },
    { id: 21, name: "Fig (Anjeer)" },
    { id: 11, name: "Guava" },
    { id: 24, name: "Guavas" },
    { id: 9, name: "Kiwi" },
    { id: 15, name: "Chikoo (Sapota)" },
    { id: 16, name: "Lychee" },
    { id: 8, name: "Mango" },
    { id: 19, name: "Mulberry" },
    { id: 3, name: "Orange" },
    { id: 13, name: "Pomegranate" },
    { id: 12, name: "Papaya" },
    { id: 10, name: "Peach" },
    { id: 7, name: "Pineapple" },
    { id: 4, name: "Grapes" },
    { id: 25, name: "Tamarind" },
    { id: 6, name: "Watermelon" },
    { id: 5, name: "Strawberry" },
  ];

  // Vegetables list
  const vegetableItems = [
    { id: 50, name: "Artichoke" },
    { id: 49, name: "Asparagus" },
    { id: 35, name: "Bell Pepper" },
    { id: 42, name: "Beetroot" },
    { id: 53, name: "Brussels Sprouts" },
    { id: 34, name: "Broccoli" },
    { id: 43, name: "Capsicum" },
    { id: 366, name: "Cabbage" },
    { id: 31, name: "Carrot" },
    { id: 32, name: "Cucumber" },
    { id: 57, name: "Coriander" },
    { id: 38, name: "Eggplant (Brinjal)" },
    { id: 55, name: "Garlic" },
    { id: 56, name: "Ginger" },
    { id: 47, name: "Green Beans" },
    { id: 52, name: "Kale" },
    { id: 40, name: "Lettuce" },
    { id: 45, name: "Okra (Ladyfinger)" },
    { id: 30, name: "Onion" },
    { id: 28, name: "Potato" },
    { id: 48, name: "Peas" },
    { id: 54, name: "Pumpkin" },
    { id: 41, name: "Radish" },
    { id: 36, name: "Spinach" },
    { id: 44, name: "Sweet Potato" },
    { id: 511, name: "Turnip" },
    { id: 39, name: "Zucchini" },
  ];

  // Cereals list
  const cerealItems = [
    { id: 68, name: "Amaranth" },
    { id: 1002, name: "Barley" },
    { id: 60, name: "Barley" },
    { id: 51, name: "Bajra" },
    { id: 67, name: "Buckwheat" },
    { id: 711, name: "Couscous" },
    { id: 79, name: "Cornmeal" },
    { id: 626, name: "Maize (Corn)" },
    { id: 82, name: "Flaxseeds" },
    { id: 76, name: "Jowar" },
    { id: 77, name: "Jowar" },
    { id: 63, name: "Rye" },
    { id: 58, name: "Rice" },
    { id: 71, name: "Semolina" },
    { id: 75, name: "Soybeans" },
    { id: 70, name: "Spelt" },
    { id: 83, name: "Chia Seeds" },
    { id: 62, name: "Sunflower Seeds" },
    { id: 84, name: "Sunflower Seeds" },
    { id: 69, name: "Farro" },
    { id: 65, name: "Millet" },
    { id: 64, name: "Quinoa" },
    { id: 73, name: "Wild Rice" },
    { id: 80, name: "Brown Rice" },
    { id: 81, name: "Broken Wheat Dalia" },
    { id: 66, name: "Sorghum (Jowar)" },
    { id: 59, name: "Wheat" },
  ];
  // Pulse items
  const pulseItems = [
    { id: 92, name: "Arhar Dal" },
    { id: 87, name: "Black Beans" },
    { id: 86, name: "Chickpeas" },
    { id: 94, name: "Chana Dal" },
    { id: 90, name: "Green Peas" },
    { id: 97, name: "Horse Gram" },
    { id: 88, name: "Kidney Beans" },
    { id: 85, name: "Lentils" },
    { id: 93, name: "Masoor Dal" },
    { id: 96, name: "Matki" },
    { id: 95, name: "Pigeon Peas" },
    { id: 91, name: "Urad Dal" },
  ];
  // Inside your handleLogButtonClick function in the React component

  const handleLogButtonClick = () => {
    const today = new Date();
    const monthNum = today.getMonth() + 1;

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[monthNum]
    // console.log("day ", day);

    const date = today.getDate();
    console.log("date ", date);
    const dateModified = month.toString() +" "+ date.toString();
    console.log("date modified", dateModified);
    axios
      .post(
        "http://localhost:3001/",
        {
          totalCarbs,
          totalProtein,
          totalFiber,
          totalSugar,
          date: dateModified,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error logging nutrition data:", error);
      });
  };

  const handleSubmitGpt = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001", { prompt })
      .then((res) => {
        setResponse(res.data.response); // Access the 'response' property from the data object
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCheckboxChangeFromFoodList = (item) => {
    const foodId = item.id;
    if (selectedFoods.some((selected) => selected.id === foodId)) {
      // Food is already selected, remove it
      setSelectedFoods((prevSelectedFoods) =>
        prevSelectedFoods.filter((selected) => selected.id !== foodId)
      );
      // Remove grams input for the unselected food
      setFoodGrams((prevGrams) => {
        // eslint-disable-next-line no-unused-vars
        const { [foodId]: removedGram, ...rest } = prevGrams;
        return rest;
      });
    } else {
      // Food is not selected, add it
      setSelectedFoods([
        ...selectedFoods,
        {
          id: foodId,
          name: item.name,
        },
      ]);
    }
  };
  useEffect(() => {
    if (totalCarbs > carbIntake) {
      setExceedCarbIntake(true);
    } else {
      setExceedCarbIntake(false);
    }
    if (totalFiber > fiberIntake) {
      setExceedFiber(true);
    } else {
      setExceedFiber(false);
    }

    if (totalProtein > proteinIntake) {
      setExceedProteinIntake(true);
    } else {
      setExceedProteinIntake(false);
    }

    if (totalSugar > sugarIntake) {
      setExceedSugarIntake(true);
    } else {
      setExceedSugarIntake(false);
    }

    if (totalCalories > tdee) {
      setExceedTDEE(true);
    } else {
      setExceedTDEE(false);
    }
  }, [
    totalCarbs,
    totalProtein,
    totalSugar,
    tdee,
    carbIntake,
    proteinIntake,
    sugarIntake,
    tdee,
    fiberIntake,
  ]);

  const recipeAdd = (itemName) => {
    const item = selectedFoods.find((food) => food.name === itemName);
    if (item) {
      setRecipeItems((prevRecipeItems) => [...prevRecipeItems, item]);
    }
  };
  useEffect(() => {
    const promptString = `Give me an Indian recipe having ${recipeItems
      .map((item) => item.name)
      .join(", ")}`;
    setPrompt(promptString);
  }, [recipeItems]);

  //   var i = 0;
  const handleSearch = async () => {
    +setFoodSelected([...selectedFoods]); // Set the state with selectedFoods

    console.log("foodGrams before calculation:", foodGrams);
    console.log("selectedFoods before calculation:", selectedFoods);
    const apiUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const apiKey = "5177cc1c34d9b2a6b68b55091cc24611";

    try {
      const promises = selectedFoods.map(async (food) => {
        const servingWeight = foodGrams[food.id] || 100; // Use input grams or default to 100g
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "0a0fdf0c",
            "x-app-key": apiKey,
          },
          body: JSON.stringify({
            query: `${food.name} ${servingWeight}g`,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          ...data.foods[0],
          grams: servingWeight,
        };
      });

      const resolvedFoods = await Promise.all(promises);
      setFoodItems(resolvedFoods);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //   foodItems.forEach((item)=>{
  //     <li> `Serving size of ${item.name}: ${item.serving_weight_grams} grams`</li>
  //   })
  // useEffect to recalculate total carbs whenever foodItems change
  // we used .reduce bcz it reduces all the elements of the array to a single value by repeatedly applying a function
  // .map function creates a new array by applying a function on each of the element of the arraay

  useEffect(() => {
    console.log("foodItems:", foodItems);

    setTotalCarbs(
      foodItems.reduce((total, food) => total + food.nf_total_carbohydrate, 0)
    );

    // setTotalCholestrol(
    //   foodItems.reduce((total, food) => total + food.nf_cholesterol, 0)
    // );
    setTotalCalories(
      foodItems.reduce((total, food) => total + food.nf_calories, 0)
    );
    setTotalProtein(
      foodItems.reduce((total, food) => total + food.nf_protein, 0)
    );
    setTotalSugar(foodItems.reduce((total, food) => total + food.nf_sugars, 0));
    setTotalFiber(
      foodItems.reduce((total, food) => total + food.nf_dietary_fiber, 0)
    );
  }, [foodItems]);

  return (
    <>
      <div>
        <h1 className={styles.lobsterRegular}>NutriFix</h1>
        <div className={styles.foodParent}>
          <div className={styles.typeFruitList}>
            <h3 className={styles.categoryTitle}>Fruits</h3>
            <div className={styles.overflow}>
              {fruitItems.map((fruit, index) => (
                <div className={styles.itemsName} key={index}>
                  <input
                    type="checkbox"
                    name={`fruit-${fruit.id}`}
                    id={`fruit-${fruit.id}`}
                    checked={selectedFoods.some(
                      (selected) => selected.id === fruit.id
                    )}
                    onChange={() => handleCheckboxChangeFromFoodList(fruit)}
                  />
                  <label
                    className={styles.itemsName}
                    htmlFor={`fruit-${fruit.id}`}
                  >
                    {fruit.name}
                  </label>

                  {/* Display input for grams when the food is selected */}
                  {selectedFoods.some(
                    (selected) => selected.id === fruit.id
                  ) && (
                    <input
                      type="number"
                      className={styles.gramsInput}
                      placeholder="grams"
                      value={foodGrams[fruit.id] ?? ""}
                      onChange={(e) =>
                        setFoodGrams({
                          ...foodGrams,
                          [fruit.id]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.typeVegetableList}>
            <h3 className={styles.categoryTitle}>Vegetables</h3>
            <div className={styles.overflow}>
              {vegetableItems.map((vegetable, index) => (
                <div className={styles.itemsName} key={index}>
                  <input
                    type="checkbox"
                    name={`vegetable-${vegetable.id}`}
                    id={`vegetable-${vegetable.id}`}
                    checked={selectedFoods.some(
                      (selected) => selected.id === vegetable.id
                    )}
                    onChange={() => handleCheckboxChangeFromFoodList(vegetable)}
                  />{" "}
                  <label
                    className={styles.itemsName}
                    htmlFor={`vegetable-${vegetable.id}`}
                  >
                    {vegetable.name}
                  </label>
                  {/* Display input for grams when the food is selected */}
                  {selectedFoods.some(
                    (selected) => selected.id === vegetable.id
                  ) && (
                    <input
                      type="number"
                      className={styles.gramsInput}
                      placeholder="grams"
                      value={foodGrams[vegetable.id] ?? ""}
                      onChange={(e) =>
                        setFoodGrams({
                          ...foodGrams,
                          [vegetable.id]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.typeCerealList}>
            <h3 className={styles.categoryTitle}>Cereals</h3>
            <div className={styles.overflow}>
              {cerealItems.map((cereal, index) => (
                <div className={styles.itemsName} key={index}>
                  <input
                    type="checkbox"
                    name={`cereal-${cereal.id}`}
                    id={`cereal-${cereal.id}`}
                    checked={selectedFoods.some(
                      (selected) => selected.id === cereal.id
                    )}
                    onChange={() => handleCheckboxChangeFromFoodList(cereal)}
                  />{" "}
                  <label
                    className={styles.itemsName}
                    htmlFor={`cereal-${cereal.id}`}
                  >
                    {cereal.name}
                  </label>
                  {/* Display input for grams when the food is selected */}
                  {selectedFoods.some(
                    (selected) => selected.id === cereal.id
                  ) && (
                    <input
                      type="number"
                      className={styles.gramsInput}
                      placeholder="grams"
                      value={foodGrams[cereal.id] ?? ""}
                      onChange={(e) =>
                        setFoodGrams({
                          ...foodGrams,
                          [cereal.id]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.typePulseList}>
            <h3 className={styles.categoryTitle}>pulses</h3>
            <div className={styles.overflow}>
              {pulseItems.map((pulse, index) => (
                <div className={styles.itemsName} key={index}>
                  <input
                    type="checkbox"
                    name={`pulse-${pulse.id}`}
                    id={`pulse-${pulse.id}`}
                    checked={selectedFoods.some(
                      (selected) => selected.id === pulse.id
                    )}
                    onChange={() => handleCheckboxChangeFromFoodList(pulse)}
                  />{" "}
                  <label
                    className={styles.itemsName}
                    htmlFor={`pulse-${pulse.id}`}
                  >
                    {pulse.name}
                  </label>
                  {/* Display input for grams when the food is selected */}
                  {selectedFoods.some(
                    (selected) => selected.id === pulse.id
                  ) && (
                    <input
                      type="number"
                      className={styles.gramsInput}
                      placeholder="grams"
                      value={foodGrams[pulse.id] ?? ""}
                      onChange={(e) =>
                        setFoodGrams({
                          ...foodGrams,
                          [pulse.id]: e.target.value,
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleSearch}>Calculate</button>

        {/* <div className={styles.totalValue}>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Total carbohydrates</strong>
                </td>
                <td>{totalCarbs.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total protein</strong>
                </td>
                <td>{totalProtein.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total cholestrol</strong>
                </td>
                <td>{totalCholestrol.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total calories</strong>
                </td>
                <td>{totalCalories.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total sugar</strong>
                </td>
                <td>{totalSugar.toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total fibre</strong>
                </td>
                <td>{totalFiber.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <div className={styles.totalValue}>
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>Total carbohydrates</strong>
                </td>
                <td>{totalCarbs.toFixed(2)}</td>
                {exceedCarbIntake && (
                  <td className={styles.warning}>Exceeded!</td>
                )}
              </tr>
              <tr>
                <td>
                  <strong>Total protein</strong>
                </td>
                <td>{totalProtein.toFixed(2)}</td>
                {exceedProteinIntake && (
                  <td className={styles.warning}>Exceeded!</td>
                )}
              </tr>
              <tr>
                <td>
                  <strong>Total sugar</strong>
                </td>
                <td>{totalSugar.toFixed(2)}</td>
                {exceedSugarIntake && (
                  <td className={styles.warning}>Exceeded!</td>
                )}
              </tr>
              <tr>
                <td>
                  <strong>Total fiber</strong>
                </td>
                <td>{totalFiber.toFixed(2)}</td>
                {exceedFiber && <td className={styles.warning}>Exceeded!</td>}
              </tr>
              <tr>
                <td>
                  <strong>Total energy expenditure (TDEE)</strong>
                </td>
                <td>{tdee.toFixed(2)}</td>
                {exceedTDEE && <td className={styles.warning}>Exceeded!</td>}
              </tr>
              {/* Render other nutrient totals and warnings */}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={handleLogButtonClick}>LOG</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Carbs (g)</th>
                <th>Protein (g)</th>
                <th>Cholesterol (mg)</th>
                <th>Sugar (g)</th>
                <th>Fiber (g)</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((food) => {
                const carbsPer100g =
                  (food.nf_total_carbohydrate / food.serving_weight_grams) *
                  100;
                const proteinPer100g =
                  (food.nf_protein / food.serving_weight_grams) * 100;
                const cholesterolPer100g =
                  (food.nf_cholesterol / food.serving_weight_grams) * 100;
                const sugarPer100g =
                  (food.nf_sugars / food.serving_weight_grams) * 100;
                const fiberPer100g =
                  (food.nf_dietary_fiber / food.serving_weight_grams) * 100;

                return (
                  <tr key={food.food_name}>
                    <td>{food.food_name}</td>
                    <td>{carbsPer100g.toFixed(2)}</td>
                    <td>{proteinPer100g.toFixed(2)}</td>
                    <td>{cholesterolPer100g.toFixed(2)}</td>
                    <td>{sugarPer100g.toFixed(2)}</td>
                    <td>{fiberPer100g.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Link to="/performance">Performance</Link>
      </div>
      {/* <div>
        <Link
          to={{
            pathname: "/nutrition",
            state: {
              totalCarbs: totalCarbsArray,
              totalProtein: totalProteinArray,
            },
          }}
        >
          <button>Performance</button>
        </Link>{" "}
      </div> */}
      <div>
        <form onSubmit={handleSubmitGpt}>
          <div>
            <div>
              <label>Recipe for the items</label>
            </div>
            {/* <div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div> */}
            <div>
              <button type="submit">Recipe</button>
            </div>
          </div>
        </form>
        <div className={styles.foodSelectedParent}>
          <div className={styles.foodSelectedChild}>
            {foodSelected.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  name={item.name}
                  id={item.id}
                  onChange={() => recipeAdd(item.name)}
                />
                <label htmlFor={item.id}>{item.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <ul>
            <li>{location.state.proteinIntake}</li>
            <li>{location.state.carbIntake}</li>
            <li>{location.state.sugarIntake}</li>
            <li>{location.state.tdee}</li>
          </ul>
        </div>
        <div>
          <p>{response}</p> {/* Render the 'response' value */}
        </div>
      </div>
    </>
  );
}
