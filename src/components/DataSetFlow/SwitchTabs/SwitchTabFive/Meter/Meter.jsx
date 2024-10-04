import React from "react";
import iMG from "./images/Polygon.svg";
// import meterIMG from "./images/meter.svg";
import styles from "./Meter.module.css";

const rating = "Good";

const Meter = ({ value }) => {
  const outerRadius = 100;
  const innerRadius = 90; // Slightly smaller radius for the triangle's path
  const centerX = 150;
  const centerY = 150;

  // Scale value to 180 to 0 degrees
  const angle = (value / 100) * 180 - 180;
  const angleInRadians = (angle * Math.PI) / 180;

  const dotX = centerX + outerRadius * Math.cos(angleInRadians);
  const dotY = centerY + outerRadius * Math.sin(angleInRadians);

  return (
    <div className={styles.MeterContainer}>
      {/* <img src={meterIMG} alt="meter" className={styles.MeterImage} /> */}
      <div className={styles.Meter}>
        <svg className={styles.SvgContainer}>
          {/* Outer Arc (invisible) */}
          <path
            d={`M ${
              centerX - outerRadius
            } ${centerY} A ${outerRadius} ${outerRadius} 0 0 1 ${
              centerX + outerRadius
            } ${centerY}`}
            stroke="none"
            fill="none"
          />
          {/* Inner Arc (visible) */}
          <path
            d={`M ${
              centerX - innerRadius
            } ${centerY} A ${innerRadius} ${innerRadius} 0 0 1 ${
              centerX + innerRadius
            } ${centerY}`}
            stroke="#D9D9D9"
            strokeWidth="2"
            fill="none"
          />
          {/* Image */}
          <image
            href={iMG}
            x={dotX - 18}
            y={dotY - 18}
            width="30"
            height="30"
            transform={`rotate(${angle + 90}, ${dotX}, ${dotY})`} // Rotate around the center of the image
          />
        </svg>
      </div>
      <div className={styles.rating}>
        <h4>{`${value} %`}</h4>
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default Meter;
