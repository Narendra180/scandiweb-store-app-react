import React from 'react';
import { ReactComponent as Logo } from '../../images/store-logo.svg';
import { ReactComponent as CaronIcon } from '../../images/caron-symbol.svg';
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import CurrencySelector from '../currency-selector/currency-selector.component';
import withRedux from '../../hoc-components/withRedux';
// import { selectTotalQuantity } from '../../redux/redux-slices/cart-slice-folder/cart-slice';
import { Link } from "react-router-dom";
import "./navbar.styles.scss";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrencySelectorOpen: false
        }
    }

    componentDidMount() {
        let activeCategory = document.querySelector(".category.active-category");
        this.setActiveIndicatorPosition(activeCategory);
    }


    handleCategoryNameClick = (e) => {
        let indexOfTargetInCategories = e.target.dataset.index;
        this.props.setCurrentActiveCategory(this.props.categories[indexOfTargetInCategories]);
        this.setActiveIndicatorPosition(e.target);
    }

    setActiveIndicatorPosition(activeCategoryDomObject) {
        let activeIndicator = document.querySelector(".navbar-left-group-active-indicator");
        activeIndicator.style.left = activeCategoryDomObject.offsetLeft+"px";
        activeIndicator.style.width = activeCategoryDomObject.offsetWidth+"px";
    }

    handleCurrencySwitcherClick = (e) => {
        // console.log("handle currency switcher click",e.target.dataset.id);
        this.setState((prevState,prevProps) => {
            if(!e.target.dataset.id) {
                return {isCurrencySelectorOpen: !prevState.isCurrencySelectorOpen}
            }
        });
    }

    handleCurrencySwitcherBlur = (e) => {
        // console.log("blurr",e.currentTarget,e.relatedTarget,e);
        this.setState({isCurrencySelectorOpen:false});
    }

    handleCurrencySelectorChange = (e) => {
        console.log(e.target)
    }

    render() {
        return (
            <div
                className="navbar"
            >
                <div
                    className="navbar-left-group"
                >
                    {
                        this.props.categories.map(({name},i) => {
                            return (
                                <div 
                                    data-index = {i}
                                    onClick={this.handleCategoryNameClick}
                                    key={i} 
                                    className={
                                        `category ${
                                            name===this.props.currentActiveCategory.name
                                            ?"active-category"
                                            :""                                    
                                        }`
                                    }
                                >
                                    {name}
                                </div>
                            )
                        })
                    }

                    <div 
                        className="navbar-left-group-active-indicator"
                    >
                    </div>
                </div>
                
                <div
                    className='navbar-logo'
                >
                    <Link to="/">
                        <Logo className="navbar-logo-svg"/>
                    </Link>
                </div>

                <div
                    className="navbar-right-group"
                >
                    <div 
                        className="currency-switcher"
                        tabIndex="0"
                        onClick={this.handleCurrencySwitcherClick}
                        onBlur={this.handleCurrencySwitcherBlur}
                    >
                        <span className="currency-symbol">
                            {this.props.redux.selectedStateValue.currentActiveCurrency.symbol}
                        </span>
                        <CaronIcon className={`caron-svg ${
                            this.state.isCurrencySelectorOpen?"active":""
                        }`}/>
                        <CurrencySelector
                            isOpen={this.state.isCurrencySelectorOpen}
                            onChange={this.handleCurrencySelectorChange}
                        />
                    </div>
                    <div className="cart-icon">
                        <CartIcon className="cart-icon-svg"/>
                        <span className={`cart-quantity-indicator ${
                            this.props.redux.selectedStateValue.totalQuantity < 1?
                            "hide-cart-quantity-indicator":""
                        }${
                            this.props.redux.selectedStateValue.totalQuantity > 9?
                            "cart-quantity-indicator-two-digit":""
                        }`}>
                            {this.props.redux.selectedStateValue.totalQuantity}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const selectState = (state) => {
    return {
        totalQuantity: state.cart.totalQuantity,
        currentActiveCurrency: state.currency.currentActiveCurrency
    }
};

export default withRedux(NavBar, selectState);

// const NavBar = ({categories,currentActiveCategory, setCurrentActiveCategory}) => {

    
//     const handleCategoryNameClick = (e) => {
//         let indexOfTargetInCategories = e.target.dataset.index;
//         setCurrentActiveCategory(categories[indexOfTargetInCategories]);
//         let activeIndicator = document.querySelector(".navbar-left-group-active-indicator");
//         activeIndicator.style.left = e.target.offsetLeft+"px";
//         activeIndicator.style.width = e.target.offsetWidth+"px";
//     }

//     useEffect(() =>  {
//         let activeCategory = document.querySelector(".category.active-category");
//         let activeIndicator = document.querySelector(".navbar-left-group-active-indicator");
//         activeIndicator.style.left = activeCategory.offsetLeft+"px";
//         activeIndicator.style.width = activeCategory.offsetWidth+"px";
//         // console.log(activeCategory);
//     });

//     return (
//         <div
//             className="navbar"
//         >
//             <div
//                 className="navbar-left-group"
//             >
//                 {
//                     categories.map(({name},i) => {
//                         return (
//                             <div 
//                                 data-index = {i}
//                                 onClick={handleCategoryNameClick}
//                                 key={i} 
//                                 className={
//                                     `category ${
//                                         name===currentActiveCategory.name
//                                         ?"active-category"
//                                         :""                                    
//                                     }`
//                                 }
//                             >
//                                 {name}
//                             </div>
//                         )
//                     })
//                 }

//                 <div 
//                     className="navbar-left-group-active-indicator"

//                 >
//                 </div>
//             </div>
            
//             <div
//                 className='navbar-logo'
//             >
//                 <Logo className="navbar-logo-svg"/>
//             </div>

//             <div
//                 className="navbar-right-group"
//             >
//                 <div className="currency-switcher">
//                     <span className="currency-symbol">$</span>
//                     <CaronIcon className="caron-svg"/>
//                 </div>
//                 <div className="cart-icon">
//                     <CartIcon className="cart-icon-svg"/>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default NavBar;