import HeaderLog from '../../Components/HeaderLog/HeaderLog';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import '../RecipePage/RecipePage.css';

export default function RecipePage() {
    const currentRecipe = useSelector((state) => state.recipes.currentRecipe);

    return (
        <>
            <HeaderLog />
            <main clasName='recMain'>
                <div className='imgDescrRecipe'>
                    <img src={`http://localhost:5000/${currentRecipe.img}`} alt="" />
                    <div>
                        <p className="recipeTitle">{currentRecipe.title}</p>
                        <p className='ingr'>Ingredients:</p>
                        <div className='ingredients'>
                                {currentRecipe.ingredients && currentRecipe.ingredients.length > 0 ? (
                                currentRecipe.ingredients.map((ingredient, index) => (
                                    <div key={index} className='ingredients'>
                                        <p>{index + 1}. {ingredient}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No ingredients available.</p>
                            )}
                        </div>
                    </div>
                    
                </div>
                <div className='instructions'>
                        {currentRecipe.instructions && currentRecipe.instructions.length > 0 ? (
                            currentRecipe.instructions.map((instruction, index) => (
                                <div key={index} className='instruction'>
                                    <p className='step'>Step {index + 1}</p>
                                    <p>{instruction}</p>
                                </div>
                            ))
                        ) : (
                            <p>No steps available.</p>
                        )}
                    </div>
            </main>
            <Footer />
        </>
    );
}