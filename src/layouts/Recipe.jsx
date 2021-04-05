import styled from '@emotion/styled';

const Label = styled.label`
  display: ${(props) => props.display};
  font-size: 1.1rem;
  font-weight: 700;
  min-width: 100px;
  width: ${(props) => props.width};
  margin: 0.125rem;
  padding: 0.5rem;
`;

const DutyLabel = styled.label`
  display: ${(props) => props.display};
  font-size: 1.1rem;
  font-weight: 700;
  min-width: 100px;
  width: ${(props) => props.width};
  margin: 0.125rem;
  padding: 0.5rem;

  :before {
  color: #ed5464;
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: 5px;
  content: '*';

  }
`;

const Input = styled.input`
  color: #000;
  display: ${(props) => props.display};
  min-width: 100px;
  width: ${(props) => props.width};
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  background-color: #e4e7eb;
  height: 24px;
  margin: 0.5rem;
  padding: 0.75rem;
`;

const Select = styled.select`
  color: #000;
  min-width: 100px;
  width: ${(props) => props.width};
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  background-color: #e4e7eb;
  height: 48px;
  margin: 0.5rem;
  padding: 0.75rem;
`;

const Span = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
`;

const Textarea = styled.textarea`
  color: #000;
  min-width: 300px;
  min-height: 200px;
  width: 70%;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 0.25rem;
  border: 1px solid #e5e7eb;
  background-color: #e4e7eb;
  margin: 0.5rem;
  padding: 0.75rem;
`;

const Button = styled.button`
  color: #361d74;
  padding: 5px 7px;
  font-size: 1.025rem;
  font-weight: 600;
  background: transparent;
  border-radius: 6px;
  border-color: #361d74;
  cursor: pointer;
  margin: 10px;
  transition: 0.5s;
  opacity: 0.8;
  
  :disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  :hover:enabled {
    opacity: 1.0;
    transition: 0.5s;
  }
`;

const Hamburger = styled.span`
  margin-left: 8px;
  margin-bottom: 5px;
  position: relative;  
  background: #000;  
  display: inline-block;
  width: 26px;
  height: 4px;
  border-radius: 4px;

  ::before {
  position: absolute;
  background: #000;  
  top: -10px;
  width: 26px;
  height: 4px;
  border-radius: 4px;
  content: '';

  }

  ::after {
  background: #000;  
  position: absolute;
  top: 10px;
  width: 26px;
  height: 4px;
  border-radius: 4px;
  content: '';
  }
`;

const Img = styled.img`
  margin: 0.125rem;
  padding: 0.5rem;
`;

const Notice = styled.div`
  margin-left: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1.5rem;
  
  :before {
    content: 'by ';
    font-size: 1rem;
    font-weight: 500;
  }
`;

const Date = styled.span`
  font-size: 0.9rem;
  font-weight: 400;
  margin-left: 1.5rem;
`;

const Line = styled.hr`
  margin-top: 10px;
  width: 95%;
  border: none;
  border-radius: 2px;
  padding: 2px 0;
  letter-spacing: 5px;
  background-color: rgb(245, 174, 69);
  opacity: 0.8;
  animation: showline 1s ease-out 1;

  @keyframes showline {
    0% {
      width: 0%;
    }
    100% {
      width: 96%;
    }
  }
`;

const Center = styled.div`
  text-align: center;

  img {
    width: 70%;
    height: 70%;
    margin-bottom: 20px;
  }
`;

export {
  Label,
  DutyLabel,
  Input,
  Select,
  Span,
  Textarea,
  Button,
  Title,
  Hamburger,
  Img,
  Notice,
  UserName,
  Date,
  Line,
  Center,
};
