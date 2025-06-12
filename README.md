# ai_meal_planner

**An AI-powered meal planner app that creates personalized meal plans based on your dietary preferences, health goals, and available ingredients. Enjoy nutritious recipes, smart grocery lists, and hassle-free meal prep — all tailored just for you.**

## Table of Contents

*   [Key Features](#key-features)
*   [Getting Started](#getting-started)
    *   [Installation](#installation)
*   [Contributing](#contributing)
*   [License](#license)
*   [Contact](#contact)
*   [Acknowledgements](#acknowledgements)
*   [Project Status](#project-status)

## Key Features

*   **Personalized Meal Plans:** Generates meal plans based on your dietary restrictions (e.g., vegetarian, vegan, gluten-free), health goals (e.g., weight loss, muscle gain), and preferred cuisines.
*   **Smart Recipe Recommendations:** Suggests delicious and nutritious recipes tailored to your individual needs and preferences.
*   **Ingredient-Based Planning:** Allows you to create meal plans based on the ingredients you already have at home, minimizing food waste.
*   **Automatic Grocery Lists:** Generates comprehensive grocery lists based on your selected meal plan, making shopping quick and easy.
*   **Nutritional Information:** Provides detailed nutritional information for each recipe and meal plan, helping you stay on track with your dietary goals.
*   **Meal Prep Optimization:** Offers suggestions for meal prepping strategies to save you time and effort during the week.
*   **User-Friendly Interface:** A clean and intuitive interface makes meal planning simple and enjoyable.
*   **Integration with Grocery Delivery Services (Planned):** Future functionality will include integration with popular grocery delivery services for seamless shopping.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.


### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/m-sanjid/ai_meal_planner.git
    cd ai_meal_planner
    ```

2. **Install the Nodejs dependencies (Backend):**

    ```bash
    cd backend  # navigate to the backend directory.
    npm install
    cd .. # return to root directory
    ```

4. **Install the React dependencies (Frontend):**

    ```bash
    cd frontend #navigate to the frontend directory.
    npm install
    cd .. # return to root directory
    ```

5.  **Configure the application:**

    *   Create a `.env` file in the root directory based on the `.env.example` (if provided).  This will contain API keys and other sensitive configuration values.  *Example .env:*
        ```
        API_KEY=your_api_key_here
        DATABASE_URL=your_database_url_here
        ```
    *   Make sure to replace placeholder values with your actual credentials.  *Important: DO NOT commit the .env file to your repository.*  Add `.env` to your `.gitignore` file.


## Contributing

We welcome contributions to the `ai_meal_planner` project! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and write clear, concise commit messages.
4.  Submit a pull request with a detailed description of your changes.

Please adhere to the following guidelines:

*   **Code Style:** Follow the existing code style conventions.
*   **Testing:** Write unit tests for your code.
*   **Documentation:** Update the documentation as needed.

## License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please feel free to contact us:

*   [Muhammed Sanjid](mailto:developer.sanjid@gmail.com)

## Acknowledgements

*   We would like to thank the open-source community for their valuable contributions.

## Project Status

This project is currently maintained  We are actively working on adding new features and improving the existing functionality.  See the issues section for planned features.


*   **Production:** The project is stable and ready for production use.

```
