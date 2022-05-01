import React from 'react';
import NavBar from './components/navbar/navbar.component';
import { gql } from '@apollo/client';
import { apolloClient } from './index';
import ProductCardsList from './components/product-cards-list/product-cards-list.component';
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
        this.getCategories();
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

                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <ProductCardsList 
                                        categoryName={this.state.currentActiveCategory.name}
                                    />
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
