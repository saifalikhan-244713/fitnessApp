import { useState, useEffect, useMemo } from "react";
import styles from "../styles/HomeStyles.module.css";
import media from "../styles/mediaStyles.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// import { logValue } from "../api";
import { logout } from "../../../server/utils/authUtils";
import useWindowWidth from "./customHooks/useWindowWidth";
export default function Home() {
  const location = useLocation();
  // const { email } = location.state || {};
  const navigate = useNavigate();

  // const [value, setValue] = useState(0);
  console.log(location.state);
  const {
    proteinIntake,
    carbIntake,
    sugarIntake,
    tdee,
    fiberIntake,
    email,
    firstName,
  } = location.state || {};

  const [selectedFoods, setSelectedFoods] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [foodGrams, setFoodGrams] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  // const [prompt, setPrompt] = useState("");
  // const [response, setResponse] = useState("");
  // const [foodSelected, setFoodSelected] = useState([]); // Move the declaration inside the component
  // const [recipeItems, setRecipeItems] = useState([]);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFiber, setTotalFiber] = useState(0);
  const [exceedCarbIntake, setExceedCarbIntake] = useState(false);
  const [exceedProteinIntake, setExceedProteinIntake] = useState(false);
  const [exceedSugarIntake, setExceedSugarIntake] = useState(false);
  const [exceedTDEE, setExceedTDEE] = useState(false);
  const [exceedFiber, setExceedFiber] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipeItems, setRecipeItems] = useState([]);
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);

  // Fruits list
  const fruitItems = useMemo(
    () => [
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
    ],
    []
  );

  // Vegetables list
  const vegetableItems = useMemo(
    () => [
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
    ],
    []
  );

  // Cereals list
  const cerealItems = useMemo(
    () => [
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
    ],
    []
  );
  // Pulse items
  const pulseItems = useMemo(
    () => [
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
    ],
    []
  );
  // Inside your handleLogButtonClick function in the React component
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to the login page after logging out
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handlePerformance = () => {
    navigate("/performance");
  };
  const handleLogButtonClick = () => {
    const today = new Date();
    const monthNum = today.getMonth() + 1;

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthNum];

    const date = today.getDate();
    const dateModified = month.toString() + " " + date.toString();
    console.log("date modified", dateModified);
    console.log("email", email);

    const payload = {
      totalCarbs,
      totalProtein,
      totalFiber,
      totalSugar,
      date: dateModified,
      email,
    };

    console.log("Payload:", payload);

    axios
      .post("http://localhost:3001/", payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // Handle the response if needed
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error(
          "Error logging nutrition data:",
          error.response?.data || error.message
        );
      });
  };

  async function generateAnswer() {
    setGeneratingAnswer(true);
    setIsAnswer(true);
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    // Create the fixed prompt
    console.log("recipeItems are ", recipeItems);
    const fixedPrompt = `Generate an Indian recipe for the food items containing ${recipeItems.join(
      ", "
    )} in points but the heading will be the recipe name.`;

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_APP_GEMINI_KEY
        }`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          contents: [{ parts: [{ text: fixedPrompt }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  // const handleSubmitGpt = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3001", { prompt })
  //     .then((res) => {
  //       setResponse(res.data.response); // Access the 'response' property from the data object
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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

  // const recipeAdd = (itemName) => {
  //   const item = selectedFoods.find((food) => food.name === itemName);
  //   if (item) {
  //     setRecipeItems((prevRecipeItems) => [...prevRecipeItems, item]);
  //   }
  // };
  // useEffect(() => {
  //   const promptString = `Give me an Indian recipe having ${recipeItems
  //     .map((item) => item.name)
  //     .join(", ")}`;
  //   setPrompt(promptString);
  // }, [recipeItems]);

  //   var i = 0;
  const windowWidth = useWindowWidth();

  const placeholderText = windowWidth < 668 ? "gms" : "Grams";
  const handleSearch = async () => {
    // +setFoodSelected([...selectedFoods]); // Set the state with selectedFoods

    console.log("foodGrams before calculation:", foodGrams);
    console.log("selectedFoods before calculation:", selectedFoods);
    const apiUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    const apiKey = "1ee1a126dec6d98fac2c381760dffd47";

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

  useEffect(() => {
    const selected = [
      ...fruitItems,
      ...vegetableItems,
      ...cerealItems,
      ...pulseItems,
    ].filter((item) =>
      selectedFoods.some((selected) => selected.id === item.id)
    );
    setSelectedItems(selected);
  }, [selectedFoods, fruitItems, vegetableItems, cerealItems, pulseItems]);

  const handleCheckboxChangeForRecipe = (item) => {
    setRecipeItems((prevRecipeItems) => {
      if (prevRecipeItems.includes(item.name)) {
        return prevRecipeItems.filter((name) => name !== item.name);
      } else {
        console.log("Recipe items:", [...prevRecipeItems, item.name]); // Log the updated recipeItems array
        return [...prevRecipeItems, item.name];
      }
    });
  };

  useEffect(() => {
    console.log("Recipe items:", recipeItems); // Log the updated recipeItems array
  }, [recipeItems]);

  return (
    <>
      <div className={styles.homeParent}>
        <div id="mainDiv">
          <nav
            className={`navbar ${styles.navCustom} ${media.navCustom} navbar-expand-lg navbar-light`}
          >
            <div className="container-fluid">
              <a className="navbar-brand " href="/home">
                <h1
                  className={`${styles.lobsterRegular} ${media.lobsterRegular}`}
                >
                  NutriFix
                </h1>
              </a>
              {/* <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button> */}
              {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
              <div className="navbar-nav ms-auto">
                {/* <div className={styles.userLogo}> */}
                <p
                  className={`${styles.userLogo} ${media.userLogo}`}
                  onClick={toggleMenu}
                >
                  {firstName.charAt(0)}
                </p>
                {/* </div> */}
                {menuOpen && (
                  <div className={styles.menu}>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                      Logout
                    </button>
                    {/* <div>
                        <Link to="/performance">Performance</Link>
                      </div> */}
                    <button
                      onClick={handlePerformance}
                      className={styles.performanceBtn}
                    >
                      <i className="fa-solid fa-chart-line"></i>Performance
                    </button>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
          </nav>
        </div>

        <div
          className={`row row-gap-3 ${media.foodParent} ${styles.foodParent}`}
        >
          <div
            className={`${styles.typeFruitList} ${media.typeFruitList} col-sm-6 col-md-6 col-lg-4 col-xl-3`}
          >
            <h3 className={styles.categoryTitle}>Fruits</h3>
            <div
              className={`${styles.itemsListOverflow} ${media.itemsListOverflow}`}
            >
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
                      className={`gramsInput2 ${media.gramsInput} ${styles.gramsInput}`}
                      placeholder={placeholderText}
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
          <div
            className={`${styles.typeVegetableList} ${media.typeVegetableList} col-sm-6 col-md-6 col-lg-4 col-xl-3 `}
          >
            <h3 className={styles.categoryTitle}>Vegetables</h3>
            <div
              className={`${styles.itemsListOverflow} ${media.itemsListOverflow}`}
            >
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
                      className={`gramsInput2 ${media.gramsInput} ${styles.gramsInput}`}
                      placeholder={placeholderText}
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
          <div
            className={`${styles.typeCerealList} ${media.typeCerealList} col-sm-6 col-md-6 col-lg-4 col-xl-3`}
          >
            <h3 className={styles.categoryTitle}>Cereals</h3>
            <div
              className={`${styles.itemsListOverflow} ${media.itemsListOverflow}`}
            >
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
                      className={`gramsInput2 ${media.gramsInput} ${styles.gramsInput}`}
                      placeholder={placeholderText}
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
          <div
            className={`${styles.typePulseList} ${media.typePulseList} col-sm-6 col-md-6 col-lg-4 col-xl-3`}
          >
            <h3 className={styles.categoryTitle}>pulses</h3>
            <div
              className={`${styles.itemsListOverflow} ${media.itemsListOverflow}`}
            >
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
                      className={`gramsInput2 ${media.gramsInput} ${styles.gramsInput}`}
                      placeholder={placeholderText}
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

        <button onClick={handleSearch} className={styles.calculateBtn}>
          Calculate
        </button>

        <div
          className={`${styles.totalNutrientsValue} ${media.totalNutrientsValue}`}
        >
          <h4>Total Value of Nutrition for Selected Items</h4>

          <table className={`${styles.roundedTable} ${media.roundedTable}`}>
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
          <button className={styles.logButton} onClick={handleLogButtonClick}>
            Log into Database
          </button>
        </div>
        <div className={`${styles.unitTableParent} ${media.unitTableParent}`}>
          <table className={`${styles.unitTable} ${media.unitTable}`}>
            <thead>
              <tr>
                <th>Food</th>
                <th>Carbs (per 100g)</th>
                <th>Protein (per 100g)</th>
                <th>Cholesterol (per 100mg)</th>
                <th>Sugar (per 100g)</th>
                <th>Fiber (per 100g)</th>
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
        <div className={`${styles.selectedItems} ${media.selectedItems}`}>
          {selectedItems.length > 0 ? (
            <>
              <h3>Selected Food Items For Recipe</h3>

              <ul
                className={`${styles.recipeItemsList} ${media.recipeItemsList}`}
              >
                {selectedItems.map((item) => (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      checked={recipeItems.includes(item.name)}
                      onChange={() => handleCheckboxChangeForRecipe(item)}
                    />
                    <label htmlFor={`recipe-${item.id}`}>{item.name}</label>
                  </li>
                ))}
              </ul>
              <div className=" h-screen p-3">
                <div className="text-center rounded bg-gray-50 ">
                  <button
                    onClick={generateAnswer}
                    className={`${styles.recipeBtn} ${media.recipeBtn}`}
                    disabled={generatingAnswer}
                  >
                    Generate Recipe
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h3
              id={`${styles.selectedItemsHead2} ${styles.selectedItemsHead2}`}
            >
              Please select food items for recipe
            </h3>
          )}
          {isAnswer && (
            <div
              className={`m-auto text-center rounded bg-gray-50 my-1 ${styles.recipeDiv}`}
            >
              {answer && (
                <ReactMarkdown className={`${styles.recipeAnswer} ${media.recipeAnswer}`}>
                  {answer}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
