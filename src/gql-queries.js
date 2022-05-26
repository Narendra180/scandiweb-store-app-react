import { gql } from '@apollo/client';

export const getCategoryNames = () => {
    const GET_CATEGORY_NAMES = gql`
        query {
            categories {
                name
            }
        }
    `;
    return {
        query: GET_CATEGORY_NAMES
    }
}


export const getProductsOf = (categoryName) => {
    const GET_PRODUCTS_OF_CATEGORY = gql`
                                    query {
                                        category(input: {title: "${categoryName}"}) {
                                            name,
                                            products {
                                                id,
                                                brand,
                                                name,
                                                inStock,
                                                prices {
                                                    currency {
                                                        label,
                                                        symbol
                                                    },
                                                    amount
                                                },
                                                gallery,
                                                attributes {
                                                    name,
                                                    type,
                                                    items {
                                                        displayValue,
                                                        value,
                                                        id
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    `;
    return (
        {
            query: GET_PRODUCTS_OF_CATEGORY
        }        
    )
}


export const getProductDetailsOf = (productId) => {
    const GET_PRODUCT_DETAILS = gql`
                                    query {
                                        product(id: "${productId}") {
                                            id,
                                            brand,
                                            name,
                                            inStock,
                                            description,
                                            prices {
                                                currency {
                                                    label,
                                                    symbol
                                                },
                                                amount
                                            },
                                            gallery,
                                            attributes {
                                                name,
                                                type,
                                                items {
                                                    displayValue,
                                                    value,
                                                    id
                                                }
                                            }
                                        }
                                    }
                                    `;
    return (
        {
            query: GET_PRODUCT_DETAILS
        }        
    )
}

export const getAvailablecurrencies = () => {
    const GET_AVAILABLE_CURRENCIES = gql`
                                        query {
                                            currencies {
                                            label,
                                            symbol
                                            }
                                        }
                                    `;
    return (
        {
            query: GET_AVAILABLE_CURRENCIES
        }
    )

}
