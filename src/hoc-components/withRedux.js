import { useSelector, useDispatch } from 'react-redux';

function withRedux(Component,selectorFunction = () => {}) {
    function ComponentWithReduxSelectorAndDispatch(props) {
        const selectedStateValue = useSelector(selectorFunction);
        const dispatch = useDispatch();

        return (
            <Component
                {...props}
                redux={{selectedStateValue,dispatch}} 
            />
        );
    }

    return ComponentWithReduxSelectorAndDispatch;
}

export default withRedux;