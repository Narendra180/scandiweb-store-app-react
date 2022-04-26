import { useEffect } from 'react';
import { ReactComponent as Logo } from '../../images/store-logo.svg';
import { ReactComponent as CaronIcon } from '../../images/caron-symbol.svg';
import { ReactComponent as CartIcon } from '../../images/cart-icon.svg';
import "./navbar.styles.scss";


const NavBar = ({categories,currentActiveCategory, setCurrentActiveCategory}) => {

    
    const handleCategoryNameClick = (e) => {
        let indexOfTargetInCategories = e.target.dataset.index;
        setCurrentActiveCategory(categories[indexOfTargetInCategories]);
        let activeIndicator = document.querySelector(".navbar-left-group-active-indicator");
        activeIndicator.style.left = e.target.offsetLeft+"px";
        activeIndicator.style.width = e.target.offsetWidth+"px";
    }

    useEffect(() =>  {
        let activeCategory = document.querySelector(".category.active-category");
        let activeIndicator = document.querySelector(".navbar-left-group-active-indicator");
        activeIndicator.style.left = activeCategory.offsetLeft+"px";
        activeIndicator.style.width = activeCategory.offsetWidth+"px";
        // console.log(activeCategory);
    });

    return (
        <div
            className="navbar"
        >
            <div
                className="navbar-left-group"
            >
                {
                    categories.map(({name},i) => {
                        return (
                            <div 
                                data-index = {i}
                                onClick={handleCategoryNameClick}
                                key={i} 
                                className={
                                    `category ${
                                        name===currentActiveCategory.name
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
                <Logo className="navbar-logo-svg"/>
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
    )
}

export default NavBar;