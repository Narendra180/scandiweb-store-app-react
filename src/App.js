import React from 'react';
import NavBar from './components/navbar/navbar.component';
import { apolloClient } from './index';
import  { getCategoryNames } from "./gql-queries";
import ProductCardsList from './pages/product-cards-list/product-cards-list.component';
import ProductDescription from './pages/product-description-page/product-description-page.component';
import CartPage from "./pages/cart-page/cart-page.component";
import { Routes, Route } from "react-router-dom";
import withRouter from './hoc-components/with-router';
import './App.css';


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

    componentDidUpdate() {
        if(this.state.categories.length > 0 && this.props.router.location.pathname === "/") {
            this.props.router.navigate(`/category/${this.state.categories[0].name}`);
            this.setCurrentActiveCategory(this.state.categories[0]);
            const firstCategoryNamesOffsetWidth = document.querySelectorAll(".category")[0].offsetWidth;
            const activeIndicator = document.querySelector(".navbar-left-group-active-indicator");
            activeIndicator.style.left = "0";
            activeIndicator.style.width = firstCategoryNamesOffsetWidth+"px";
        }
    }


    getCategories = async () => {
        try {   
            const { data: { categories } } = await apolloClient.query(getCategoryNames());

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

                            {
                                this.state.categories.map((categoryNameObj,i) => {
                                    return (
                                        <Route
                                            key={i} 
                                            path={`/category/${categoryNameObj.name}`}
                                            element={
                                                <ProductCardsList 
                                                    categoryName={categoryNameObj.name}
                                                />
                                            } 
                                        />
                                    )
                                })
                            }

                            <Route 
                                path="/pdp/:productId"
                                element={<ProductDescription />}
                            />

                            <Route 
                                path="/cart"
                                element={<CartPage />}
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

export default withRouter(App);

