import React, { useEffect } from 'react';
import { ReactComponent as Logo } from '../../images/store-logo.svg';
import { ReactComponent as CaronIcon } from '../../images/caron-symbol.svg';
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import { Link } from "react-router-dom";
import "./navbar.styles.scss";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
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
                    <div className="currency-switcher">
                        <span className="currency-symbol">$</span>
                        <CaronIcon className="caron-svg"/>
                    </div>
                    <div className="cart-icon">
                        <CartIcon className="cart-icon-svg"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;

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