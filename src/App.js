import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import NavBar from './components/navbar/navbar.component';
import './App.css';

const GET_CATEGORY_NAMES = gql`
    query {
        categories {
            name
        }
    }
`;

function App() {

  const [currentActiveCategory, setCurrentActiveCategory] = useState("");

  const onGettingCategories = (data) => {
    setCurrentActiveCategory(data.categories[0]);
  }

  const { loading, error, data } = useQuery(GET_CATEGORY_NAMES, 
                                    {onCompleted : onGettingCategories}
                                   );


  useEffect(() => {
    // console.log(currentActiveCategory)
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div className="App">
      
      <NavBar 
        categories={data.categories}
        currentActiveCategory={currentActiveCategory}
        setCurrentActiveCategory={setCurrentActiveCategory}
      />

    </div>
  );
}

export default App;
