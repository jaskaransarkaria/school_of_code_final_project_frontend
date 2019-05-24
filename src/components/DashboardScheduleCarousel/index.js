import React, { Component } from "react";
import ArrowImage from "../../Images/right-arrow.svg";
import css from "../DashboardScheduleCarousel/DashboardScheduleCarousel.module.css";
class DashboardScheduleCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  nextButton = () => {
    debugger;
    this.setState(state => {
      return state.counter <= 2
        ? { counter: state.counter + 1 }
        : { counter: 2 };
    });
  };
  previousButton = () => {
    this.setState(state => {
      return {
        counter: state.counter - 1
      };
    });
  };

  array = [
    { lesson: "Lesson 1", topic: "JS Functions" },
    { lesson: "Lesson 2", topic: "React Hooks" },
    { lesson: "Lesson 3", topic: "Google Analytics" },
    { lesson: "Lesson 4", topic: "CSS Flexbox" },
    { lesson: "Lesson 5", topic: "JS Currying" }
  ];

  render() {
    return (
      <>
        <div className={css.carouselContainer}>
          <img
            src={ArrowImage}
            alt="arrow"
            className={css.leftArrow}
            onClick={this.previousButton}
          />
          <div className={css.itemOne}>
            <p className={css.title}>
              <b> {this.array[this.state.counter].lesson}</b>
            </p>
            <p className={css.content}>
              {this.array[this.state.counter].topic}
            </p>
          </div>
          <div className={css.itemTwo}>
            <p className={css.title}>
              <b> {this.array[this.state.counter + 1].lesson}</b>
            </p>
            <p className={css.content}>
              {this.array[this.state.counter + 1].topic}
            </p>
          </div>
          <div className={css.itemThree}>
            <p className={css.title}>
              <b> {this.array[this.state.counter + 2].lesson}</b>
            </p>
            <p className={css.content}>
              {this.array[this.state.counter + 2].topic}
            </p>
          </div>

          <img
            src={ArrowImage}
            alt="arrow"
            className={css.rightArrow}
            onClick={this.nextButton}
          />
        </div>
      </>
    );
  }
}
export default DashboardScheduleCarousel;
