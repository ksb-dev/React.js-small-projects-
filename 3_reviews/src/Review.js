import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {

  const [index, setIndex] = useState(0);
  const {id, name, job, image, text} = people[index];

  const handlePrevious = (index) => {
    if(index <= 0) {
      setIndex(people.length - 1);
    }
    else {
      setIndex(index - 1);
    }
  }

  const handleNext = (index) => {
    if(index >= people.length - 1) {
      setIndex(0);
    }
    else {
      setIndex(index + 1);
    }
  }

  const handleRandom = (index) => {
    let random = Math.floor((Math.random() * 4));
    
    if(random === index && index === 3) {
      setIndex(random - 1);
    }
    else if(random === index && index === 0 ) {
      setIndex(random + 1);
    }
    else if(random === index && index > 0  && index < 3) {
      setIndex(random + 1);
    }
    else {
      setIndex(random);
    }
  }

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img"/>
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{id}. {name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button onClick={() => handlePrevious(index)} className="prev-btn">
          <FaChevronLeft />
        </button>
        <button onClick={() => handleNext(index)} className="next-btn">
          <FaChevronRight />
        </button>
      </div>
      <button onClick={() => handleRandom(index)} className="random-btn">Surprise Me</button>
    </article>
  )
};

export default Review;