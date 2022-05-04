import React from 'react';
import NavBar from './components/navbar/navbar.component';
import { gql } from '@apollo/client';
import { apolloClient } from './index';
import ProductCardsList from './pages/product-cards-list/product-cards-list.component';
import ProductDescription from './pages/product-description-page/product-description-page.component';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';

const GET_CATEGORY_NAMES = gql`
    query {
        categories {
            name
        }
    }
`;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            isCategoriesLoading: true,
            isLoadingCategoriesFailed: false,
            currentActiveCategory: ""
        }
    }

    componentDidMount() {
        console.log("component mounted");
        this.getCategories();
    }

    componentWillUnmount() {
        console.log("component unmounted");
    }


    getCategories = async () => {
        try {   
            const { data: { categories } } = await apolloClient.query({
                            query: GET_CATEGORY_NAMES
                        });

            this.setState({
                categories: categories,
                isCategoriesLoading: false,
                isLoadingCategoriesFailed: false,
                currentActiveCategory: categories[0]
            });
        } catch(err) {
            this.setState({isLoadingCategoriesFailed: true})
            console.log(err);
        }
    }

    setCurrentActiveCategory = (category) => {
        this.setState({currentActiveCategory: category});
    }

    render() {
        if(this.state.isLoadingCategoriesFailed) {
            return `Something went wrong, please try again later`;
        }
        return (
            <div className="App">

                {
                    this.state.isCategoriesLoading
                    ?
                    <p>Loading...</p>
                    :
                    <>
                        <NavBar
                            categories={this.state.categories}
                            currentActiveCategory={this.state.currentActiveCategory}
                            setCurrentActiveCategory={this.setCurrentActiveCategory}
                        />

                        {/* <ProductCardsList 
                            categoryName={this.state.currentActiveCategory.name}
                        /> */}

                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <ProductCardsList 
                                        categoryName={this.state.currentActiveCategory.name}
                                    />
                                } 
                            />

                            <Route 
                                path="/pdp/:productId"
                                element={<ProductDescription />}
                            />

                            <Route
                                path="*"
                                element={
                                    <main style={{ padding: "1rem" }}>
                                    <p>There's nothing here!</p>
                                    </main>
                                }
                            />
                        </Routes>

                        

                    </>
                    
                }

            </div>
        );
    }
}

export default App;


// function App() {

//     const [currentActiveCategory, setCurrentActiveCategory] = useState("");

//     const onGettingCategories = (data) => {
//         setCurrentActiveCategory(data.categories[0]);
//     }

//     const { loading, error, data } = useQuery(GET_CATEGORY_NAMES,
//         { onCompleted: onGettingCategories }
//     );


//     useEffect(() => {
//         // console.log(currentActiveCategory)
//     });

//     if (loading) return 'Loading...';
//     if (error) return `Error! ${error.message}`;

//     return (
//         <div className="App">

//             <NavBar
//                 categories={data.categories}
//                 currentActiveCategory={currentActiveCategory}
//                 setCurrentActiveCategory={setCurrentActiveCategory}
//             />

//         </div>
//     );
// }

// export default App;
