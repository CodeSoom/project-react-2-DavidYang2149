import styled from '@emotion/styled';

const RecipeCards = styled.ul`
  @media (min-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
  }
`;

const RecipeCard = styled.li`
  margin: 0 1rem;
  margin-bottom: 3rem;
  background-color: #f8f8ef;
  border-radius: 5px;

  :hover {
  overflow: hidden;
  box-shadow: 0 5px 10px 0px rgba(0,0,0,0.1);
  transform: translatey(0px);
  animation: float 1s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-2px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  @media (min-width: 600px) {
    width: 44%;
  }

  @media (min-width: 768px) {
    width: 29%;
  }

  /* @media (min-width: 1024px) {
    width: 30%;
  } */

  .card-image {
    height: 0;
    padding-bottom: 60%;
    background-color: lightgray;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 5px 5px 0 0;

    img {
      display: none;
    }
  }

  .card-desc {
    padding: 1rem;

    h1 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    p {
      margin-bottom: 0.5rem;

      strong {
        font-weight: bold;
      }
    }

    .card-created {
      font-size: 0.8rem;
      color: gray; 
    }
  }
`;

export {
  RecipeCards,
  RecipeCard,
};
