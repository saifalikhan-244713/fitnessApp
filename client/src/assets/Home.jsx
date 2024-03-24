import { useState, useEffect } from "react";
import styles from "../styles/HomeStyles.module.css";
import axios from "axios";

export default function Home() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [foodGrams, setFoodGrams] = useState({});
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [selectedItemsList, setSelectedItemsList] = useState([]);
  //   const [totalSugar, setTotalSugar] = useState(0);
  //   const [totalProtein, setTotalProtein] = useState(0);
  //   const [totalCholestrol, setTotalCholestrol] = useState(0);

  // Fruits list

  const fruitItems = [
    { id: 4, name: "Grapes" },
    { id: 5, name: "Strawberry" },
    { id: 6, name: "Watermelon" },
    { id: 7, name: "Pineapple" },
    { id: 8, name: "Mango" },
    { id: 9, name: "Kiwi" },
    { id: 10, name: "Peach" },
    { id: 11, name: "Guava" },
    { id: 12, name: "Papaya" },
    { id: 13, name: "Pomegranate" },
    { id: 14, name: "Jackfruit" },
    { id: 15, name: "Chikoo (Sapota)" },
    { id: 16, name: "Lychee" },
    { id: 17, name: "Custard Apple" },
    { id: 18, name: "Dragon Fruit" },
    { id: 19, name: "Mulberry" },
    { id: 20, name: "Jamun" },
    { id: 21, name: "Fig (Anjeer)" },
    { id: 22, name: "Coconut" },
    { id: 23, name: "Dates" },
    { id: 24, name: "Guavas" },
    { id: 25, name: "Tamarind" },
    { id: 26, name: "Cranberry" },
    { id: 27, name: "Banana Flower" },
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ];

  // Vegetables list
  const vegetableItems = [
    { id: 28, name: "Potato" },
    { id: 29, name: "Tomato" },
    { id: 30, name: "Onion" },
    { id: 31, name: "Carrot" },
    { id: 32, name: "Cucumber" },
    { id: 33, name: "Spinach" },
    { id: 34, name: "Broccoli" },
    { id: 35, name: "Bell Pepper" },
    { id: 36, name: "Cabbage" },
    { id: 37, name: "Cauliflower" },
    { id: 38, name: "Eggplant (Brinjal)" },
    { id: 39, name: "Zucchini" },
    { id: 40, name: "Lettuce" },
    { id: 41, name: "Radish" },
    { id: 42, name: "Beetroot" },
    { id: 43, name: "Capsicum" },
    { id: 44, name: "Sweet Potato" },
    { id: 45, name: "Okra (Ladyfinger)" },
    { id: 46, name: "Mushroom" },
    { id: 47, name: "Green Beans" },
    { id: 48, name: "Peas" },
    { id: 49, name: "Asparagus" },
    { id: 50, name: "Artichoke" },
    { id: 51, name: "Turnip" },
    { id: 52, name: "Kale" },
    { id: 53, name: "Brussels Sprouts" },
    { id: 54, name: "Pumpkin" },
    { id: 55, name: "Garlic" },
    { id: 56, name: "Ginger" },
    { id: 57, name: "Coriander" },
  ];

  // Cereals list
  const cerealItems = [
    { id: 58, name: "Rice" },
    { id: 59, name: "Wheat" },
    { id: 60, name: "Barley" },
    { id: 61, name: "Oats" },
    { id: 62, name: "Maize (Corn)" },
    { id: 63, name: "Rye" },
    { id: 64, name: "Quinoa" },
    { id: 65, name: "Millet" },
    { id: 66, name: "Sorghum (Jowar)" },
    { id: 67, name: "Buckwheat" },
    { id: 68, name: "Amaranth" },
    { id: 69, name: "Farro" },
    { id: 70, name: "Spelt" },
    { id: 71, name: "Couscous" },
    { id: 72, name: "Semolina" },
    { id: 73, name: "Wild Rice" },
    { id: 74, name: "Barley" },
    { id: 75, name: "Soybeans" },
    { id: 76, name: "Bajra" },
    { id: 77, name: "Jowar" },
    { id: 78, name: "Ragi" },
    { id: 79, name: "Cornmeal" },
    { id: 80, name: "Brown Rice" },
    { id: 81, name: "Broken Wheat (Dalia)" },
    { id: 82, name: "Flaxseeds" },
    { id: 83, name: "Chia Seeds" },
    { id: 84, name: "Sunflower Seeds" },
  ];

  // Pulse items
  const pulseItems = [
    { id: 85, name: "Lentils" },
    { id: 86, name: "Chickpeas" },
    { id: 87, name: "Black Beans" },
    { id: 88, name: "Kidney Beans" },
    { id: 89, name: "Green Gram (Moong Dal)" },
    { id: 90, name: "Yellow Gram (Toor Dal)" },
    { id: 91, name: "Black Gram (Urad Dal)" },
    { id: 92, name: "Pigeon Peas (Arhar Dal)" },
    { id: 93, name: "Red Lentils (Masoor Dal)" },
    { id: 94, name: "Split Chickpeas (Chana Dal)" },
    { id: 95, name: "Green Peas" },
    { id: 96, name: "Moth Beans (Matki)" },
    { id: 97, name: "Horse Gram" },
  ];

  
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
  
  const handleCheckboxChangeFromSelectedList = (item) => {
    setSelectedFoods((prevSelectedFoods) =>
      prevSelectedFoods.filter((selected) => selected.id !== item.id)
    );
    setFoodGrams((prevGrams) => {
      // eslint-disable-next-line no-unused-vars
      const { [item.id]: removedGram, ...rest } = prevGrams;
      return rest;
    });
  };
  

  //   var i = 0;
  const handleSearch = async () => {
    console.log("foodGrams before calculation:", foodGrams);
    console.log("selectedFoods before calculation:", selectedFoods);
    const apiUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const apiKey = "06a1ae0bf3f7765037e4053ffb7e97ae";

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

      const selectedItems = selectedFoods.map((food) => ({
        id: food.id,
        name: food.name,
      }));
      setSelectedItemsList(selectedItems);
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
    // console.log("selectedFoods:", selectedFoods);
    // console.log("foodGrams:", foodGrams);
    setTotalCarbs(
      foodItems.reduce((total, food) => total + food.nf_total_carbohydrate, 0)
    );
    // console.log(totalCarbs);
    // setTotalCholestrol(
    //   foodItems.reduce((total, food) => total + food.nf_cholesterol, 0)
    // );
    // setTotalProtein(
    //   foodItems.reduce((total, food) => total + food.nf_protein, 0)
    // );
    // setTotalSugar(foodItems.reduce((total, food) => total + food.nf_sugars, 0));
  }, [foodItems]);

  return (
    <>
      <div className="containerFluid">
        <h1>Nutrition API demo </h1>
        <h3>Enter fruit items:</h3>

        <div className={styles.foodParent}>
          <div className={styles.typeFruitList}>
            <h3>Fruits</h3>
            {fruitItems.map((fruit, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={`fruit-${fruit.id}`}
                  id={`fruit-${fruit.id}`}
                  checked={selectedFoods.some(
                    (selected) => selected.id === fruit.id
                  )}
                  onChange={() => handleCheckboxChangeFromFoodList(fruit)}
                />
                <label htmlFor={`fruit-${fruit.id}`}>{fruit.name}</label>

                {/* Display input for grams when the food is selected */}
                {selectedFoods.some((selected) => selected.id === fruit.id) && (
                  <input
                    type="number"
                    placeholder="Enter grams"
                    value={foodGrams[fruit.id] ?? ""}
                    onChange={(e) =>
                      setFoodGrams({ ...foodGrams, [fruit.id]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.typeVegetableList}>
            <h3>Vegetables</h3>
            {vegetableItems.map((vegetable, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={`vegetable-${vegetable.id}`}
                  id={`vegetable-${vegetable.id}`}
                  checked={selectedFoods.some(
                    (selected) => selected.id === vegetable.id
                  )}
                  onChange={() => handleCheckboxChangeFromFoodList(vegetable)}
                />{" "}
                <label htmlFor={`vegetable-${vegetable.id}`}>
                  {vegetable.name}
                </label>
                {/* Display input for grams when the food is selected */}
                {selectedFoods.some(
                  (selected) => selected.id === vegetable.id
                ) && (
                  <input
                    type="number"
                    placeholder="Enter grams"
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
          <div className={styles.typeCerealList}>
            <h3>Cereals</h3>
            {cerealItems.map((cereal, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={`cereal-${cereal.id}`}
                  id={`cereal-${cereal.id}`}
                  checked={selectedFoods.some(
                    (selected) => selected.id === cereal.id
                  )}
                  onChange={() => handleCheckboxChangeFromFoodList(cereal)}
                />{" "}
                <label htmlFor={`cereal-${cereal.id}`}>{cereal.name}</label>
                {/* Display input for grams when the food is selected */}
                {selectedFoods.some(
                  (selected) => selected.id === cereal.id
                ) && (
                  <input
                    type="number"
                    placeholder="Enter grams"
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
          <div className={styles.typePulseList}>
            <h3>pulses</h3>
            {pulseItems.map((pulse, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={`pulse-${pulse.id}`}
                  id={`pulse-${pulse.id}`}
                  checked={selectedFoods.some(
                    (selected) => selected.id === pulse.id
                  )}
                  onChange={() => handleCheckboxChangeFromFoodList(pulse)}
                />{" "}
                <label htmlFor={`pulse-${pulse.id}`}>{pulse.name}</label>
                {/* Display input for grams when the food is selected */}
                {selectedFoods.some((selected) => selected.id === pulse.id) && (
                  <input
                    type="number"
                    placeholder="Enter grams"
                    value={foodGrams[pulse.id] ?? ""}
                    onChange={(e) =>
                      setFoodGrams({ ...foodGrams, [pulse.id]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSearch}>Search</button>
        <div className={styles.resultFlex}>
          <div>
            <h3>Result</h3>
            <strong>Total carbohydrates = {totalCarbs.toFixed(2)}</strong>
            <br />
          </div>
          <div>
            {foodItems.map((food) => {
              const carbsPer100g =
                (food.nf_total_carbohydrate / food.serving_weight_grams) * 100;
              return (
                <p key={food.food_name}>
                  {food.food_name} Carbs per 100g: {carbsPer100g.toFixed(2)}{" "}
                  grams
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmitGpt}>
          <div>
            <div>
              <label>just say something:</label>
            </div>
            <div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
        <div>
          <h3>Selected Items</h3>
          {selectedItemsList.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={`item-${item.id}`}
                checked={selectedFoods.some(
                  (selected) => selected.id === item.id
                )}
                onChange={() => handleCheckboxChangeFromSelectedList(item)} // Add onChange event handler
              />
              <label htmlFor={`item-${item.id}`}>{item.name}</label>
            </div>
          ))}
        </div>

        <div>
          <p>{response}</p> {/* Render the 'response' value */}
        </div>
      </div>
    </>
  );
}